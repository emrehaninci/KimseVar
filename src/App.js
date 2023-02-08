import { useState } from 'react';
import Harita from './components/Harita'
import Header from './components/Header'
import Button from './components/Button'
import Info from './components/Info'
import NearestPoint from './components/NearestPoint'

function App() {

  const [locationAccess, setLocationAccess] = useState(false)
  const [closestPoints, setClosestPoints] = useState(null)

  navigator.geolocation.getCurrentPosition(() => {setLocationAccess(true)}, () => {setLocationAccess(false)})

  function handlePoints(data) {
      setClosestPoints(data[0]["layer"]["feature"]["geometry"]["properties"])
  }

  return (
    <>
      <Header/>
      <Info background="#f39c12">
        <p>UYARI: Yardım toplama merkezleri verileri güncel olarak eklenmeye devam etmektedir. 
          Haritada bulunmayan yardım toplama merkezlerini haritanın altındaki 
        butondan gönderebilirsiniz.</p>
      </Info>

      {!locationAccess && <Info background="#c0392b"><p>"Konumunuz bulunamadı. Lütfen konum izni verdiğinizden emin olun."</p></Info> }
      
      <Harita handlePoints={handlePoints}/>

      {locationAccess && <Info background="#95a5a6">{closestPoints !== null && <NearestPoint point={closestPoints}/>}</Info>}

      <div className='button-container'>
        <Button name='Kan Bağışlama Noktaları' url='https://www.kanver.org/KanHizmetleri/KanBagisiNoktalari' background="#e74c3c" textColor="#ecf0f1"/>
        <Button name='Deprem Güvenli Bölgeler Haritası' url='https://www.google.com/maps/d/u/0/viewer?mid=1aQ0TJi4q_46XAZiSLggkbTjPzLGkTzQ&hl=tr&fbclid=PAAabYOXb9DOt0hhwXY4QroWWE9b4LytHAPW3pfUSjBtU1-6x7uxGq91vWj7U&ll=0%2C0&z=6' background="#1abc9c" textColor="#ecf0f1"/>
        <Button name='Afet Bilgi' url='https://www.afetbilgi.com/' background="#1abc9c" textColor="#ecf0f1"/>
        <Button name='Afet Harita' url='https://www.afetharita.com/' background="#1abc9c" textColor="#ecf0f1"/>
        <Button name='Deprem Yardım' url='https://depremyardim.com/' background="#1abc9c" textColor="#ecf0f1"/>
        <Button name='Deprem.io' url='https://deprem.io/' background="#1abc9c" textColor="#ecf0f1"/>
        <Button name='Eksik Yardım Noktası Ekle' url='https://forms.gle/9x28rvzaQeGiDTQk6' background="#3498db" textColor="#ecf0f1"/>
        <Button name='Hatalı Yardım Noktası Bildir' url='https://forms.gle/qo7ucHFj94yrmQKT9' background="#3498db" textColor="#ecf0f1"/>
      </div>
      
    </>
  );
}

export default App;
