"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EducatorStudentsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
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
    if (res.ok) fetchCourses(token);
    else {
      const data = await res.json();
      alert("Error: " + data.error);
    }
  };

  const handleDelete = async (courseId: string, studentId: string, studentName?: string) => {
    if (!confirm(`Are you sure you want to permanently delete ${studentName || 'this student'} and all their records without trace? This cannot be undone.`)) return;
    const res = await fetch('/api/courses/educator/delete-student', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ courseId, studentId })
    });
    if (res.ok) fetchCourses(token);
    else {
      const data = await res.json();
      alert("Error: " + data.error);
    }
  };

  const exportCourseCSV = (course: any) => {
    if (!course.enrollments || course.enrollments.length === 0) {
      alert("No students enrolled in this course to export.");
      return;
    }

    const headers = [
      "Student Name",
      "Email / Account",
      "Enrollment Status",
      "Current Slide",
      "Slide 16 Final Score",
      "Range Formula Used",
      "Submission Date",
      "Last Active"
    ];

    const rows = course.enrollments.map((e: any) => {
      let details: any = {};
      if (e.gameDetails) {
        try { details = JSON.parse(e.gameDetails); } catch (err) {}
      }

      const scoreText = (e.gameScore !== null && e.gameScore !== undefined) ? e.gameScore.toString() : "Not Completed";
      const formulaText = details.formula || (details.range1 ? `=SUM(${details.range1}) - SUM(${details.range2})` : "-");
      const submittedDate = details.submittedAt ? new Date(details.submittedAt).toLocaleString() : "-";
      const lastSeen = e.lastSeenAt ? new Date(e.lastSeenAt).toLocaleString() : "-";
      const slideNum = (typeof e.currentSlide === 'number') ? (e.currentSlide + 1).toString() : "1";

      return [
        `"${(e.user?.name || 'Unnamed').replace(/"/g, '""')}"`,
        `"${(e.user?.email || e.user?.studentId || '-').replace(/"/g, '""')}"`,
        `"${e.status}"`,
        `"Slide ${slideNum}"`,
        `"${scoreText}"`,
        `"${formulaText.replace(/"/g, '""')}"`,
        `"${submittedDate}"`,
        `"${lastSeen}"`
      ].join(",");
    });

    const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const safeTitle = (course.title || "Course").replace(/[^a-zA-Z0-9_\u4e00-\u9fa5]/g, "_");
    link.setAttribute("href", url);
    link.setAttribute("download", `${safeTitle}_Student_Scores_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!mounted) return null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--background)' }}>
      <div className="bg-blob bg-blob-1" style={{ opacity: 0.3 }} />
      <div className="bg-blob bg-blob-2" style={{ opacity: 0.2, right: '20%' }} />

      <aside className="glass-panel" style={{ width: '280px', margin: '24px', padding: '32px 24px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', borderRadius: '8px' }} />
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Interlectic</h2>
        </div>

        {user && (
          <div style={{ marginBottom: '32px', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Welcome back,</p>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '8px' }}>Educator {user.name}</h3>
            <div style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(168, 85, 247, 0.15)', borderRadius: '20px', color: '#c084fc', fontSize: '0.85rem', fontWeight: 700, border: '1px solid rgba(168, 85, 247, 0.3)' }}>
              {user.tokens || 0} Tokens
            </div>
          </div>
        )}

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
          <div onClick={() => router.push('/dashboard')} style={{ padding: '12px 16px', color: 'var(--text-muted)', cursor: 'pointer', borderRadius: '8px' }} className="hover:text-white">
            My Courses
          </div>
          <div style={{ padding: '12px 16px', background: 'rgba(56, 189, 248, 0.15)', borderLeft: '4px solid var(--primary)', borderRadius: '0 8px 8px 0', color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer' }}>
            Students
          </div>
          <div onClick={() => router.push('/analytics')} style={{ padding: '12px 16px', color: 'var(--text-muted)', cursor: 'pointer', borderRadius: '8px' }} className="hover:text-white">
            Analytics
          </div>
          <div onClick={() => router.push('/marketplace')} style={{ padding: '12px 16px', color: 'var(--text-muted)', cursor: 'pointer', borderRadius: '8px' }} className="hover:text-white">
            Marketplace
          </div>
          <div onClick={() => router.push('/tokens')} style={{ padding: '12px 16px', color: 'var(--text-muted)', cursor: 'pointer', borderRadius: '8px' }} className="hover:text-white">
            Buy Tokens
          </div>
          <div onClick={() => router.push('/teacher-marketplace')} style={{ padding: '12px 16px', color: 'var(--text-muted)', cursor: 'pointer', borderRadius: '8px' }} className="hover:text-white">
            Educator Shop
          </div>
          <div onClick={() => router.push('/custom-course')} style={{ padding: '12px 16px', color: '#38bdf8', cursor: 'pointer', borderRadius: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', background: '#38bdf8', borderRadius: '50%', boxShadow: '0 0 10px #38bdf8' }}></span>
            Custom Order
          </div>
          <div onClick={() => router.push('/settings')} style={{ padding: '12px 16px', color: 'var(--text-muted)', cursor: 'pointer', borderRadius: '8px' }} className="hover:text-white">
            Settings
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
        <header style={{ marginBottom: '36px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Student Management & Gradebook</h1>
          <p style={{ color: 'var(--text-muted)' }}>Track student learning progress, game scores, and export reports to CSV.</p>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {courses.map(course => (
            <div key={course.id} className="glass-panel animate-fade-in-up" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--glass-border)', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', margin: '0 0 4px 0', color: course.isArchived ? 'var(--text-muted)' : 'var(--text-main)' }}>{course.title} {course.isArchived && '(Archived)'}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
                    {course.enrollments?.length || 0} Total Students Enrolled
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button 
                    onClick={() => window.open(`/dashboard/gradebook-sheet?courseId=${course.id}`, '_blank')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                      color: '#ffffff',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 2px 10px rgba(2, 132, 199, 0.3)'
                    }}
                    className="hover:scale-105 transition-all"
                    title="Open Excel Spreadsheet view in new tab"
                  >
                    <span>📊</span>
                    <span>Open HTML Sheet</span>
                  </button>

                  <button 
                    onClick={() => exportCourseCSV(course)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      color: '#ffffff',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 2px 10px rgba(16, 185, 129, 0.3)'
                    }}
                    className="hover:scale-105 transition-all"
                  >
                    <span>📥</span>
                    <span>Export CSV Report</span>
                  </button>
                </div>
              </div>
              
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '12px 8px' }}>Student</th>
                      <th style={{ padding: '12px 8px' }}>Email / ID</th>
                      <th style={{ padding: '12px 8px' }}>Status</th>
                      <th style={{ padding: '12px 8px' }}>Slide 16 Final Score</th>
                      <th style={{ padding: '12px 8px' }}>Range Formula</th>
                      <th style={{ padding: '12px 8px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {course.enrollments && course.enrollments.map((e: any) => {
                      let details: any = {};
                      if (e.gameDetails) {
                        try { details = JSON.parse(e.gameDetails); } catch (err) {}
                      }
                      const hasScore = (e.gameScore !== null && e.gameScore !== undefined);

                      return (
                        <tr key={e.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <td style={{ padding: '12px 8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: e.status === 'PENDING' ? '#fbbf24' : (e.status === 'REMOVED' ? '#ef4444' : 'var(--primary)'), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 'bold', color: e.status === 'PENDING' ? '#000' : '#fff' }}>
                              {e.user?.name ? e.user.name.charAt(0).toUpperCase() : 'S'}
                            </div>
                            <span style={{ fontWeight: 600 }}>{e.user?.name || 'Unnamed'}</span>
                          </td>
                          <td style={{ padding: '12px 8px', color: 'var(--text-muted)' }}>{e.user?.email || e.user?.studentId || '-'}</td>
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
                            {hasScore ? (
                              <span style={{
                                padding: '4px 10px',
                                borderRadius: '12px',
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                fontFamily: 'monospace',
                                background: e.gameScore >= 0 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                color: e.gameScore >= 0 ? '#34d399' : '#f87171',
                                border: `1px solid ${e.gameScore >= 0 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
                              }}>
                                {e.gameScore >= 0 ? `+${e.gameScore} pts` : `${e.gameScore} pts`}
                              </span>
                            ) : (
                              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontStyle: 'italic' }}>Pending</span>
                            )}
                          </td>
                          <td style={{ padding: '12px 8px', fontFamily: 'monospace', fontSize: '0.8rem', color: '#38bdf8' }}>
                            {details.formula || (details.range1 ? `=SUM(${details.range1}) - SUM(${details.range2})` : '-')}
                          </td>
                          <td style={{ padding: '12px 8px' }}>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                              {e.status === 'PENDING' && (
                                <>
                                  <button onClick={() => handleApprove(course.id, e.user.id, 'APPROVE')} style={{ background: '#10b981', border: 'none', color: '#fff', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Approve</button>
                                  <button onClick={() => handleApprove(course.id, e.user.id, 'REJECT')} style={{ background: 'transparent', border: '1px solid #ff8a8a', color: '#ff8a8a', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Reject</button>
                                </>
                              )}
                              {e.status === 'APPROVED' && (
                                <button onClick={() => handleRemove(course.id, e.user.id)} style={{ background: 'transparent', border: '1px solid #fbbf24', color: '#fbbf24', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Remove</button>
                              )}
                              {e.status === 'REMOVED' && !course.isArchived && (
                                <button onClick={() => handleApprove(course.id, e.user.id, 'APPROVE')} style={{ background: 'transparent', border: '1px solid #10b981', color: '#10b981', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Restore</button>
                              )}
                              <button onClick={() => handleDelete(course.id, e.user.id, e.user?.name)} title="Permanently delete without trace" style={{ background: '#dc2626', border: 'none', color: '#fff', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>Delete</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {(!course.enrollments || course.enrollments.length === 0) && (
                      <tr>
                        <td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>No students enrolled in this course yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
          {courses.length === 0 && (
            <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>
              You don't have any courses yet. Go to My Courses to create one!
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
