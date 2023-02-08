function Button(props) {
  
  const yardimNoktasiEkleURL = props.url;

  function handleClick(){
      window.open(yardimNoktasiEkleURL);
  }

  return (
    <div >
      <button className='button' onClick={handleClick} style={{backgroundColor:props.background, color: props.textColor}}>
        {props.name}
      </button>
    </div>
  )
}

export default Button
