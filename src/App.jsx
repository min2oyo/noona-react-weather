import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import { ClipLoader } from 'react-spinners';

function App() {

  // 변수
  const [loading, setLoading] = useState(false);                // 로딩 스피너
  const cities = [null, "Paris", "New York", "Tokyo", "Seoul"]; // 도시 목록
  const [city, setCity] = useState(null);                       // 도시
  const [weather, setWeather] = useState(null);                 // 날씨 DB

  // 함수
  const weatherDB = () => { // 도시 버튼 클릭
    navigator.geolocation.getCurrentPosition(async position => {
      setLoading(true);
      let lat = position.coords.latitude;   // 위도
      let lon = position.coords.longitude;  // 경도
      let url = `https://api.openweathermap.org/data/2.5/weather?${city === null ? `lat=${lat}&lon=${lon}` : `q=${city}`}&units=metric&appid=93976fd635a5ca9cfda6c66184d6d3fe`; // API
      let data = await (await fetch(url)).json();
      console.log(`weatherDB: `, data);
      setWeather(data);
      setLoading(false);
    });
  };

  // 실행
  useEffect(() => {
    weatherDB();
  }, [city]);

  // 출력
  return (
    <>
      <div className='container'>
        {loading ?
          <>
            <ClipLoader
              color="#f88c6b"
              loading={loading}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </>
          :
          <>
            <WeatherBox weather={weather} />
            <WeatherButton cities={cities} city={city} setCity={setCity} />
          </>
        }
      </div>
    </>
  );

}

export default App;
