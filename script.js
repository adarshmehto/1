document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");

  // Load tasks from localStorage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Function to render tasks
  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
                <span class="${task.completed ? "completed" : ""}">${
        task.name
      }</span>
                <button class="completeBtn">${
                  task.completed ? "Undo" : "Complete"
                }</button>
                <button class="removeBtn">Remove</button>
            `;
      taskList.appendChild(li);

      // Mark task as completed or undo
      li.querySelector(".completeBtn").addEventListener("click", () => {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
        saveTasks();
      });

      // Remove task
      li.querySelector(".removeBtn").addEventListener("click", () => {
        tasks.splice(index, 1);
        renderTasks();
        saveTasks();
      });
    });
  }

  // Function to save tasks to localStorage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Add task
  addTaskBtn.addEventListener("click", () => {
    const taskName = taskInput.value.trim();
    if (taskName !== "") {
      tasks.push({ name: taskName, completed: false });
      renderTasks();
      saveTasks();
      taskInput.value = "";
    }
  });

  // Initial rendering of tasks
  renderTasks();
});
