/* Edgar (Lin Zheng) */
let tasks = [];

function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    
    if (taskText !== '') {
        tasks.push({
            id: Date.now(),
            text: taskText,
            completed: false
        });
        input.value = '';
        renderTasks();
    }
}

function removeTask(taskId) {
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            return { ...task, removed: true };
        }
        return task;
    });
    renderTasks();
}

function toggleComplete(taskId) {
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = `task-item ${task.removed ? 'removed' : ''}`;
        taskElement.innerHTML = `
            <div class="task-text">${task.text}</div>
            <button onclick="removeTask(${task.id})" class="action-btn">Remove</button>
            <button onclick="toggleComplete(${task.id})" class="action-btn">Complete</button>
        `;
        taskList.appendChild(taskElement);
    });
}

// 添加回车键支持
document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
}); 