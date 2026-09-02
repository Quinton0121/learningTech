#!/bin/bash
set -e

# Load NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "Using Node: $(node -v)"
echo "Using NPM: $(npm -v)"

cd /home/quinton/projects/learningTech

echo "Stopping PM2 before database operations..."
pm2 stop learningTech || true

# Safety Backup Before Any Deployment Operation
BACKUP_DIR="/home/quinton/backups"
mkdir -p "$BACKUP_DIR"
if [ -f "prisma/dev.db" ]; then
    cp "prisma/dev.db" "$BACKUP_DIR/dev_pre_deploy_$(date +%Y%m%d_%H%M%S).db"
    echo "Created pre-deploy database backup in $BACKUP_DIR"
fi

echo "Generating Prisma client and pushing schema safely..."
npx prisma generate
npx prisma db push --accept-data-loss

node sync_and_setup_m9.js

echo "Building Next.js application..."
npm run build

echo "Restarting PM2 process..."
pm2 restart learningTech || pm2 start npm --name "learningTech" -- start

echo "PM2 Status:"
pm2 status learningTech

echo "DEPLOYMENT COMPLETE!"

