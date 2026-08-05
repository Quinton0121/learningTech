import os, re

files = ['readme.html', 'agent_knowledge_base.html', 'BUSINESS_PLAN.html']
contents = []

for f in files:
    try:
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
            body_match = re.search(r'<body[^>]*>(.*?)</body>', content, re.IGNORECASE | re.DOTALL)
            if body_match:
                contents.append(body_match.group(1))
            else:
                contents.append(content)
    except FileNotFoundError:
        contents.append(f"<p>File {f} not found.</p>")

html_template = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Consolidated Project Documentation</title>
<style>
  body {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 0; display: flex; height: 100vh; color: #333; }}
  #sidebar {{ width: 250px; background: #1e293b; color: white; padding: 20px; overflow-y: auto; flex-shrink: 0; }}
  #sidebar h2 {{ margin-top: 0; font-size: 1.2rem; border-bottom: 1px solid #334155; padding-bottom: 10px; }}
  .nav-btn {{ display: block; width: 100%; text-align: left; background: none; border: none; color: #cbd5e1; padding: 10px; margin-bottom: 5px; cursor: pointer; border-radius: 5px; font-size: 1rem; }}
  .nav-btn:hover {{ background: #334155; color: white; }}
  .nav-btn.active {{ background: #3b82f6; color: white; font-weight: bold; }}
  #content {{ flex: 1; padding: 40px; overflow-y: auto; background: #f8fafc; }}
  .section {{ display: none; max-width: 900px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }}
  .section.active {{ display: block; }}
  .todo-item {{ display: flex; align-items: center; margin-bottom: 15px; padding: 10px; border-radius: 6px; background: #f1f5f9; }}
  .todo-item input[type="checkbox"] {{ margin-right: 15px; transform: scale(1.5); cursor: pointer; }}
  .todo-item label {{ font-size: 1.1rem; cursor: pointer; flex: 1; }}
  .todo-item input[type="checkbox"]:checked + label {{ text-decoration: line-through; color: #94a3b8; }}
</style>
</head>
<body>

<div id="sidebar">
  <h2>Project Docs</h2>
  <button class="nav-btn active" onclick="showSection('readme', this)">Readme</button>
  <button class="nav-btn" onclick="showSection('knowledge', this)">Knowledge Agent</button>
  <button class="nav-btn" onclick="showSection('business', this)">Business Plan</button>
  <button class="nav-btn" onclick="showSection('todo', this)">Todo List</button>
</div>

<div id="content">
  <div id="readme" class="section active">
    {contents[0]}
    <h2>Platform Features Guide</h2>
    <h3>🌍 Public vs 🔒 Private Courses</h3>
    <p>By default, all new courses you create are <strong>Private</strong>. Private courses are only accessible to you and the specific students you connect to them. If you want to sell or share your course materials with other educators on the Marketplace, you can toggle the course to <strong>Public</strong> directly from your dashboard!</p>

    <h3>⏳ Course Expiration Rules</h3>
    <p>To prevent quota recycling and ensure a fair ecosystem, each course has a strict 13-month lifecycle. The countdown starts the moment the <strong>first student</strong> enrolls in the course.</p>
    <p>After 13 months, the course is permanently <strong>Archived (Expired)</strong>. You will no longer be able to start the class, bulk import students, or invite new students. To continue teaching the material for the next academic year, you must use the <strong>Copy Course</strong> feature to create a fresh instance and consume new quotas.</p>

    <h3>⚡ Quick Login (Student Auto-Login)</h3>
    <p>The Quick Login feature allows students to join your live class without typing passwords!</p>
    <ol>
        <li>Visit the <code>/setup</code> page on each physical student device to assign it a unique <code>PC_ID</code>.</li>
        <li>Upload a CSV mapping your students to their assigned <code>PC_ID</code>.</li>
        <li>Click <strong>Enable Quick Login</strong> on your dashboard. When students open the platform on their assigned PC, they will be logged in automatically!</li>
    </ol>
  </div>
  
  <div id="knowledge" class="section">
    {contents[1]}
  </div>
  
  <div id="business" class="section">
    {contents[2]}
  </div>
  
  <div id="todo" class="section">
    <h1>Project Todo List</h1>
    <p>Track your remaining tasks here. Your progress will be saved in the browser.</p>
    <div id="todo-list">
        <!-- JS will render todos here -->
    </div>
    
    <div style="margin-top: 20px; display: flex; gap: 10px;">
        <input type="text" id="new-task" placeholder="Add a new task..." style="flex: 1; padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 1rem;">
        <button onclick="addTask()" style="padding: 10px 20px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem;">Add</button>
    </div>
  </div>
</div>

<script>
  function showSection(id, btn) {{
    document.querySelectorAll('.section').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    btn.classList.add('active');
  }}

  // Simple LocalStorage Todo List
  let todos = JSON.parse(localStorage.getItem('my_todos')) || [
      {{ id: 1, text: "Check Quick Login functionality", done: false }},
      {{ id: 2, text: "Verify course expiration rules", done: false }},
      {{ id: 3, text: "Organize HTML documentation", done: true }}
  ];

  function renderTodos() {{
      const list = document.getElementById('todo-list');
      list.innerHTML = '';
      todos.forEach(todo => {{
          list.innerHTML += `
            <div class="todo-item">
                <input type="checkbox" id="task-${{todo.id}}" ${{todo.done ? 'checked' : ''}} onchange="toggleTask(${{todo.id}})">
                <label for="task-${{todo.id}}">${{todo.text}}</label>
                <button onclick="deleteTask(${{todo.id}})" style="background:transparent; border:none; color:#ef4444; cursor:pointer;">✖</button>
            </div>
          `;
      }});
      localStorage.setItem('my_todos', JSON.stringify(todos));
  }}

  function toggleTask(id) {{
      const todo = todos.find(t => t.id === id);
      if (todo) todo.done = !todo.done;
      renderTodos();
  }}

  function addTask() {{
      const input = document.getElementById('new-task');
      if (!input.value.trim()) return;
      todos.push({{ id: Date.now(), text: input.value.trim(), done: false }});
      input.value = '';
      renderTodos();
  }}

  function deleteTask(id) {{
      todos = todos.filter(t => t.id !== id);
      renderTodos();
  }}

  // Initial render
  renderTodos();
</script>

</body>
</html>'''

with open('DOCUMENTATION.html', 'w', encoding='utf-8') as f:
    f.write(html_template)
print("Documentation consolidated successfully into DOCUMENTATION.html")
