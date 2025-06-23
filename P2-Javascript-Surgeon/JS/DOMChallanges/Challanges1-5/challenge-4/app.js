const taskInput = document.getElementById('taskInput')
const addButton = document.getElementById('addButton')
const taskList = document.getElementById('taskList')
const completedTasks = document.getElementById('completedTasks')
const totalTasks = document.getElementById('totalTasks')
const emptylistMain = document.querySelector('.empty-list')

addButton.addEventListener('click', () => {
    const task = taskInput.value.trim()
    
    if(!task) {
        return
    }
    
    const [taskli, delBtn] = createTask(task)
    taskList.appendChild(taskli)
    
    const taskItemsInp = document.querySelectorAll('li input')
    
    const {totalCount} = updateStats(taskItemsInp)
    
    const emptylist = document.querySelector('.empty-list')
    if(emptylist && totalCount > 0) {
        taskList.removeChild(emptylist)
    }
    
    markCheckUncheck(taskItemsInp)

    delBtn.addEventListener('click', () => deleteTask(taskli))

    taskInput.value = ''
})


function createTask(task) {
    const taskli = document.createElement('li')
    
    const [taskCheck, taskText] = createTaskCheckInp(task)
    const delBtn = createDeleteBtn()

    taskli.classList.add('task-item')
    taskli.appendChild(taskCheck)
    taskli.appendChild(taskText)
    taskli.appendChild(delBtn)

    return [taskli, delBtn]
}

function createTaskCheckInp(task) {
    const taskCheck = document.createElement('input')
    const taskText = document.createElement('label')
    const randomId = `${task}-${Math.random()}`

    taskText.setAttribute('for', randomId)
    taskText.textContent = task
    taskText.classList.add('task-text')

    taskCheck.setAttribute('id', randomId)
    taskCheck.setAttribute('type', 'checkbox')
    taskCheck.classList.add('complete-checkbox')

    return [taskCheck, taskText]
}

function createDeleteBtn() {
    const delBtn = document.createElement('button')

    delBtn.innerText = 'Delete'
    delBtn.classList.add('delete-button')

    return delBtn
}

function deleteTask(taskli) {
    taskList.removeChild(taskli)

    const taskItemsInp = document.querySelectorAll('li input')
    const {totalCount, checkedCount} = updateStats(taskItemsInp)

    if(totalCount <= 0){
        taskList.appendChild(emptylistMain)
    }
}

function getStats(taskItems) {
    let checkedCount = 0;
    let totalCount = 0

    for (const task of taskItems) {
        if(task.checked){
            checkedCount++
        }
        totalCount++
    }

    return {totalCount, checkedCount}
}

function updateStats(taskItems) {
    const {totalCount, checkedCount} = getStats(taskItems)

    completedTasks.textContent = `Completed: ${checkedCount}`
    totalTasks.textContent = `Total tasks: ${totalCount}`

    return {totalCount}
}

function markCheckUncheck(taskItems) {
    taskItems.forEach((item) => {
        item.addEventListener('click', (e) => {
            if (e.target.checked) {
                item?.labels[0]?.classList.add('completed') 
            }else {
                item?.labels[0]?.classList.remove('completed')
            }
            updateStats(taskItems)
        })
    })

}