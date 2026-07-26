"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EducatorDashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [token, setToken] = useState('');
  const [inviteEmail, setInviteEmail] = useState<{ [key: string]: string }>({});

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

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
          <div style={{ padding: '12px 16px', background: 'rgba(56, 189, 248, 0.15)', borderLeft: '4px solid var(--primary)', borderRadius: '0 8px 8px 0', color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer' }}>
            📚 My Courses
          </div>
          <div style={{ padding: '12px 16px', color: 'var(--text-muted)', cursor: 'pointer' }} className="hover:text-white">👥 Students</div>
          <div style={{ padding: '12px 16px', color: 'var(--text-muted)', cursor: 'pointer' }} className="hover:text-white">📊 Analytics</div>
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
              <div onClick={() => window.location.href = '/course.html'} style={{ height: '180px', background: 'linear-gradient(45deg, #0f766e, #10b981)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                 <div style={{ fontSize: '4rem' }}>📊</div>
                 <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.5)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>Published</div>
              </div>
              
              <div style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>{course.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px', lineHeight: 1.5 }}>
                  {course.description}
                </p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)', padding: '16px 0', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>👥 {course.enrollments?.length || 0} enrolled</span>
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
                    />
                    <button 
                      onClick={() => handleInvite(course.id)}
                      className="btn-primary" 
                      style={{ padding: '8px 16px' }}
                    >
                      Connect
                    </button>
                  </div>
                </div>

                {course.enrollments && course.enrollments.filter((e: any) => e.status === 'PENDING').length > 0 && (
                  <div style={{ background: 'rgba(255, 165, 0, 0.1)', borderRadius: '8px', padding: '16px', marginBottom: '16px', border: '1px solid rgba(255, 165, 0, 0.3)' }}>
                    <p style={{ fontSize: '0.9rem', color: '#fbbf24', marginBottom: '12px', fontWeight: 600 }}>Pending Approvals:</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '150px', overflowY: 'auto' }}>
                      {course.enrollments.filter((e: any) => e.status === 'PENDING').map((e: any) => (
                        <div key={e.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 'bold', color: '#000' }}>
                              {e.user?.name ? e.user.name.charAt(0).toUpperCase() : 'S'}
                            </div>
                            <div>
                              <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{e.user?.name || 'Unnamed Student'}</div>
                              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{e.user?.email}</div>
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={(event) => { event.stopPropagation(); handleApprove(course.id, e.user.id, 'APPROVE'); }} style={{ background: '#10b981', border: 'none', color: '#fff', padding: '4px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>Approve</button>
                            <button onClick={(event) => { event.stopPropagation(); handleApprove(course.id, e.user.id, 'REJECT'); }} style={{ background: 'transparent', border: '1px solid #ff8a8a', color: '#ff8a8a', padding: '4px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>Reject</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {course.enrollments && course.enrollments.filter((e: any) => e.status === 'APPROVED').length > 0 && (
                  <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '16px' }}>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '12px', fontWeight: 600 }}>Enrolled Students:</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '150px', overflowY: 'auto' }}>
                      {course.enrollments.filter((e: any) => e.status === 'APPROVED').map((e: any) => (
                        <div key={e.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 'bold' }}>
                              {e.user?.name ? e.user.name.charAt(0).toUpperCase() : 'S'}
                            </div>
                            <div>
                              <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{e.user?.name || 'Unnamed Student'}</div>
                              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{e.user?.email}</div>
                            </div>
                          </div>
                          <button 
                            onClick={(event) => {
                              event.stopPropagation();
                              handleRemove(course.id, e.user.id);
                            }} 
                            style={{ background: 'transparent', border: 'none', color: '#ff8a8a', cursor: 'pointer', fontSize: '0.85rem' }}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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
