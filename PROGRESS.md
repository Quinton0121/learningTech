# Learning Tech Project Progress & Handoff Summary

**Date**: 2026-08-19

---

## 1. Project Status Overview
- **Repositories**: Quinton0121/learningTech & Quinton0121/Jarvis
- **Local & Remote Servers**: Next.js running on Port 3000 (managed via PM2 on M9); Jarvis Web Server on Port 8000 & Telegram Listener operational.
- **Environment**: Node.js v20.20.2, pnpm v9, PM2 v7 installed on remote M9 machine.

---

## 2. Remote Machine & Service Migration (M9 / Minisforum)
- **Host**: `quinton@192.168.31.53` (`quinton-M9`)
- **Uninstalled Unused Software**: Completely removed and purged `surfshark` VPN package and dependencies.
- **Node & Database Environment**: Node.js 20 installed via NVM; SQLite databases (`dev.db`, `prisma/dev.db`) & ignored static asset directories (`public/courses`, `courses`, `ignored_files`) synced to M9.
- **Application Process Management**: Next.js built and managed via PM2 (`pm2 start npm --name 'learningTech' -- start -- -p 3000`), with systemd startup enabled (`pm2 startup`).
- **Firewall Config**: UFW port 3000/tcp opened to allow local network access.

---

## 3. Cloudflare Tunnel & Domain Deployment
- **Domain**: `interlectic.org` (registered on Spaceship, DNS managed via Cloudflare).
- **Cloudflare Tunnel Status**: `learningtech` tunnel created and running as a systemd service (`cloudflared.service`).
- **Active Routes**:
  - Main & Subdomains: `interlectic.org`, `app.interlectic.org`, `www.interlectic.org` -> `http://localhost:3000`
  - External SSH Access: `ssh.interlectic.org` -> `ssh://localhost:22` (Connect via `cloudflared access ssh --hostname ssh.interlectic.org --user quinton`).

---

## 4. Payment Gateway & Business Integration
- **Airwallex Account**: Registered and submitted. Pending approval/verification.

---

## 5. Next Steps & Recommendations
- **Airwallex Approval**: Integrate Airwallex payment API once approval is completed.
- **Database Scaling**: Plan migration from SQLite (`dev.db`) to PostgreSQL / Prisma Postgres for high concurrent write performance.
- **Backups & Security**: Configure daily automated DB/asset backups and Cloudflare WAF/security rules.

---

## 6. Payment Compliance Documents & Action Items (2026-08-21)
- **LianLian / Payment Gateway Scenario Samples**: Created and pushed to `lianlian_samples/` (including `interlectic_user_agreement.pdf` and `interlectic_course_purchase_settlement.pdf`).
- ⚠️ **CRITICAL REMINDER TO USER**:
  - **Confirm & Rewrite Before Use**: You **MUST** review, confirm, and rewrite the final clauses of both documents (`interlectic_user_agreement.pdf` and `interlectic_course_purchase_settlement.pdf`) before deploying to production or finalizing the payment gateway application.
  - Check corporate entity details (珠海安得兴贸易有限公司 / USCC: `91440402MA56UATA95`), course prices, refund conditions, and payment processing terms to ensure exact alignment with actual production operations.

