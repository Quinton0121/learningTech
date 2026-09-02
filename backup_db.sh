#!/bin/bash
BACKUP_DIR="/home/quinton/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
DB_PATH="/home/quinton/projects/learningTech/prisma/dev.db"

mkdir -p "$BACKUP_DIR"

if [ -f "$DB_PATH" ]; then
    cp "$DB_PATH" "$BACKUP_DIR/db_backup_$TIMESTAMP.db"
    gzip -f "$BACKUP_DIR/db_backup_$TIMESTAMP.db"
    echo "[$(date)] Backup completed: $BACKUP_DIR/db_backup_$TIMESTAMP.db.gz"
    find "$BACKUP_DIR" -type f -name "db_backup_*.db.gz" -mtime +30 -delete
fi

