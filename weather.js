// open API 사이트에서 받은 KEY 코드 입력 
const API_KEY = "92014bb042cf34f71371c60e82477360";
const COORDS = "coords";

// open API 이용 
function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
}

// localStorage에 위치 저장
function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

// 위치 가져오기 성공 
function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude, 
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude)
}

// 위치 가져오기 실패 
function handleGeoError() {
    console.log("Can't access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}

// 위치 정보 가져오기 
function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        // 위치 정보가 설정 되어 있으면 그 곳에 맞는 날씨 가져오기 
        const parsedCoords = JSON.parse(loadedCoords)
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();
