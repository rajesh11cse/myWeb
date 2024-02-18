import React, {useState, useEffect} from 'react';
import "../css/zoomSlider.css";
function ZoomInSlider(props:any) {
  let {handleZoomChange} = props
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    // Set default zoom level to 1 when component loads
    setZoomLevel(1);
  }, []);

  const handleZoom = (event:any) => {
    let newZoom = parseFloat(event.target.value);
    newZoom = Math.min(1.5, Math.max(0.5, newZoom));
    setZoomLevel(newZoom);

    handleZoomChange(zoomLevel)
  };
  return (
    <div>
      <div className="zoom-slider-container">
      <input
        type="range"
        min="0.5"
        max="1.5"
        step="0.1"
        value={zoomLevel}
        className="zoom-slider"
        onChange={handleZoom}
      />
      <label htmlFor="zoomRange" className="zoom-label">Zoom Level: {zoomLevel*100}%</label>
    </div>
      </div>
  );
}

export default ZoomInSlider;
