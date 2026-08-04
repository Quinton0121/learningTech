"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';

export default function EducatorDashboard() {
  const { t } = useLanguage();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState('');
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);
  const [inviteEmail, setInviteEmail] = useState<{ [key: string]: string }>({});
  const [csvFile, setCsvFile] = useState<{ [key: string]: File | null }>({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCourse, setNewCourse] = useState<{title: string, description: string, slideTitle: string, slideBullets: string, htmlFile: File | null}>({ title: '', description: '', slideTitle: '', slideBullets: '', htmlFile: null });
  const [isCreating, setIsCreating] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [inboxMessages, setInboxMessages] = useState<any[]>([]);
  const [showInbox, setShowInbox] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState<string>('ADMIN');

  useEffect(() => {
    setMounted(true);
    const t = localStorage.getItem('token');
    if (!t) {
      router.push('/');
      return;
    }
    setToken(t);
    fetchCourses(t);
  }, [router]);

  const fetchCourses = async (t: string) => {
    const res = await fetch('/api/courses/educator', {
      headers: { 'Authorization': `Bearer ${t}` }
    });
    const data = await res.json();
    if (data.courses) setCourses(data.courses);
    if (data.user) setUser(data.user);

    try {
      const msgRes = await fetch('/api/messages/inbox', {
        headers: { 'Authorization': `Bearer ${t}` }
      });
      if (msgRes.ok) {
        const msgData = await msgRes.json();
        const currentUser = data.user;
        const filteredMsgs = (msgData.messages || []).filter((msg: any) => {
          if (currentUser?.role === 'ADMIN') {
            if (msg.senderId !== currentUser.id && msg.sender?.role !== 'STUDENT') return false;
          }
          return msg.senderId === currentUser?.id || msg.receiverId === currentUser?.id;
        });
        setInboxMessages(filteredMsgs);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleInvite = async (courseId: string) => {
    const email = inviteEmail[courseId];
    if (!email) return;
    
    const res = await fetch('/api/courses/educator/add-student', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ courseId, studentEmail: email })
    });
    
    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      setInviteEmail({ ...inviteEmail, [courseId]: '' });
      fetchCourses(token); // refresh to update student count
    } else {
      alert("Error: " + data.error);
    }
  };

  const handleCsvUpload = async (courseId: string) => {
    const file = csvFile[courseId];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('courseId', courseId);

    const res = await fetch('/api/courses/educator/csv-signup', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      setCsvFile({ ...csvFile, [courseId]: null });
      fetchCourses(token);
    } else {
      alert("Error: " + data.error);
    }
  };


  const handleTogglePublic = async (courseId: string, currentPublic: boolean) => {
    const res = await fetch('/api/courses/educator/toggle-public', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ courseId, isPublic: !currentPublic })
    });
    if (res.ok) fetchCourses(token);
    else alert('Failed to toggle visibility');
  };

  const handleStartClass = async (courseId: string, action: 'START' | 'STOP') => {
    const res = await fetch('/api/courses/educator/start-class', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ courseId, action })
    });
    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      fetchCourses(token);
    } else {
      alert("Error: " + data.error);
    }
  };

  const handleRename = async (courseId: string, currentTitle: string) => {
    const newTitle = prompt("Enter new course name:", currentTitle);
    if (!newTitle || newTitle === currentTitle) return;

    const res = await fetch('/api/courses/educator/rename-course', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ courseId, newTitle })
    });
    
    if (res.ok) {
      fetchCourses(token);
    } else {
      const data = await res.json();
      alert("Error: " + data.error);
    }
  };

  const handleCopy = async (courseId: string) => {
    if (!confirm("Are you sure you want to copy this course? The copied course will share the student quota with the original.")) return;
    const res = await fetch('/api/courses/educator/copy-course', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ courseId })
    });
    const data = await res.json();
    if (res.ok) {
      alert("Course copied successfully!");
      fetchCourses(token);
    } else {
      alert("Error: " + data.error);
    }
  };

  const handleRemove = async (courseId: string, studentId: string) => {
    if (!confirm("Are you sure you want to remove this student?")) return;
    const res = await fetch('/api/courses/educator/remove-student', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ courseId, studentId })
    });
    
    if (res.ok) {
      fetchCourses(token);
    } else {
      const data = await res.json();
      alert("Error: " + data.error);
    }
  };

  const handleApprove = async (courseId: string, studentId: string, action: 'APPROVE' | 'REJECT') => {
    const res = await fetch('/api/courses/educator/approve-student', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ courseId, studentId, action })
    });
    if (res.ok) fetchCourses(token);
    else alert('Error updating status');
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm("Are you sure you want to permanently delete this course? This action cannot be undone.")) return;
    const res = await fetch('/api/courses/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ courseId })
    });
    if (res.ok) {
      alert("Course deleted successfully.");
      setExpandedCourseId(null);
      fetchCourses(token);
    } else {
      const data = await res.json();
      alert("Error: " + data.error);
    }
  };

  const handleCreateCourse = async () => {
    if (!newCourse.title) return alert('Title is required');
    setIsCreating(true);

    try {
      if (newCourse.htmlFile) {
        const formData = new FormData();
        formData.append('title', newCourse.title);
        formData.append('description', newCourse.description);
        formData.append('file', newCourse.htmlFile);

        const res = await fetch('/api/courses/upload', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData
        });

        if (res.ok) {
          setShowCreateModal(false);
          setNewCourse({ title: '', description: '', slideTitle: '', slideBullets: '', htmlFile: null });
          fetchCourses(token);
          alert('Course uploaded successfully. It is now pending admin approval.');
        } else {
          alert('Failed to upload course');
        }
      } else {
        const slidesData = [{
          title: newCourse.slideTitle || 'Welcome to ' + newCourse.title,
          bullets: newCourse.slideBullets.split('\n').filter((b: string) => b.trim() !== '')
        }];
        const res = await fetch('/api/courses/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ title: newCourse.title, description: newCourse.description, slidesData })
        });
        if (res.ok) {
          setShowCreateModal(false);
          setNewCourse({ title: '', description: '', slideTitle: '', slideBullets: '', htmlFile: null });
          fetchCourses(token);
        } else {
          alert('Failed to create course');
        }
      }
    } catch (e) {
      alert('Error creating course');
    }
    setIsCreating(false);
  };

  const handleSendMessage = async () => {
    if (!replyText.trim()) return alert('Message cannot be empty');
    setIsSendingMessage(true);
    try {
      const res = await fetch('/api/messages/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ receiverId: selectedContactId, content: replyText })
      });
      if (res.ok) {
        setReplyText('');
        fetchCourses(token);
      } else {
        const data = await res.json();
        alert('Failed to send message: ' + data.error);
      }
    } catch (error) {
      alert('Network error');
    }
    setIsSendingMessage(false);
  };

  const contactsMap = new Map<string, { id: string, name: string, role: string }>();
  contactsMap.set('ADMIN', { id: 'ADMIN', name: 'Admin Support', role: 'ADMIN' });
  
  courses.forEach(c => {
    c.enrollments?.forEach((e: any) => {
      if (e.student) {
        contactsMap.set(e.student.id, { id: e.student.id, name: e.student.name || e.student.email, role: 'STUDENT' });
      }
    });
  });
  const contacts = Array.from(contactsMap.values());
  const selectedContactMessages = inboxMessages.filter(msg => {
    if (selectedContactId === 'ADMIN') {
      if (user?.role === 'ADMIN') {
        return msg.sender?.role === 'ADMIN' && msg.receiver?.role === 'ADMIN';
      }
      return (msg.sender?.role === 'ADMIN' || msg.receiver?.role === 'ADMIN') &&
             (msg.senderId === user?.id || msg.receiverId === user?.id);
    } else {
      return (msg.senderId === selectedContactId || msg.receiverId === selectedContactId) &&
             (msg.senderId === user?.id || msg.receiverId === user?.id);
    }
  });

  if (!mounted) return null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--background)' }}>
      <div className="bg-blob bg-blob-1" style={{ opacity: 0.3 }} />
      <div className="bg-blob bg-blob-2" style={{ opacity: 0.2, right: '20%' }} />

      <aside style={{ width: '280px', background: 'var(--surface)', borderRight: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', padding: '32px 24px', boxShadow: '4px 0 24px rgba(0,0,0,0.2)', zIndex: 10 }}>
        <div style={{ marginBottom: '24px' }}>
          <LanguageToggle />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
          <img src="/edusphere.png" alt="EduSphere Logo" style={{ height: '40px', objectFit: 'contain' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', margin: 0, letterSpacing: '-0.5px', textShadow: '0 2px 10px rgba(56, 189, 248, 0.3)' }}>{t('header.brand')}</h2>
        </div>
        
        {user && (
          <div style={{ marginBottom: '32px', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{t('sidebar.welcome')}</p>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '8px' }}>Educator {user.name}</h3>
            <div style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(168, 85, 247, 0.15)', borderRadius: '20px', color: '#c084fc', fontSize: '0.85rem', fontWeight: 700, border: '1px solid rgba(168, 85, 247, 0.3)' }}>
              💰 {user.tokens || 0} Tokens
            </div>
          </div>
        )}

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
          <div style={{ padding: '12px 16px', background: 'rgba(56, 189, 248, 0.15)', borderLeft: '4px solid var(--primary)', borderRadius: '0 8px 8px 0', color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer' }}>
            {t('sidebar.myCourses')}
          </div>
          <div onClick={() => router.push('/dashboard/students')} style={{ padding: '12px 16px', color: 'var(--text-muted)', cursor: 'pointer', borderRadius: '8px' }} className="hover:text-white">
            {t('sidebar.students')}
          </div>
          <div onClick={() => router.push('/analytics')} style={{ padding: '12px 16px', color: 'var(--text-muted)', cursor: 'pointer', borderRadius: '8px' }}>
            {t('sidebar.analytics')}
          </div>
          <div onClick={() => router.push('/marketplace')} style={{ padding: '12px 16px', color: 'var(--text-muted)', cursor: 'pointer', borderRadius: '8px' }}>
            {t('sidebar.marketplace')}
          </div>
          <div onClick={() => router.push('/tokens')} style={{ padding: '12px 16px', color: 'var(--text-muted)', cursor: 'pointer', borderRadius: '8px' }}>
            {t('sidebar.tokens')}
          </div>
          <div onClick={() => router.push('/teacher-marketplace')} style={{ padding: '12px 16px', color: 'var(--text-muted)', cursor: 'pointer', borderRadius: '8px' }}>
            {t('sidebar.educatorShop')}
          </div>
          <div onClick={() => router.push('/custom-course')} style={{ padding: '12px 16px', color: '#38bdf8', cursor: 'pointer', borderRadius: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', background: '#38bdf8', borderRadius: '50%', boxShadow: '0 0 10px #38bdf8' }}></span>
            {t('sidebar.customOrder')}
          </div>
          <div onClick={() => router.push('/settings')} style={{ padding: '12px 16px', color: 'var(--text-muted)', cursor: 'pointer', borderRadius: '8px' }}>
            {t('sidebar.settings')}
          </div>
          <div onClick={() => { setSelectedContactId('ADMIN'); setShowInbox(true); }} style={{ padding: '12px 16px', color: '#f59e0b', cursor: 'pointer', borderRadius: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            ✉️ Contact Support
          </div>
          <div onClick={() => setShowInbox(true)} style={{ padding: '12px 16px', color: '#38bdf8', cursor: 'pointer', borderRadius: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>📥 Messages</span>
            {inboxMessages.length > 0 && (
              <span style={{ background: '#ef4444', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem' }}>{inboxMessages.length}</span>
            )}
          </div>
          <div onClick={() => window.open('/user-guide', '_blank')} style={{ padding: '12px 16px', color: '#10b981', cursor: 'pointer', borderRadius: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
            {t('sidebar.documentation')}
          </div>
        </nav>

        <button className="btn-secondary" style={{ width: '100%', fontSize: '0.9rem', borderColor: 'rgba(255,100,100,0.3)', color: '#ff8a8a' }} onClick={() => {
          localStorage.removeItem('token');
          router.push('/');
        }}>
          {t('sidebar.signOut')}
        </button>
      </aside>

      <main style={{ flex: 1, padding: '48px', overflowY: 'auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{t('dashboard.title')}</h1>
            <p style={{ color: 'var(--text-muted)' }}>{t('dashboard.subtitle')}</p>
          </div>
          <button onClick={() => setShowCreateModal(true)} className="btn-primary" style={{ padding: '12px 24px', fontSize: '1rem' }}>{t('dashboard.createCourse')}</button>
        </header>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>{t('dashboard.yourCourses')}</h3>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '300px' }}>
            {courses.map(course => (
              <div 
                key={course.id} 
                className={`glass-panel animate-fade-in-up ${expandedCourseId === course.id ? '' : 'hover-glow'}`}
                style={{ 
                  padding: '20px', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  transition: 'all 0.2s', 
                  border: expandedCourseId === course.id ? '2px solid #38bdf8' : '1px solid rgba(255,255,255,0.05)',
                  background: expandedCourseId === course.id ? 'rgba(56, 189, 248, 0.1)' : 'var(--glass-bg)'
                }}
                onClick={() => setExpandedCourseId(course.id)}
              >
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: course.isArchived ? 'var(--text-muted)' : 'white', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '1.2rem' }}>📊</span>
                  {course.title}
                </h3>
                <span style={{ color: expandedCourseId === course.id ? '#38bdf8' : 'var(--text-muted)' }}>
                  {expandedCourseId === course.id ? '▶' : '▼'}
                </span>
              </div>
            ))}

            <div onClick={() => setShowCreateModal(true)} className="glass-panel hover-glow" style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', cursor: 'pointer', border: '2px dashed var(--glass-border)' }}>
              <span style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>+</span>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-muted)' }}>Create New Course</h3>
            </div>
          </div>

          {expandedCourseId && (
            <div style={{ flex: 2, position: 'sticky', top: '24px', maxHeight: 'calc(100vh - 48px)', overflowY: 'auto', borderRadius: '16px' }}>
              {courses.filter(c => c.id === expandedCourseId).map(course => (
                <div key={course.id} className="glass-panel animate-fade-in-up" style={{ overflow: 'hidden' }}>
                  <div 
                    style={{ height: '180px', background: course.isArchived ? 'linear-gradient(45deg, #475569, #64748b)' : 'linear-gradient(45deg, #0f766e, #10b981)', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: course.isArchived ? 'not-allowed' : 'pointer', filter: course.isArchived ? 'grayscale(100%)' : 'none' }}
                    onClick={(e) => {
                      if (!course.isArchived) window.location.href = `/api/course-play?id=${course.id}`;
                    }}
                  >
                     <div style={{ fontSize: '3rem', marginBottom: '8px' }}>📊</div>
                     {!course.isArchived && (
                       <div style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 16px', borderRadius: '24px', color: 'white', fontWeight: 600, fontSize: '0.9rem', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.3)' }}>
                         {t('dashboard.clickToOpen')}
                       </div>
                     )}
                     <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.5)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>{course.isArchived ? t('dashboard.courseExpired') : t('dashboard.published')}</div>
                     <button 
                       onClick={(e) => { e.stopPropagation(); setExpandedCourseId(null); }} 
                       style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', padding: '4px 12px', borderRadius: '20px', cursor: 'pointer', fontSize: '0.8rem' }}
                     >
                       {t('dashboard.close')}
                     </button>
                  </div>
                  
                  <div style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <h3 style={{ fontSize: '1.3rem', margin: 0, color: course.isArchived ? 'var(--text-muted)' : 'var(--text-main)' }}>{course.title}</h3>
                      <button onClick={() => handleRename(course.id, course.title)} style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.9rem' }} disabled={course.isArchived}>{t('dashboard.editName')}</button>
                    </div>
                    
                    <div style={{ marginBottom: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ color: course.isArchived ? '#ef4444' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>⏳</span>
                        <span>
                          Expires: {
                            new Date(new Date(course.startedAt || course.createdAt).getTime() + 13 * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                          }
                        </span>
                        <span 
                          title="This course will expire 13 months after the first student enrolls. To continue teaching this class in the future, please use the 'Copy Course' feature and invite your new students." 
                          style={{ background: 'rgba(255,255,255,0.1)', width: '18px', height: '18px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'help', fontSize: '0.7rem' }}
                        >
                          ?
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ color: course.isPublic ? '#10b981' : '#f59e0b', fontWeight: 600 }}>
                          {course.isPublic ? t('dashboard.published') : t('dashboard.private')}
                        </span>
                        <div>
                          <button 
                            onClick={() => handleTogglePublic(course.id, course.isPublic)}
                            disabled={course.isArchived}
                            style={{ background: 'transparent', border: '1px solid var(--glass-border)', color: 'var(--text-muted)', borderRadius: '4px', cursor: course.isArchived ? 'not-allowed' : 'pointer', fontSize: '0.7rem', padding: '2px 6px' }}
                          >
                            {t('dashboard.togglePublic')}
                          </button>
                        </div>
                      </div>
                    </div>

                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px', lineHeight: 1.5 }}>
                      {course.description}
                    </p>
                    
                    <div style={{ marginBottom: '16px' }}>
                      <button 
                        onClick={() => { if (!course.isArchived) window.location.href = `/api/course-play?id=${course.id}` }}
                        className="btn-primary hover-glow"
                        style={{ width: '100%', padding: '16px', fontSize: '1.2rem', fontWeight: 600, border: 'none', background: course.isArchived ? '#475569' : 'linear-gradient(90deg, #38bdf8, #818cf8)', color: 'white', cursor: course.isArchived ? 'not-allowed' : 'pointer', borderRadius: '8px', boxShadow: course.isArchived ? 'none' : '0 4px 15px rgba(56, 189, 248, 0.4)', transition: 'all 0.2s' }}
                        disabled={course.isArchived}
                      >
                        {course.isArchived ? t('dashboard.courseExpired') : t('dashboard.openSlides')}
                      </button>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                      <button 
                        onClick={() => handleStartClass(course.id, course.isActive ? 'STOP' : 'START')}
                        className={course.isActive ? "btn-secondary" : "btn-primary"}
                        style={{ flex: 1, padding: '12px', fontSize: '1rem', border: 'none', background: course.isArchived ? '#475569' : (course.isActive ? '#ef4444' : '#10b981'), color: 'white', cursor: course.isArchived ? 'not-allowed' : 'pointer', borderRadius: '8px' }}
                        disabled={course.isArchived}
                      >
                        {course.isArchived ? t('dashboard.courseExpired') : (course.isActive ? t('dashboard.logoutStudents') : t('dashboard.loginStudents'))}
                      </button>
                      <button
                        onClick={() => handleCopy(course.id)}
                        className="btn-secondary"
                        style={{ flex: 1, padding: '12px', fontSize: '1rem', border: '1px solid #38bdf8', color: '#38bdf8', background: 'transparent', cursor: 'pointer', borderRadius: '8px' }}
                      >
                        {t('dashboard.copyCourse')}
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="btn-secondary"
                        style={{ flex: 1, padding: '12px', fontSize: '1rem', border: '1px solid #ef4444', color: '#ef4444', background: 'transparent', cursor: 'pointer', borderRadius: '8px' }}
                      >
                        Delete
                      </button>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)', padding: '16px 0', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', gap: '16px' }}>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>👥 {course.enrollments?.length || 0} {t('dashboard.enrolledCount')} | 🎟️ {course.studentQuota} {t('dashboard.seatsLeft')} {course.sharedQuotaCourseName ? `(${t('dashboard.sharedWith')} ${course.sharedQuotaCourseName})` : ''}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>{t('dashboard.connectStudent')}</p>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                        <input 
                          type="email" 
                          placeholder={t('dashboard.studentEmail')}
                          value={inviteEmail[course.id] || ''} 
                          onChange={e => setInviteEmail({ ...inviteEmail, [course.id]: e.target.value })}
                          style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: '#fff' }} 
                          disabled={course.isArchived}
                        />
                        <button 
                          onClick={() => handleInvite(course.id)}
                          className="btn-primary" 
                          style={{ padding: '8px 16px', opacity: course.isArchived ? 0.5 : 1, cursor: course.isArchived ? 'not-allowed' : 'pointer' }}
                          disabled={course.isArchived}
                        >
                          {t('dashboard.connectBtn')}
                        </button>
                      </div>
                      
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>{t('dashboard.bulkImport')}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>{t('dashboard.csvFormat')}</p>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                        <input 
                          type="file" 
                          accept=".csv"
                          onChange={e => setCsvFile({ ...csvFile, [course.id]: e.target.files ? e.target.files[0] : null })}
                          style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: '#fff', fontSize: '0.8rem' }} 
                          disabled={course.isArchived}
                        />
                        <button 
                          onClick={() => handleCsvUpload(course.id)}
                          className="btn-secondary" 
                          style={{ padding: '8px 16px', opacity: (course.isArchived || !csvFile[course.id]) ? 0.5 : 1, cursor: (course.isArchived || !csvFile[course.id]) ? 'not-allowed' : 'pointer' }}
                          disabled={course.isArchived || !csvFile[course.id]}
                        >
                          {t('dashboard.uploadBtn')}
                        </button>
                      </div>

                    </div>

                    <details open style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '16px', marginBottom: '16px', border: '1px solid var(--glass-border)' }}>
                      <summary style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)', cursor: 'pointer', outline: 'none' }}>
                        {t('dashboard.rosterTitle')} ({course.enrollments?.length || 0})
                      </summary>
                      <div style={{ marginTop: '16px', overflowX: 'auto', maxHeight: '300px', overflowY: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                          <thead>
                            <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left', color: 'var(--text-muted)' }}>
                              <th style={{ padding: '8px', position: 'sticky', top: 0, background: 'rgba(15, 23, 42, 0.9)' }}>{t('dashboard.colName')}</th>
                              <th style={{ padding: '8px', position: 'sticky', top: 0, background: 'rgba(15, 23, 42, 0.9)' }}>{t('dashboard.colEmail')}</th>
                              <th style={{ padding: '8px', position: 'sticky', top: 0, background: 'rgba(15, 23, 42, 0.9)' }}>{t('dashboard.colPcId')}</th>
                              <th style={{ padding: '8px', position: 'sticky', top: 0, background: 'rgba(15, 23, 42, 0.9)' }}>{t('dashboard.colStatus')}</th>
                              <th style={{ padding: '8px', position: 'sticky', top: 0, background: 'rgba(15, 23, 42, 0.9)' }}>{t('dashboard.colActions')}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {course.enrollments && course.enrollments.map((e: any) => (
                              <tr key={e.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <td style={{ padding: '12px 8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: e.status === 'PENDING' ? '#fbbf24' : (e.status === 'REMOVED' ? '#ef4444' : 'var(--primary)'), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold', color: e.status === 'PENDING' ? '#000' : '#fff' }}>
                                    {e.user?.name ? e.user.name.charAt(0).toUpperCase() : 'S'}
                                  </div>
                                  {e.user?.name || 'Unnamed'}
                                </td>
                                <td style={{ padding: '12px 8px', color: 'var(--text-muted)' }}>{e.user?.email || '-'}</td>
                                <td style={{ padding: '12px 8px', color: '#38bdf8', fontFamily: 'monospace' }}>{e.pcId || '-'}</td>
                                <td style={{ padding: '12px 8px' }}>
                                  <span style={{ 
                                    padding: '4px 8px', 
                                    borderRadius: '12px', 
                                    fontSize: '0.75rem', 
                                    fontWeight: 600,
                                    background: e.status === 'APPROVED' ? 'rgba(16, 185, 129, 0.1)' : (e.status === 'PENDING' ? 'rgba(251, 191, 36, 0.1)' : 'rgba(239, 68, 68, 0.1)'),
                                    color: e.status === 'APPROVED' ? '#10b981' : (e.status === 'PENDING' ? '#fbbf24' : '#ef4444')
                                  }}>
                                    {e.status}
                                  </span>
                                </td>
                                <td style={{ padding: '12px 8px' }}>
                                  {e.status === 'PENDING' && (
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                      <button onClick={(event) => { event.preventDefault(); handleApprove(course.id, e.user.id, 'APPROVE'); }} style={{ background: '#10b981', border: 'none', color: '#fff', padding: '4px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Approve</button>
                                      <button onClick={(event) => { event.preventDefault(); handleApprove(course.id, e.user.id, 'REJECT'); }} style={{ background: 'transparent', border: '1px solid #ff8a8a', color: '#ff8a8a', padding: '4px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Reject</button>
                                    </div>
                                  )}
                                  {e.status === 'APPROVED' && (
                                    <button onClick={(event) => { event.preventDefault(); handleRemove(course.id, e.user.id); }} style={{ background: 'transparent', border: 'none', color: '#ff8a8a', cursor: 'pointer', fontSize: '0.85rem' }}>Remove</button>
                                  )}
                                  {e.status === 'REMOVED' && (
                                    <button onClick={(event) => { event.preventDefault(); handleApprove(course.id, e.user.id, 'APPROVE'); }} style={{ background: 'transparent', border: '1px solid #10b981', color: '#10b981', padding: '4px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Restore</button>
                                  )}
                                </td>
                              </tr>
                            ))}
                            {(!course.enrollments || course.enrollments.length === 0) && (
                              <tr>
                                <td colSpan={4} style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)' }}>No students enrolled yet.</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </details>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {showCreateModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999 }}>
          <div className="glass-panel animate-fade-in-up" style={{ width: '500px', padding: '32px', background: 'var(--surface)' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', color: 'var(--text-main)' }}>Create New Course (Template Builder)</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Course Title</label>
                <input type="text" value={newCourse.title} onChange={e => setNewCourse({...newCourse, title: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'white' }} placeholder="E.g. Advanced Excel Tips" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Course Description</label>
                <input type="text" value={newCourse.description} onChange={e => setNewCourse({...newCourse, description: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'white' }} placeholder="What is this course about?" />
              </div>
              <hr style={{ borderColor: 'var(--glass-border)', margin: '8px 0' }} />
              <h3 style={{ fontSize: '1.1rem', color: '#38bdf8' }}>Option A: Build from Template</h3>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Slide Title</label>
                <input type="text" value={newCourse.slideTitle} onChange={e => setNewCourse({...newCourse, slideTitle: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'white' }} placeholder="E.g. Introduction to Formulas" disabled={!!newCourse.htmlFile} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Bullet Points (One per line)</label>
                <textarea rows={4} value={newCourse.slideBullets} onChange={e => setNewCourse({...newCourse, slideBullets: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'white' }} placeholder="Point 1...\nPoint 2..." disabled={!!newCourse.htmlFile} />
              </div>
              <h3 style={{ fontSize: '1.1rem', color: '#38bdf8', marginTop: '16px' }}>Option B: Upload Custom HTML</h3>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Upload an HTML file (Pending approval)</label>
                <input type="file" accept=".html" onChange={e => setNewCourse({...newCourse, htmlFile: e.target.files ? e.target.files[0] : null})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'white' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
              <button onClick={() => setShowCreateModal(false)} className="btn-secondary" style={{ flex: 1, padding: '12px' }}>Cancel</button>
              <button onClick={handleCreateCourse} className="btn-primary" style={{ flex: 1, padding: '12px' }} disabled={isCreating}>{isCreating ? 'Creating...' : 'Create Course'}</button>
            </div>
          </div>
        </div>
      )}

      {showInbox && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999 }}>
          <div className="glass-panel animate-fade-in-up" style={{ width: '900px', height: '70vh', display: 'flex', background: 'var(--surface)', overflow: 'hidden', padding: 0 }}>
            
            {/* Left Sidebar (Contacts) */}
            <div style={{ width: '280px', borderRight: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '20px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#f59e0b' }}>Contacts</h3>
              </div>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {contacts.map(contact => (
                  <div 
                    key={contact.id} 
                    onClick={() => setSelectedContactId(contact.id)}
                    style={{ padding: '16px 20px', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.05)', background: selectedContactId === contact.id ? 'rgba(56, 189, 248, 0.15)' : 'transparent', borderLeft: selectedContactId === contact.id ? '4px solid #38bdf8' : '4px solid transparent' }}
                  >
                    <div style={{ fontWeight: 600, color: contact.role === 'ADMIN' ? '#f59e0b' : '#38bdf8' }}>
                      {contact.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {contact.role === 'ADMIN' ? 'Admin Support' : 'Student'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Main Area (Messages) */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '20px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.2rem', color: '#38bdf8', margin: 0 }}>
                  Chat with {contacts.find(c => c.id === selectedContactId)?.name}
                </h2>
                <button onClick={() => setShowInbox(false)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
              </div>
              
              <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {selectedContactMessages.length === 0 ? (
                  <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '40px' }}>
                    No messages yet. Start the conversation!
                  </div>
                ) : (
                  selectedContactMessages.map(msg => {
                    const isMyMsg = msg.senderId === user?.id;
                    return (
                      <div key={msg.id} style={{ alignSelf: isMyMsg ? 'flex-end' : 'flex-start', maxWidth: '80%', background: isMyMsg ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.05)', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                          {isMyMsg ? 'You' : (msg.sender?.role === 'ADMIN' ? 'Admin Support' : (msg.sender?.name || msg.sender?.email))} • {new Date(msg.createdAt).toLocaleString()}
                        </div>
                        <div style={{ whiteSpace: 'pre-wrap', color: 'white' }}>{msg.content}</div>
                      </div>
                    );
                  }).reverse()
                )}
              </div>

              {/* Reply Box */}
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
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
