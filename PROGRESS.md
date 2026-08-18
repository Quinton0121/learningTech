# Learning Tech Project Progress & Handoff Summary

**Date**: 2026-08-18

---

## 1. Project Status Overview
- **Repository**: Quinton0121/learningTech & Quinton0121/Jarvis
- **Local Dev Server**: Next.js running on http://localhost:3000 (Port 3000)
- **Jarvis Servers**: Web Server running on Port 8000; Telegram listener operational.
- **Git Status**: All latest local changes committed and pushed to GitHub for both repositories.

---

## 2. Remote Machine Setup (M9 / Minisforum)
- **Remote Host**: quinton@192.168.31.53 (quinton-M9)
- **SSH Access**: Passwordless SSH key authentication established (id_ed25519).
- **Synced Code**: Both learningTech and Jarvis projects copied/cloned to ~/projects/ on the M9 machine.
- **Cloudflare CLI (cloudflared)**: Installed in ~/bin/cloudflared (version 2026.8.2), added to PATH in ~/.bashrc.

---

## 3. Current Progress on Cloudflare Tunnel & Domain Deployment
- **Domain Purchase**: Domain purchased via Spaceship.
- **Pending Actions**:
  1. Add domain to Cloudflare Dashboard (dash.cloudflare.com).
  2. Change domain Nameservers in Spaceship Dashboard to the 2 Cloudflare Nameservers.
  3. Run ~/bin/cloudflared tunnel login on M9, open authorization URL in browser, and select domain.
  4. Create Cloudflare Tunnel (cloudflared tunnel create learningtech), configure config.yml pointing to http://localhost:3000, route DNS, and install as system service (cloudflared service install).

---

## 4. Production Architecture Recommendations
- **Database**: Migrate from SQLite (dev.db) to PostgreSQL / Prisma Postgres for high concurrent write performance (500+ active users).
- **Process Manager**: Use PM2 or Docker (docker-compose) for auto-restart on boot.
- **Backups & Security**: Set up automated daily backups for DB and media; enable Cloudflare DDoS & WAF protections.
