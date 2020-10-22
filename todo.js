const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos'

// 해야 할 일을 생성 할 때 마다 이곳에 저장 
let toDos = [];

function deleteToDo(event) {
    // HTML에서 삭제 
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);

    // localStroage에서 완전히 삭제 
    // filter : array의 모든 아이템을 통해 함수를 실행 하고 true인 아이템들만 가지고 새로운 array를 만듦 
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });

    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    // localStorage 는 자바스크립트의 Data를 저장 할 수 없음. String만 저장 
    // JSON.stringify : Object 를 String 으로 바꿔 줌 
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));  
}

function paintToDo(text) {
    // li 속 요소 생성
    const li = document.createElement("ul");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;

    // li 속에 넣기 
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    
    // li 추가
    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId
    };

    // toDos Array 안에 요소 넣어줌 
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = ""; 
}


function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null) { 
        // String 을 Object 로 다시 변환 
        const parsedToDos = JSON.parse(loadedToDos);

        // forEach : Array가 가지는 함수. 각각의 요소마다 지정한 함수 실행
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();
