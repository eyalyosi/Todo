'use strict'


function onInit() {
    renderTodos()
}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    // console.log('Removing Todo', todoId);

    if (!confirm('Are you sure?')) return
    removeTodo(todoId)
    renderTodos()
}

function renderTodos() {
    const todos = getTodosForDisplay()
    // if (!todos.length) {
    //     if (gFilter === 'Done') {
    //         document.querySelector('.todo-list').innerText= 'No Done Todos'
    //     } else if (gFilterBy === 'ACTIVE') {
    //         document.querySelector('.todo-list').innerText= 'No Active Todos'
    //     } else { 
    //         document.querySelector('.todo-list').innerText= 'No Todos'
    //     }
    // }

    var elDiv = document.querySelector('.status')
    if (!todos.length) {
        if (gFilterBy === 'DONE') {
            elDiv.style.display = 'block'
            elDiv.innerText = 'No Done Todos'
        } else if (gFilterBy === 'ACTIVE') {
            elDiv.style.display = 'block'
            elDiv.innerText = 'No Active Todos'
        } else {
            elDiv.innerText = 'No Todos'
            elDiv.style.display = 'block'
        }
    } else {
        elDiv.style.display = 'none'
    }

    var strHTMLs = todos.map(todo =>
        `<li class="${(todo.isDone) ? 'done' : ''}" onclick="onToggleTodo('${todo.id}')">
           ${todo.txt} 
            <button onclick="onRemoveTodo(event, '${todo.id}')">x</button>
        </li>`)
    document.querySelector('.todo-list').innerHTML = strHTMLs.join('')

    document.querySelector('.todos-total-count').innerText = getTodosCount()
    document.querySelector('.todos-active-count').innerText = getActiveTodosCount()
}


function onToggleTodo(todoId) {
    // console.log('Toggling', todoId);
    toggleTodo(todoId)
    renderTodos()
}

function onAddTodo() {

    const elTxt = document.querySelector('input[name=todoTxt]');
    const txt = elTxt.value
    if (!txt) return
    elTxt.value = ''

    const elImportance = document.querySelector('input[name=todoImportance]');
    const importance = +elImportance.value
    addTodo(txt, importance)
    elImportance.value = ''
    renderTodos()
}

function onSetFilter(filterBy) {
    // console.log('Filtering By:', filterBy);

    setFilter(filterBy)
    renderTodos()
}

function onSortBy(sortBy) {
    if (sortBy === 'NAME') {
        sortBy = 'txt'
    } else if (sortBy === 'IMPORTANCE') {
        sortBy = 'importance'
    } else {
        sortBy = 'createdAt'
    }
    setSortBy(sortBy)
    renderTodos()
}


