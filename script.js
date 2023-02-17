const url='http://api.openweathermap.org/data/2.5/';
const key= 'beffb96027d5fa2fc75446706367684e';
const country= 'TR';


const setQuery= (e) => {
    if(e.keyCode == '13')
        getResult(searchBar.value)
}

document.getElementById('enter').addEventListener('click',()=>{
    console.log("clicked");
    return getResult(searchBar.value);
})

const getResult= (cityName) => {
    let query=`${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`
    fetch(query)
    .then(weather => {
        return weather.json()
    })
    .then(displayResult)
}

const displayResult = (result) => {
    //console.log(result);
    let city = document.querySelector('.city')
    city.innerText = `${result.name}, ${result.sys.country}`

    let temp = document.querySelector('.temp')
    temp.innerText = `${Math.round(result.main.temp)}°C`

    let desc = document.querySelector('.desc')
    desc.innerText = result.weather[0].description

    let minmax = document.querySelector('.minmax')
    minmax.innerText = `${Math.round(result.main.temp_min)}°C/
    ${Math.round(result.main.temp_max)}°C`
    infoTxt.innerText ="";
}


const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('keypress', setQuery)


document.getElementById('konum').addEventListener('click',()=>{
    if(navigator.geolocation){
        console.log("Geolocation'ı destekliyor...")
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }else{
        console.log("Tarayıcınız geolocation'ı desteklemiyor...")
    } 
})

function fetchData(){
    infoTxt.innerText = "Sonuçlar getiriliyor..."
    infoTxt.classList.add("pending")
    fetch(api).then(response => response.json()).then(displayResult)
}
function onSuccess(position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}&lang=tr`;
    fetchData()
}

function onError(error){
    infoTxt.innerText = error.message   
    infoTxt.classList.add("error")
}

const infoTxt = document.querySelector(".info-txt");
const inputPart = document.querySelector(".input-part");