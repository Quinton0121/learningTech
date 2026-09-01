"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function GradebookSheetPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const courseId = searchParams.get('courseId');

  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: string }>({ row: 1, col: 'A' });
  const [cellValue, setCellValue] = useState('Student Number');

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

  // Calculate summary stats
  const validScores = enrollments
    .map((e: any) => e.gameScore)
    .filter((s: any) => typeof s === 'number');
  const avgScore = validScores.length > 0 ? (validScores.reduce((a: number, b: number) => a + b, 0) / validScores.length).toFixed(1) : '-';
  const maxScore = validScores.length > 0 ? Math.max(...validScores) : '-';
  const minScore = validScores.length > 0 ? Math.min(...validScores) : '-';

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#1e293b] text-white">
        <div className="flex items-center gap-3 text-lg font-semibold">
          <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          Loading Excel Gradebook Sheet...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col font-sans select-none">
      {/* Excel Title Bar */}
      <header className="bg-[#107c41] text-white px-4 py-2 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="bg-white text-[#107c41] font-black text-sm px-2 py-0.5 rounded shadow">
            XLS
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-wide flex items-center gap-2">
              <span>{course?.title || 'Excel Course'} - Slide 16 Score Sheet.xlsx</span>
              <span className="bg-emerald-800 text-[10px] uppercase px-1.5 py-0.2 rounded font-mono">AutoSaved</span>
            </h1>
            <p className="text-[11px] text-emerald-100 opacity-90">Live Teacher Gradebook · Slide 16 Final Scores</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => window.print()} 
            className="bg-emerald-800 hover:bg-emerald-700 text-xs px-3 py-1.5 rounded text-white font-medium flex items-center gap-1.5 transition-colors shadow"
          >
            <span>🖨️</span> Print / PDF
          </button>
          <button 
            onClick={() => window.close()} 
            className="bg-slate-800 hover:bg-slate-700 text-xs px-3 py-1.5 rounded text-white font-medium transition-colors border border-slate-700"
          >
            Close Tab
          </button>
        </div>
      </header>

      {/* Excel Formula Bar */}
      <div className="bg-slate-900 border-b border-slate-700 px-4 py-1.5 flex items-center gap-3 text-xs">
        <div className="bg-slate-800 border border-slate-700 px-2.5 py-1 rounded font-mono font-bold text-emerald-400 w-16 text-center shadow-inner">
          {selectedCell.col}{selectedCell.row}
        </div>
        <span className="font-serif italic font-bold text-slate-400 text-sm">fx</span>
        <div className="flex-1 bg-slate-950 border border-slate-700 rounded px-3 py-1 font-mono text-slate-200 shadow-inner overflow-hidden text-ellipsis whitespace-nowrap">
          {cellValue}
        </div>
      </div>

      {/* Excel Quick Stats Ribbon */}
      <div className="bg-slate-800/80 border-b border-slate-700 px-6 py-2 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Total Students:</span>
            <span className="bg-slate-900 px-2 py-0.5 rounded font-mono font-bold text-white border border-slate-700">{enrollments.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Class Average:</span>
            <span className="bg-slate-900 px-2 py-0.5 rounded font-mono font-bold text-emerald-400 border border-slate-700">{avgScore} pts</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Highest Score:</span>
            <span className="bg-slate-900 px-2 py-0.5 rounded font-mono font-bold text-amber-400 border border-slate-700">{maxScore} pts</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Lowest Score:</span>
            <span className="bg-slate-900 px-2 py-0.5 rounded font-mono font-bold text-rose-400 border border-slate-700">{minScore} pts</span>
          </div>
        </div>
        <div className="text-[11px] text-slate-400 italic">
          Click any cell to inspect value in formula bar
        </div>
      </div>

      {/* Main Excel Spreadsheet Grid */}
      <div className="flex-1 overflow-auto p-4 bg-[#090d16]">
        <div className="inline-block min-w-full bg-slate-900 border border-slate-700 rounded-lg shadow-2xl overflow-hidden">
          <table className="border-collapse w-full text-xs font-mono">
            {/* Column Headers (A, B) */}
            <thead>
              <tr className="bg-[#1e293b] text-slate-400 text-center font-bold border-b border-slate-700">
                <th className="w-12 py-2 border-r border-slate-700 bg-slate-800/80 text-[10px] text-slate-500 font-normal">#</th>
                <th className="w-1/2 py-2.5 px-4 border-r border-slate-700 text-emerald-400 tracking-wider">
                  A
                </th>
                <th className="w-1/2 py-2.5 px-4 text-emerald-400 tracking-wider">
                  B
                </th>
              </tr>
              {/* Row 1: Field Names */}
              <tr className="bg-slate-800/90 text-slate-200 font-bold border-b border-slate-700">
                <td className="text-center py-2 bg-slate-800 text-[10px] text-slate-500 font-normal border-r border-slate-700">1</td>
                <td 
                  onClick={() => { setSelectedCell({ row: 1, col: 'A' }); setCellValue('Student Number / ID'); }}
                  className={`py-2.5 px-4 border-r border-slate-700 cursor-pointer font-bold text-white uppercase tracking-wider ${selectedCell.row === 1 && selectedCell.col === 'A' ? 'ring-2 ring-emerald-400 bg-emerald-950/40' : 'hover:bg-slate-700/50'}`}
                >
                  Student Number / ID
                </td>
                <td 
                  onClick={() => { setSelectedCell({ row: 1, col: 'B' }); setCellValue('Slide 16 Final Score'); }}
                  className={`py-2.5 px-4 cursor-pointer font-bold text-white uppercase tracking-wider ${selectedCell.row === 1 && selectedCell.col === 'B' ? 'ring-2 ring-emerald-400 bg-emerald-950/40' : 'hover:bg-slate-700/50'}`}
                >
                  Slide 16 Final Score
                </td>
              </tr>
            </thead>

            {/* Student Score Rows (2, 3, 4...) */}
            <tbody>
              {enrollments.map((e: any, idx: number) => {
                const rowNum = idx + 2;
                const studentIdStr = e.user?.studentId || e.user?.email || e.user?.name || `Student-${idx + 1}`;
                const studentDisplayName = e.user?.name ? `${studentIdStr} (${e.user.name})` : studentIdStr;
                const hasScore = (e.gameScore !== null && e.gameScore !== undefined);
                const scoreDisplay = hasScore ? (e.gameScore >= 0 ? `+${e.gameScore}` : `${e.gameScore}`) : 'Pending';

                let details: any = {};
                if (e.gameDetails) {
                  try { details = JSON.parse(e.gameDetails); } catch (err) {}
                }
                const formulaText = details.formula || (details.range1 ? `=SUM(${details.range1}) - SUM(${details.range2})` : scoreDisplay);

                return (
                  <tr key={e.id} className="border-b border-slate-800 hover:bg-slate-800/40 transition-colors">
                    {/* Row Index */}
                    <td className="text-center py-2.5 bg-slate-800/70 text-[10px] text-slate-500 font-normal border-r border-slate-700">
                      {rowNum}
                    </td>

                    {/* Column A: Student Number */}
                    <td 
                      onClick={() => { setSelectedCell({ row: rowNum, col: 'A' }); setCellValue(studentDisplayName); }}
                      className={`py-2.5 px-4 border-r border-slate-800 cursor-pointer font-sans font-medium text-slate-200 ${selectedCell.row === rowNum && selectedCell.col === 'A' ? 'ring-2 ring-emerald-400 bg-emerald-950/40' : ''}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="font-mono font-bold text-cyan-300">{studentIdStr}</span>
                        {e.user?.name && <span className="text-slate-400 font-sans text-xs">({e.user.name})</span>}
                      </div>
                    </td>

                    {/* Column B: Slide 16 Final Score */}
                    <td 
                      onClick={() => { setSelectedCell({ row: rowNum, col: 'B' }); setCellValue(formulaText); }}
                      className={`py-2.5 px-4 cursor-pointer font-mono font-bold ${selectedCell.row === rowNum && selectedCell.col === 'B' ? 'ring-2 ring-emerald-400 bg-emerald-950/40' : ''}`}
                    >
                      {hasScore ? (
                        <div className="flex items-center justify-between">
                          <span className={e.gameScore >= 0 ? 'text-emerald-400 text-sm' : 'text-rose-400 text-sm'}>
                            {scoreDisplay} pts
                          </span>
                          {details.formula && (
                            <span className="text-[10px] text-slate-500 font-normal bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
                              {details.formula}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-500 italic font-normal text-xs">Pending Completion</span>
                      )}
                    </td>
                  </tr>
                );
              })}

              {enrollments.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-slate-500 italic font-sans">
                    No student enrollments found in this course yet.
                  </td>
                </tr>
              )}

              {/* Summary / Formula Row */}
              {enrollments.length > 0 && (
                <tr className="bg-slate-800/80 font-bold border-t-2 border-slate-600 text-slate-200">
                  <td className="text-center py-2.5 bg-slate-800 text-[10px] text-slate-400 font-normal border-r border-slate-700">
                    {enrollments.length + 2}
                  </td>
                  <td 
                    onClick={() => { setSelectedCell({ row: enrollments.length + 2, col: 'A' }); setCellValue(`=COUNTA(A2:A${enrollments.length + 1})`); }}
                    className={`py-2.5 px-4 border-r border-slate-700 cursor-pointer font-bold text-amber-300 uppercase text-xs ${selectedCell.row === enrollments.length + 2 && selectedCell.col === 'A' ? 'ring-2 ring-emerald-400 bg-emerald-950/40' : ''}`}
                  >
                    AVERAGE CLASS SCORE:
                  </td>
                  <td 
                    onClick={() => { setSelectedCell({ row: enrollments.length + 2, col: 'B' }); setCellValue(`=AVERAGE(B2:B${enrollments.length + 1})`); }}
                    className={`py-2.5 px-4 cursor-pointer font-mono font-extrabold text-sm text-emerald-400 ${selectedCell.row === enrollments.length + 2 && selectedCell.col === 'B' ? 'ring-2 ring-emerald-400 bg-emerald-950/40' : ''}`}
                  >
                    {avgScore} pts
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Excel Status Bar Footer */}
      <footer className="bg-[#107c41] text-white px-4 py-1 flex items-center justify-between text-[11px] font-sans shadow-inner">
        <div className="flex items-center gap-3">
          <span className="font-bold">READY</span>
          <span>Sheet1</span>
        </div>
        <div className="flex items-center gap-4 text-emerald-100 font-mono">
          <span>COUNT: {enrollments.length}</span>
          <span>AVERAGE: {avgScore}</span>
          <span>MAX: {maxScore}</span>
        </div>
      </footer>
    </div>
  );
}
