const cityName = document.getElementById('cityName')
const submitBtn = document.getElementById('submitBtn')

const city_name = document.getElementById('city_name')

const temp = document.getElementById('temp')

const temp_status = document.getElementById('temp_status')

const datahide = document.querySelector('.middle_layer')

const getInfo = async(event) => {
    event.preventDefault();

    let cityVal = cityName.value;
 
    if(cityVal === ''){
        city_name.innerText = `Plz write the name before search`
        datahide.classList.add('data_hide')
    }else{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=1af77fe152bea2a7f96f45b102c97dbf`
            const response = await fetch(url);
            const data = await response.json()

            const arrData = [data]
            // console.log(arrDatadata)
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`
            temp_real_val.innerText = arrData[0].main.temp;
            temp_status.innerText = arrData[0].weather[0].main

            const tempMood = arrData[0].weather[0].main;

            console.log(tempMood)

            if(tempMood == 'Clear') {
                temp_status.innerHTML = '<i class="fa-solid fa-sun" style="color: #eccc68"></i>'
            } else if(tempMood == "Clouds") {
                temp_status.innerHTML = '<i class="fa-solid fa-cloud" style="color: #f1f2f6"></i>'
            }else if(tempMood == "Rain") {
                temp_status.innerHTML = '<i class="fa-solid fa-cloud-showers-heavy" style="color: #a4b0be"></i>'
            }else if(tempMood == "Haze") {
                temp_status.innerHTML = '<i class="fa-solid fa-smog"></i>'
            }else{
                temp_status.innerHTML = '<i class="fa-solid fa-cloud" style = "#f1f2f6"></i>'
            }
            datahide.classList.remove('data_hide')
        }catch{
            cityName.innerText = `Plz enter the city name properly`
            datahide.classList.add('data_hide')
        }


    }
}

submitBtn.addEventListener('click',getInfo);