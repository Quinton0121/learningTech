# Excel & Educational Slide Deck Style Guide

This guide describes how to generate PowerPoint presentations (`.pptx`) matching the exact visual style, typography, card layout, and color hierarchy established in `Excel_1.pptx`.

---

## 1. Core Architecture & Template Reference

- **Base Template Path**: `C:\Users\quint\Downloads\Excel_1.pptx`
- **Slide Dimensions**: Widescreen 16:9 (`10.0 inches` width × `5.625 inches` height / `9,144,000` × `5,143,500` EMUs).
- **Core Principle**: Clean, modern card-based instructional design (Grade 7 / Form 1 friendly, zero bullet points, visual code pills, side-by-side comparisons, and bottom tip callout boxes).

---

## 2. Color Palette & Typography

| Element | Color / Value | Hex Code | Description |
| :--- | :--- | :--- | :--- |
| **Title Text** | Charcoal / Near-Black | `#111827` | Arial, 23pt–40pt, Bold |
| **Subtitle Text** | Slate Gray | `#4B5563` | Arial, 14.5pt–17pt, Regular |
| **Accent / Highlights** | Emerald / Teal | `#159F8B` / `#059669` | Key terms, formula values |
| **Slide 1 Background** | Soft Mint Tint (`lt2`) | Layout 0 Theme | Native template light tint |
| **Content Slide BG** | Pure White | `#FFFFFF` | Solid clean white background |
| **Card Border** | Light Slate | `#E2E8F0` | 1.5px border, 12px border-radius |
| **Formula Code Pill** | Soft Slate Fill | `#F1F5F9` | Consolas/Monospace, 15px Bold |
| **Callout / Tip Banner** | Mint Tint | `#ECFDF5` | Left 5px solid border `#10B981` |

---

## 3. Slide Layout & Positioning Rules

### A. Slide 1: Title Slide
- **Layout**: `prs.slide_layouts[0]` (Native `TITLE` layout).
- **Behavior**: Keep native layout background (`lt2`), top white header bar (`y=0..0.53"`), and decoration accent line (`y=1.30"`).
- **Title Placeholder**:
  - `Left = 0.80"`, `Top = 2.01"`, `Width = 8.99"`, `Height = 1.82"`
  - **Paragraph 0**: Main Topic Title (40pt Arial Bold, `#111827`).
  - **Paragraph 1**: Category Subtitle (26pt Arial, `#374151`).
  - **Paragraph 2**: Summary Scope (26pt Arial, `#159F8B` teal accent).

### B. Slides 2+: Content Slides
- **Layout**: `prs.slide_layouts[2]` (Native `TITLE_AND_BODY` layout).
- **Crucial**: Remove all inherited layout placeholders (`sp.getparent().remove(sp)`) to prevent ghost *"Click to add..."* boxes from appearing.
- **Header & Subtitle Box**:
  - `Left = 0.80"`, `Top = 1.44"`, `Width = 8.41"`, `Height = 0.90"`
  - **Note**: Must be placed at `Top = 1.44"` so it sits comfortably below the layout's decoration line (`Top = 1.30"`).
  - **Title**: 23pt Arial Bold (`#111827`).
  - **Subtitle**: 14.5pt Arial (`#4B5563`) with highlighted keywords in `#159F8B`.
- **Card Graphic / Diagram**:
  - `Left = 0.80"`, `Top = 2.45"`, `Width = 8.40"`, `Height = 2.80"`
  - High-DPI rendered image (`.png`) containing the structured cards, formula pills, tables, and bottom callout banner.

---

## 4. Visual Card HTML/CSS Template

