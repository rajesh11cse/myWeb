import React, { useState, useEffect } from "react";
import { RangeSlider, ZoomLevelValueCont, ZoomLevelResetCont } from "../css/styled";
import { Row, Col, Button } from "react-bootstrap";
function ZoomInSlider(props: any) {
  let { handleZoomChange, zoom } = props;
  const [zoomLevel, setZoomLevel] = useState(100);

  useEffect(() => {
    // Set default zoom level to 1 when component loads
    setZoomLevel(50);
  }, []);

  useEffect(() => {
    let zoomL = (zoom / 2) * 100;
    setZoomLevel(zoomL);
  }, [zoom]);

  const handleZoom = (event: any) => {
    let newZoom = parseFloat(event.target.value);
    newZoom = Math.min(100, Math.max(10, newZoom));
    console.log("newZoom = > ", newZoom);
    setZoomLevel(newZoom);
    var zoomLevel = (newZoom * 2) / 100;
    console.log("zoomLevel = >: ", zoomLevel);
    handleZoomChange(zoomLevel);
  };

  function handleClick(event) {
    event.preventDefault(); // Prevent the default behavior of the anchor tag
    // Your custom function logic here
    setZoomLevel(100)
    handleZoomChange(1)
  }
  return (
    <div>
      <Row>
        <Col lg={6}></Col>
        <Col lg={1}>
          <ZoomLevelValueCont>
            {Math.round(zoomLevel*2)}%
          </ZoomLevelValueCont>
        </Col>
        <Col lg={2}>
          <RangeSlider value={zoomLevel} lineSize="2px" left="unset" top="49%" transform="none">
            <input
              type="range"
              min="1"
              max="100"
              value={zoomLevel}
              onChange={handleZoom}
            />
          </RangeSlider>
        </Col>
        <Col lg={1}>
          <ZoomLevelResetCont>
          <a href="#" onClick={handleClick}>Reset</a>
          </ZoomLevelResetCont>
        </Col>
        <Col lg={2}></Col>
      </Row>
    </div>
  );
}

export default ZoomInSlider;
