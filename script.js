document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const themeToggleButton = document.getElementById('themeToggleButton');

    // Function to set a random background image
    const setRandomBackgroundImage = () => {
        const images = ['todo-bg.jpg', 'todo2bg.jpg', 'todo3bg.jpg', 'todo4bg.jpg', 'todo5bg.jpg'];        const randomIndex = Math.floor(Math.random() * images.length);
        document.body.style.backgroundImage = `url('images/${images[randomIndex]}')`;
    };

    // Load tasks from local storage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task));
    };

    // Save tasks to local storage
    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll('li').forEach(taskItem => {
            tasks.push({
                text: taskItem.querySelector('.task-text').textContent,
                priority: taskItem.dataset.priority,
                completed: taskItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Add task to DOM
    const addTaskToDOM = (task) => {
        const taskItem = document.createElement('li');
        taskItem.dataset.priority = task.priority;
        taskItem.className = task.completed ? 'completed' : '';

        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = task.text;

        const taskActions = document.createElement('div');
        taskActions.className = 'task-actions';

        const editButton = document.createElement('button');
        editButton.className = 'edit';
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editTask(taskItem));

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(taskItem));

        const completeButton = document.createElement('button');
        completeButton.className = 'complete';
        completeButton.textContent = task.completed ? 'Undo' : 'Complete';
        completeButton.addEventListener('click', () => toggleComplete(taskItem));

        taskActions.append(editButton, deleteButton, completeButton);
        taskItem.append(taskText, taskActions);
        taskList.appendChild(taskItem);
    };

    // Add new task
    const addTask = () => {
        const taskText = taskInput.value.trim();
        const taskPriority = prioritySelect.value;
        if (taskText === '') return;

        const newTask = {
            text: taskText,
            priority: taskPriority,
            completed: false
        };

        addTaskToDOM(newTask);
        saveTasks();
        taskInput.value = '';
        prioritySelect.value = 'low';
    };

    // Edit task
    const editTask = (taskItem) => {
        const newTaskText = prompt('Edit task', taskItem.querySelector('.task-text').textContent);
        if (newTaskText === null) return; // Cancel button pressed

        taskItem.querySelector('.task-text').textContent = newTaskText;
        saveTasks();
    };

    // Delete task
    const deleteTask = (taskItem) => {
        taskList.removeChild(taskItem);
        saveTasks();
    };

    // Toggle complete/incomplete status
    const toggleComplete = (taskItem) => {
        taskItem.classList.toggle('completed');
        const completeButton = taskItem.querySelector('.complete');
        completeButton.textContent = taskItem.classList.contains('completed') ? 'Undo' : 'Complete';
        saveTasks();
    };

    // Toggle between dark mode and light mode
    const toggleTheme = () => {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
    };

    addTaskButton.addEventListener('click', addTask);
    themeToggleButton.addEventListener('click', toggleTheme);
    setRandomBackgroundImage();
    loadTasks();

    // Set initial theme
    document.body.classList.add('light-mode');
});
