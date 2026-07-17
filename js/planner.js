/* =========================================================
   Academic Planner — add / complete / delete tasks.
   Tasks are held in an array and persisted to localStorage so
   the list survives a page refresh.
   ========================================================= */

const STORAGE_KEY = 'cos106_planner_tasks';

let tasks = loadTasks();

const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const dueInput = document.getElementById('task-due');
const list = document.getElementById('task-list');

if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    addTask(input.value, dueInput.value);
    form.reset();
    input.focus();
  });

  list.addEventListener('click', event => {
    const checkBtn = event.target.closest('.task-check');
    const deleteBtn = event.target.closest('.task-delete');

    if (checkBtn) toggleComplete(Number(checkBtn.closest('.task-item').dataset.id));
    if (deleteBtn) deleteTask(Number(deleteBtn.closest('.task-item').dataset.id));
  });

  renderTasks();
}

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function addTask(text, dueDate) {
  const trimmed = text.trim();
  if (!trimmed) return;

  tasks.push({
    id: Date.now(),
    text: trimmed,
    dueDate: dueDate || '',
    completed: false,
  });

  saveTasks();
  renderTasks();
}

function toggleComplete(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

function formatDate(isoDate) {
  if (!isoDate) return '';
  const date = new Date(`${isoDate}T00:00:00`);
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

function renderTasks() {
  list.innerHTML = '';

  if (tasks.length === 0) {
    list.innerHTML = '<li class="empty-state">No tasks yet — add your first one above.</li>';
    updateStats();
    return;
  }

  tasks.forEach(task => {
    const item = document.createElement('li');
    item.className = `task-item${task.completed ? ' completed' : ''}`;
    item.dataset.id = task.id;

    item.innerHTML = `
      <button class="task-check" aria-label="Toggle complete"></button>
      <span class="task-text">${escapeHtml(task.text)}</span>
      ${task.dueDate ? `<span class="task-due">Due ${formatDate(task.dueDate)}</span>` : ''}
      <button class="task-delete" aria-label="Delete task">&times;</button>
    `;

    list.appendChild(item);
  });

  updateStats();
}

function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;

  document.getElementById('stat-total').textContent = total;
  document.getElementById('stat-completed').textContent = completed;
  document.getElementById('stat-pending').textContent = total - completed;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
