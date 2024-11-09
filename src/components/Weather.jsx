import React, { useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'
const Weather = () => {
    const [loading,setloading]=useState(false)
    const [img, setimg] = useState(clear_icon)
    const [city, setcity] = useState('')
    const [temperature, settemperature] = useState(0)
    const [humidity, sethumidity] = useState(0)
    const [wind, setwind] = useState(0)
    const [location, setlocation] = useState('')
    const clickHandler = async (e, city) => {
        console.log(city)
        e.preventDefault()
        const api_key = 'ccb135d43944412e85fbe50051127be3'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
        setloading(true)
        try {
            setTimeout(async() => {
                const res = await fetch(url)
                const data = await res.json()
                console.log(data)
                const iconcode = data.weather[0].icon
                const iconurl = `https://openweathermap.org/img/wn/${iconcode}@4x.png`
                settemperature(Math.round(data.main.temp - 273.15))
                sethumidity(data.main.humidity)
                setwind(data.wind.speed)
                setlocation(data.name)
                setimg(iconurl)
                setloading(false)
            },2000)
           
        }
        catch {
            alert('City not found')
            setloading(false)
        }
    }
    const inputHandler = (e) => {
        setcity(e.currentTarget.value)
    }
    const keyHandler = (e) => {
        if (e.key === 'Enter') {
            clickHandler(e, city)
        }
    }
    return (
        <div className='weather'>
            <div className="search-bar">
                <input type='text' placeholder='Search' onChange={inputHandler} onKeyDown={(e) => keyHandler(e, city)} />
                <img src={search_icon} alt='issue' onClick={(e) => clickHandler(e, city)} />
            </div>
            <img src={img} alt="" className='weather-icon' />
            {loading ? <p>loading...</p> : <p className='temperature'>{temperature}°C</p>}
            
            <p className='location'>{location}</p>
            <div className='weather-data'>
                <div className="col">
                    <img src={humidity_icon} alt="" />
                    <div>
                        <p>{humidity} %</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={wind_icon} alt="" />
                    <div>
                        <p>{wind} Km/h</p>
                        <span>Wind</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather
