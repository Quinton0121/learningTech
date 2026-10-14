/**
 * Course HTML Sanitizer & Rule Compliance Injector
 * 
 * Automatically validates and adapts imported HTML courses so they 
 * strictly comply with the Teacher Sync & Publish controls:
 * 
 * 1. Ensures proper HTML5 document structure and <body> tags.
 * 2. Detects or adapts slide elements into '.slide-container'.
 * 3. Guarantees that at least the first slide is marked '.active'.
 * 4. Injects slide visibility CSS if not present.
 * 5. Injects floating '#prev-btn' and '#next-btn' navigation controls
 *    if missing, so teacher sync and publish capping work immediately.
 */

export interface SanitizeResult {
  html: string;
  repaired: boolean;
  slideCount: number;
  repairsApplied: string[];
}

export function sanitizeAndPrepareCourseHtml(rawHtml: string): SanitizeResult {
  let html = rawHtml.trim();
  const repairsApplied: string[] = [];

  // 1. Ensure basic HTML document skeleton and <body> tags
  const hasHtmlTag = /<html[^>]*>/i.test(html);
  const hasBodyOpen = /<body[^>]*>/i.test(html);
  const hasBodyClose = /<\/body>/i.test(html);

  if (!hasBodyOpen || !hasBodyClose) {
    if (!hasHtmlTag) {
      html = `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Course</title>\n</head>\n<body>\n${html}\n</body>\n</html>`;
      repairsApplied.push("Wrapped raw content in standard HTML5 document skeleton with <body> tags");
    } else {
      if (!hasBodyOpen) {
        html = html.replace(/<html[^>]*>/i, (m) => `${m}\n<body>`);
        repairsApplied.push("Inserted missing <body> opening tag");
      }
      if (!hasBodyClose) {
        html = html.replace(/<\/html>/i, `</body>\n</html>`);
        repairsApplied.push("Inserted missing </body> closing tag");
      }
    }
  }

  // 2. Identify and adapt slide containers (.slide-container)
  const slideContainerRegex = /class=["'][^"']*\bslide-container\b[^"']*["']/gi;
  let slideMatches = html.match(slideContainerRegex);

  if (!slideMatches || slideMatches.length === 0) {
    // Check if the HTML uses common slide classes: .slide, .page, .step
    const altSlideRegex = /<(section|div|article)\b([^>]*\bclass=["'][^"']*\b(slide|page|step)\b[^"']*["'][^>]*)>/gi;
    const hasAltSlides = altSlideRegex.test(html);

    if (hasAltSlides) {
      html = html.replace(/<(section|div|article)\b([^>]*\bclass=["'])([^"']*\b(slide|page|step)\b[^"']*)(["'][^>]*)>/gi, 
        (match, tag, before, cls, target, after) => {
          if (cls.includes('slide-container')) return match;
          return `<${tag}${before}slide-container ${cls}${after}>`;
        }
      );
      repairsApplied.push("Adapted custom slide tags (.slide/.page/.step) into '.slide-container'");
    } else if (/<(section|div)\b[^>]*\bdata-slide=["'][^"']*["'][^>]*>/i.test(html)) {
      html = html.replace(/<(section|div)\b([^>]*\bdata-slide=["'][^"']*["'][^>]*)>/gi,
        (match, tag, rest) => {
          if (/class=["']/i.test(rest)) {
            return `<${tag} ${rest.replace(/class=["']([^"']*)["']/i, 'class="slide-container $1"')}>`;
          } else {
            return `<${tag} class="slide-container" ${rest}>`;
          }
        }
      );
      repairsApplied.push("Adapted [data-slide] elements into '.slide-container'");
    } else {
      // Single-page interactive app or unstructured layout: wrap body content in slide 1
      html = html.replace(/(<body[^>]*>)([\s\S]*?)(<\/body>)/i, (m, bOpen, bContent, bClose) => {
        return `${bOpen}\n  <div class="slide-container active" id="slide-1" data-badge="PAGE 1" data-title="Course Content">\n    ${bContent.trim()}\n  </div>\n${bClose}`;
      });
      repairsApplied.push("Enclosed single-page content inside master '<div class=\"slide-container active\">'");
    }
  }

  // 3. Ensure the FIRST slide container has the 'active' class
  const activeSlideRegex = /class=["'][^"']*\bslide-container\b[^"']*\bactive\b[^"']*["']/i;
  if (!activeSlideRegex.test(html)) {
    let replacedFirst = false;
    html = html.replace(/(<[^>]*\bclass=["'][^"']*\bslide-container)([^"']*["'][^>]*>)/i, (match, prefix, rest) => {
      if (replacedFirst) return match;
      replacedFirst = true;
      return `${prefix} active${rest}`;
    });
    if (replacedFirst) {
      repairsApplied.push("Activated initial slide with 'active' class");
    }
  }

  // 4. Ensure slide visibility CSS exists
  const hasSlideCss = /\.slide-container\b/i.test(html);
  if (!hasSlideCss) {
    const fallbackCss = `\n<style id="auto-sync-slide-rules">
  /* Auto-injected Slide Visibility Rules for Sync Engine */
  .slide-container:not(.active) {
    display: none !important;
  }
  .slide-container.active {
    display: block !important;
  }
</style>\n`;
    if (/<head[^>]*>/i.test(html)) {
      html = html.replace(/<head[^>]*>/i, (m) => `${m}${fallbackCss}`);
    } else if (/<body[^>]*>/i.test(html)) {
      html = html.replace(/<body[^>]*>/i, (m) => `${fallbackCss}${m}`);
    } else {
      html = fallbackCss + html;
    }
    repairsApplied.push("Injected CSS rules (.slide-container:not(.active) { display: none }) for page transitions");
  }

  // 5. Check for navigation buttons (#prev-btn and #next-btn)
  const hasNextBtn = /id=["']next-btn["']/i.test(html);
  const hasPrevBtn = /id=["']prev-btn["']/i.test(html);

  if (!hasNextBtn || !hasPrevBtn) {
    const finalSlideMatches = html.match(/class=["'][^"']*\bslide-container\b[^"']*["']/gi) || [];
    const totalCount = Math.max(finalSlideMatches.length, 1);

    const navDockHtml = `
<!-- Auto-Injected Navigation Dock (Enables Teacher Sync & Student Publish Limits) -->
<div id="auto-injected-nav-dock" style="position: fixed; bottom: 20px; right: 24px; z-index: 9999; display: flex; align-items: center; gap: 10px; background: rgba(15, 23, 42, 0.90); backdrop-filter: blur(10px); padding: 7px 16px; border-radius: 999px; border: 1px solid rgba(255, 255, 255, 0.18); box-shadow: 0 10px 25px rgba(0,0,0,0.35); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #fff;">
  <button id="prev-btn" style="background: rgba(255, 255, 255, 0.15); border: none; color: #fff; padding: 6px 14px; border-radius: 999px; font-weight: 600; cursor: pointer; font-size: 13px; transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.25)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'">
    &larr; Prev
  </button>
  <div style="font-size: 13px; font-weight: 700; color: #94a3b8; min-width: 48px; text-align: center;">
    <span id="current-slide-num" style="color: #38bdf8;">1</span> / <span id="total-slide-num">${totalCount}</span>
  </div>
  <button id="next-btn" style="background: #3b82f6; border: none; color: #fff; padding: 6px 14px; border-radius: 999px; font-weight: 600; cursor: pointer; font-size: 13px; transition: background 0.2s;" onmouseover="this.style.background='#2563eb'" onmouseout="this.style.background='#3b82f6'">
    Next &rarr;
  </button>
</div>
`;

    if (/<\/body>/i.test(html)) {
      html = html.replace(/<\/body>/i, `${navDockHtml}\n</body>`);
    } else {
      html += navDockHtml;
    }
    repairsApplied.push(`Injected floating navigation dock with #prev-btn, #next-btn, and progress counter (${totalCount} slides)`);
  }

  // Count final slides
  const finalMatches = html.match(/class=["'][^"']*\bslide-container\b[^"']*["']/gi) || [];
  const slideCount = Math.max(finalMatches.length, 1);

  return {
    html,
    repaired: repairsApplied.length > 0,
    slideCount,
    repairsApplied
  };
}
