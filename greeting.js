const form = document.querySelector(".js-form");
const input = form.querySelector("input"); 
const greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";


// currentValue를 저장하여 보관 
function saveName(text){
    localStorage.setItem(USER_LS, text);
}

// form 제출 시 이벤트 
function handleSubmit(event){
    event.preventDefault();     // 기본 동작을 막음
    const currentValue = input.value;   // 사용자가 입력 한 값 
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN);  // 입력 창 보여주기 
    form.addEventListener("submit", handleSubmit);
}

// form 을 지우고 사용자의 이름을 넣어 인삿말 제공 
function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`
}

// 사용자 이름 불러오기 
function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null) {
        // User 가 없는 경우 
        askForName();
    } else {
        // User 가 있는 경우 
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();