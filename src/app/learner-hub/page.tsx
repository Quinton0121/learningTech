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

  useEffect(() => {
    setMounted(true);
    const t = localStorage.getItem('token');
    if (!t) {
      router.push('/');
      return;
    }
    setToken(t);
    
    // Auto-Logout Polling: Check if class is still active
    const interval = setInterval(() => {
      fetch('/api/auth/status', {
        headers: { 'Authorization': `Bearer ${t}` }
      })
      .then(r => r.json())
      .then(data => {
        if (!data.active) {
          localStorage.removeItem('token');
          window.location.href = '/'; // Force refresh
        }
      })
      .catch(e => console.error(e));
    }, 5000);
    
    // Fetch enrollments
    fetch('/api/courses/my-courses', {
      headers: { 'Authorization': `Bearer ${t}` }
    }).then(r => r.json()).then(data => {
      if (data.enrollments) setEnrollments(data.enrollments);
      if (data.user) setUser(data.user);
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

  if (!mounted) return null;

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
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>EduSphere Hub</h2>
        </div>

        {user && (
          <div style={{ marginBottom: '32px', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Logged in as</p>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--primary)' }}>{user.name}</h3>
            {user.studentId && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>ID: {user.studentId}</p>}
          </div>
        )}

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button className="btn-secondary" style={{ width: '100%', fontSize: '0.9rem', color: 'var(--text-main)', border: '1px solid var(--glass-border)' }} onClick={() => router.push('/settings')}>
            ⚙️ Settings
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
                onClick={() => window.location.href = '/course.html'} 
                className="glass-panel animate-fade-in-up floating-element" 
                style={{ overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.3s' }}
              >
                <div style={{ height: '180px', background: 'linear-gradient(45deg, #0f766e, #10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <div style={{ fontSize: '4rem' }}>📊</div>
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
    </div>
  );
}
