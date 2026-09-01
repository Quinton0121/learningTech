"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function GradebookSheetContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const courseId = searchParams.get('courseId');

  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Home');
  const [selectedCell, setSelectedCell] = useState<{ col: string; row: number }>({ col: 'A', row: 1 });
  const [cellFormula, setCellFormula] = useState('Student Number');
  const [zoomLevel, setZoomLevel] = useState(100);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }

    async function fetchGradebook() {
      try {
        const res = await fetch('/api/courses/educator', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          const targetCourse = (data.courses || []).find((c: any) => c.id === courseId) || data.courses?.[0];
          setCourse(targetCourse);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchGradebook();
  }, [courseId, router]);

  const enrollments = course?.enrollments || [];

  // Generate blank columns C through L to give realistic Excel width
  const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];
  const totalRows = Math.max(30, enrollments.length + 15);

  // Compute live stats for status bar
  const validScores = enrollments
    .map((e: any) => e.gameScore)
    .filter((s: any) => typeof s === 'number');
  const sumScore = validScores.reduce((a: number, b: number) => a + b, 0);
  const avgScore = validScores.length > 0 ? (sumScore / validScores.length).toFixed(1) : '0';
  const countScore = enrollments.length;

  const handleCellClick = (col: string, row: number, value: string) => {
    setSelectedCell({ col, row });
    setCellFormula(value);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f3f4f6', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
        <div style={{ width: '48px', height: '48px', border: '4px solid #107c41', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <p style={{ marginTop: '16px', color: '#107c41', fontWeight: 600, fontSize: '1.1rem' }}>Starting Microsoft Excel...</p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const courseTitle = course?.title || 'Class Gradebook';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', background: '#ffffff', fontFamily: '"Segoe UI", Tahoma, sans-serif', color: '#242424', overflow: 'hidden', userSelect: 'none' }}>
      
      {/* 1. TOP GREEN TITLE BAR */}
      <div style={{ background: '#107c41', color: '#ffffff', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', fontSize: '12px' }}>
        {/* Left: Quick Access Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* AutoSave Switch */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.15)', padding: '2px 8px', borderRadius: '12px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600 }}>AutoSave</span>
            <div style={{ width: '28px', height: '14px', background: '#ffffff', borderRadius: '10px', position: 'relative', cursor: 'pointer' }}>
              <div style={{ width: '10px', height: '10px', background: '#107c41', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px' }}></div>
            </div>
          </div>

          {/* Save Icon */}
          <button onClick={() => alert("Workbook saved to Interlectic Cloud.")} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '14px' }} title="Save (Ctrl+S)">
            💾
          </button>
          <button style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'default', fontSize: '14px' }} title="Undo (Ctrl+Z)">
            ↩
          </button>
          <button style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'default', fontSize: '14px' }} title="Redo (Ctrl+Y)">
            ↪
          </button>
        </div>

        {/* Center: File Name & Search Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontWeight: 600, fontSize: '13px', letterSpacing: '0.2px' }}>
            {courseTitle} - Slide 16 Scores.xlsx - Saved
          </span>
          <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.2)', borderRadius: '4px', padding: '3px 10px', width: '260px', color: '#fff' }}>
            <span style={{ fontSize: '12px', marginRight: '6px', opacity: 0.8 }}>🔍</span>
            <input 
              type="text" 
              placeholder="Search (Alt+Q)" 
              style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: '11px', width: '100%' }}
            />
          </div>
        </div>

        {/* Right: Window Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginRight: '12px' }}>
            <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#ffffff', color: '#107c41', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '11px' }}>
              T
            </div>
            <span style={{ fontSize: '11px', fontWeight: 600 }}>Teacher</span>
          </div>
          <button onClick={() => window.print()} style={{ background: 'rgba(0,0,0,0.2)', border: 'none', color: '#fff', padding: '4px 8px', borderRadius: '3px', cursor: 'pointer', fontSize: '11px', fontWeight: 600 }}>
            🖨️ Print
          </button>
          <button onClick={() => window.close()} style={{ background: 'none', border: 'none', color: '#fff', padding: '4px 8px', cursor: 'pointer', fontSize: '14px', lineHeight: 1 }}>
            ✕
          </button>
        </div>
      </div>

      {/* 2. EXCEL RIBBON TABS (File, Home, Insert, Page Layout...) */}
      <div style={{ background: '#f3f2f1', borderBottom: '1px solid #d1d1d1', display: 'flex', alignItems: 'center', paddingLeft: '8px', height: '30px', fontSize: '12px' }}>
        <button style={{ background: '#107c41', color: '#fff', border: 'none', padding: '0 16px', height: '100%', fontWeight: 600, cursor: 'pointer' }}>
          File
        </button>
        {['Home', 'Insert', 'Page Layout', 'Formulas', 'Data', 'Review', 'View', 'Help'].map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            style={{ 
              background: activeTab === tab ? '#ffffff' : 'transparent', 
              color: activeTab === tab ? '#107c41' : '#242424', 
              border: 'none', 
              borderBottom: activeTab === tab ? '3px solid #107c41' : '3px solid transparent',
              padding: '0 12px', 
              height: '100%', 
              fontWeight: activeTab === tab ? 700 : 500, 
              cursor: 'pointer',
              transition: 'all 0.1s'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 3. EXCEL RIBBON ACTION TOOLBAR */}
      <div style={{ background: '#ffffff', borderBottom: '1px solid #d1d1d1', height: '88px', display: 'flex', alignItems: 'center', padding: '4px 8px', fontSize: '11px', gap: '8px', overflowX: 'auto' }}>
        {/* Undo/Clipboard */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingRight: '8px', borderRight: '1px solid #e1dfdd', height: '100%' }}>
          <div style={{ fontSize: '20px', cursor: 'pointer' }}>📋</div>
          <span style={{ fontSize: '10px', color: '#605e5c', marginTop: '2px' }}>Paste</span>
        </div>

        {/* Font Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingRight: '8px', borderRight: '1px solid #e1dfdd', height: '100%', justifyContent: 'center' }}>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <select style={{ border: '1px solid #8a8886', padding: '2px 4px', fontSize: '11px', borderRadius: '2px', background: '#fff', width: '90px' }}>
              <option>Calibri</option>
              <option>Arial</option>
              <option>Segoe UI</option>
            </select>
            <select style={{ border: '1px solid #8a8886', padding: '2px 4px', fontSize: '11px', borderRadius: '2px', background: '#fff', width: '45px' }}>
              <option>11</option>
              <option>12</option>
              <option>14</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '2px' }}>
            <button style={{ fontWeight: 'bold', width: '22px', height: '22px', border: '1px solid #8a8886', background: '#f3f2f1', cursor: 'pointer', borderRadius: '2px' }}>B</button>
            <button style={{ fontStyle: 'italic', width: '22px', height: '22px', border: '1px solid transparent', background: 'transparent', cursor: 'pointer' }}>I</button>
            <button style={{ textDecoration: 'underline', width: '22px', height: '22px', border: '1px solid transparent', background: 'transparent', cursor: 'pointer' }}>U</button>
            <button style={{ width: '22px', height: '22px', border: '1px solid #8a8886', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Borders">田</button>
            <button style={{ width: '22px', height: '22px', border: '1px solid transparent', background: 'transparent', cursor: 'pointer' }} title="Fill Color">🎨</button>
          </div>
        </div>

        {/* Alignment */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingRight: '8px', borderRight: '1px solid #e1dfdd', height: '100%', justifyContent: 'center' }}>
          <div style={{ display: 'flex', gap: '2px' }}>
            <button style={{ width: '22px', height: '22px', border: '1px solid transparent', background: 'transparent', cursor: 'pointer' }}>≡</button>
            <button style={{ width: '22px', height: '22px', border: '1px solid #8a8886', background: '#f3f2f1', cursor: 'pointer' }}>▤</button>
            <button style={{ width: '22px', height: '22px', border: '1px solid transparent', background: 'transparent', cursor: 'pointer' }}>≣</button>
          </div>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <span style={{ fontSize: '10px', color: '#605e5c', border: '1px solid #8a8886', padding: '1px 4px', borderRadius: '2px', cursor: 'pointer' }}>Merge & Center</span>
          </div>
        </div>

        {/* Number Format */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingRight: '8px', borderRight: '1px solid #e1dfdd', height: '100%', justifyContent: 'center' }}>
          <select style={{ border: '1px solid #8a8886', padding: '2px 4px', fontSize: '11px', borderRadius: '2px', background: '#fff', width: '90px' }}>
            <option>General</option>
            <option>Number</option>
            <option>Currency</option>
          </select>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button style={{ border: '1px solid transparent', background: 'transparent', cursor: 'pointer', fontWeight: 'bold' }}>$</button>
            <button style={{ border: '1px solid transparent', background: 'transparent', cursor: 'pointer', fontWeight: 'bold' }}>%</button>
            <button style={{ border: '1px solid transparent', background: 'transparent', cursor: 'pointer', fontWeight: 'bold' }}>,</button>
            <button style={{ border: '1px solid transparent', background: 'transparent', cursor: 'pointer', fontSize: '10px' }}>.00</button>
          </div>
        </div>

        {/* Quick Excel Tools */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '8px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }} onClick={() => alert("AutoSum: =SUM(B2:B" + (enrollments.length + 1) + ")")}>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#107c41' }}>∑</span>
            <span style={{ fontSize: '10px', color: '#605e5c' }}>AutoSum</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }} onClick={() => window.print()}>
            <span style={{ fontSize: '18px' }}>📄</span>
            <span style={{ fontSize: '10px', color: '#605e5c' }}>Export PDF</span>
          </div>
        </div>
      </div>

      {/* 4. EXCEL FORMULA BAR */}
      <div style={{ background: '#ffffff', borderBottom: '1px solid #d1d1d1', height: '28px', display: 'flex', alignItems: 'center', padding: '0 8px', fontSize: '12px', gap: '6px' }}>
        {/* Name Box */}
        <div style={{ width: '65px', height: '22px', border: '1px solid #8a8886', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 6px', fontWeight: 600, fontSize: '11px', color: '#242424', background: '#fff' }}>
          <span>{selectedCell.col}{selectedCell.row}</span>
          <span style={{ fontSize: '9px', color: '#605e5c' }}>▼</span>
        </div>

        {/* fx Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '0 4px', color: '#8a8886' }}>
          <span style={{ cursor: 'pointer', fontSize: '11px' }}>✖</span>
          <span style={{ cursor: 'pointer', fontSize: '11px' }}>✔</span>
          <span style={{ fontStyle: 'italic', fontWeight: 'bold', fontFamily: 'serif', fontSize: '14px', color: '#107c41', cursor: 'pointer', marginLeft: '2px' }}>fx</span>
        </div>

        {/* Formula Input Box */}
        <div style={{ flex: 1, height: '22px', border: '1px solid #8a8886', borderRadius: '2px', display: 'flex', alignItems: 'center', padding: '0 8px', background: '#fff', fontSize: '12px', fontFamily: 'Segoe UI, sans-serif' }}>
          <input 
            type="text" 
            value={cellFormula} 
            onChange={(e) => setCellFormula(e.target.value)}
            style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent', fontSize: '12px', fontFamily: 'inherit', color: '#000' }}
          />
        </div>
      </div>

      {/* 5. EXCEL SPREADSHEET GRID */}
      <div style={{ flex: 1, overflow: 'auto', background: '#e1dfdd', position: 'relative' }}>
        <table style={{ borderCollapse: 'collapse', tableLayout: 'fixed', background: '#ffffff', fontSize: '11px', fontFamily: '"Segoe UI", Tahoma, sans-serif' }}>
          
          {/* COLUMN HEADER ROW (A, B, C, D, E...) */}
          <thead>
            <tr style={{ background: '#f3f2f1', height: '24px' }}>
              {/* Top-left corner box */}
              <th style={{ width: '40px', background: '#f3f2f1', borderRight: '1px solid #d4d4d4', borderBottom: '1px solid #d4d4d4', position: 'sticky', top: 0, left: 0, zIndex: 30 }}>
                <div style={{ width: '10px', height: '10px', borderBottom: '1px solid #8a8886', borderRight: '1px solid #8a8886', margin: 'auto' }}></div>
              </th>
              
              {/* Column A Header */}
              <th style={{ width: '260px', background: selectedCell.col === 'A' ? '#e2e8f0' : '#f3f2f1', borderRight: '1px solid #d4d4d4', borderBottom: '1px solid #d4d4d4', fontWeight: 600, color: selectedCell.col === 'A' ? '#107c41' : '#242424', position: 'sticky', top: 0, zIndex: 20, textAlign: 'center' }}>
                A
              </th>

              {/* Column B Header */}
              <th style={{ width: '220px', background: selectedCell.col === 'B' ? '#e2e8f0' : '#f3f2f1', borderRight: '1px solid #d4d4d4', borderBottom: '1px solid #d4d4d4', fontWeight: 600, color: selectedCell.col === 'B' ? '#107c41' : '#242424', position: 'sticky', top: 0, zIndex: 20, textAlign: 'center' }}>
                B
              </th>

              {/* Remaining Empty Columns (C to O) */}
              {columns.slice(2).map(col => (
                <th key={col} style={{ width: '100px', background: selectedCell.col === col ? '#e2e8f0' : '#f3f2f1', borderRight: '1px solid #d4d4d4', borderBottom: '1px solid #d4d4d4', fontWeight: 600, color: selectedCell.col === col ? '#107c41' : '#242424', position: 'sticky', top: 0, zIndex: 20, textAlign: 'center' }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          {/* GRID ROWS (1, 2, 3, 4, 5...) */}
          <tbody>
            {/* ROW 1: HEADERS IN SPREADSHEET */}
            <tr style={{ height: '22px' }}>
              <td style={{ width: '40px', background: selectedCell.row === 1 ? '#e2e8f0' : '#f3f2f1', borderRight: '1px solid #d4d4d4', borderBottom: '1px solid #d4d4d4', textAlign: 'center', fontWeight: 600, color: selectedCell.row === 1 ? '#107c41' : '#605e5c', position: 'sticky', left: 0, zIndex: 10 }}>
                1
              </td>
              
              {/* Cell A1 */}
              <td 
                onClick={() => handleCellClick('A', 1, 'Student Number')}
                style={{ 
                  borderRight: '1px solid #d4d4d4', 
                  borderBottom: '1px solid #d4d4d4', 
                  padding: '0 6px', 
                  fontWeight: 700, 
                  background: '#f8fafc',
                  outline: (selectedCell.col === 'A' && selectedCell.row === 1) ? '2px solid #107c41' : 'none',
                  outlineOffset: '-2px',
                  position: 'relative',
                  cursor: 'cell'
                }}
              >
                Student Number
                {selectedCell.col === 'A' && selectedCell.row === 1 && (
                  <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '5px', height: '5px', background: '#107c41', zIndex: 5 }}></div>
                )}
              </td>

              {/* Cell B1 */}
              <td 
                onClick={() => handleCellClick('B', 1, 'Slide 16 Final Score')}
                style={{ 
                  borderRight: '1px solid #d4d4d4', 
                  borderBottom: '1px solid #d4d4d4', 
                  padding: '0 6px', 
                  fontWeight: 700, 
                  background: '#f8fafc',
                  textAlign: 'right',
                  outline: (selectedCell.col === 'B' && selectedCell.row === 1) ? '2px solid #107c41' : 'none',
                  outlineOffset: '-2px',
                  position: 'relative',
                  cursor: 'cell'
                }}
              >
                Slide 16 Final Score
                {selectedCell.col === 'B' && selectedCell.row === 1 && (
                  <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '5px', height: '5px', background: '#107c41', zIndex: 5 }}></div>
                )}
              </td>

              {/* Row 1 Empty Cells */}
              {columns.slice(2).map(col => (
                <td 
                  key={col} 
                  onClick={() => handleCellClick(col, 1, '')}
                  style={{ 
                    borderRight: '1px solid #d4d4d4', 
                    borderBottom: '1px solid #d4d4d4', 
                    outline: (selectedCell.col === col && selectedCell.row === 1) ? '2px solid #107c41' : 'none',
                    outlineOffset: '-2px',
                    cursor: 'cell',
                    position: 'relative'
                  }}
                >
                  {selectedCell.col === col && selectedCell.row === 1 && (
                    <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '5px', height: '5px', background: '#107c41', zIndex: 5 }}></div>
                  )}
                </td>
              ))}
            </tr>

            {/* DATA ROWS: Student 1, Student 2, etc. */}
            {Array.from({ length: totalRows - 1 }).map((_, idx) => {
              const rowNum = idx + 2;
              const student = enrollments[idx];
              const studentId = student ? (student.user?.studentId || student.user?.email || student.user?.name || `Student ${idx + 1}`) : '';
              const scoreVal = (student && student.gameScore !== null && student.gameScore !== undefined) ? student.gameScore : '';

              let details: any = {};
              if (student && student.gameDetails) {
                try { details = JSON.parse(student.gameDetails); } catch (e) {}
              }
              const formulaVal = details.formula || (scoreVal !== '' ? `${scoreVal}` : '');

              return (
                <tr key={rowNum} style={{ height: '22px' }}>
                  {/* Row Number Header */}
                  <td style={{ width: '40px', background: selectedCell.row === rowNum ? '#e2e8f0' : '#f3f2f1', borderRight: '1px solid #d4d4d4', borderBottom: '1px solid #d4d4d4', textAlign: 'center', color: selectedCell.row === rowNum ? '#107c41' : '#605e5c', position: 'sticky', left: 0, zIndex: 10, fontWeight: selectedCell.row === rowNum ? 600 : 400 }}>
                    {rowNum}
                  </td>

                  {/* Column A Cell (Student Number) */}
                  <td 
                    onClick={() => handleCellClick('A', rowNum, studentId)}
                    style={{ 
                      borderRight: '1px solid #d4d4d4', 
                      borderBottom: '1px solid #d4d4d4', 
                      padding: '0 6px',
                      background: '#ffffff',
                      outline: (selectedCell.col === 'A' && selectedCell.row === rowNum) ? '2px solid #107c41' : 'none',
                      outlineOffset: '-2px',
                      position: 'relative',
                      cursor: 'cell',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {studentId}
                    {selectedCell.col === 'A' && selectedCell.row === rowNum && (
                      <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '5px', height: '5px', background: '#107c41', zIndex: 5 }}></div>
                    )}
                  </td>

                  {/* Column B Cell (Slide 16 Final Score) */}
                  <td 
                    onClick={() => handleCellClick('B', rowNum, formulaVal)}
                    style={{ 
                      borderRight: '1px solid #d4d4d4', 
                      borderBottom: '1px solid #d4d4d4', 
                      padding: '0 6px',
                      background: '#ffffff',
                      textAlign: 'right',
                      fontFamily: '"Segoe UI", Tahoma, sans-serif',
                      fontWeight: scoreVal !== '' ? 600 : 400,
                      color: typeof scoreVal === 'number' ? (scoreVal >= 0 ? '#107c41' : '#d13438') : '#242424',
                      outline: (selectedCell.col === 'B' && selectedCell.row === rowNum) ? '2px solid #107c41' : 'none',
                      outlineOffset: '-2px',
                      position: 'relative',
                      cursor: 'cell'
                    }}
                  >
                    {scoreVal !== '' ? scoreVal : ''}
                    {selectedCell.col === 'B' && selectedCell.row === rowNum && (
                      <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '5px', height: '5px', background: '#107c41', zIndex: 5 }}></div>
                    )}
                  </td>

                  {/* Empty Columns (C to O) */}
                  {columns.slice(2).map(col => (
                    <td 
                      key={col} 
                      onClick={() => handleCellClick(col, rowNum, '')}
                      style={{ 
                        borderRight: '1px solid #d4d4d4', 
                        borderBottom: '1px solid #d4d4d4', 
                        background: '#ffffff',
                        outline: (selectedCell.col === col && selectedCell.row === rowNum) ? '2px solid #107c41' : 'none',
                        outlineOffset: '-2px',
                        cursor: 'cell',
                        position: 'relative'
                      }}
                    >
                      {selectedCell.col === col && selectedCell.row === rowNum && (
                        <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '5px', height: '5px', background: '#107c41', zIndex: 5 }}></div>
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 6. EXCEL SHEET TABS & BOTTOM STATUS BAR */}
      <div style={{ background: '#f3f2f1', borderTop: '1px solid #d1d1d1', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px', fontSize: '11px', color: '#605e5c' }}>
        
        {/* Left: Sheet Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <div style={{ padding: '0 6px', cursor: 'pointer', fontSize: '12px' }}>◀</div>
          <div style={{ padding: '0 6px', cursor: 'pointer', fontSize: '12px' }}>▶</div>
          <div style={{ 
            background: '#ffffff', 
            color: '#107c41', 
            fontWeight: 700, 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            padding: '0 16px', 
            borderTop: '2px solid #107c41', 
            borderRight: '1px solid #d1d1d1',
            borderLeft: '1px solid #d1d1d1',
            cursor: 'pointer' 
          }}>
            Sheet1
          </div>
          <div style={{ padding: '0 8px', cursor: 'pointer', fontSize: '14px', color: '#107c41', fontWeight: 'bold' }}>
            +
          </div>
        </div>

        {/* Right: Excel Live Calculation Stats & View Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '11px' }}>
          <span style={{ color: '#242424', fontWeight: 600 }}>Ready</span>
          <span>Average: <strong>{avgScore}</strong></span>
          <span>Count: <strong>{countScore}</strong></span>
          <span>Sum: <strong>{sumScore}</strong></span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', borderLeft: '1px solid #d1d1d1', paddingLeft: '12px' }}>
            <span style={{ cursor: 'pointer' }} title="Normal">⊞</span>
            <span style={{ cursor: 'pointer' }} title="Page Layout">⊟</span>
            <span style={{ cursor: 'pointer' }} title="Page Break Preview">▦</span>
            
            {/* Zoom Slider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '6px' }}>
              <span onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))} style={{ cursor: 'pointer', fontWeight: 'bold' }}>-</span>
              <input 
                type="range" 
                min="50" 
                max="200" 
                value={zoomLevel} 
                onChange={e => setZoomLevel(Number(e.target.value))}
                style={{ width: '70px', height: '4px', accentColor: '#107c41' }}
              />
              <span onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))} style={{ cursor: 'pointer', fontWeight: 'bold' }}>+</span>
              <span style={{ width: '35px', textAlign: 'right' }}>{zoomLevel}%</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function GradebookSheetPage() {
  return (
    <Suspense fallback={
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f3f4f6', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
        <div style={{ width: '48px', height: '48px', border: '4px solid #107c41', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <p style={{ marginTop: '16px', color: '#107c41', fontWeight: 600, fontSize: '1.1rem' }}>Starting Microsoft Excel...</p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    }>
      <GradebookSheetContent />
    </Suspense>
  );
}
