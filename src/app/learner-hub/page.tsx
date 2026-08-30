"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LearnerHub() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [availableCourses, setAvailableCourses] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState('');
  const [inboxMessages, setInboxMessages] = useState<any[]>([]);
  const [showInbox, setShowInbox] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState<string>('');
  const [replyText, setReplyText] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = localStorage.getItem('token');
    if (!t) {
      router.push('/');
      return;
    }
    setToken(t);
    
    // Auto-Logout & Active Class Polling
    const checkStatusAndActiveCourse = async () => {
      try {
        const authRes = await fetch('/api/auth/status', {
          headers: { 'Authorization': `Bearer ${t}` }
        });
        const authData = await authRes.json();
        if (!authData.active) {
          localStorage.removeItem('token');
          window.location.href = '/';
          return;
        }

        const coursesRes = await fetch('/api/courses/my-courses', {
          headers: { 'Authorization': `Bearer ${t}` }
        });
        const coursesData = await coursesRes.json();
        if (coursesData.enrollments) {
          setEnrollments(coursesData.enrollments);
          const activeEnrollment = coursesData.enrollments.find((e: any) => e.course && e.course.isActive);
          if (activeEnrollment && activeEnrollment.course && activeEnrollment.course.id) {
            window.location.href = `/api/course-play?id=${activeEnrollment.course.id}`;
            return;
          }
        }
        if (coursesData.user) setUser(coursesData.user);
      } catch (e) {
        console.error(e);
      }
    };

    checkStatusAndActiveCourse();
    const interval = setInterval(checkStatusAndActiveCourse, 2500);

    // Fetch messages
    fetch('/api/messages/inbox', {
      headers: { 'Authorization': `Bearer ${t}` }
    }).then(r => r.json()).then(data => {
      if (data.messages) setInboxMessages(data.messages);
    });
    
    // Fetch all courses
    fetch('/api/courses').then(r => r.json()).then(data => {
      if (data.courses) setAvailableCourses(data.courses);
    });

    return () => clearInterval(interval);
  }, [router]);

  const handleEnroll = async (courseId: string) => {
    const res = await fetch('/api/courses/enroll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ courseId })
    });
    
    if (res.ok) {
      const updated = await fetch('/api/courses/my-courses', {
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(r => r.json());
      if (updated.enrollments) setEnrollments(updated.enrollments);
    } else {
      alert("Error enrolling");
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages/inbox', { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await res.json();
      if (data.messages) setInboxMessages(data.messages);
    } catch (e) {}
  };

  const handleSendMessage = async () => {
    if (!replyText.trim() || !selectedContactId) return alert('Message cannot be empty');
    setIsSendingMessage(true);
    try {
      const res = await fetch('/api/messages/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ receiverId: selectedContactId, content: replyText })
      });
      if (res.ok) {
        setReplyText('');
        fetchMessages();
      } else {
        const data = await res.json();
        alert('Failed to send message: ' + data.error);
      }
    } catch (error) {
      alert('Network error');
    }
    setIsSendingMessage(false);
  };

  if (!mounted) return null;

  const contactsMap = new Map<string, { id: string, name: string, role: string }>();
  enrollments.forEach(e => {
    if (e.course?.educator) {
      contactsMap.set(e.course.educator.id, { 
        id: e.course.educator.id, 
        name: e.course.educator.name || e.course.educator.email, 
        role: 'EDUCATOR' 
      });
    }
  });
  const contacts = Array.from(contactsMap.values());
  const selectedContactMessages = inboxMessages.filter(msg => 
    msg.senderId === selectedContactId || msg.receiverId === selectedContactId
  );

  // Filter out courses the user is already enrolled in
  const unenrolledCourses = availableCourses.filter(c => !enrollments.some(e => e.courseId === c.id));

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--background)' }}>
      <div className="bg-blob bg-blob-1" style={{ opacity: 0.2 }} />
      <div className="bg-blob bg-blob-2" style={{ opacity: 0.15, right: '20%' }} />

      {/* Sidebar */}
      <aside className="glass-panel" style={{ width: '280px', margin: '24px', padding: '32px 24px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, var(--secondary), var(--primary))', borderRadius: '8px' }} />
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Interlectic Hub</h2>
        </div>

        {user && (
          <div style={{ marginBottom: '32px', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Logged in as</p>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--primary)' }}>{user.name}</h3>
            {user.studentId && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>ID: {user.studentId}</p>}
          </div>
        )}

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button className="btn-secondary" style={{ width: '100%', fontSize: '0.9rem', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)' }} onClick={() => setShowInbox(true)}>
            Messages {inboxMessages.length > 0 && `(${inboxMessages.length})`}
          </button>
          <button className="btn-secondary" style={{ width: '100%', fontSize: '0.9rem', color: 'var(--text-main)', border: '1px solid var(--glass-border)' }} onClick={() => router.push('/settings')}>
            Settings
          </button>
          <button className="btn-secondary" style={{ width: '100%', fontSize: '0.9rem', borderColor: 'rgba(255,100,100,0.3)', color: '#ff8a8a' }} onClick={() => {
            localStorage.removeItem('token');
            router.push('/');
          }}>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '48px 48px 48px 0', overflowY: 'auto' }}>
        <header style={{ marginBottom: '48px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>My Learning Journey</h1>
          <p style={{ color: 'var(--text-muted)' }}>Pick up right where you left off!</p>
        </header>

        {/* Enrolled Courses */}
        <h3 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>My Enrolled Courses</h3>
        {enrollments.filter(e => e.status === 'APPROVED').length === 0 ? (
          <div className="glass-panel" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)', marginBottom: '48px' }}>
            You haven't enrolled in any courses yet! Check out the available courses below.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '32px', marginBottom: '48px' }}>
            {enrollments.filter(e => e.status === 'APPROVED').map(e => (
              <div 
                key={e.id}
                onClick={() => window.location.href = `/api/course-play?id=${e.course.id}`} 
                className="glass-panel animate-fade-in-up floating-element" 
                style={{ overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.3s' }}
              >
                <div style={{ height: '180px', background: 'linear-gradient(45deg, #0f766e, #10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                </div>
                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>{e.course.title}</h3>
                  <button style={{ background: 'var(--primary)', border: 'none', color: '#fff', padding: '8px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>Resume Learning</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pending Approvals */}
        {enrollments.filter(e => e.status === 'PENDING').length > 0 && (
          <>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', color: '#fbbf24' }}>Pending Approval</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '32px', marginBottom: '48px' }}>
              {enrollments.filter(e => e.status === 'PENDING').map(e => (
                <div key={e.id} className="glass-panel animate-fade-in-up" style={{ padding: '24px', opacity: 0.7 }}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '12px', color: '#fbbf24' }}>⏳ {e.course.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>Waiting for educator to approve your request.</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Available Courses */}
        {unenrolledCourses.length > 0 && (
          <>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Available Courses</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '32px' }}>
              {unenrolledCourses.map(c => (
                <div key={c.id} className="glass-panel animate-fade-in-up" style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>{c.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>{c.description}</p>
                  <button onClick={() => handleEnroll(c.id)} className="btn-primary" style={{ padding: '8px 20px' }}>Enroll Now</button>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {showInbox && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999 }}>
          <div className="glass-panel animate-fade-in-up" style={{ width: '900px', height: '70vh', display: 'flex', background: 'var(--surface)', overflow: 'hidden', padding: 0 }}>
            
            {/* Left Sidebar (Contacts) */}
            <div style={{ width: '280px', borderRight: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '20px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#38bdf8' }}>My Teachers</h3>
              </div>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {contacts.length === 0 ? (
                  <div style={{ padding: '20px', color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center' }}>
                    Enroll in a course to contact a teacher.
                  </div>
                ) : (
                  contacts.map(contact => (
                    <div 
                      key={contact.id} 
                      onClick={() => setSelectedContactId(contact.id)}
                      style={{ padding: '16px 20px', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.05)', background: selectedContactId === contact.id ? 'rgba(56, 189, 248, 0.15)' : 'transparent', borderLeft: selectedContactId === contact.id ? '4px solid #38bdf8' : '4px solid transparent' }}
                    >
                      <div style={{ fontWeight: 600, color: '#38bdf8' }}>
                        {contact.name}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Teacher
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right Main Area (Messages) */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '20px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.2rem', color: '#38bdf8', margin: 0 }}>
                  {selectedContactId ? `Chat with ${contacts.find(c => c.id === selectedContactId)?.name}` : 'Select a Teacher'}
                </h2>
                <button onClick={() => setShowInbox(false)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
              </div>
              
              <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {!selectedContactId ? (
                   <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '40px' }}>
                     Select a teacher from the left to view messages.
                   </div>
                ) : selectedContactMessages.length === 0 ? (
                  <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '40px' }}>
                    No messages yet. Start the conversation!
                  </div>
                ) : (
                  selectedContactMessages.map(msg => {
                    const isMyMsg = msg.senderId === user?.id;
                    return (
                      <div key={msg.id} style={{ alignSelf: isMyMsg ? 'flex-end' : 'flex-start', maxWidth: '80%', background: isMyMsg ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.05)', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                          {isMyMsg ? 'You' : (msg.sender?.name || msg.sender?.email)} • {new Date(msg.createdAt).toLocaleString()}
                        </div>
                        <div style={{ whiteSpace: 'pre-wrap', color: 'white' }}>{msg.content}</div>
                      </div>
                    );
                  }).reverse()
                )}
              </div>

              {/* Reply Box */}
              {selectedContactId && (
                <div style={{ padding: '20px', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '12px', background: 'rgba(0,0,0,0.2)' }}>
                  <input 
                    type="text" 
                    placeholder="Type a message..." 
                    value={replyText} 
                    onChange={e => setReplyText(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                    style={{ flex: 1, padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.4)', color: 'white' }} 
                  />
                  <button 
                    onClick={handleSendMessage}
                    className="btn-primary" 
                    style={{ padding: '12px 24px', background: '#38bdf8' }}
                    disabled={isSendingMessage}
                  >
                    {isSendingMessage ? 'Sending...' : 'Send'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
