import React from 'react'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet'
import {Icon} from 'leaflet'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import homeIconPng from "./../res/images/marker-icon-green.png"
import { useState, useLayoutEffect } from 'react'
import data from "./../data/yardim-toplama-merkezleri.json";
import * as L from "leaflet";
import leafletKnn from 'leaflet-knn'
import geodata from '../data/geodata'


function Harita({handlePoints}) {

  let defaultCenter = [41.017626, 29.035311]
  let defaultZoom = 10
  let icon = new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})
  let homeIcon = new Icon({iconUrl: homeIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})
  var isNearestCalculated = false


  
  /*
  var testGeoJson = []
data.forEach((item,index)=>{
  testGeoJson.push({
      "type": "Point",
      "coordinates": [item["Location"].split(',')[0], item["Location"].split(',')[1]],
      "properties": {"province": item["Province"], "district": item["District"], "title": item["Name"],  "adress": item["Adress"]}
  })
  console.log(testGeoJson)
})*/

  
  function LocationMarker() {

    const [position, setPosition] = useState(null);
    const map = useMap();

    map.attributionControl.setPrefix('Leaflet')

    useLayoutEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());

        if(!isNearestCalculated){
          isNearestCalculated = true
          var gj = L.geoJson(geodata);
          var nearest = leafletKnn(gj).nearest(L.latLng(e.latlng["lng"], e.latlng["lat"]), 5);
          handlePoints(nearest)
        }
        
      });
    }, []);

    return position === null ? null : (
      <Marker position={position} icon={homeIcon}>
        <Popup>Konumunuz</Popup>
      </Marker>
    );
  }


  let markers=[];
  // data.forEach((item,index)=>{
  //   //console.log(item["Location"].split(',')[0])

  //   markers.push( 
  //   <Marker position={[item["Location"].split(',')[0], item["Location"].split(',')[1]]} icon={icon}>
  //     <Popup>
  //       {item["Name"]}
  //       <hr></hr>
  //       {item["Adress"]}
  //     </Popup>
  //   </Marker>
  //   )
  // })

  console.log(geodata[0])

  geodata.forEach(item =>{
    //console.log(item["Location"].split(',')[0])

    markers.push( 
    <Marker position={[item["coordinates"][0], item["coordinates"][1]]} icon={icon}>
      <Popup>
        {item["properties"]["title"]}
        <hr></hr>
        {item["properties"]["adress"]}
      </Popup>
    </Marker>
    )
  })

  return (
    <MapContainer center={defaultCenter} zoom={defaultZoom} scrollWheelZoom={true} >
      <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

    {markers}

    <LocationMarker />
    </MapContainer>
  )
}

export default Harita
