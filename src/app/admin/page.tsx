"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [pendingCourses, setPendingCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [directTitle, setDirectTitle] = useState('');
  const [directDesc, setDirectDesc] = useState('');
  const [directFile, setDirectFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [educators, setEducators] = useState<any[]>([]);
  const [selectedEducatorId, setSelectedEducatorId] = useState('');
  
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [updateFiles, setUpdateFiles] = useState<{ [key: string]: File | null }>({});
  const [isUpdatingCourse, setIsUpdatingCourse] = useState<{ [key: string]: boolean }>({});
  const [messages, setMessages] = useState<any[]>([]);
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});
  const [isReplying, setIsReplying] = useState<{ [key: string]: boolean }>({});

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMsg('You must be logged in to view this page.');
      setLoading(false);
      return;
    }
    fetchPending(token);
    fetchAllCourses(token);
    fetchMessages(token);
  }, []);

  const fetchMessages = async (token: string) => {
    try {
      const res = await fetch('/api/messages/inbox', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setMessages(data.messages || []);
    } catch (e) {
      console.error(e);
    }
  };

  const handleReply = async (receiverId: string, messageId: string) => {
    const text = replyText[messageId];
    if (!text || !text.trim()) return alert('Reply cannot be empty');
    setIsReplying({ ...isReplying, [messageId]: true });
    
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('/api/messages/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ receiverId, content: text })
      });
      if (res.ok) {
        alert('Reply sent successfully!');
        setReplyText({ ...replyText, [messageId]: '' });
        fetchMessages(token!);
      } else {
        const data = await res.json();
        alert('Failed to send reply: ' + data.error);
      }
    } catch (e) {
      alert('Network error');
    }
    setIsReplying({ ...isReplying, [messageId]: false });
  };

  const fetchPending = async (token: string) => {
    try {
      const res = await fetch('/api/courses/admin/pending', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      
      if (res.ok) {
        setPendingCourses(data.pendingCourses || []);
        setEducators(data.educators || []);
        if (data.educators?.length > 0) setSelectedEducatorId(data.educators[0].id);
      } else {
        setErrorMsg(data.error || 'Access denied');
      }
    } catch (e) {
      console.error(e);
      setErrorMsg('Network error');
    }
    setLoading(false);
  };

  const fetchAllCourses = async (token: string) => {
    try {
      const res = await fetch('/api/courses/admin/all', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setAllCourses(data.allCourses || []);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAction = async (courseId: string, action: 'APPROVE' | 'REJECT') => {
    if (!confirm(`Are you sure you want to ${action} this course?`)) return;
    const token = localStorage.getItem('token');
    const res = await fetch('/api/courses/admin/approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ courseId, action })
    });
    if (res.ok) {
      alert(`Course ${action.toLowerCase()}d!`);
      if (token) fetchPending(token);
    } else {
      const data = await res.json();
      alert('Action failed: ' + data.error);
    }
  };

  const handleDirectUpload = async () => {
    if (!directTitle || !directFile || !selectedEducatorId) return alert('Title, file, and educator are required!');
    setIsUploading(true);
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('title', directTitle);
    formData.append('description', directDesc);
    formData.append('educatorId', selectedEducatorId);
    formData.append('file', directFile);

    const res = await fetch('/api/courses/admin/upload-direct', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });
    
    if (res.ok) {
      alert('Success! Course uploaded and sync code automatically injected.');
      setDirectTitle('');
      setDirectDesc('');
      setDirectFile(null);
    } else {
      const data = await res.json();
      alert('Upload failed: ' + data.error);
    }
    setIsUploading(false);
  };

  const handleUpdateHtml = async (courseId: string) => {
    const file = updateFiles[courseId];
    if (!file) return alert('Please select an HTML file to update this course.');
    
    setIsUpdatingCourse({ ...isUpdatingCourse, [courseId]: true });
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('courseId', courseId);
    formData.append('file', file);

    const res = await fetch('/api/courses/admin/update-html', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });
    
    if (res.ok) {
      alert('Course HTML successfully replaced! Sync code auto-injected.');
      setUpdateFiles({ ...updateFiles, [courseId]: null });
      if (token) fetchAllCourses(token);
    } else {
      const data = await res.json();
      alert('Update failed: ' + data.error);
    }
    setIsUpdatingCourse({ ...isUpdatingCourse, [courseId]: false });
  };

  const handleExportHtml = (course: any) => {
    if (!course.htmlContent) return alert('No HTML content available for this course.');
    const blob = new Blob([course.htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${course.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_export.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) return null;

  if (errorMsg) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--background)', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass-panel hover-glow" style={{ padding: '40px', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <img src="/edusphere.png" alt="Interlectic" style={{ height: '48px', margin: '0 auto 16px auto', objectFit: 'contain' }} />
          <h1 style={{ fontSize: '1.5rem', color: '#ef4444', margin: '0 0 16px 0' }}>Access Denied</h1>
          <p style={{ color: 'var(--text-muted)' }}>{errorMsg}</p>
          <button onClick={() => router.push('/dashboard')} className="btn-secondary" style={{ marginTop: '24px', padding: '12px 24px' }}>
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const groupedMessages: { [educatorId: string]: { educator: any, messages: any[] } } = {};
  messages.forEach(msg => {
    const isSenderAdmin = msg.sender?.role === 'ADMIN';
    const educator = isSenderAdmin ? msg.receiver : msg.sender;
    if (!educator) return;
    if (!groupedMessages[educator.id]) {
      groupedMessages[educator.id] = { educator, messages: [] };
    }
    groupedMessages[educator.id].messages.push(msg);
  });

  const threads = Object.values(groupedMessages).sort((a, b) => {
    return new Date(b.messages[0].createdAt).getTime() - new Date(a.messages[0].createdAt).getTime();
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--background)' }}>
      {/* Dynamic Background Blobs */}
      <div className="bg-blob bg-blob-1" style={{ opacity: 0.3 }} />
      <div className="bg-blob bg-blob-2" style={{ opacity: 0.2, right: '20%' }} />

      <aside style={{ width: '280px', background: 'var(--surface)', borderRight: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', padding: '32px 24px', boxShadow: '4px 0 24px rgba(0,0,0,0.2)', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
          <img src="/edusphere.png" alt="Interlectic Logo" style={{ height: '40px', objectFit: 'contain' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', margin: 0, letterSpacing: '-0.5px', textShadow: '0 2px 10px rgba(56, 189, 248, 0.3)' }}>Security Admin</h2>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
          <div style={{ padding: '12px 16px', background: 'rgba(56, 189, 248, 0.15)', borderLeft: '4px solid var(--primary)', borderRadius: '0 8px 8px 0', color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer' }}>
            Pending Approvals
          </div>
          <div onClick={() => router.push('/dashboard')} style={{ padding: '12px 16px', color: 'var(--text-muted)', cursor: 'pointer', borderRadius: '8px' }}>
            Back to Dashboard
          </div>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: '48px', overflowY: 'auto', zIndex: 10 }}>
        <header style={{ marginBottom: '48px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Security Approval Dashboard</h1>
          <p style={{ color: 'var(--text-muted)' }}>Review HTML files uploaded by educators. Download the raw TXT file, scan it with your AI, and approve to publish.</p>
        </header>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Pending Uploads</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px' }}>
          {pendingCourses.length === 0 ? (
            <div className="glass-panel" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)', borderStyle: 'dashed' }}>
              No pending courses at the moment. All caught up!
            </div>
          ) : (
            pendingCourses.map(course => (
              <div key={course.id} className="glass-panel hover-glow animate-fade-in-up" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '1.3rem', margin: '0 0 8px 0', color: 'var(--text-main)' }}>{course.title}</h3>
                    <p style={{ color: 'var(--text-muted)', margin: '0 0 12px 0', fontSize: '0.95rem' }}>{course.description}</p>
                    <div style={{ display: 'inline-flex', padding: '4px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', fontSize: '0.85rem', color: '#cbd5e1', border: '1px solid var(--glass-border)' }}>
                      👤 Educator: {course.educator?.name} ({course.educator?.email})
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--glass-border)' }}>
                  <a 
                    href={`/pending_courses/${course.id}.txt`} 
                    download={`scan_${course.id}.txt`}
                    className="btn-secondary"
                    style={{ padding: '12px 24px', border: '1px solid #38bdf8', color: '#38bdf8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    📥 Download TXT for AI Scanning
                  </a>
                  
                  <div style={{ flex: 1 }} />
                  
                  <button 
                    onClick={() => handleAction(course.id, 'REJECT')}
                    className="btn-secondary"
                    style={{ padding: '12px 24px', border: '1px solid #ef4444', color: '#ef4444' }}
                  >
                    Reject & Delete
                  </button>
                  <button 
                    onClick={() => handleAction(course.id, 'APPROVE')}
                    className="btn-primary"
                    style={{ padding: '12px 24px', background: '#10b981', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)' }}
                  >
                    Approve & Publish
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <hr style={{ borderColor: 'var(--glass-border)', margin: '48px 0' }} />

        <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', color: '#10b981' }}>Direct Upload & Auto-Inject Sync Code</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Upload raw HTML courses directly to the database. The system will automatically inject the Teacher/Student sync code when users view it.</p>
        
        <div className="glass-panel" style={{ padding: '24px', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Assign to Educator</label>
            <select value={selectedEducatorId} onChange={e => setSelectedEducatorId(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'white' }}>
              {educators.map(ed => (
                <option key={ed.id} value={ed.id} style={{ background: '#0f172a' }}>{ed.name || ed.email} ({ed.role})</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Course Title</label>
            <input type="text" value={directTitle} onChange={e => setDirectTitle(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'white' }} placeholder="E.g. Excel Advanced Formatting" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Description</label>
            <input type="text" value={directDesc} onChange={e => setDirectDesc(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'white' }} placeholder="Course description" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>HTML File</label>
            <input type="file" accept=".html" onChange={e => setDirectFile(e.target.files ? e.target.files[0] : null)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'white' }} />
          </div>
          <button onClick={handleDirectUpload} className="btn-primary" style={{ padding: '16px', fontSize: '1.1rem', background: 'linear-gradient(90deg, #10b981, #059669)', border: 'none', marginTop: '8px' }} disabled={isUploading}>
            {isUploading ? 'Uploading...' : 'Upload & Inject Sync Code'}
          </button>
        </div>

        <hr style={{ borderColor: 'var(--glass-border)', margin: '48px 0' }} />

        <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', color: '#8b5cf6' }}>Manage Existing Courses</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>View all courses across all educators. You can quickly replace their HTML contents directly from here.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '800px' }}>
          {allCourses.map(course => (
            <div key={course.id} className="glass-panel hover-glow" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', margin: '0 0 8px 0', color: 'var(--text-main)' }}>{course.title}</h3>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <span style={{ padding: '4px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', fontSize: '0.85rem', color: '#cbd5e1', border: '1px solid var(--glass-border)' }}>
                    👤 {course.educator?.name || course.educator?.email}
                  </span>
                  <span style={{ padding: '4px 12px', background: course.isActive ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.05)', borderRadius: '20px', fontSize: '0.85rem', color: course.isActive ? '#10b981' : '#cbd5e1', border: course.isActive ? '1px solid #10b981' : '1px solid var(--glass-border)' }}>
                    {course.isActive ? 'Class Session Running' : 'Class Session Paused'}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '8px', paddingTop: '16px', borderTop: '1px solid var(--glass-border)' }}>
                <input 
                  type="file" 
                  accept=".html" 
                  onChange={e => setUpdateFiles({ ...updateFiles, [course.id]: e.target.files ? e.target.files[0] : null })}
                  style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'white' }} 
                />
                <button 
                  onClick={() => handleUpdateHtml(course.id)} 
                  className="btn-primary" 
                  style={{ padding: '10px 24px', background: '#8b5cf6', boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)' }}
                  disabled={isUpdatingCourse[course.id] || !updateFiles[course.id]}
                >
                  {isUpdatingCourse[course.id] ? 'Updating...' : 'Replace HTML'}
                </button>
                <button
                  onClick={() => handleExportHtml(course)}
                  className="btn-secondary"
                  style={{ padding: '10px 24px', border: '1px solid #10b981', color: '#10b981' }}
                >
                  Export HTML
                </button>
              </div>
            </div>
          ))}
        </div>

        <hr style={{ borderColor: 'var(--glass-border)', margin: '48px 0' }} />

        <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', color: '#f59e0b' }}>Admin Inbox (Messages from Educators)</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Messages sent by teachers via the "Contact Support" button on their dashboard.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '800px' }}>
          {threads.length === 0 ? (
            <div className="glass-panel" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)', borderStyle: 'dashed' }}>
              No messages in your inbox.
            </div>
          ) : (
            threads.map(thread => (
              <div key={thread.educator.id} className="glass-panel hover-glow" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h4 style={{ margin: 0, color: '#38bdf8', fontSize: '1.2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>
                  Conversation with {thread.educator.name || thread.educator.email}
                </h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '400px', overflowY: 'auto', paddingRight: '8px' }}>
                  {thread.messages.map(msg => {
                    const isAdminMsg = msg.sender?.role === 'ADMIN';
                    return (
                      <div key={msg.id} style={{ alignSelf: isAdminMsg ? 'flex-end' : 'flex-start', maxWidth: '80%', background: isAdminMsg ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255,255,255,0.05)', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                          {isAdminMsg ? 'You (Admin)' : (thread.educator.name || thread.educator.email)} • {new Date(msg.createdAt).toLocaleString()}
                        </div>
                        <div style={{ whiteSpace: 'pre-wrap', color: 'white' }}>{msg.content}</div>
                      </div>
                    );
                  }).reverse()}
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  <input 
                    type="text" 
                    placeholder={`Reply to ${thread.educator.name || thread.educator.email}...`}
                    value={replyText[thread.educator.id] || ''} 
                    onChange={e => setReplyText({ ...replyText, [thread.educator.id]: e.target.value })}
                    style={{ flex: 1, padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'white' }} 
                  />
                  <button 
                    onClick={() => handleReply(thread.educator.id, thread.educator.id)}
                    className="btn-primary" 
                    style={{ padding: '10px 24px', background: '#38bdf8' }}
                    disabled={isReplying[thread.educator.id]}
                  >
                    {isReplying[thread.educator.id] ? 'Sending...' : 'Reply'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </main>
    </div>
  );
}

