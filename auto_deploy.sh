#!/bin/bash

# Load NVM & Node environment
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

PROJECT_DIR="/home/quinton/projects/learningTech"
LOG_FILE="/home/quinton/deploy_cron.log"
PID_FILE="/tmp/auto_deploy.pid"

cd "$PROJECT_DIR" || exit 1

# Prevent concurrent deployments
if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE")
    if kill -0 "$PID" 2>/dev/null; then
        exit 0
    fi
fi

echo $$ > "$PID_FILE"

# Fetch remote status silently
git fetch origin main > /dev/null 2>&1

LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/main)

if [ "$LOCAL" != "$REMOTE" ]; then
    echo "==========================================" >> "$LOG_FILE"
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] New commit detected on origin/main!" >> "$LOG_FILE"
    echo "Local: $LOCAL -> Remote: $REMOTE" >> "$LOG_FILE"
    
    git checkout -- . >> "$LOG_FILE" 2>&1
    git pull origin main >> "$LOG_FILE" 2>&1
    bash deploy_m9.sh >> "$LOG_FILE" 2>&1
    
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Deployment completed successfully!" >> "$LOG_FILE"
fi

rm -f "$PID_FILE"