Render cards with headless Microsoft Edge (`--force-device-scale-factor=2 --window-size=1020,380`):

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: transparent;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  padding: 6px 10px;
  display: flex;
  flex-direction: column;
  width: 980px;
}
.card-container { display: flex; gap: 14px; width: 100%; }
.card {
  flex: 1;
  background: #ffffff;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
}
.badge {
  display: inline-block;
  align-self: flex-start;
  font-size: 10.5px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 2px 7px;
  border-radius: 5px;
  margin-bottom: 6px;
}
.math-badge { background: #e0e7ff; color: #3730a3; }
.green-badge { background: #d1fae5; color: #065f46; }
.orange-badge { background: #ffedd5; color: #9a3412; }
.purple-badge { background: #f3e8ff; color: #6b21a8; }
.card-title { font-size: 16.5px; font-weight: 700; color: #0f172a; margin-bottom: 4px; }
.card-desc { font-size: 12.5px; color: #475569; line-height: 1.3; margin-bottom: 8px; }
.formula-pill {
  background: #f1f5f9;
  border-radius: 7px;
  padding: 8px 12px;
  font-family: Consolas, monospace;
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  margin-top: auto;
  border: 1px solid #cbd5e1;
}
.hl-green { color: #059669; font-weight: 800; }
.hl-blue { color: #2563eb; font-weight: 800; }
.data-tbl { width: 100%; border-collapse: collapse; font-size: 11.5px; margin-top: auto; }
.data-tbl th { background: #f8fafc; color: #475569; font-weight: 600; padding: 4px 6px; border: 1px solid #e2e8f0; }
.data-tbl td { padding: 3px 6px; border: 1px solid #e2e8f0; color: #1e293b; }
.hl-row { background: #ecfdf5; font-weight: 600; }
.key-idea-box {
  margin-top: 8px;
  width: 100%;
  background: #ecfdf5;
  border-left: 5px solid #10b981;
  border-radius: 0 8px 8px 0;
  padding: 7px 12px;
  font-size: 12.5px;
  color: #064e3b;
  line-height: 1.3;
}
.key-idea-box strong { color: #047857; }
</style>
</head>
<body>
  <div class="card-container">
    <div class="card">
      <div class="badge math-badge">Syntax</div>
      <div class="card-title">Formula Syntax</div>
      <div class="card-desc">Description of the function behavior.</div>
      <div class="formula-pill">=FUNCTION(<span class="hl-green">A1:A5</span>)</div>
    </div>
    <div class="card">
      <div class="badge green-badge">Example</div>
      <div class="card-title">Live Calculation</div>
      <div class="card-desc">Values computed from dataset.</div>
      <div class="formula-pill">Result: <span class="hl-green">Value</span></div>
    </div>
  </div>
  <div class="key-idea-box">
    <strong>💡 Key idea:</strong> Crucial student takeaway or practical tip.
  </div>
</body>
</html>
```

---

## 5. Python-PPTX Assembly Template

```python
import os, subprocess, pptx
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN

template_ppt = r"C:\Users\quint\Downloads\Excel_1.pptx"
output_ppt = r"C:\Users\quint\Downloads\My_New_Topic.pptx"

prs = pptx.Presentation(template_ppt)

# 1. Clear old slides
while len(prs.slides) > 0:
    rId = prs.slides._sldIdLst[0].rId
    prs.part.drop_rel(rId)
    del prs.slides._sldIdLst[0]

# 2. Slide 1 (Title)
slide1 = prs.slides.add_slide(prs.slide_layouts[0])
# Remove extra placeholders
for sh in [s for s in slide1.shapes if s.is_placeholder and s.placeholder_format.idx != 0]:
    sh._element.getparent().remove(sh._element)

title_box = slide1.shapes.add_textbox(Inches(0.80), Inches(2.01), Inches(8.99), Inches(1.82))
tf1 = title_box.text_frame
tf1.word_wrap = True
# Paragraph 0
p0 = tf1.paragraphs[0]
r0 = p0.add_run()
r0.text = "Excel "
r0.font.name, r0.font.size, r0.font.bold = "Arial", Pt(40), True
r0.font.color.rgb = RGBColor(0x11, 0x18, 0x27)
# Paragraph 1
p1 = tf1.add_paragraph()
r1 = p1.add_run()
r1.text = "- Topic Subtitle"
r1.font.name, r1.font.size = "Arial", Pt(26)
r1.font.color.rgb = RGBColor(0x37, 0x41, 0x51)
# Paragraph 2
p2 = tf1.add_paragraph()
r2 = p2.add_run()
r2.text = "- Key Concepts Explained Simply"
r2.font.name, r2.font.size = "Arial", Pt(26)
r2.font.color.rgb = RGBColor(0x15, 0x9F, 0x8B)

# 3. Content Slides (Slides 2+)
for s in content_slides:
    slide = prs.slides.add_slide(prs.slide_layouts[2])
    # Remove ALL default placeholders to prevent "Click to add..." boxes
    for sh in [s for s in slide.shapes if s.is_placeholder]:
        sh._element.getparent().remove(sh._element)

    # Title & Subtitle box below decoration line
    hdr = slide.shapes.add_textbox(Inches(0.80), Inches(1.44), Inches(8.41), Inches(0.90))
    tf = hdr.text_frame
    tf.word_wrap = True
    
    # Title
    pt = tf.paragraphs[0]
    rt = pt.add_run()
    rt.text = s["title"]
    rt.font.name, rt.font.size, rt.font.bold = "Arial", Pt(23), True
    rt.font.color.rgb = RGBColor(0x11, 0x18, 0x27)

    # Subtitle
    ps = tf.add_paragraph()
    for txt, bold, hex_c in s["subtitle_parts"]:
        r = ps.add_run()
        r.text = txt
        r.font.name, r.font.size, r.font.bold = "Arial", Pt(14.5), bold
        if hex_c:
            r.font.color.rgb = RGBColor(int(hex_c[:2],16), int(hex_c[2:4],16), int(hex_c[4:6],16))

    # Add visual graphic image
    slide.shapes.add_picture(s["png_path"], Inches(0.80), Inches(2.45), width=Inches(8.40), height=Inches(2.80))

prs.save(output_ppt)
```

---

## 6. Execution Checklist for Next Agent

1. **Verify Headless Edge**: Path `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`.
2. **Handle File Locks**: Wrap `prs.save()` with try/except to save to `_v2.pptx` if the user currently has the presentation open in PowerPoint.
3. **No Bullet Points on Slides**: Keep content structured inside visual cards.
4. **Follow Agent Maintenance Rules**:
   - Update `c:\futu\Jarvis\jarvis_speech.txt` upon completion.
   - Restart `python telegram_listener.py` with `WaitMsBeforeAsync=1000`.
