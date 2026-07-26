# learningTech (EduSphere)

A modern, full-duplex synchronized learning platform for educators and learners. Features real-time slide synchronization, presence tracking, and touch-optimized interfaces.

## Setup Instructions for a New Computer

Because we use `.gitignore` to protect sensitive information, you must manually copy your sensitive files when cloning this repository to a new computer. Follow these exactly 5 steps:

1. **Add your Environment Variables:**
   Copy your local `.env` file (which contains your `JWT_SECRET` and `DATABASE_URL`) into the main project folder.

2. **Add your Database:**
   Copy your local SQLite database file (`dev.db`) into the `prisma/` folder.

3. **Install Dependencies:**
   Run the following command in the terminal to download all the open-source libraries:
   ```bash
   npm install
   ```

4. **Generate Prisma Client:**
   Run the following command so the new computer understands your database schema:
   ```bash
   npx prisma generate
   ```

5. **Start the Development Server:**
   Finally, start the local server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture & Bug Fixes

Please review the `agent_knowledge_base.html` file in the root directory for a complete development log, including:
- Smart Sync Polling logic.
- iOS Safari modal clipping bugs.
- Next.js 15 local network cross-origin fixes.
