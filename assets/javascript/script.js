document.addEventListener('DOMContentLoaded', function() {
    const todoInput = document.getElementById('todo-input');
    const addButton = document.getElementById('add-button');
    const todoList = document.getElementById('todo-list');
    const totalTasks = document.getElementById('total-tasks');
    const completedTasks = document.getElementById('completed-tasks');

    // Check if there are any existing tasks in localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render existing tasks
    renderTasks();

    // Function to render tasks from tasks array
    function renderTasks() {
        todoList.innerHTML = '';
        tasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span class="task-text ${task.completed ? 'completed' : ''}">${task.name}</span>
                <button class="complete-button">${task.completed ? 'Undo' : 'Complete'}</button>
                <button class="remove-button">Remove</button>
            `;
            listItem.querySelector('.complete-button').addEventListener('click', () => {
                toggleTaskCompleted(index);
            });
            listItem.querySelector('.remove-button').addEventListener('click', () => {
                removeTask(index);
            });
            todoList.appendChild(listItem);
        });
        updateTaskCount();
    }

    // Function to add a new task
    addButton.addEventListener('click', () => {
        const taskName = todoInput.value.trim();
        if (taskName !== '') {
            tasks.push({ name: taskName, completed: false });
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
            todoInput.value = '';
        }
    });

    // Function to toggle task completion
    function toggleTaskCompleted(index) {
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    // Function to remove a task
    function removeTask(index) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    // Function to update task count
    function updateTaskCount() {
        totalTasks.textContent = tasks.length;
        const completedCount = tasks.filter(task => task.completed).length;
        completedTasks.textContent = completedCount;
    }
});
            