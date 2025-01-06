const taskInput = document.getElementById("newTask");
const submitButton = document.getElementById("submitButton");
const taskList = document.getElementById("todo-list");

taskList.addEventListener('dragstart', handleDragStart);
taskList.addEventListener('dragover', handleDragOver);
taskList.addEventListener('drop', handleDrop);
taskList.addEventListener('dragend', handleDragEnd);

document.addEventListener('DOMContentLoaded', loadTasks);

taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();

        submitButton.click();
    }
});

submitButton.addEventListener('click', function(e) {
    e.preventDefault();

    const newTask = taskInput.value;

    if (newTask.trim() !== '') {
        const li = document.createElement('li');
        li.textContent = newTask;
        li.setAttribute('draggable', true);
        saveTaskToLocalStorage(newTask);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Complete';
        deleteButton.style.marginLeft = '10px';
        li.appendChild(deleteButton);

        taskList.appendChild(li);

        taskInput.value = '';

        deleteButton.addEventListener('click', () => {
            taskList.removeChild(li);
            removeTaskFromLocalStorage(task);
        });

        li.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            showEditInput(li);
        });

    }
});

function showEditInput(taskElement) {
    const currentText = taskElement.textContent.replace('Complete', '').trim();
    const editInput = document.createElement('input');
    editInput.value = currentText;
    editInput.style.marginRight = '10px';

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', () => {
        const newTaskText = editInput.value.trim();
        if (newTaskText !== '') {
            // Update task text and remove existing children
            taskElement.innerHTML = ''; // Clear current content
            taskElement.textContent = newTaskText;

            // Recreate the Complete button
            const completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.style.marginLeft = '10px';
            taskElement.appendChild(completeButton);

            // Add event listener to remove task when clicked
            completeButton.addEventListener('click', () => {
                taskList.removeChild(taskElement);
                removeTaskFromLocalStorage(newTaskText);
            });

            // Re-add the Save button if it's needed (this part can be removed after saving)
            // Task has been saved already, so no need for save button anymore
            saveTaskToLocalStorage(newTaskText); // Save updated task
        }
    });

    taskElement.innerHTML = ''; // Clear current content
    taskElement.appendChild(editInput);
    taskElement.appendChild(saveButton);
}

function handleDragStart(e) {
    e.target.classList.add('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    const draggingElement = document.querySelector('.dragging');
    const closestElement = getClosestElement(taskList, e.clientY);
    if (closestElement == null) {
        taskList.appendChild(draggingElement);
    } else {
        taskList.insertBefore(draggingElement, closestElement);
    }
}

function handleDrop() {
    document.querySelector('.dragging').classList.remove('dragging');
    saveTasksOrderToLocalStorage();
}

function handleDragEnd() {
    document.querySelector('.dragging').classList.remove('dragging');
}

function getClosestElement(container, y) {
    const elements = [...container.querySelectorAll('li:not(.dragging)')];

    return elements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(addTaskToDOM);
}

function removeTaskFromLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}