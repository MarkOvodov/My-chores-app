const keyTaskList = 'key task list'
const keyCounter = 'key counter'
let tasks = []
let counterTask = 0

if(localStorage.getItem(keyTaskList)) {
    let tasksAsStrings = localStorage.getItem(keyTaskList)
    tasks = JSON.parse(tasksAsStrings)

    if(localStorage.getItem(keyCounter)) {
        counterTask = +localStorage.getItem(keyCounter)
    }
}

// tasks = [
//     {
//         id: 1,
//         text: 'Buy some bread'
//     },
//     {
//         id: 2,
//         text: 'Drink some water'
//     },
//     {
//         id: 3,
//         text: 'Jump from a plane'
//     }
// ]

function addNewTask() {
    const elem_input = document.getElementById('new_task');
    const task_name = elem_input.value;

    if (task_name != '' && task_name != null) {
        createNewTask(counterTask, task_name)

        tasks.push({
            id: counterTask,
            text: task_name
        })
        localStorage.setItem(keyTaskList, JSON.stringify(tasks))

        elem_input.value = '';
        counterTask++
        localStorage.setItem(keyCounter, counterTask)
    }
}

function createNewTask(taskId, text) {
    const elem_div = document.createElement('div');
    elem_div.innerHTML = `
        <input id='tch-${taskId}' type="checkbox" />
        <label for='tch-${taskId}'>${text}</label>`

    const elem_ul = document.getElementById('task_list');
    elem_ul.prepend(elem_div);
}

tasks.forEach(x => createNewTask(x.id, x.text))

const btn = document.getElementById('btn_click');
btn.onclick = addNewTask;

document.onkeydown = (ev) => {
    if (ev.code === 'Enter') {
        addNewTask();
    }
};