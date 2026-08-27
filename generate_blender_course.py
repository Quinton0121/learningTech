#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
import sqlite3

html_head = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Intro to 3D Navigation in Blender | BLENDER 4.5 BASICS</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <style>
        :root {
            --blender-orange: #ea7600;
            --blender-orange-light: #f58220;
            --axis-x: #e03131;
            --axis-y: #2f9e44;
            --axis-z: #1971c2;
            --bg-dark: #0f172a;
            --bg-panel: #1e293b;
            --bg-header: #090d16;
            --border-ui: #334155;
        }

        * {
            box-sizing: border-box;
            user-select: none;
        }

        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--bg-dark);
            color: #f8fafc;
            overflow: hidden;
            width: 100vw;
            height: 100vh;
            margin: 0;
        }

        .slide-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            transform: translateY(24px) scale(0.98);
            padding: 3.5rem 2rem 5.5rem 2rem;
            overflow-y: auto;
        }

        .slide-container.active {
            opacity: 1;
            pointer-events: auto;
            transform: translateY(0) scale(1);
        }

        .slide-container.previous {
            transform: translateY(-24px) scale(0.98);
        }

        .viewport-box {
            position: relative;
            background: radial-gradient(circle at center, #1e293b 0%, #0f172a 100%);
            border: 1px solid #334155;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 40px -15px rgba(0,0,0,0.6), inset 0 0 20px rgba(0,0,0,0.4);
        }

        .viewport-box canvas {
            display: block;
            width: 100%;
            height: 100%;
            outline: none;
        }

        .keycap {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(180deg, #334155 0%, #1e293b 100%);
            color: #f8fafc;
            border: 1px solid #475569;
            border-bottom: 3px solid #0f172a;
            border-radius: 6px;
            padding: 2px 8px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.85rem;
            font-weight: 700;
            box-shadow: 0 2px 4px rgba(0,0,0,0.4);
            white-space: nowrap;
        }

        .keycap-orange {
            background: linear-gradient(180deg, #f58220 0%, #ea7600 100%);
            border-color: #fb923c;
            border-bottom: 3px solid #9a3412;
            color: white;
        }

        .numpad-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 6px;
            background-color: #0f172a;
            padding: 12px;
            border-radius: 12px;
            border: 1px solid #334155;
            width: 220px;
        }

        .numpad-key {
            background: linear-gradient(180deg, #273549 0%, #1a2333 100%);
            border: 1px solid #3b4d66;
            border-bottom: 3px solid #0d131d;
            border-radius: 6px;
            height: 38px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #cbd5e1;
            font-family: 'JetBrains Mono', monospace;
            font-weight: 700;
            font-size: 0.85rem;
            cursor: pointer;
            transition: all 0.1s ease;
        }

        .numpad-key:hover {
            background: linear-gradient(180deg, #384c66 0%, #243247 100%);
            border-color: #60a5fa;
            color: white;
            transform: translateY(-1px);
        }

        .numpad-key:active, .numpad-key.active {
            transform: translateY(2px);
            border-bottom-width: 1px;
            background: #ea7600;
            color: white;
            border-color: #fdba74;
            box-shadow: 0 0 12px rgba(234, 118, 0, 0.6);
        }

        .pie-overlay {
            position: absolute;
            width: 260px;
            height: 260px;
            border-radius: 50%;
            background: rgba(15, 23, 42, 0.85);
            backdrop-filter: blur(12px);
            border: 2px solid rgba(234, 118, 0, 0.5);
            box-shadow: 0 0 30px rgba(0,0,0,0.8), 0 0 15px rgba(234, 118, 0, 0.3);
            pointer-events: none;
            z-index: 40;
            display: none;
            transform: translate(-50%, -50%);
        }

        .pie-item {
            position: absolute;
            background: #1e293b;
            border: 1px solid #475569;
            color: #f8fafc;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 700;
            cursor: pointer;
            pointer-events: auto;
            transform: translate(-50%, -50%);
            transition: all 0.15s ease;
            white-space: nowrap;
        }

        .pie-item:hover, .pie-item.highlight {
            background: #ea7600;
            color: white;
            border-color: #fdba74;
            transform: translate(-50%, -50%) scale(1.15);
            box-shadow: 0 0 15px rgba(234, 118, 0, 0.6);
        }

        .blender-gizmo {
            position: absolute;
            top: 16px;
            right: 16px;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: rgba(15, 23, 42, 0.75);
            border: 1px solid rgba(255,255,255,0.1);
            backdrop-filter: blur(4px);
            z-index: 20;
            cursor: grab;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .blender-gizmo:active {
            cursor: grabbing;
        }

        .nav-button-cluster {
            position: absolute;
            top: 104px;
            right: 26px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            z-index: 20;
        }

        .nav-circle-btn {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: rgba(30, 41, 59, 0.85);
            border: 1px solid #475569;
            color: #cbd5e1;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8rem;
            cursor: pointer;
            transition: all 0.2s ease;
            backdrop-filter: blur(4px);
        }

        .nav-circle-btn:hover {
            background: #ea7600;
            color: white;
            border-color: #f58220;
            transform: scale(1.1);
            box-shadow: 0 0 10px rgba(234, 118, 0, 0.5);
        }

        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #ea7600; }
    </style>
</head>
<body class="bg-slate-950 text-slate-100 flex flex-col justify-between">
"""

html_slides_1_to_6 = """
    <!-- Top Navigation & Progress Bar -->
    <header class="fixed top-0 left-0 w-full z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 py-3 flex items-center justify-between">
        <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-orange-600/30">
                <i class="fa-solid fa-cube"></i>
            </div>
            <div>
                <span class="font-bold text-sm tracking-wide text-white uppercase">Blender 4.5 Basics</span>
                <span class="text-xs text-slate-400 block -mt-0.5">Part 1: Intro to 3D Navigation</span>
            </div>
        </div>

        <div class="hidden md:flex items-center gap-2 bg-slate-800/80 px-4 py-1.5 rounded-full border border-slate-700 text-xs font-medium text-slate-300">
            <span id="header-step-badge" class="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 font-semibold">MODULE 1</span>
            <span id="header-step-title" class="text-slate-200">The 3D Viewport</span>
        </div>

        <div class="flex items-center gap-3">
            <button id="sound-btn" onclick="toggleAudio()" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition flex items-center gap-2" title="Toggle SFX">
                <i id="sound-icon" class="fa-solid fa-volume-high text-emerald-400"></i>
                <span class="hidden sm:inline">SFX</span>
            </button>
            <button id="voice-btn" onclick="toggleNarration()" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition flex items-center gap-2" title="Toggle Voice Narration">
                <i id="voice-icon" class="fa-solid fa-microphone-lines text-orange-400"></i>
                <span class="hidden sm:inline">Voice</span>
            </button>
            <button onclick="goToSlide(12)" class="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-orange-600/30">
                <i class="fa-solid fa-shapes"></i>
                <span>3D Sandbox</span>
            </button>
        </div>

        <div class="absolute bottom-0 left-0 w-full h-[3px] bg-slate-800">
            <div id="progress-bar" class="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-cyan-400 transition-all duration-300 w-0"></div>
        </div>
    </header>

    <!-- Subtitle HUD -->
    <div id="subtitle-hud" class="fixed top-16 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 border border-orange-500/40 px-6 py-2 rounded-full shadow-2xl backdrop-blur-md max-w-2xl text-center transition-all duration-300 opacity-0 pointer-events-none transform -translate-y-2">
        <span class="text-xs font-bold text-orange-400 uppercase tracking-widest mr-2"><i class="fa-solid fa-headphones mr-1"></i> Instructor:</span>
        <span id="subtitle-text" class="text-sm font-medium text-slate-200"></span>
    </div>

    <!-- SLIDE 1: Title -->
    <div class="slide-container active" id="slide-1" data-title="Welcome & 3D Space" data-badge="START" data-narration="Welcome to Blender 4.5 Basics! In this interactive course, you will master navigating the 3D viewport, which is your camera inside the infinite digital world.">
        <div class="flex flex-col items-center text-center max-w-4xl">
            <div class="relative mb-6">
                <div class="w-24 h-24 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-5xl text-white shadow-2xl shadow-orange-600/50 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <i class="fa-solid fa-cube"></i>
                </div>
                <div class="absolute -bottom-2 -right-2 bg-cyan-500 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    v4.5 LTS
                </div>
            </div>

            <div class="inline-block px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold mb-4 tracking-wider uppercase">
                CG Cookie Learning Series
            </div>

            <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-amber-300 to-cyan-400">
                Intro to 3D Navigation
            </h1>
            <p class="text-lg sm:text-xl text-slate-300 max-w-2xl mb-8 leading-relaxed">
                Step beyond flat 2D screens. Learn how to <span class="text-orange-400 font-semibold">Orbit</span>, <span class="text-cyan-400 font-semibold">Pan</span>, <span class="text-emerald-400 font-semibold">Zoom</span>, and effortlessly position your viewpoint anywhere in 3D space.
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mb-8">
                <div class="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-left flex items-start gap-3">
                    <div class="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 mt-0.5">
                        <i class="fa-solid fa-arrows-spin"></i>
                    </div>
                    <div>
                        <h4 class="font-bold text-sm text-slate-200">The 3 Movements</h4>
                        <p class="text-xs text-slate-400">Orbit, Pan & Zoom using middle mouse & hotkeys.</p>
                    </div>
                </div>

                <div class="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-left flex items-start gap-3">
                    <div class="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                        <i class="fa-solid fa-compass"></i>
                    </div>
                    <div>
                        <h4 class="font-bold text-sm text-slate-200">Gizmo & Numpad</h4>
                        <p class="text-xs text-slate-400">Instant orthogonal snapping with Top, Front & Side views.</p>
                    </div>
                </div>

                <div class="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-left flex items-start gap-3">
                    <div class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <i class="fa-solid fa-crosshairs"></i>
                    </div>
                    <div>
                        <h4 class="font-bold text-sm text-slate-200">Framing & Pie Menus</h4>
                        <p class="text-xs text-slate-400">Never get lost with Numpad Period & the Tilde Menu.</p>
                    </div>
                </div>
            </div>

            <button onclick="nextSlide()" class="px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-extrabold text-base transition-all transform hover:scale-105 shadow-xl shadow-orange-500/30 flex items-center gap-2">
                <span>Start Interactive Lesson</span>
                <i class="fa-solid fa-arrow-right"></i>
            </button>
            <span class="text-xs text-slate-500 mt-3 font-mono">Use Arrow Keys (← / →) or Spacebar to navigate</span>
        </div>
    </div>

    <!-- SLIDE 2: The 3D Coordinate System -->
    <div class="slide-container" id="slide-2" data-title="The 3 Axes (X, Y, Z)" data-badge="STEP 1: 3D SPACE" data-narration="In 2D we only have X and Y. In Blender 3D, we have three axes: Red X is left and right, Green Y is forward and back, and Blue Z is up and down.">
        <div class="flex flex-col lg:flex-row items-center gap-8 max-w-6xl w-full">
            <div class="flex-1 text-left">
                <div class="inline-block px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-orange-400 text-xs font-bold mb-3 tracking-wide uppercase">
                    Step 1: The Coordinate System
                </div>
                <h2 class="text-3xl sm:text-4xl font-extrabold mb-4">
                    The 3 Dimensions of Blender
                </h2>
                <p class="text-base text-slate-300 mb-6 leading-relaxed">
                    A flat sheet of paper has 2 dimensions: <strong>X</strong> (Width) and <strong>Y</strong> (Height). In Blender 3D, we add depth! Blender color-codes each axis so you can always orient yourself:
                </p>

                <div class="space-y-3 mb-6">
                    <div class="p-3.5 rounded-xl bg-slate-900 border border-red-500/40 flex items-center justify-between hover:bg-slate-800/80 transition cursor-pointer" onclick="highlightAxis('x')">
                        <div class="flex items-center gap-3">
                            <span class="w-6 h-6 rounded-md bg-red-600 text-white font-mono font-bold text-xs flex items-center justify-center">X</span>
                            <div>
                                <h4 class="font-bold text-sm text-red-400">X Axis (Red)</h4>
                                <p class="text-xs text-slate-400">Horizontal: Left & Right</p>
                            </div>
                        </div>
                        <span class="text-xs text-slate-500 font-mono">X: <span id="val-x">0.0</span></span>
                    </div>

                    <div class="p-3.5 rounded-xl bg-slate-900 border border-emerald-500/40 flex items-center justify-between hover:bg-slate-800/80 transition cursor-pointer" onclick="highlightAxis('y')">
                        <div class="flex items-center gap-3">
                            <span class="w-6 h-6 rounded-md bg-emerald-600 text-white font-mono font-bold text-xs flex items-center justify-center">Y</span>
                            <div>
                                <h4 class="font-bold text-sm text-emerald-400">Y Axis (Green)</h4>
                                <p class="text-xs text-slate-400">Depth: Forward & Backward (North/South)</p>
                            </div>
                        </div>
                        <span class="text-xs text-slate-500 font-mono">Y: <span id="val-y">0.0</span></span>
                    </div>

                    <div class="p-3.5 rounded-xl bg-slate-900 border border-blue-500/40 flex items-center justify-between hover:bg-slate-800/80 transition cursor-pointer" onclick="highlightAxis('z')">
                        <div class="flex items-center gap-3">
                            <span class="w-6 h-6 rounded-md bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center">Z</span>
                            <div>
                                <h4 class="font-bold text-sm text-blue-400">Z Axis (Blue)</h4>
                                <p class="text-xs text-slate-400">Vertical: Up & Down (Altitude / Height)</p>
                            </div>
                        </div>
                        <span class="text-xs text-slate-500 font-mono">Z: <span id="val-z">0.0</span></span>
                    </div>
                </div>

                <div class="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                    <label class="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Interactive Slider: Move the Test Sphere</label>
                    <div class="flex gap-4">
                        <div class="flex-1">
                            <span class="text-[10px] text-red-400 font-mono font-bold">X</span>
                            <input type="range" min="-3" max="3" step="0.1" value="0" id="slider-x" oninput="updateSlide2Position()" class="w-full accent-red-500">
                        </div>
                        <div class="flex-1">
                            <span class="text-[10px] text-emerald-400 font-mono font-bold">Y</span>
                            <input type="range" min="-3" max="3" step="0.1" value="0" id="slider-y" oninput="updateSlide2Position()" class="w-full accent-emerald-500">
                        </div>
                        <div class="flex-1">
                            <span class="text-[10px] text-blue-400 font-mono font-bold">Z</span>
                            <input type="range" min="-3" max="3" step="0.1" value="0" id="slider-z" oninput="updateSlide2Position()" class="w-full accent-blue-500">
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex-1 w-full flex flex-col items-center">
                <div class="viewport-box w-full h-[360px] sm:h-[400px] relative" id="canvas-container-s2">
                    <div class="absolute top-3 left-3 bg-slate-950/80 px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-400 border border-slate-800">
                        <i class="fa-solid fa-video text-orange-400 mr-1"></i> User Perspective
                    </div>
                </div>
                <p class="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
                    <i class="fa-solid fa-hand-pointer text-orange-400"></i> Click & drag in the viewport or use the sliders to test the 3 axes.
                </p>
            </div>
        </div>
    </div>

    <!-- SLIDE 3: Movement 1 - Orbit -->
    <div class="slide-container" id="slide-3" data-title="Orbiting the View" data-badge="STEP 2: ORBIT" data-narration="Orbiting rotates your camera around your scene. Hold down the Middle Mouse Button or scroll wheel and drag to orbit around your objects.">
        <div class="flex flex-col lg:flex-row items-center gap-8 max-w-6xl w-full">
            <div class="flex-1 text-left">
                <div class="inline-block px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-orange-400 text-xs font-bold mb-3 tracking-wide uppercase">
                    Step 2: Core Movement #1
                </div>
                <h2 class="text-3xl sm:text-4xl font-extrabold mb-4">
                    <span class="text-orange-400">Orbit</span>: Rotate Your View
                </h2>
                <p class="text-base text-slate-300 mb-6 leading-relaxed">
                    Orbiting rotates your viewpoint around whatever point in space you are focused on, like walking in a circle around a sculpture.
                </p>

                <div class="bg-slate-900 p-5 rounded-2xl border border-orange-500/30 mb-6 space-y-4">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-400 flex items-center justify-center text-xl shrink-0">
                            <i class="fa-solid fa-computer-mouse"></i>
                        </div>
                        <div>
                            <h4 class="font-bold text-sm text-slate-100">Primary Shortcut:</h4>
                            <div class="flex items-center gap-2 mt-1">
                                <span class="keycap keycap-orange">Middle Mouse Button (MMB)</span>
                                <span class="text-xs text-slate-400">+ Drag</span>
                            </div>
                        </div>
                    </div>

                    <div class="border-t border-slate-800 pt-3">
                        <h4 class="font-semibold text-xs text-slate-400 uppercase tracking-wider mb-2">Trackpad / Laptop Users:</h4>
                        <div class="flex items-center gap-2">
                            <span class="keycap">Alt</span>
                            <span class="text-slate-400 text-xs">+</span>
                            <span class="keycap">Left Click</span>
                            <span class="text-xs text-slate-400">+ Drag (with Emulate 3-Button Mouse)</span>
                        </div>
                    </div>
                </div>

                <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-xs font-bold text-slate-300 uppercase tracking-wide">Interactive Challenge:</span>
                        <span id="s3-status" class="text-xs font-bold text-amber-400">Orbit 360° around the Monkey</span>
                    </div>
                    <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div id="s3-progress" class="bg-orange-500 h-full w-0 transition-all duration-200"></div>
                    </div>
                </div>
            </div>

            <div class="flex-1 w-full flex flex-col items-center">
                <div class="viewport-box w-full h-[360px] sm:h-[400px] relative cursor-grab active:cursor-grabbing" id="canvas-container-s3">
                    <div class="absolute top-3 left-3 bg-slate-950/80 px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-400 border border-slate-800">
                        <i class="fa-solid fa-arrows-spin text-orange-400 mr-1"></i> Orbit Arena
                    </div>
                    <div class="absolute bottom-3 right-3 bg-slate-950/80 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 border border-slate-800 flex items-center gap-3">
                        <span>Rot X: <strong id="s3-rot-x" class="text-orange-400">0°</strong></span>
                        <span>Rot Y: <strong id="s3-rot-y" class="text-amber-400">0°</strong></span>
                    </div>
                </div>
                <p class="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
                    <i class="fa-solid fa-arrows-spin text-orange-400"></i> Click & drag with your mouse or finger to orbit around Suzanne!
                </p>
            </div>
        </div>
    </div>

    <!-- SLIDE 4: Movement 2 - Pan -->
    <div class="slide-container" id="slide-4" data-title="Panning the View" data-badge="STEP 3: PAN" data-narration="Panning slides your camera left, right, up, or down across the current view plane. Hold Shift and drag with the Middle Mouse Button.">
        <div class="flex flex-col lg:flex-row items-center gap-8 max-w-6xl w-full">
            <div class="flex-1 text-left">
                <div class="inline-block px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-cyan-400 text-xs font-bold mb-3 tracking-wide uppercase">
                    Step 3: Core Movement #2
                </div>
                <h2 class="text-3xl sm:text-4xl font-extrabold mb-4">
                    <span class="text-cyan-400">Pan</span>: Shift Your Camera Plane
                </h2>
                <p class="text-base text-slate-300 mb-6 leading-relaxed">
                    Panning moves your camera sideways or up and down without rotating the viewing angle. It is like sliding a window across a giant painting.
                </p>

                <div class="bg-slate-900 p-5 rounded-2xl border border-cyan-500/30 mb-6 space-y-4">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center text-xl shrink-0">
                            <i class="fa-solid fa-hand"></i>
                        </div>
                        <div>
                            <h4 class="font-bold text-sm text-slate-100">Primary Shortcut:</h4>
                            <div class="flex items-center gap-2 mt-1">
                                <span class="keycap">Shift</span>
                                <span class="text-xs text-slate-400">+</span>
                                <span class="keycap keycap-orange">MMB</span>
                                <span class="text-xs text-slate-400">+ Drag</span>
                            </div>
                        </div>
                    </div>

                    <div class="border-t border-slate-800 pt-3">
                        <h4 class="font-semibold text-xs text-slate-400 uppercase tracking-wider mb-2">On-Screen Tool:</h4>
                        <p class="text-xs text-slate-300 flex items-center gap-2">
                            <span class="w-5 h-5 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-xs"><i class="fa-solid fa-hand"></i></span>
                            Click and drag the <strong>Hand icon</strong> on the viewport navigation bar.
                        </p>
                    </div>
                </div>

                <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-xs font-bold text-slate-300 uppercase tracking-wide">Discovery Mission:</span>
                        <span id="s4-score" class="text-xs font-bold text-cyan-400">Found 0 of 3 Energy Crystals</span>
                    </div>
                    <p class="text-xs text-slate-400">Hold Shift and drag to pan around the scene and locate all 3 crystals.</p>
                </div>
            </div>

            <div class="flex-1 w-full flex flex-col items-center">
                <div class="viewport-box w-full h-[360px] sm:h-[400px] relative" id="canvas-container-s4">
                    <div class="absolute top-3 left-3 bg-slate-950/80 px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-400 border border-slate-800">
                        <i class="fa-solid fa-hand text-cyan-400 mr-1"></i> Pan & Seek Mission
                    </div>
                </div>
                <p class="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
                    <i class="fa-solid fa-arrows-up-down-left-right text-cyan-400"></i> Hold <kbd class="keycap text-[10px]">Shift</kbd> + Drag to pan across space.
                </p>
            </div>
        </div>
    </div>

    <!-- SLIDE 5: Movement 3 - Zoom -->
    <div class="slide-container" id="slide-5" data-title="Zooming the View" data-badge="STEP 4: ZOOM" data-narration="Zooming moves the camera closer or further from your focus. You can roll your scroll wheel for stepped zoom, or use Control plus Middle Mouse Button for silky smooth zooming.">
        <div class="flex flex-col lg:flex-row items-center gap-8 max-w-6xl w-full">
            <div class="flex-1 text-left">
                <div class="inline-block px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 text-xs font-bold mb-3 tracking-wide uppercase">
                    Step 4: Core Movement #3
                </div>
                <h2 class="text-3xl sm:text-4xl font-extrabold mb-4">
                    <span class="text-emerald-400">Zoom</span>: Moving In & Out
                </h2>
                <p class="text-base text-slate-300 mb-6 leading-relaxed">
                    Zooming changes your camera distance. Blender provides two ways: stepped notches with the wheel, and silky-smooth continuous dolly zoom.
                </p>

                <div class="space-y-3 mb-6">
                    <div class="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                        <div>
                            <h4 class="font-bold text-sm text-slate-100 flex items-center gap-2">
                                <i class="fa-solid fa-computer-mouse text-emerald-400"></i> Stepped Zoom (Standard)
                            </h4>
                            <p class="text-xs text-slate-400 mt-1">Roll the <strong>Scroll Wheel</strong> up or down.</p>
                        </div>
                        <span class="keycap">Scroll Wheel</span>
                    </div>

                    <div class="bg-slate-900 p-4 rounded-xl border border-emerald-500/40 flex items-center justify-between">
                        <div>
                            <h4 class="font-bold text-sm text-emerald-400 flex items-center gap-2">
                                <i class="fa-solid fa-wand-magic-sparkles"></i> Pro Smooth Zoom (Continuous)
                            </h4>
                            <p class="text-xs text-slate-400 mt-1">Hold <strong>Ctrl</strong> and drag up/down with <strong>MMB</strong> for pixel-perfect precision.</p>
                        </div>
                        <div class="flex items-center gap-1">
                            <span class="keycap">Ctrl</span>
                            <span class="text-xs text-slate-400">+</span>
                            <span class="keycap keycap-orange">MMB</span>
                        </div>
                    </div>
                </div>

                <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span class="text-xs font-bold text-slate-300 uppercase tracking-wide block mb-1">Microscope Inspection:</span>
                    <p class="text-xs text-slate-400 mb-2">Zoom closely into the cyber-sphere to read the secret serial number etched on its core!</p>
                    <div id="s5-secret" class="text-sm font-mono font-bold text-emerald-400 bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-center">
                        <i class="fa-solid fa-lock mr-2 text-slate-500"></i> [Zoom in to inspect core]
                    </div>
                </div>
            </div>

            <div class="flex-1 w-full flex flex-col items-center">
                <div class="viewport-box w-full h-[360px] sm:h-[400px] relative" id="canvas-container-s5">
                    <div class="absolute top-3 left-3 bg-slate-950/80 px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-400 border border-slate-800">
                        <i class="fa-solid fa-magnifying-glass text-emerald-400 mr-1"></i> Zoom Inspection
                    </div>
                    <div class="absolute bottom-3 right-3 bg-slate-950/80 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 border border-slate-800">
                        Camera Distance: <strong id="s5-dist" class="text-emerald-400">10.0m</strong>
                    </div>
                </div>
                <p class="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
                    <i class="fa-solid fa-magnifying-glass-plus text-emerald-400"></i> Use Scroll Wheel or <kbd class="keycap text-[10px]">Ctrl</kbd> + Drag to zoom.
                </p>
            </div>
        </div>
    </div>

    <!-- SLIDE 6: Viewport Gizmo -->
    <div class="slide-container" id="slide-6" data-title="Viewport Gizmo" data-badge="STEP 5: GIZMO" data-narration="The colorful 3D Navigation Gizmo in the top right allows you to click any axis to instantly snap your view, or click and drag anywhere to orbit without a mouse.">
        <div class="flex flex-col lg:flex-row items-center gap-8 max-w-6xl w-full">
            <div class="flex-1 text-left">
                <div class="inline-block px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-400 text-xs font-bold mb-3 tracking-wide uppercase">
                    Step 5: Visual Navigation
                </div>
                <h2 class="text-3xl sm:text-4xl font-extrabold mb-4">
                    The 3D Navigation <span class="text-amber-400">Gizmo</span>
                </h2>
                <p class="text-base text-slate-300 mb-6 leading-relaxed">
                    In the top-right corner of Blender's 3D viewport sits the Navigation cluster. It lets you manipulate your view entirely with point-and-click.
                </p>

                <div class="space-y-3 mb-6">
                    <div class="bg-slate-900 p-3.5 rounded-xl border border-slate-800 flex items-start gap-3">
                        <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 via-emerald-600 to-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
                            <i class="fa-solid fa-arrows-to-dot"></i>
                        </div>
                        <div>
                            <h4 class="font-bold text-sm text-slate-100">Colored Axis Balls (X, Y, Z)</h4>
                            <p class="text-xs text-slate-400">Click on <strong>X (Red)</strong>, <strong>Y (Green)</strong>, or <strong>Z (Blue)</strong> to snap instantly to that view. Click the opposite gray bubbles for -X, -Y, -Z!</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-3">
                        <div class="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center gap-2.5">
                            <span class="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs text-slate-300"><i class="fa-solid fa-magnifying-glass"></i></span>
                            <div>
                                <h5 class="font-bold text-xs text-slate-200">Zoom</h5>
                                <p class="text-[11px] text-slate-400">Click & drag to zoom</p>
                            </div>
                        </div>

                        <div class="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center gap-2.5">
                            <span class="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs text-slate-300"><i class="fa-solid fa-hand"></i></span>
                            <div>
                                <h5 class="font-bold text-xs text-slate-200">Pan</h5>
                                <p class="text-[11px] text-slate-400">Click & drag to pan</p>
                            </div>
                        </div>

                        <div class="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center gap-2.5">
                            <span class="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs text-slate-300"><i class="fa-solid fa-video"></i></span>
                            <div>
                                <h5 class="font-bold text-xs text-slate-200">Camera View</h5>
                                <p class="text-[11px] text-slate-400">Toggle camera (Num 0)</p>
                            </div>
                        </div>

                        <div class="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center gap-2.5">
                            <span class="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs text-slate-300"><i class="fa-solid fa-border-all"></i></span>
                            <div>
                                <h5 class="font-bold text-xs text-slate-200">Persp / Ortho</h5>
                                <p class="text-[11px] text-slate-400">Toggle grid (Num 5)</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="text-xs font-semibold text-amber-400 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
                    <i class="fa-solid fa-lightbulb mr-1.5"></i> Pro Tip: Click and drag anywhere on the outer ring of the gizmo to orbit smoothly!
                </div>
            </div>

            <div class="flex-1 w-full flex flex-col items-center">
                <div class="viewport-box w-full h-[360px] sm:h-[400px] relative" id="canvas-container-s6">
                    <div class="absolute top-3 left-3 bg-slate-950/80 px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-400 border border-slate-800">
                        <i class="fa-solid fa-compass text-amber-400 mr-1"></i> Interactive Gizmo Viewport
                    </div>

                    <div class="blender-gizmo" id="s6-gizmo">
                        <svg width="70" height="70" viewBox="-35 -35 70 70" id="gizmo-svg">
                            <circle cx="0" cy="0" r="30" fill="rgba(30,41,59,0.5)" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
                            <g id="gizmo-axes"></g>
                        </svg>
                    </div>

                    <div class="nav-button-cluster">
                        <button class="nav-circle-btn" onclick="gizmoSnap('Z')" title="Top View"><i class="fa-solid fa-arrow-up"></i></button>
                        <button class="nav-circle-btn" onclick="gizmoSnap('Y')" title="Front View"><i class="fa-solid fa-eye"></i></button>
                        <button class="nav-circle-btn" onclick="gizmoSnap('X')" title="Right View"><i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                </div>
                <p class="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
                    <i class="fa-solid fa-mouse-pointer text-amber-400"></i> Click the axis circles in the top right to snap view!
                </p>
            </div>
        </div>
    </div>
"""

html_slides_7_to_13 = """
    <!-- SLIDE 7: Standard Orthographic Views & Numpad Map -->
    <div class="slide-container" id="slide-7" data-title="Numpad Views" data-badge="STEP 6: NUMPAD" data-narration="Professional 3D artists constantly snap to exact orthographic views. Numpad 1 is Front, Numpad 3 is Right Side, and Numpad 7 is Top view.">
        <div class="flex flex-col lg:flex-row items-center gap-8 max-w-6xl w-full">
            <div class="flex-1 text-left">
                <div class="inline-block px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-fuchsia-400 text-xs font-bold mb-3 tracking-wide uppercase">
                    Step 6: Precision View Snapping
                </div>
                <h2 class="text-3xl sm:text-4xl font-extrabold mb-4">
                    The <span class="text-fuchsia-400">Numpad</span> Shortcut Map
                </h2>
                <p class="text-base text-slate-300 mb-6 leading-relaxed">
                    When modeling or aligning objects, you need pure 2D projection without perspective distortion. The number pad is your primary control center:
                </p>

                <div class="grid grid-cols-2 gap-2.5 mb-6">
                    <div class="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
                        <span class="text-xs text-slate-300 font-semibold">Front View</span>
                        <span class="keycap keycap-orange">Num 1</span>
                    </div>
                    <div class="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
                        <span class="text-xs text-slate-300 font-semibold">Back View</span>
                        <span class="keycap">Ctrl+1</span>
                    </div>
                    <div class="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
                        <span class="text-xs text-slate-300 font-semibold">Right Side View</span>
                        <span class="keycap keycap-orange">Num 3</span>
                    </div>
                    <div class="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
                        <span class="text-xs text-slate-300 font-semibold">Left Side View</span>
                        <span class="keycap">Ctrl+3</span>
                    </div>
                    <div class="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
                        <span class="text-xs text-slate-300 font-semibold">Top View</span>
                        <span class="keycap keycap-orange">Num 7</span>
                    </div>
                    <div class="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
                        <span class="text-xs text-slate-300 font-semibold">Bottom View</span>
                        <span class="keycap">Ctrl+7</span>
                    </div>
                    <div class="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
                        <span class="text-xs text-slate-300 font-semibold">Camera View</span>
                        <span class="keycap">Num 0</span>
                    </div>
                    <div class="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
                        <span class="text-xs text-slate-300 font-semibold">Persp / Ortho</span>
                        <span class="keycap">Num 5</span>
                    </div>
                </div>

                <p class="text-xs text-slate-400">
                    <i class="fa-solid fa-keyboard text-fuchsia-400 mr-1"></i> Click the virtual keys on the right or press keys on your keyboard!
                </p>
            </div>

            <div class="flex-1 w-full flex flex-col items-center">
                <div class="viewport-box w-full h-[320px] sm:h-[340px] relative mb-3" id="canvas-container-s7">
                    <div class="absolute top-3 left-3 bg-slate-950/80 px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-300 border border-slate-800">
                        Current View: <strong id="s7-view-label" class="text-fuchsia-400 font-bold">User Perspective</strong>
                    </div>
                </div>

                <div class="numpad-grid">
                    <button class="numpad-key" onclick="snapView('numlock')">Num</button>
                    <button class="numpad-key" onclick="snapView('/')">/</button>
                    <button class="numpad-key" onclick="snapView('*')">*</button>
                    <button class="numpad-key" onclick="snapView('-')">-</button>
                    
                    <button class="numpad-key text-orange-400 font-black" id="key-7" onclick="snapView('7')">7<span class="text-[9px] text-slate-400 block font-normal">TOP</span></button>
                    <button class="numpad-key" id="key-8" onclick="snapView('8')">8</button>
                    <button class="numpad-key" id="key-9" onclick="snapView('9')">9</button>
                    <button class="numpad-key" onclick="snapView('+')">+</button>
                    
                    <button class="numpad-key" id="key-4" onclick="snapView('4')">4</button>
                    <button class="numpad-key text-cyan-400 font-black" id="key-5" onclick="snapView('5')">5<span class="text-[9px] text-slate-400 block font-normal">ORTHO</span></button>
                    <button class="numpad-key" id="key-6" onclick="snapView('6')">6</button>
                    <button class="numpad-key" onclick="snapView('enter')">↵</button>

                    <button class="numpad-key text-orange-400 font-black" id="key-1" onclick="snapView('1')">1<span class="text-[9px] text-slate-400 block font-normal">FRONT</span></button>
                    <button class="numpad-key" id="key-2" onclick="snapView('2')">2</button>
                    <button class="numpad-key text-orange-400 font-black" id="key-3" onclick="snapView('3')">3<span class="text-[9px] text-slate-400 block font-normal">RIGHT</span></button>
                    <button class="numpad-key text-emerald-400 font-black" id="key-dot" onclick="snapView('.')">.<span class="text-[9px] text-slate-400 block font-normal">FRAME</span></button>

                    <button class="numpad-key text-amber-400 font-black col-span-2" id="key-0" onclick="snapView('0')">0 <span class="text-[9px] text-slate-400 font-normal">CAMERA</span></button>
                </div>
            </div>
        </div>
    </div>

    <!-- SLIDE 8: The Tilde (~) View Pie Menu -->
    <div class="slide-container" id="slide-8" data-title="Tilde Pie Menu" data-badge="STEP 7: PIE MENU" data-narration="If you work on a laptop without a numpad, the Tilde or accent grave key opens the radial pie menu, letting you switch views with a flick of your wrist.">
        <div class="flex flex-col lg:flex-row items-center gap-8 max-w-6xl w-full">
            <div class="flex-1 text-left">
                <div class="inline-block px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-pink-400 text-xs font-bold mb-3 tracking-wide uppercase">
                    Step 7: The Laptop & Speed Secret
                </div>
                <h2 class="text-3xl sm:text-4xl font-extrabold mb-4">
                    The <span class="text-pink-400">Tilde (~)</span> Pie Menu
                </h2>
                <p class="text-base text-slate-300 mb-6 leading-relaxed">
                    Don't have a Numpad on your laptop or compact keyboard? Pressing the <strong>Tilde key (~)</strong> (located directly beneath the <kbd class="keycap">Esc</kbd> key) summons an instant 8-direction radial pie menu.
                </p>

                <div class="bg-slate-900 p-5 rounded-2xl border border-pink-500/30 mb-6 space-y-4">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-pink-500/20 border border-pink-500/40 text-pink-400 flex items-center justify-center text-xl shrink-0 font-mono font-bold">
                            ~
                        </div>
                        <div>
                            <h4 class="font-bold text-sm text-slate-100">Press Tilde (`) or Click Below:</h4>
                            <p class="text-xs text-slate-400 mt-1">Move your cursor toward any slice to switch instantly!</p>
                        </div>
                    </div>

                    <button id="s8-open-pie-btn" onclick="openPieMenuDemo()" class="w-full py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-sm shadow-lg shadow-pink-600/30 flex items-center justify-center gap-2 transition">
                        <i class="fa-solid fa-circle-dot"></i>
                        <span>Open Pie Menu</span>
                    </button>
                </div>

                <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                    <h5 class="text-xs font-bold text-slate-300 uppercase tracking-wide mb-2">Speed Drill Challenge:</h5>
                    <p class="text-xs text-slate-400 mb-2">Target: <span id="s8-target-view" class="text-pink-400 font-bold text-sm">Switch to TOP VIEW</span></p>
                    <div class="flex items-center gap-2">
                        <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div id="s8-speed-progress" class="bg-pink-500 h-full w-0 transition-all duration-200"></div>
                        </div>
                        <span id="s8-streak" class="text-xs font-mono text-slate-400 shrink-0">0 / 4</span>
                    </div>
                </div>
            </div>

            <div class="flex-1 w-full flex flex-col items-center">
                <div class="viewport-box w-full h-[360px] sm:h-[400px] relative" id="canvas-container-s8">
                    <div class="absolute top-3 left-3 bg-slate-950/80 px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-300 border border-slate-800">
                        View: <strong id="s8-view-label" class="text-pink-400 font-bold">Front Orthographic</strong>
                    </div>

                    <div class="pie-overlay" id="s8-pie-menu">
                        <div class="pie-item" style="top: 15%; left: 50%;" onclick="selectPieSlice('Top')"><i class="fa-solid fa-arrow-up mr-1 text-orange-400"></i> Top</div>
                        <div class="pie-item" style="top: 25%; left: 85%;" onclick="selectPieSlice('Right')"><i class="fa-solid fa-arrow-right mr-1 text-emerald-400"></i> Right</div>
                        <div class="pie-item" style="top: 50%; left: 90%;" onclick="selectPieSlice('Back')">Back</div>
                        <div class="pie-item" style="top: 85%; left: 50%;" onclick="selectPieSlice('Bottom')"><i class="fa-solid fa-arrow-down mr-1"></i> Bottom</div>
                        <div class="pie-item" style="top: 75%; left: 15%;" onclick="selectPieSlice('Front')"><i class="fa-solid fa-eye mr-1 text-cyan-400"></i> Front</div>
                        <div class="pie-item" style="top: 50%; left: 10%;" onclick="selectPieSlice('Left')">Left</div>
                        <div class="pie-item" style="top: 25%; left: 15%;" onclick="selectPieSlice('Camera')"><i class="fa-solid fa-video mr-1 text-amber-400"></i> Camera</div>
                        <div class="pie-item" style="top: 50%; left: 50%;" onclick="selectPieSlice('Selected')"><i class="fa-solid fa-crosshairs mr-1 text-pink-400"></i> View Selected</div>
                    </div>
                </div>
                <p class="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
                    <i class="fa-solid fa-keyboard text-pink-400"></i> Press <kbd class="keycap">~</kbd> or click the button to open the Pie Menu!
                </p>
            </div>
        </div>
    </div>

    <!-- SLIDE 9: Framing & Focus -->
    <div class="slide-container" id="slide-9" data-title="Framing & Focus" data-badge="STEP 8: FRAMING" data-narration="If your zoom slows down or you get lost in 3D space, press Numpad Period to frame your selected object, or the Home key to frame all objects in the scene.">
        <div class="flex flex-col lg:flex-row items-center gap-8 max-w-6xl w-full">
            <div class="flex-1 text-left">
                <div class="inline-block px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 text-xs font-bold mb-3 tracking-wide uppercase">
                    Step 8: Never Get Lost
                </div>
                <h2 class="text-3xl sm:text-4xl font-extrabold mb-4">
                    <span class="text-emerald-400">Framing</span>: Focus & Recovery
                </h2>
                <p class="text-base text-slate-300 mb-6 leading-relaxed">
                    Have you ever zoomed in so far that zooming slowed to a crawl, or accidentally zoomed into empty dark space? These two shortcuts are your ultimate lifesavers:
                </p>

                <div class="space-y-4 mb-6">
                    <div class="bg-slate-900 p-4 rounded-xl border border-emerald-500/40 flex items-start gap-4">
                        <span class="keycap keycap-orange text-base px-3 py-1 mt-0.5">Num .</span>
                        <div>
                            <h4 class="font-bold text-sm text-emerald-400">Frame Selected (Numpad Period / Del)</h4>
                            <p class="text-xs text-slate-300 mt-1">Snaps the camera directly onto the selected object and <strong>resets your orbit pivot</strong> to that object! (Or use `~` -> View Selected).</p>
                        </div>
                    </div>

                    <div class="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-start gap-4">
                        <span class="keycap text-base px-3 py-1 mt-0.5">Home</span>
                        <div>
                            <h4 class="font-bold text-sm text-slate-100">Frame All (Home Key)</h4>
                            <p class="text-xs text-slate-300 mt-1">Frames every single object in your scene so you never lose track of your work.</p>
                        </div>
                    </div>
                </div>

                <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-xs font-bold text-slate-300 uppercase tracking-wide">Rescue Simulation:</span>
                        <span id="s9-status" class="text-xs font-bold text-rose-400"><i class="fa-solid fa-triangle-exclamation mr-1"></i> LOST IN SPACE!</span>
                    </div>
                    <p class="text-xs text-slate-400 mb-3">You are floating 2,500m away in dark void. Hit <kbd class="keycap">Home</kbd> or <kbd class="keycap keycap-orange">Num .</kbd> to recover the scene!</p>
                    <div class="flex gap-3">
                        <button onclick="s9TriggerFrameAll()" class="flex-1 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 transition">
                            <i class="fa-solid fa-compress mr-1"></i> Frame All (Home)
                        </button>
                        <button onclick="s9TriggerFrameSelected()" class="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-md shadow-emerald-600/30">
                            <i class="fa-solid fa-crosshairs mr-1"></i> Frame Selected (Num .)
                        </button>
                    </div>
                </div>
            </div>

            <div class="flex-1 w-full flex flex-col items-center">
                <div class="viewport-box w-full h-[360px] sm:h-[400px] relative" id="canvas-container-s9">
                    <div class="absolute top-3 left-3 bg-slate-950/80 px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-300 border border-slate-800">
                        Distance: <strong id="s9-dist-label" class="text-rose-400">2,500.0 m (Lost)</strong>
                    </div>
                    <div id="s9-success-badge" class="absolute inset-0 bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 opacity-0 pointer-events-none transition-opacity duration-500">
                        <div class="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500 flex items-center justify-center text-3xl mb-3">
                            <i class="fa-solid fa-check"></i>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-1">Focus Recovered!</h3>
                        <p class="text-xs text-slate-300 max-w-xs">Your camera is now centered on the golden satellite. Orbiting is perfectly centered again.</p>
                    </div>
                </div>
                <p class="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
                    <i class="fa-solid fa-life-ring text-emerald-400"></i> Press <kbd class="keycap">.</kbd> on Numpad or <kbd class="keycap">Home</kbd> to rescue!
                </p>
            </div>
        </div>
    </div>

    <!-- SLIDE 10: Perspective vs Orthographic -->
    <div class="slide-container" id="slide-10" data-title="Persp vs Ortho" data-badge="STEP 9: PROJECTION" data-narration="Perspective view mimics human vision with depth and vanishing points. Orthographic view removes perspective distortion so parallel lines remain truly parallel. Toggle it with Numpad 5.">
        <div class="flex flex-col lg:flex-row items-center gap-8 max-w-6xl w-full">
            <div class="flex-1 text-left">
                <div class="inline-block px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-sky-400 text-xs font-bold mb-3 tracking-wide uppercase">
                    Step 9: Optical Projections
                </div>
                <h2 class="text-3xl sm:text-4xl font-extrabold mb-4">
                    <span class="text-sky-400">Perspective</span> vs <span class="text-indigo-400">Orthographic</span>
                </h2>
                <p class="text-base text-slate-300 mb-6 leading-relaxed">
                    Pressing <kbd class="keycap keycap-orange">Numpad 5</kbd> flips the camera projection between human vision (natural depth) and technical drafting (pure geometry).
                </p>

                <div class="grid grid-cols-2 gap-4 mb-6">
                    <div id="card-persp" class="bg-slate-900 p-4 rounded-xl border-2 border-sky-500/80 cursor-pointer transition" onclick="setProjectionMode('persp')">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="font-bold text-sm text-sky-400">Perspective</h4>
                            <span class="w-3 h-3 rounded-full bg-sky-500"></span>
                        </div>
                        <p class="text-xs text-slate-300 mb-2">Lines converge to a vanishing point. Objects farther away look smaller.</p>
                        <span class="text-[10px] text-slate-500 font-mono">Best for: Realistic Viewing</span>
                    </div>

                    <div id="card-ortho" class="bg-slate-900 p-4 rounded-xl border border-slate-800 cursor-pointer transition hover:border-indigo-500/50" onclick="setProjectionMode('ortho')">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="font-bold text-sm text-slate-300">Orthographic</h4>
                            <span class="w-3 h-3 rounded-full bg-slate-600"></span>
                        </div>
                        <p class="text-xs text-slate-300 mb-2">Parallel lines stay 100% parallel. No optical size distortion.</p>
                        <span class="text-[10px] text-slate-500 font-mono">Best for: CAD & Precision</span>
                    </div>
                </div>

                <div class="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <span class="keycap keycap-orange">Num 5</span>
                        <span class="text-xs text-slate-300">Instant Toggle Shortcut</span>
                    </div>
                    <button onclick="toggleProjectionMode()" class="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition">
                        Toggle (Numpad 5)
                    </button>
                </div>
            </div>

            <div class="flex-1 w-full flex flex-col items-center">
                <div class="viewport-box w-full h-[360px] sm:h-[400px] relative" id="canvas-container-s10">
                    <div class="absolute top-3 left-3 bg-slate-950/80 px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-300 border border-slate-800">
                        Mode: <strong id="s10-mode-label" class="text-sky-400">User Perspective (3D Depth)</strong>
                    </div>
                    <div class="absolute bottom-3 left-3 bg-slate-950/80 px-3 py-1.5 rounded-lg text-xs text-slate-300 border border-slate-800">
                        <span class="text-slate-400">Look at the repeated pillars:</span> In Ortho, all pillars are identical in size!
                    </div>
                </div>
                <p class="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
                    <i class="fa-solid fa-eye text-sky-400"></i> Press <kbd class="keycap">5</kbd> on Numpad or click the cards to see the difference!
                </p>
            </div>
        </div>
    </div>

    <!-- SLIDE 11: Laptop Preferences -->
    <div class="slide-container" id="slide-11" data-title="Laptop Preferences" data-badge="STEP 10: SETUP" data-narration="If you use a trackpad, Apple Magic Mouse, or a keyboard without a numpad, turn on Emulate 3 Button Mouse and Emulate Numpad in Blender Preferences.">
        <div class="flex flex-col lg:flex-row items-center gap-8 max-w-6xl w-full">
            <div class="flex-1 text-left">
                <div class="inline-block px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-orange-400 text-xs font-bold mb-3 tracking-wide uppercase">
                    Step 10: Hardware Optimization
                </div>
                <h2 class="text-3xl sm:text-4xl font-extrabold mb-4">
                    Setting Up for <span class="text-orange-400">Laptops & Trackpads</span>
                </h2>
                <p class="text-base text-slate-300 mb-6 leading-relaxed">
                    Blender is built for a 3-button mouse and numpad, but you can configure it to work flawlessly on any MacBook or compact PC laptop via <code class="text-orange-400 font-mono text-xs bg-slate-900 px-2 py-0.5 rounded">Edit > Preferences > Input</code>.
                </p>

                <div class="space-y-4 mb-6">
                    <div class="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-start justify-between gap-4">
                        <div>
                            <h4 class="font-bold text-sm text-slate-100 flex items-center gap-2">
                                <i class="fa-solid fa-computer-mouse text-orange-400"></i> Emulate 3 Button Mouse
                            </h4>
                            <p class="text-xs text-slate-400 mt-1">Allows <kbd class="keycap">Alt</kbd> + Left Click to Orbit, <kbd class="keycap">Alt</kbd>+<kbd class="keycap">Shift</kbd> to Pan, and <kbd class="keycap">Alt</kbd>+<kbd class="keycap">Ctrl</kbd> to Zoom.</p>
                        </div>
                        <input type="checkbox" id="pref-emulate-mouse" checked onchange="togglePrefMouse(this.checked)" class="w-5 h-5 accent-orange-500 rounded cursor-pointer mt-1">
                    </div>

                    <div class="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-start justify-between gap-4">
                        <div>
                            <h4 class="font-bold text-sm text-slate-100 flex items-center gap-2">
                                <i class="fa-solid fa-keyboard text-cyan-400"></i> Emulate Numpad
                            </h4>
                            <p class="text-xs text-slate-400 mt-1">Maps the top-row number keys <kbd class="keycap">1</kbd> through <kbd class="keycap">0</kbd> to act directly as Numpad view keys.</p>
                        </div>
                        <input type="checkbox" id="pref-emulate-numpad" checked onchange="togglePrefNumpad(this.checked)" class="w-5 h-5 accent-cyan-500 rounded cursor-pointer mt-1">
                    </div>
                </div>

                <div class="bg-orange-500/10 p-4 rounded-xl border border-orange-500/20 text-xs text-orange-300">
                    <strong class="font-bold block mb-1"><i class="fa-solid fa-sliders mr-1"></i> Bonus Preferences in Navigation:</strong>
                    Check <strong>"Zoom to Mouse Position"</strong> to zoom directly towards your cursor rather than the screen center!
                </div>
            </div>

            <div class="flex-1 w-full flex flex-col items-center">
                <div class="viewport-box w-full h-[360px] sm:h-[400px] relative" id="canvas-container-s11">
                    <div class="absolute top-3 left-3 bg-slate-950/80 px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-300 border border-slate-800">
                        Input Test: <strong id="s11-input-status" class="text-orange-400">Alt + LMB Orbit Active</strong>
                    </div>
                </div>
                <p class="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
                    <i class="fa-solid fa-laptop text-orange-400"></i> Hold <kbd class="keycap">Alt</kbd> + Left Click Drag to test Emulate 3-Button Mouse!
                </p>
            </div>
        </div>
    </div>

    <!-- SLIDE 12: Knowledge Mastery Quiz -->
    <div class="slide-container" id="slide-12" data-title="Knowledge Check" data-badge="STEP 11: QUIZ" data-narration="Let us test what you have learned! Answer these quick questions to confirm your 3D navigation mastery.">
        <div class="flex flex-col items-center max-w-4xl w-full text-center">
            <div class="inline-block px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 text-xs font-bold mb-3 tracking-wide uppercase">
                Step 11: Navigation Mastery Check
            </div>
            <h2 class="text-3xl sm:text-4xl font-extrabold mb-3">
                Test Your <span class="text-emerald-400">Navigation Reflexes</span>
            </h2>
            <p class="text-sm text-slate-300 mb-8 max-w-xl">
                Choose the correct answer for each scenario to earn your Blender 4.5 Navigation Certificate!
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-left mb-8">
                <div class="bg-slate-900 p-5 rounded-2xl border border-slate-800 quiz-card" id="q1-card">
                    <span class="text-xs font-bold text-orange-400 uppercase tracking-wide block mb-2">Question 1:</span>
                    <h4 class="font-bold text-sm text-slate-100 mb-3">Your zoom is stuck and will not move closer to an object. What is the fastest fix?</h4>
                    <div class="space-y-2">
                        <button onclick="checkQuiz(1, 'A', this)" class="w-full text-left p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition flex items-center justify-between">
                            <span>A) Restart Blender</span>
                            <i class="fa-regular fa-circle text-slate-500"></i>
                        </button>
                        <button onclick="checkQuiz(1, 'B', this)" class="w-full text-left p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition flex items-center justify-between">
                            <span>B) Press Numpad Period (.) to Frame Selected</span>
                            <i class="fa-regular fa-circle text-slate-500"></i>
                        </button>
                        <button onclick="checkQuiz(1, 'C', this)" class="w-full text-left p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition flex items-center justify-between">
                            <span>C) Delete the Camera</span>
                            <i class="fa-regular fa-circle text-slate-500"></i>
                        </button>
                    </div>
                </div>

                <div class="bg-slate-900 p-5 rounded-2xl border border-slate-800 quiz-card" id="q2-card">
                    <span class="text-xs font-bold text-cyan-400 uppercase tracking-wide block mb-2">Question 2:</span>
                    <h4 class="font-bold text-sm text-slate-100 mb-3">How do you achieve silky-smooth continuous zoom instead of stepped jumps?</h4>
                    <div class="space-y-2">
                        <button onclick="checkQuiz(2, 'A', this)" class="w-full text-left p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition flex items-center justify-between">
                            <span>A) Hold Ctrl + Middle Mouse Button & Drag</span>
                            <i class="fa-regular fa-circle text-slate-500"></i>
                        </button>
                        <button onclick="checkQuiz(2, 'B', this)" class="w-full text-left p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition flex items-center justify-between">
                            <span>B) Press Spacebar rapidly</span>
                            <i class="fa-regular fa-circle text-slate-500"></i>
                        </button>
                        <button onclick="checkQuiz(2, 'C', this)" class="w-full text-left p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition flex items-center justify-between">
                            <span>C) Double click the object</span>
                            <i class="fa-regular fa-circle text-slate-500"></i>
                        </button>
                    </div>
                </div>

                <div class="bg-slate-900 p-5 rounded-2xl border border-slate-800 quiz-card" id="q3-card">
                    <span class="text-xs font-bold text-pink-400 uppercase tracking-wide block mb-2">Question 3:</span>
                    <h4 class="font-bold text-sm text-slate-100 mb-3">Which key opens the quick radial Pie Menu for views on any keyboard?</h4>
                    <div class="space-y-2">
                        <button onclick="checkQuiz(3, 'A', this)" class="w-full text-left p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition flex items-center justify-between">
                            <span>A) Tab Key</span>
                            <i class="fa-regular fa-circle text-slate-500"></i>
                        </button>
                        <button onclick="checkQuiz(3, 'B', this)" class="w-full text-left p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition flex items-center justify-between">
                            <span>B) Tilde (~) / Accent Grave Key</span>
                            <i class="fa-regular fa-circle text-slate-500"></i>
                        </button>
                        <button onclick="checkQuiz(3, 'C', this)" class="w-full text-left p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition flex items-center justify-between">
                            <span>C) Caps Lock</span>
                            <i class="fa-regular fa-circle text-slate-500"></i>
                        </button>
                    </div>
                </div>

                <div class="bg-slate-900 p-5 rounded-2xl border border-slate-800 quiz-card" id="q4-card">
                    <span class="text-xs font-bold text-amber-400 uppercase tracking-wide block mb-2">Question 4:</span>
                    <h4 class="font-bold text-sm text-slate-100 mb-3">Which shortcut instantly toggles between Perspective and Orthographic projection?</h4>
                    <div class="space-y-2">
                        <button onclick="checkQuiz(4, 'A', this)" class="w-full text-left p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition flex items-center justify-between">
                            <span>A) Numpad 5</span>
                            <i class="fa-regular fa-circle text-slate-500"></i>
                        </button>
                        <button onclick="checkQuiz(4, 'B', this)" class="w-full text-left p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition flex items-center justify-between">
                            <span>B) Numpad 0</span>
                            <i class="fa-regular fa-circle text-slate-500"></i>
                        </button>
                        <button onclick="checkQuiz(4, 'C', this)" class="w-full text-left p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition flex items-center justify-between">
                            <span>C) Ctrl + Z</span>
                            <i class="fa-regular fa-circle text-slate-500"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div id="quiz-result-banner" class="hidden p-4 rounded-2xl bg-gradient-to-r from-emerald-900/60 to-cyan-900/60 border border-emerald-500 text-center animate-fade-in w-full max-w-xl">
                <h3 class="text-xl font-bold text-emerald-400 mb-1"><i class="fa-solid fa-trophy mr-2 text-amber-400"></i> Perfect Score! Navigation Master</h3>
                <p class="text-xs text-slate-200">You have completed all checkpoints. Step into the full 3D Sandbox Playground!</p>
            </div>
        </div>
    </div>

    <!-- SLIDE 13: 3D Sandbox Lab -->
    <div class="slide-container" id="slide-13" data-title="3D Sandbox Lab" data-badge="STEP 12: SANDBOX" data-narration="Congratulations! You are now in the Blender 3D Sandbox. Test your hotkeys, orbit around the models, toggle camera views, and complete the checklist.">
        <div class="flex flex-col lg:flex-row items-center gap-8 max-w-6xl w-full h-full">
            <div class="lg:w-1/3 text-left flex flex-col justify-between">
                <div>
                    <div class="inline-block px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-orange-400 text-xs font-bold mb-3 tracking-wide uppercase">
                        Final Stage: Hands-on Lab
                    </div>
                    <h2 class="text-3xl font-extrabold mb-3">
                        Blender 4.5 <span class="text-orange-400">3D Sandbox</span>
                    </h2>
                    <p class="text-xs text-slate-300 mb-4 leading-relaxed">
                        This is your free playground. Practice real 3D navigation workflows with Suzanne, shapes, studio lighting, and materials.
                    </p>

                    <div class="bg-slate-900 p-4 rounded-2xl border border-slate-800 mb-4 space-y-2.5">
                        <h4 class="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                            <i class="fa-solid fa-list-check text-orange-400 mr-1.5"></i> Practical Checklist:
                        </h4>
                        
                        <div class="flex items-center gap-2 text-xs text-slate-400" id="chk-1">
                            <i class="fa-regular fa-square text-slate-500"></i>
                            <span>1. Orbit 360° around the scene (MMB)</span>
                        </div>
                        <div class="flex items-center gap-2 text-xs text-slate-400" id="chk-2">
                            <i class="fa-regular fa-square text-slate-500"></i>
                            <span>2. Snap to Front View (Num 1 or Pie ~)</span>
                        </div>
                        <div class="flex items-center gap-2 text-xs text-slate-400" id="chk-3">
                            <i class="fa-regular fa-square text-slate-500"></i>
                            <span>3. Snap to Top View (Num 7 or Pie ~)</span>
                        </div>
                        <div class="flex items-center gap-2 text-xs text-slate-400" id="chk-4">
                            <i class="fa-regular fa-square text-slate-500"></i>
                            <span>4. Frame Selected Object (Num .)</span>
                        </div>
                        <div class="flex items-center gap-2 text-xs text-slate-400" id="chk-5">
                            <i class="fa-regular fa-square text-slate-500"></i>
                            <span>5. Toggle Camera View (Num 0)</span>
                        </div>
                    </div>
                </div>

                <div class="space-y-2">
                    <button onclick="resetSandboxScene()" class="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition flex items-center justify-center gap-2">
                        <i class="fa-solid fa-rotate-left"></i> Reset Scene & Camera
                    </button>
                </div>
            </div>

            <div class="lg:w-2/3 w-full h-[420px] sm:h-[480px] flex flex-col items-center">
                <div class="viewport-box w-full h-full relative" id="canvas-container-s13">
                    <div class="absolute top-3 left-3 flex items-center gap-2 z-20">
                        <div class="bg-slate-950/85 px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-2">
                            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span id="s13-view-text">User Perspective</span>
                        </div>
                        <button onclick="toggleShadingMode()" class="bg-slate-900/85 hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-semibold text-slate-300 transition flex items-center gap-1.5">
                            <i class="fa-solid fa-circle-half-stroke text-orange-400"></i>
                            <span id="shading-label">Solid Mode</span>
                        </button>
                    </div>

                    <div class="blender-gizmo" id="s13-gizmo">
                        <svg width="70" height="70" viewBox="-35 -35 70 70" id="s13-gizmo-svg">
                            <circle cx="0" cy="0" r="30" fill="rgba(30,41,59,0.5)" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
                            <g id="s13-gizmo-axes"></g>
                        </svg>
                    </div>

                    <div class="nav-button-cluster">
                        <button class="nav-circle-btn" onclick="s13TriggerZoom()" title="Zoom"><i class="fa-solid fa-magnifying-glass"></i></button>
                        <button class="nav-circle-btn" onclick="s13TriggerPan()" title="Pan"><i class="fa-solid fa-hand"></i></button>
                        <button class="nav-circle-btn" onclick="s13ToggleCamera()" title="Camera View (Num 0)"><i class="fa-solid fa-video"></i></button>
                        <button class="nav-circle-btn" onclick="s13ToggleOrtho()" title="Persp/Ortho (Num 5)"><i class="fa-solid fa-border-all"></i></button>
                    </div>

                    <div class="pie-overlay" id="s13-pie-menu">
                        <div class="pie-item" style="top: 15%; left: 50%;" onclick="s13PieSelect('Top')">Top</div>
                        <div class="pie-item" style="top: 25%; left: 85%;" onclick="s13PieSelect('Right')">Right</div>
                        <div class="pie-item" style="top: 50%; left: 90%;" onclick="s13PieSelect('Back')">Back</div>
                        <div class="pie-item" style="top: 85%; left: 50%;" onclick="s13PieSelect('Bottom')">Bottom</div>
                        <div class="pie-item" style="top: 75%; left: 15%;" onclick="s13PieSelect('Front')">Front</div>
                        <div class="pie-item" style="top: 50%; left: 10%;" onclick="s13PieSelect('Left')">Left</div>
                        <div class="pie-item" style="top: 25%; left: 15%;" onclick="s13PieSelect('Camera')">Camera</div>
                        <div class="pie-item" style="top: 50%; left: 50%;" onclick="s13PieSelect('Selected')">Frame</div>
                    </div>
                </div>
"""

html_footer_and_scripts = """
    <!-- Bottom HUD & Navigation Controls -->
    <footer class="fixed bottom-0 left-0 w-full z-50 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 px-6 py-3 flex items-center justify-between">
        <div class="flex items-center gap-2">
            <button onclick="prevSlide()" id="prev-btn" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-slate-200 text-xs font-bold transition flex items-center gap-2 border border-slate-700">
                <i class="fa-solid fa-arrow-left"></i>
                <span class="hidden sm:inline">Back</span>
            </button>
            <button onclick="nextSlide()" id="next-btn" class="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 disabled:opacity-30 disabled:pointer-events-none text-white text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-orange-600/30">
                <span class="hidden sm:inline">Next</span>
                <i class="fa-solid fa-arrow-right"></i>
            </button>
        </div>

        <div class="flex items-center gap-3">
            <div class="flex items-center gap-1 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                <span id="slide-index-display" class="font-mono text-xs font-bold text-orange-400">1</span>
                <span class="text-xs text-slate-500 font-mono">/</span>
                <span id="slide-total-display" class="font-mono text-xs text-slate-400">13</span>
            </div>

            <button onclick="toggleTocModal()" class="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition border border-slate-700 flex items-center gap-1.5" title="Course Index">
                <i class="fa-solid fa-layer-group text-orange-400"></i>
                <span class="hidden md:inline">Index</span>
            </button>
        </div>
    </footer>

    <!-- Table of Contents Modal -->
    <div id="toc-modal" class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 opacity-0 pointer-events-none transition-opacity duration-300" onclick="if(event.target===this)toggleTocModal()">
        <div class="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
            <div class="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <i class="fa-solid fa-cubes text-orange-500"></i>
                    <h3 class="font-bold text-base text-white">Course Navigation Matrix</h3>
                </div>
                <button onclick="toggleTocModal()" class="text-slate-400 hover:text-white"><i class="fa-solid fa-xmark text-lg"></i></button>
            </div>
            <div class="p-6 overflow-y-auto space-y-2" id="toc-list"></div>
        </div>
    </div>

    <!-- SCRIPT ENGINE -->
    <script>
        // 1. Audio Synthesizer
        let audioEnabled = true;
        let voiceEnabled = true;
        let audioCtx = null;

        function getAudioContext() {
            if (!audioCtx) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
            return audioCtx;
        }

        function playSound(type) {
            if (!audioEnabled) return;
            try {
                const ctx = getAudioContext();
                const now = ctx.currentTime;

                if (type === 'click') {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(800, now);
                    osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
                    gain.gain.setValueAtTime(0.12, now);
                    gain.gain.linearRampToValueAtTime(0, now + 0.05);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(now);
                    osc.stop(now + 0.05);
                } else if (type === 'snap') {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(520, now);
                    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
                    gain.gain.setValueAtTime(0.18, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(now);
                    osc.stop(now + 0.12);
                } else if (type === 'success') {
                    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
                        const osc = ctx.createOscillator();
                        const gain = ctx.createGain();
                        osc.type = 'sine';
                        osc.frequency.setValueAtTime(freq, now + i * 0.08);
                        gain.gain.setValueAtTime(0.12, now + i * 0.08);
                        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.3);
                        osc.connect(gain);
                        gain.connect(ctx.destination);
                        osc.start(now + i * 0.08);
                        osc.stop(now + i * 0.08 + 0.35);
                    });
                } else if (type === 'error') {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'sawtooth';
                    osc.frequency.setValueAtTime(160, now);
                    osc.frequency.linearRampToValueAtTime(110, now + 0.18);
                    gain.gain.setValueAtTime(0.15, now);
                    gain.gain.linearRampToValueAtTime(0, now + 0.18);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(now);
                    osc.stop(now + 0.18);
                }
            } catch (e) {
                console.warn('Audio error:', e);
            }
        }

        function toggleAudio() {
            audioEnabled = !audioEnabled;
            const icon = document.getElementById('sound-icon');
            if (audioEnabled) {
                icon.className = 'fa-solid fa-volume-high text-emerald-400';
                playSound('click');
            } else {
                icon.className = 'fa-solid fa-volume-xmark text-slate-500';
            }
        }

        function toggleNarration() {
            voiceEnabled = !voiceEnabled;
            const icon = document.getElementById('voice-icon');
            if (voiceEnabled) {
                icon.className = 'fa-solid fa-microphone-lines text-orange-400';
                speakCurrentSlide();
            } else {
                icon.className = 'fa-solid fa-microphone-slash text-slate-500';
                window.speechSynthesis.cancel();
                hideSubtitle();
            }
        }

        // Subtitle HUD
        let subtitleTimer = null;
        function showSubtitle(text) {
            const hud = document.getElementById('subtitle-hud');
            const subText = document.getElementById('subtitle-text');
            subText.textContent = text;
            hud.classList.remove('opacity-0', 'pointer-events-none', '-translate-y-2');
            clearTimeout(subtitleTimer);
            subtitleTimer = setTimeout(() => {
                hideSubtitle();
            }, 9000);
        }

        function hideSubtitle() {
            const hud = document.getElementById('subtitle-hud');
            hud.classList.add('opacity-0', 'pointer-events-none', '-translate-y-2');
        }

        function speakCurrentSlide() {
            if (!voiceEnabled || !('speechSynthesis' in window)) return;
            window.speechSynthesis.cancel();

            const currentSlideElem = slides[currentSlideIndex];
            const narration = currentSlideElem.getAttribute('data-narration');
            if (!narration) return;

            showSubtitle(narration);

            const utterance = new SpeechSynthesisUtterance(narration);
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            utterance.onend = () => {
                setTimeout(hideSubtitle, 1500);
            };
            window.speechSynthesis.speak(utterance);
        }

        // 2. Slide Navigation Controller
        let currentSlideIndex = 0;
        let slides = [];

        function initSlides() {
            slides = Array.from(document.querySelectorAll('.slide-container'));
            document.getElementById('slide-total-display').textContent = slides.length;
            buildToc();
            showSlide(0);
        }

        function showSlide(index) {
            if (index < 0 || index >= slides.length) return;

            slides.forEach((s, idx) => {
                s.classList.remove('active', 'previous');
                if (idx < index) {
                    s.classList.add('previous');
                } else if (idx === index) {
                    s.classList.add('active');
                }
            });

            currentSlideIndex = index;
            document.getElementById('slide-index-display').textContent = index + 1;
            document.getElementById('prev-btn').disabled = (index === 0);
            document.getElementById('next-btn').disabled = (index === slides.length - 1);

            const progress = ((index) / (slides.length - 1)) * 100;
            document.getElementById('progress-bar').style.width = progress + '%';

            const activeSlide = slides[index];
            document.getElementById('header-step-badge').textContent = activeSlide.getAttribute('data-badge') || 'STEP ' + (index + 1);
            document.getElementById('header-step-title').textContent = activeSlide.getAttribute('data-title') || '';

            speakCurrentSlide();
            onSlideEntered(index);
        }

        function nextSlide() {
            if (currentSlideIndex < slides.length - 1) {
                playSound('click');
                showSlide(currentSlideIndex + 1);
            }
        }

        function prevSlide() {
            if (currentSlideIndex > 0) {
                playSound('click');
                showSlide(currentSlideIndex - 1);
            }
        }

        function goToSlide(index) {
            playSound('click');
            showSlide(index);
            const toc = document.getElementById('toc-modal');
            toc.classList.add('opacity-0', 'pointer-events-none');
        }

        function toggleTocModal() {
            playSound('click');
            const toc = document.getElementById('toc-modal');
            toc.classList.toggle('opacity-0');
            toc.classList.toggle('pointer-events-none');
        }

        function buildToc() {
            const list = document.getElementById('toc-list');
            list.innerHTML = '';
            slides.forEach((s, i) => {
                const title = s.getAttribute('data-title') || 'Slide ' + (i + 1);
                const badge = s.getAttribute('data-badge') || 'STEP ' + (i + 1);
                const item = document.createElement('div');
                item.className = 'p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 cursor-pointer flex items-center justify-between transition';
                item.innerHTML = `
                    <div class="flex items-center gap-3">
                        <span class="font-mono text-xs text-orange-400 font-bold px-2 py-0.5 rounded bg-orange-500/10">${i + 1}</span>
                        <div>
                            <h4 class="text-sm font-bold text-slate-100">${title}</h4>
                            <span class="text-[10px] text-slate-400 uppercase tracking-wider">${badge}</span>
                        </div>
                    </div>
                    <i class="fa-solid fa-chevron-right text-xs text-slate-500"></i>
                `;
                item.onclick = () => goToSlide(i);
                list.appendChild(item);
            });
        }

        // Global Keydown Controller
        window.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT') return;

            if (e.key === 'ArrowRight' || e.key === ' ') {
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === '`' || e.key === '~') {
                if (currentSlideIndex === 7) {
                    openPieMenuDemo();
                } else if (currentSlideIndex === 12) {
                    s13TogglePie();
                }
            } else if (currentSlideIndex === 6) {
                // Slide 7 Numpad handles keys
                const keyMap = {
                    '1': '1', '3': '3', '7': '7', '0': '0', '5': '5', '.': '.', 'Delete': '.'
                };
                if (keyMap[e.key]) snapView(keyMap[e.key]);
            }
        });

        // 3. Three.js Viewports Manager
        let renderers = {};

        function createThreeViewport(containerId, initFn) {
            const container = document.getElementById(containerId);
            if (!container) return null;

            const width = container.clientWidth || 400;
            const height = container.clientHeight || 360;

            const scene = new THREE.Scene();
            scene.background = new THREE.Color(0x0f172a);

            const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
            camera.position.set(4, 3, 5);
            camera.lookAt(0, 0, 0);

            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.shadowMap.enabled = true;
            container.appendChild(renderer.domElement);

            // Lighting
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
            scene.add(ambientLight);

            const dirLight = new THREE.DirectionalLight(0xffeedd, 1.2);
            dirLight.position.set(6, 10, 8);
            dirLight.castShadow = true;
            scene.add(dirLight);

            const fillLight = new THREE.DirectionalLight(0x60a5fa, 0.4);
            fillLight.position.set(-8, -4, -6);
            scene.add(fillLight);

            // Grid Floor
            const gridHelper = new THREE.GridHelper(10, 10, 0x475569, 0x1e293b);
            gridHelper.position.y = -0.01;
            scene.add(gridHelper);

            // Coordinate Axis Lines
            const axisHelper = new THREE.AxesHelper(2.5);
            scene.add(axisHelper);

            const viewObj = { scene, camera, renderer, container, width, height };
            if (initFn) initFn(viewObj);

            // Render loop
            function animate() {
                requestAnimationFrame(animate);
                if (viewObj.onFrame) viewObj.onFrame();
                renderer.render(scene, camera);
            }
            animate();

            // Resize handle
            window.addEventListener('resize', () => {
                const w = container.clientWidth;
                const h = container.clientHeight;
                if (w && h) {
                    camera.aspect = w / h;
                    camera.updateProjectionMatrix();
                    renderer.setSize(w, h);
                }
            });

            return viewObj;
        }

        // Initialize Slide 2: Axes
        let s2Obj = null;
        let s2Mesh = null;
        function initSlide2() {
            s2Obj = createThreeViewport('canvas-container-s2', (obj) => {
                const sphereGeo = new THREE.SphereGeometry(0.8, 32, 32);
                const sphereMat = new THREE.MeshStandardMaterial({
                    color: 0xea7600,
                    metalness: 0.3,
                    roughness: 0.2
                });
                s2Mesh = new THREE.Mesh(sphereGeo, sphereMat);
                obj.scene.add(s2Mesh);

                // Add nice ring
                const ringGeo = new THREE.TorusGeometry(1.2, 0.04, 16, 64);
                const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
                const ring = new THREE.Mesh(ringGeo, ringMat);
                ring.rotation.x = Math.PI / 2;
                s2Mesh.add(ring);

                obj.onFrame = () => {
                    if (s2Mesh) ring.rotation.z += 0.01;
                };
            });
        }

        function updateSlide2Position() {
            const x = parseFloat(document.getElementById('slider-x').value);
            const y = parseFloat(document.getElementById('slider-y').value);
            const z = parseFloat(document.getElementById('slider-z').value);

            if (s2Mesh) {
                s2Mesh.position.set(x, z, -y); // Three.js Y is up, Z is depth
            }
            document.getElementById('val-x').textContent = x.toFixed(1);
            document.getElementById('val-y').textContent = y.toFixed(1);
            document.getElementById('val-z').textContent = z.toFixed(1);
            playSound('click');
        }

        function highlightAxis(axis) {
            playSound('snap');
            if (axis === 'x') {
                document.getElementById('slider-x').value = 2.0;
            } else if (axis === 'y') {
                document.getElementById('slider-y').value = 2.0;
            } else if (axis === 'z') {
                document.getElementById('slider-z').value = 2.0;
            }
            updateSlide2Position();
        }

        // Slide 3: Orbit Arena
        let s3Obj = null;
        let s3RotTotal = 0;
        function initSlide3() {
            s3Obj = createThreeViewport('canvas-container-s3', (obj) => {
                // Suzanne style monkey / head geometry
                const group = new THREE.Group();
                const headGeo = new THREE.DodecahedronGeometry(1.0, 1);
                const mat = new THREE.MeshStandardMaterial({ color: 0xea7600, roughness: 0.3 });
                const head = new THREE.Mesh(headGeo, mat);
                group.add(head);

                const earGeo = new THREE.ConeGeometry(0.4, 0.8, 16);
                const earL = new THREE.Mesh(earGeo, mat);
                earL.position.set(-1.1, 0.4, 0);
                earL.rotation.z = Math.PI / 3;
                group.add(earL);

                const earR = new THREE.Mesh(earGeo, mat);
                earR.position.set(1.1, 0.4, 0);
                earR.rotation.z = -Math.PI / 3;
                group.add(earR);

                const eyeGeo = new THREE.SphereGeometry(0.2, 16, 16);
                const eyeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
                const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
                eyeL.position.set(-0.4, 0.2, 0.9);
                group.add(eyeL);
                const eyeR = new THREE.Mesh(eyeGeo, eyeMat);
                eyeR.position.set(0.4, 0.2, 0.9);
                group.add(eyeR);

                obj.scene.add(group);

                // Mouse Drag Orbit
                let isDragging = false;
                let prevMouse = { x: 0, y: 0 };
                let theta = 0;
                let phi = 45;
                const radius = 5;

                obj.container.addEventListener('pointerdown', (e) => {
                    isDragging = true;
                    prevMouse = { x: e.clientX, y: e.clientY };
                });

                window.addEventListener('pointermove', (e) => {
                    if (!isDragging) return;
                    const dx = e.clientX - prevMouse.x;
                    const dy = e.clientY - prevMouse.y;
                    prevMouse = { x: e.clientX, y: e.clientY };

                    theta += dx * 0.01;
                    phi = Math.max(10, Math.min(85, phi + dy * 0.1));

                    s3RotTotal += Math.abs(dx) + Math.abs(dy);
                    const progress = Math.min(100, (s3RotTotal / 600) * 100);
                    document.getElementById('s3-progress').style.width = progress + '%';
                    if (progress >= 100) {
                        document.getElementById('s3-status').textContent = 'Challenge Completed!';
                        document.getElementById('s3-status').className = 'text-xs font-bold text-emerald-400';
                    }

                    const radTheta = theta;
                    const radPhi = (phi * Math.PI) / 180;

                    obj.camera.position.x = radius * Math.sin(radPhi) * Math.sin(radTheta);
                    obj.camera.position.y = radius * Math.cos(radPhi);
                    obj.camera.position.z = radius * Math.sin(radPhi) * Math.cos(radTheta);
                    obj.camera.lookAt(0, 0, 0);

                    document.getElementById('s3-rot-x').textContent = Math.round(phi) + '°';
                    document.getElementById('s3-rot-y').textContent = Math.round((theta * 180 / Math.PI) % 360) + '°';
                });

                window.addEventListener('pointerup', () => { isDragging = false; });
            });
        }

        // Slide 4: Pan
        let s4Obj = null;
        let s4CrystalsFound = 0;
        function initSlide4() {
            s4Obj = createThreeViewport('canvas-container-s4', (obj) => {
                const crystalGeo = new THREE.OctahedronGeometry(0.5, 0);
                const crystalMat = new THREE.MeshStandardMaterial({
                    color: 0x22d3ee,
                    emissive: 0x0891b2,
                    roughness: 0.1
                });

                const pos = [
                    { x: -3.5, y: 1.5, z: 0 },
                    { x: 3.5, y: -1.2, z: 0 },
                    { x: 0, y: 3.2, z: 0 }
                ];

                pos.forEach((p, idx) => {
                    const c = new THREE.Mesh(crystalGeo, crystalMat);
                    c.position.set(p.x, p.y, p.z);
                    obj.scene.add(c);
                });

                let isPanning = false;
                let prevP = { x: 0, y: 0 };

                obj.container.addEventListener('pointerdown', (e) => {
                    isPanning = true;
                    prevP = { x: e.clientX, y: e.clientY };
                });

                window.addEventListener('pointermove', (e) => {
                    if (!isPanning) return;
                    const dx = e.clientX - prevP.x;
                    const dy = e.clientY - prevP.y;
                    prevP = { x: e.clientX, y: e.clientY };

                    obj.camera.position.x -= dx * 0.01;
                    obj.camera.position.y += dy * 0.01;

                    if (s4CrystalsFound < 3) {
                        s4CrystalsFound = Math.min(3, Math.floor(Math.abs(obj.camera.position.x) + Math.abs(obj.camera.position.y)) + 1);
                        document.getElementById('s4-score').textContent = `Found ${s4CrystalsFound} of 3 Energy Crystals`;
                        if (s4CrystalsFound === 3) {
                            document.getElementById('s4-score').className = 'text-xs font-bold text-emerald-400';
                            playSound('success');
                        }
                    }
                });

                window.addEventListener('pointerup', () => { isPanning = false; });
            });
        }

        // Slide 5: Zoom
        let s5Obj = null;
        function initSlide5() {
            s5Obj = createThreeViewport('canvas-container-s5', (obj) => {
                const sphereGeo = new THREE.IcosahedronGeometry(1.2, 4);
                const mat = new THREE.MeshStandardMaterial({
                    color: 0x10b981,
                    wireframe: true
                });
                const outer = new THREE.Mesh(sphereGeo, mat);
                obj.scene.add(outer);

                const innerGeo = new THREE.SphereGeometry(0.4, 32, 32);
                const innerMat = new THREE.MeshStandardMaterial({
                    color: 0xf59e0b,
                    metalness: 0.8
                });
                const inner = new THREE.Mesh(innerGeo, innerMat);
                obj.scene.add(inner);

                obj.camera.position.set(0, 0, 10);

                obj.container.addEventListener('wheel', (e) => {
                    e.preventDefault();
                    obj.camera.position.z = Math.max(1.2, Math.min(20, obj.camera.position.z + e.deltaY * 0.01));
                    document.getElementById('s5-dist').textContent = obj.camera.position.z.toFixed(1) + 'm';

                    if (obj.camera.position.z < 2.5) {
                        document.getElementById('s5-secret').innerHTML = '<i class="fa-solid fa-unlock mr-2 text-emerald-400"></i> BLENDER-45-LTS-NAV';
                        playSound('success');
                    }
                });
            });
        }

        // Slide 6: Viewport Gizmo
        let s6Obj = null;
        function initSlide6() {
            s6Obj = createThreeViewport('canvas-container-s6', (obj) => {
                const boxGeo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
                const mat = new THREE.MeshStandardMaterial({ color: 0xf59e0b });
                const box = new THREE.Mesh(boxGeo, mat);
                obj.scene.add(box);
            });
        }

        function gizmoSnap(axis) {
            playSound('snap');
            if (!s6Obj) return;
            if (axis === 'Z') {
                s6Obj.camera.position.set(0, 7, 0.01);
            } else if (axis === 'Y') {
                s6Obj.camera.position.set(0, 0, 7);
            } else if (axis === 'X') {
                s6Obj.camera.position.set(7, 0, 0);
            }
            s6Obj.camera.lookAt(0, 0, 0);
        }

        // Slide 7: Numpad
        let s7Obj = null;
        function initSlide7() {
            s7Obj = createThreeViewport('canvas-container-s7', (obj) => {
                const head = new THREE.Mesh(
                    new THREE.ConeGeometry(1, 2, 4),
                    new THREE.MeshStandardMaterial({ color: 0xa855f7 })
                );
                head.rotation.x = Math.PI;
                obj.scene.add(head);
            });
        }

        function snapView(key) {
            playSound('snap');
            if (!s7Obj) return;
            const lbl = document.getElementById('s7-view-label');

            if (key === '1') {
                s7Obj.camera.position.set(0, 0, 6);
                lbl.textContent = 'Front Orthographic (Num 1)';
            } else if (key === '3') {
                s7Obj.camera.position.set(6, 0, 0);
                lbl.textContent = 'Right Orthographic (Num 3)';
            } else if (key === '7') {
                s7Obj.camera.position.set(0, 6, 0.001);
                lbl.textContent = 'Top Orthographic (Num 7)';
            } else if (key === '0') {
                s7Obj.camera.position.set(3, 2, 4);
                lbl.textContent = 'Camera View (Num 0)';
            } else if (key === '5') {
                lbl.textContent = 'Persp / Ortho Toggle (Num 5)';
            } else if (key === '.') {
                s7Obj.camera.position.set(2, 2, 3);
                lbl.textContent = 'Framed Selection (Num .)';
            }
            s7Obj.camera.lookAt(0, 0, 0);
        }

        // Slide 8: Pie Menu
        let s8Obj = null;
        let s8StreakCount = 0;
        function initSlide8() {
            s8Obj = createThreeViewport('canvas-container-s8', (obj) => {
                const torus = new THREE.Mesh(
                    new THREE.TorusKnotGeometry(0.8, 0.25, 64, 16),
                    new THREE.MeshStandardMaterial({ color: 0xec4899 })
                );
                obj.scene.add(torus);
            });
        }

        function openPieMenuDemo() {
            playSound('click');
            const menu = document.getElementById('s8-pie-menu');
            menu.style.display = 'block';
            menu.style.left = '50%';
            menu.style.top = '50%';
        }

        function selectPieSlice(slice) {
            playSound('snap');
            const menu = document.getElementById('s8-pie-menu');
            menu.style.display = 'none';
            document.getElementById('s8-view-label').textContent = slice + ' View';

            if (!s8Obj) return;
            if (slice === 'Top') s8Obj.camera.position.set(0, 6, 0.01);
            else if (slice === 'Front') s8Obj.camera.position.set(0, 0, 6);
            else if (slice === 'Right') s8Obj.camera.position.set(6, 0, 0);
            else s8Obj.camera.position.set(4, 3, 5);
            s8Obj.camera.lookAt(0, 0, 0);

            s8StreakCount = Math.min(4, s8StreakCount + 1);
            document.getElementById('s8-streak').textContent = `${s8StreakCount} / 4`;
            document.getElementById('s8-speed-progress').style.width = (s8StreakCount / 4 * 100) + '%';
        }

        // Slide 9: Framing
        let s9Obj = null;
        function initSlide9() {
            s9Obj = createThreeViewport('canvas-container-s9', (obj) => {
                const sat = new THREE.Mesh(
                    new THREE.DodecahedronGeometry(1.2, 0),
                    new THREE.MeshStandardMaterial({ color: 0x10b981, metalness: 0.8 })
                );
                obj.scene.add(sat);
                obj.camera.position.set(500, 400, 2000);
            });
        }

        function s9TriggerFrameSelected() {
            playSound('success');
            if (s9Obj) {
                s9Obj.camera.position.set(3, 2, 4);
                s9Obj.camera.lookAt(0, 0, 0);
                document.getElementById('s9-dist-label').textContent = '4.5 m (Target Acquired)';
                document.getElementById('s9-dist-label').className = 'text-emerald-400';
                document.getElementById('s9-status').innerHTML = '<i class="fa-solid fa-circle-check mr-1 text-emerald-400"></i> Centered on Object';
                document.getElementById('s9-status').className = 'text-xs font-bold text-emerald-400';
                document.getElementById('s9-success-badge').classList.remove('opacity-0', 'pointer-events-none');
            }
        }

        function s9TriggerFrameAll() {
            s9TriggerFrameSelected();
        }

        // Slide 10: Persp vs Ortho
        let s10Obj = null;
        let isOrtho = false;
        function initSlide10() {
            s10Obj = createThreeViewport('canvas-container-s10', (obj) => {
                // Repeated pillars in depth
                for (let i = 0; i < 5; i++) {
                    const cyl = new THREE.Mesh(
                        new THREE.CylinderGeometry(0.3, 0.3, 2.5, 16),
                        new THREE.MeshStandardMaterial({ color: 0x38bdf8 })
                    );
                    cyl.position.set(i * 1.5 - 3, 0, -i * 2);
                    obj.scene.add(cyl);
                }
            });
        }

        function setProjectionMode(mode) {
            playSound('snap');
            isOrtho = (mode === 'ortho');
            const lbl = document.getElementById('s10-mode-label');
            const cardP = document.getElementById('card-persp');
            const cardO = document.getElementById('card-ortho');

            if (isOrtho) {
                lbl.textContent = 'Orthographic (No Perspective Distortion)';
                cardO.className = 'bg-slate-900 p-4 rounded-xl border-2 border-indigo-500/80 cursor-pointer transition';
                cardP.className = 'bg-slate-900 p-4 rounded-xl border border-slate-800 cursor-pointer transition';
            } else {
                lbl.textContent = 'User Perspective (Realistic 3D Depth)';
                cardP.className = 'bg-slate-900 p-4 rounded-xl border-2 border-sky-500/80 cursor-pointer transition';
                cardO.className = 'bg-slate-900 p-4 rounded-xl border border-slate-800 cursor-pointer transition';
            }
        }

        function toggleProjectionMode() {
            setProjectionMode(isOrtho ? 'persp' : 'ortho');
        }

        // Slide 11: Laptop Prefs
        let s11Obj = null;
        function initSlide11() {
            s11Obj = createThreeViewport('canvas-container-s11', (obj) => {
                const mesh = new THREE.Mesh(
                    new THREE.TorusGeometry(1, 0.3, 16, 32),
                    new THREE.MeshStandardMaterial({ color: 0xea7600 })
                );
                obj.scene.add(mesh);
            });
        }

        function togglePrefMouse(val) {
            playSound('click');
        }

        function togglePrefNumpad(val) {
            playSound('click');
        }

        // Slide 12: Quiz
        const quizAnswers = { 1: 'B', 2: 'A', 3: 'B', 4: 'A' };
        let quizScore = 0;
        function checkQuiz(qNum, selected, btnElem) {
            const card = document.getElementById(`q${qNum}-card`);
            const buttons = card.querySelectorAll('button');
            buttons.forEach(b => b.classList.remove('bg-emerald-600', 'bg-rose-600', 'text-white'));

            if (selected === quizAnswers[qNum]) {
                playSound('success');
                btnElem.classList.add('bg-emerald-600', 'text-white');
                quizScore++;
            } else {
                playSound('error');
                btnElem.classList.add('bg-rose-600', 'text-white');
            }

            if (quizScore >= 4) {
                document.getElementById('quiz-result-banner').classList.remove('hidden');
            }
        }

        // Slide 13: 3D Sandbox
        let s13Obj = null;
        function initSlide13() {
            s13Obj = createThreeViewport('canvas-container-s13', (obj) => {
                // Central Monkey
                const monkey = new THREE.Mesh(
                    new THREE.DodecahedronGeometry(1.2, 1),
                    new THREE.MeshStandardMaterial({ color: 0xea7600, roughness: 0.2 })
                );
                obj.scene.add(monkey);

                // Additional shapes
                const cube = new THREE.Mesh(
                    new THREE.BoxGeometry(0.8, 0.8, 0.8),
                    new THREE.MeshStandardMaterial({ color: 0x38bdf8 })
                );
                cube.position.set(-2.5, 0, 1);
                obj.scene.add(cube);

                const sphere = new THREE.Mesh(
                    new THREE.SphereGeometry(0.6, 32, 32),
                    new THREE.MeshStandardMaterial({ color: 0xec4899 })
                );
                sphere.position.set(2.5, 0, -1);
                obj.scene.add(sphere);

                // Orbit controls
                let isDragging = false;
                let prevP = { x: 0, y: 0 };
                let theta = 0.8;
                let phi = 1.0;
                let radius = 6;

                obj.container.addEventListener('pointerdown', (e) => {
                    isDragging = true;
                    prevP = { x: e.clientX, y: e.clientY };
                });

                window.addEventListener('pointermove', (e) => {
                    if (!isDragging) return;
                    const dx = e.clientX - prevP.x;
                    const dy = e.clientY - prevP.y;
                    prevP = { x: e.clientX, y: e.clientY };

                    theta += dx * 0.01;
                    phi = Math.max(0.1, Math.min(Math.PI / 2 - 0.05, phi + dy * 0.01));

                    obj.camera.position.x = radius * Math.sin(phi) * Math.sin(theta);
                    obj.camera.position.y = radius * Math.cos(phi);
                    obj.camera.position.z = radius * Math.sin(phi) * Math.cos(theta);
                    obj.camera.lookAt(0, 0, 0);

                    markCheck(1);
                });

                window.addEventListener('pointerup', () => { isDragging = false; });
            });
        }

        function markCheck(id) {
            const chk = document.getElementById(`chk-${id}`);
            if (chk) {
                chk.className = 'flex items-center gap-2 text-xs text-emerald-400 font-semibold';
                chk.querySelector('i').className = 'fa-solid fa-square-check text-emerald-400';
            }
        }

        function s13TriggerZoom() {
            playSound('click');
            if (s13Obj) {
                s13Obj.camera.position.multiplyScalar(0.8);
                markCheck(4);
            }
        }

        function s13TriggerPan() {
            playSound('click');
            if (s13Obj) {
                s13Obj.camera.position.x += 0.5;
            }
        }

        function s13ToggleCamera() {
            playSound('snap');
            if (s13Obj) {
                s13Obj.camera.position.set(0, 2, 7);
                s13Obj.camera.lookAt(0, 0, 0);
                markCheck(5);
            }
        }

        function s13ToggleOrtho() {
            playSound('snap');
        }

        function s13TogglePie() {
            playSound('click');
            const menu = document.getElementById('s13-pie-menu');
            menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
            menu.style.left = '50%';
            menu.style.top = '50%';
        }

        function s13PieSelect(view) {
            playSound('snap');
            const menu = document.getElementById('s13-pie-menu');
            menu.style.display = 'none';
            if (s13Obj) {
                if (view === 'Top') { s13Obj.camera.position.set(0, 8, 0.01); markCheck(3); }
                else if (view === 'Front') { s13Obj.camera.position.set(0, 0, 8); markCheck(2); }
                else if (view === 'Right') { s13Obj.camera.position.set(8, 0, 0); }
                else if (view === 'Selected') { s13Obj.camera.position.set(3, 2, 4); markCheck(4); }
                s13Obj.camera.lookAt(0, 0, 0);
            }
        }

        function resetSandboxScene() {
            playSound('click');
            if (s13Obj) {
                s13Obj.camera.position.set(4, 3, 5);
                s13Obj.camera.lookAt(0, 0, 0);
            }
        }

        function toggleShadingMode() {
            playSound('click');
            const label = document.getElementById('shading-label');
            label.textContent = (label.textContent === 'Solid Mode') ? 'Wireframe Mode' : 'Solid Mode';
        }

        // On Slide Entered Event Router
        function onSlideEntered(index) {
            if (index === 1 && !s2Obj) initSlide2();
            if (index === 2 && !s3Obj) initSlide3();
            if (index === 3 && !s4Obj) initSlide4();
            if (index === 4 && !s5Obj) initSlide5();
            if (index === 5 && !s6Obj) initSlide6();
            if (index === 6 && !s7Obj) initSlide7();
            if (index === 7 && !s8Obj) initSlide8();
            if (index === 8 && !s9Obj) initSlide9();
            if (index === 9 && !s10Obj) initSlide10();
            if (index === 10 && !s11Obj) initSlide11();
            if (index === 12 && !s13Obj) initSlide13();
        }

        // Initialize on load
        window.addEventListener('DOMContentLoaded', initSlides);
    </script>
</body>
</html>
"""

def main():
    full_html = html_head + html_slides_1_to_6 + html_slides_7_to_13 + html_footer_and_scripts
    
    # 1. Write to courses/blender/interactive_blender_course.html
    os.makedirs('courses/blender', exist_ok=True)
    with open('courses/blender/interactive_blender_course.html', 'w', encoding='utf-8') as f:
        f.write(full_html)
    print("Saved courses/blender/interactive_blender_course.html")

    # 2. Write to public/courses/blender_3d_navigation.html
    os.makedirs('public/courses', exist_ok=True)
    with open('public/courses/blender_3d_navigation.html', 'w', encoding='utf-8') as f:
        f.write(full_html)
    print("Saved public/courses/blender_3d_navigation.html")

    # 3. Write to blender_3d_navigation.html
    with open('blender_3d_navigation.html', 'w', encoding='utf-8') as f:
        f.write(full_html)
    print("Saved blender_3d_navigation.html")

    # 4. Insert/Update SQLite dev.db
    db_path = 'prisma/dev.db'
    if os.path.exists(db_path):
        conn = sqlite3.connect(db_path)
        cur = conn.cursor()
        course_id = 'blender_45_basics_nav_01'
        title = 'Intro to 3D Navigation in Blender | BLENDER 4.5 BASICS'
        description = 'Comprehensive interactive 13-slide masterclass on 3D Viewport Navigation in Blender 4.5 based on CG Cookie tutorial.'
        
        cur.execute("SELECT id FROM Course WHERE id = ?", (course_id,))
        exists = cur.fetchone()
        
        if exists:
            cur.execute("""
                UPDATE Course
                SET title = ?, description = ?, htmlContent = ?, isActive = 1, isPublic = 1
                WHERE id = ?
            """, (title, description, full_html, course_id))
            print("Updated course in dev.db")
        else:
            cur.execute("""
                INSERT INTO Course (id, title, description, educatorId, isSynced, isActive, currentSlide, publishedSlide, isArchived, isPublic, priceTokens, studentQuota, htmlContent, createdAt)
                VALUES (?, ?, ?, 'admin', 1, 1, 0, 13, 0, 1, 0, 9999, ?, datetime('now'))
            """, (course_id, title, description, full_html))
            print("Inserted course into dev.db")
            
        conn.commit()
        conn.close()

if __name__ == '__main__':
    main()
