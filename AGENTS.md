<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# General Agent Instructions

1. **Start by reading the HTML file:** Always begin by reading the HTML file to get to know the project.
2. **Start the project server:** After understanding the project, start the server for this project.
3. **Start Jarvis servers:** Start the servers for `c:\futu\Jarvis` (specifically, its web server using 8000 port and telegram server).
    - The web server is used for talking to the user.
    - **Crucial:** You MUST use English to talk to the user. Keep your communication concise (the user doesn't like to read).
4. **Telegram server maintenance:** Every time you finish a task, you MUST check and restart the telegram server.
5. **Report task completion:** Every time you finish a task, you MUST write a short English message to `c:\futu\Jarvis\jarvis_speech.txt` so the port 8000 web server can speak it to the user.
