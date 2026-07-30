"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EducatorDashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState('');
  const [inviteEmail, setInviteEmail] = useState<{ [key: string]: string }>({});
  const [csvFile, setCsvFile] = useState<{ [key: string]: File | null }>({});

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

  if (!mounted) return null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--background)' }}>
      <div className="bg-blob bg-blob-1" style={{ opacity: 0.3 }} />
      <div className="bg-blob bg-blob-2" style={{ opacity: 0.2, right: '20%' }} />

      <aside className="glass-panel" style={{ width: '280px', margin: '24px', padding: '32px 24px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', borderRadius: '8px' }} />
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>EduSphere</h2>
        </div>

        {user && (
          <div style={{ marginBottom: '32px', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Welcome back,</p>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '8px' }}>Educator {user.name}</h3>
            <div style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(168, 85, 247, 0.15)', borderRadius: '20px', color: '#c084fc', fontSize: '0.85rem', fontWeight: 700, border: '1px solid rgba(168, 85, 247, 0.3)' }}>
              💰 {user.tokens || 0} Tokens
            </div>
          </div>
        )}

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
          <div style={{ padding: '12px 16px', background: 'rgba(56, 189, 248, 0.15)', borderLeft: '4px solid var(--primary)', borderRadius: '0 8px 8px 0', color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer' }}>
            📚 My Courses
          </div>
          <div onClick={() => router.push('/dashboard/students')} style={{ padding: '12px 16px', color: 'var(--text-muted)', cursor: 'pointer', borderRadius: '8px' }} className="hover:text-white">
            👥 Students
          </div>
          <div onClick={() => router.push('/analytics')} style={{ padding: '12px 16px', color: 'var(--text-muted)', cursor: 'pointer', borderRadius: '8px' }}>
            📊 Analytics
          </div>
          <div onClick={() => router.push('/marketplace')} style={{ padding: '12px 16px', color: 'var(--text-muted)', cursor: 'pointer', borderRadius: '8px' }}>
            🛒 Marketplace
          </div>
          <div onClick={() => router.push('/tokens')} style={{ padding: '12px 16px', color: 'var(--text-muted)', cursor: 'pointer', borderRadius: '8px' }}>
            💰 Buy Tokens
          </div>
          <div onClick={() => router.push('/teacher-marketplace')} style={{ padding: '12px 16px', color: 'var(--text-muted)', cursor: 'pointer', borderRadius: '8px' }}>
            🛍️ Educator Shop
          </div>
          <div onClick={() => router.push('/custom-course')} style={{ padding: '12px 16px', color: '#38bdf8', cursor: 'pointer', borderRadius: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', background: '#38bdf8', borderRadius: '50%', boxShadow: '0 0 10px #38bdf8' }}></span>
            🛠️ Custom Order
          </div>
          <div onClick={() => router.push('/settings')} style={{ padding: '12px 16px', color: 'var(--text-muted)', cursor: 'pointer', borderRadius: '8px' }}>
            ⚙️ Settings
          </div>
          <div onClick={() => window.open('/DOCUMENTATION.html', '_blank')} style={{ padding: '12px 16px', color: '#10b981', cursor: 'pointer', borderRadius: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
            📖 User Documentation
          </div>
        </nav>

        <button className="btn-secondary" style={{ width: '100%', fontSize: '0.9rem', borderColor: 'rgba(255,100,100,0.3)', color: '#ff8a8a' }} onClick={() => {
          localStorage.removeItem('token');
          router.push('/');
        }}>
          Sign Out
        </button>
      </aside>

      <main style={{ flex: 1, padding: '48px 48px 48px 0', overflowY: 'auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Educator Dashboard</h1>
            <p style={{ color: 'var(--text-muted)' }}>Welcome back! Manage your teaching materials here.</p>
          </div>
          <button className="btn-primary" style={{ padding: '12px 24px', fontSize: '1rem' }}>+ Create New Course</button>
        </header>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Your Courses</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '32px' }}>
          
          {courses.map(course => (
            <div key={course.id} className="glass-panel animate-fade-in-up floating-element" style={{ overflow: 'hidden' }}>
              <div onClick={() => { if (!course.isArchived) window.location.href = `/course.html?id=${course.id}` }} style={{ height: '180px', background: course.isArchived ? 'linear-gradient(45deg, #475569, #64748b)' : 'linear-gradient(45deg, #0f766e, #10b981)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: course.isArchived ? 'not-allowed' : 'pointer', filter: course.isArchived ? 'grayscale(100%)' : 'none' }}>
                 <div style={{ fontSize: '4rem' }}>📊</div>
                 <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.5)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>{course.isArchived ? 'Archived (Expired)' : 'Published'}</div>
              </div>
              
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '1.3rem', margin: 0, color: course.isArchived ? 'var(--text-muted)' : 'var(--text-main)' }}>{course.title}</h3>
                  <button onClick={() => handleRename(course.id, course.title)} style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.9rem' }} disabled={course.isArchived}>✎ Edit Name</button>
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
                      {course.isPublic ? '🌍 Public' : '🔒 Private'}
                    </span>
                    <button 
                      onClick={() => handleTogglePublic(course.id, course.isPublic)}
                      disabled={course.isArchived}
                      style={{ background: 'transparent', border: '1px solid var(--glass-border)', color: 'var(--text-muted)', borderRadius: '4px', cursor: course.isArchived ? 'not-allowed' : 'pointer', fontSize: '0.7rem', padding: '2px 6px' }}
                    >
                      Toggle
                    </button>
                  </div>
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px', lineHeight: 1.5 }}>
                  {course.description}
                </p>
                
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                  <button 
                    onClick={() => handleStartClass(course.id, course.isActive ? 'STOP' : 'START')}
                    className={course.isActive ? "btn-secondary" : "btn-primary"}
                    style={{ flex: 1, padding: '12px', fontSize: '1rem', border: 'none', background: course.isArchived ? '#475569' : (course.isActive ? '#ef4444' : '#10b981'), color: 'white', cursor: course.isArchived ? 'not-allowed' : 'pointer', borderRadius: '8px' }}
                    disabled={course.isArchived}
                    title={course.isArchived ? 'Course Expired' : "Quick Login Setup:\n1) On each student PC, visit /setup to assign a PC_ID.\n2) Upload a CSV mapping students to their PC_IDs.\n3) Enable this button to let students auto-login!"}
                  >
                    {course.isArchived ? '🔒 Course Expired' : (course.isActive ? '🛑 Logout Students' : '▶️ Login Students')}
                  </button>
                  <button
                    onClick={() => handleCopy(course.id)}
                    className="btn-secondary"
                    style={{ flex: 1, padding: '12px', fontSize: '1rem', border: '1px solid #38bdf8', color: '#38bdf8', background: 'transparent', cursor: 'pointer', borderRadius: '8px' }}
                  >
                    📋 Copy Course
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)', padding: '16px 0', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>👥 {course.enrollments?.length || 0} enrolled | 🎟️ {course.studentQuota} seats left {course.sharedQuotaCourseName ? `(Shared with: ${course.sharedQuotaCourseName})` : ''}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>Connect a Student:</p>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                    <input 
                      type="email" 
                      placeholder="Student's Email" 
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
                      Connect
                    </button>
                  </div>
                  
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>Bulk Import Students (CSV):</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Format: Name, StudentID, Password, PC_ID</p>
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
                      Upload CSV
                    </button>
                  </div>

                </div>

                <details style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '16px', marginBottom: '16px', border: '1px solid var(--glass-border)' }}>
                  <summary style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)', cursor: 'pointer', outline: 'none' }}>
                    👥 Student Roster ({course.enrollments?.length || 0})
                  </summary>
                  <div style={{ marginTop: '16px', overflowX: 'auto', maxHeight: '300px', overflowY: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left', color: 'var(--text-muted)' }}>
                          <th style={{ padding: '8px', position: 'sticky', top: 0, background: 'rgba(15, 23, 42, 0.9)' }}>Name</th>
                          <th style={{ padding: '8px', position: 'sticky', top: 0, background: 'rgba(15, 23, 42, 0.9)' }}>Email</th>
                          <th style={{ padding: '8px', position: 'sticky', top: 0, background: 'rgba(15, 23, 42, 0.9)' }}>Status</th>
                          <th style={{ padding: '8px', position: 'sticky', top: 0, background: 'rgba(15, 23, 42, 0.9)' }}>Actions</th>
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

          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '380px', border: '2px dashed var(--glass-border)', background: 'transparent', cursor: 'pointer' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: 'var(--text-muted)', marginBottom: '16px' }}>+</div>
            <h3 style={{ color: 'var(--text-main)', fontSize: '1.2rem' }}>Create New Course</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Upload videos and materials</p>
          </div>

        </div>
      </main>
    </div>
  );
}
