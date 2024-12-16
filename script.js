const inputValue = document.getElementById("task");
const btn = document.getElementById("sub-btn");
const addElem = document.querySelector(".todo-elem");

// Function to save tasks to local storage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll(".todo-item span").forEach(item => {
        tasks.push(item.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        tasks.forEach(task => {
            let newElem = document.createElement("li");
            newElem.className = "todo-item";

            newElem.innerHTML = `
            <span>${task}</span>
            <button>Delete</button>
            `;

            newElem.querySelector("button").onclick = function(){
                newElem.remove();
                saveTasks();  // Update local storage after deleting
            }

            addElem.appendChild(newElem);
        });
    }
}

// Load tasks when the page loads
window.onload = function() {
    loadTasks();
};

btn.onclick = function(){
    let task = inputValue.value;

    if(task.trim() !== ""){
        let newElem = document.createElement("li");
        newElem.className = "todo-item";

        newElem.innerHTML = `
        <span>${task}</span>
        <button>Delete</button>
        `;

        newElem.querySelector("button").onclick = function(){
            newElem.remove();
            saveTasks();  // Update local storage after deleting
        }

        addElem.appendChild(newElem);
        inputValue.value = "";
        saveTasks();  // Save new task to local storage
    }
}
