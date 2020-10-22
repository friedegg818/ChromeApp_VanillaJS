const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos'

function paintToDo(text) {
    // li 속 요소 생성
    const li = document.createElement("ul");

    const delBtn = document.createElement("button");
    delBtn.innerHTML = "❌";

    const span = document.createElement("span");
    span.innerText = text;

    // li 속에 넣기 
    li.appendChild(span);
    li.appendChild(delBtn);
    
    // li 추가
    toDoList.appendChild(li);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = ""; 
}


function loadToDos() {
    const toDos = localStorage.getItem(TODOS_LS);
    if(toDos !== null) { 

    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();
