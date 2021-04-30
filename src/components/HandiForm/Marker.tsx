import React , { useState } from 'react';
import './Marker.css';

const Marker = (props: any) => {
    const { color, name, id,markerInfo } = props;
    const [markerFlag, setMarkerFlag] = useState(false)
    const showMarkerInfo = () =>{
        console.log("info",markerInfo)
        setMarkerFlag((prevState=> !prevState))
    }
    return (
      <>
        {markerFlag && <div className="info-box">
          <div><b>Latitude:</b> {markerInfo.lat}</div>
          <div><b>Longitude:</b> {markerInfo.lng}</div>
          <div><b>Distance:</b> {markerInfo.distance}</div>
        </div>}
        <div  onMouseOver={showMarkerInfo} onMouseOut={showMarkerInfo}>
        <div
          className="pin bounce"
          style={{ backgroundColor: color, cursor: 'pointer' }}
          title={name}
        />
        <div className="pulse" />
      </div>
      </>
      
    );
  };

  export default Marker;