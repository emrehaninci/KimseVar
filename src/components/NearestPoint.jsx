function NearestPoint({point}) {
  return (
    <div>
      <p style={{color:"#2c3e50"}}>En Yakın Yardım Toplama Noktası</p>
      <h2 style={{color:"#34495e"}}>{point["title"].toUpperCase()} </h2>
      <p style={{color:"#34495e", fontWeight:"bold"}}>{point["adress"]}</p>
    </div>
  )
}

export default NearestPoint
