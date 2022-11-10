import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';

function App() {

  // 변수
  const cities = [null, "Paris", "New York", "Tokyo", "Seoul"]; // 도시 목록
  const [city, setCity] = useState(null);       // 도시
  const [weather, setWeather] = useState(null); // 날씨 DB

  // 함수
  const clickCurrent = () => { // 현재 위치 버튼 클릭
    navigator.geolocation.getCurrentPosition(async (position) => {
      let lat = position.coords.latitude;   // 위도
      let lon = position.coords.longitude;  // 경도
      let data = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=93976fd635a5ca9cfda6c66184d6d3fe`)).json();  // API
      console.log(`currentDB: `, data);
      setWeather(data);
    });
  };

  const clickCity = async () => { // 도시 버튼 클릭
    let data = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=93976fd635a5ca9cfda6c66184d6d3fe`)).json();  // API
    console.log(`cityDB:`, data);
    setWeather(data);
  };

  // 실행
  useEffect(() => {
    city === null ? clickCurrent() : clickCity();
  }, [city]);

  // 출력
  return (
    <>
      <div className='container'>
        <WeatherBox weather={weather} />
        <WeatherButton cities={cities} setCity={setCity} />
      </div>
    </>
  );

}

export default App;
