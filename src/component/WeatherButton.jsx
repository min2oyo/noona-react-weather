import { Button } from 'react-bootstrap';

const WeatherButton = ({ cities, city, setCity }) => {

  // 출력
  return (
    <>
      <div>
        {cities.map(item => (
          <Button key={item} variant={item === city ? "dark" : "primary"} onClick={() => setCity(item)}>{item === null ? `Current Location` : item}</Button>
        ))}
      </div>
    </>
  );

};

export default WeatherButton;