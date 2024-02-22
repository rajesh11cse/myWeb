import React, { useEffect, useRef, useState } from "react";
import "../css/febric.css"; // Assume you have a CSS file for styling
import "../css/layout.css"; // Assume you have a CSS file for styling
import myData from "./abc.json";
import WordEdit from "./WordEdit";
import ZoomInSlider from "./ZoomInSlider";
import ZoomPage from "./ZoomPage";
import {
  SetTextBoxProperties,
  SetTextBoxControlProperties,
  SetTextBoxControlsVisibility,
  createCustomControls,
} from "./helper.js";
import EditTextBar from "./EditTextBar";
import Canvas from "./Canvas";
import { Sidebar } from "react-pro-sidebar";
import { ZoomInCont } from "../css/styled";

import { Container, Row, Col, Button } from "react-bootstrap";

function TextEditor44() {
  // Refs
  const canvasContainerRef = useRef(null);
  // Stats
  const [zoom, setZoom] = useState(1);
  const [sliderCloseStatus, setSliderCloseStatus] = useState(false);
  const [leftSliderCloseStatus, setLeftSliderCloseStatus] = useState(false);
  const [currentCanvas, setCurrentCanvas] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);

  const loadJSONData = function (c) {
    c.loadFromJSON(myData, () => {
      // Iterate over all objects in the canvas and set controls visibility
      c.getObjects().forEach((obj) => {
        if (obj.type === "textbox") {
            // Custom controls
          createCustomControls(obj, "delete")
          createCustomControls(obj, "clone")
          createCustomControls(obj, "scale")
          SetTextBoxControlProperties(obj);
          SetTextBoxControlsVisibility(obj);
        }
      });
      c.renderAll();
    });
  };

  // Zoom scaling functions
  useEffect(() => {
    const container = canvasContainerRef.current;
    // console.log("handleZoomChange2 == > ", zoom);
    container.style.transform = `scale(${zoom})`;
    container.style.transformOrigin = "top";
  }, [zoom]);
  const handleZoomChange = (value) => {
    // console.log("handleZoomChange ==>", value)
    setZoom(parseFloat(value));
  };

  // handle current active canvas
  const handleCurrentCanvas = (c) => {
    setCurrentCanvas(c);
  };

  // Add a new Text
  const addNewText = () => {
    const activeObject = currentCanvas.getActiveObject();
    if (activeObject && activeObject.type === "textbox") {
      const activeCoords = activeObject.getBoundingRect();
      const newY = activeObject.top + activeCoords.height + 10;
      addTextBox({ left: activeObject.left, top: newY });
    } else {
      addTextBox({ left: 20, top: 20 });
    }
  };

  // Function to add a textbox to the canvas
  const addTextBox = (position) => {
    let textBox = new fabric.Textbox("", {});
    SetTextBoxProperties(textBox, position);
    currentCanvas.add(textBox);
    currentCanvas.setActiveObject(textBox);
    textBox.on("mouseenter", function () {
      this.set("fill", "blue");
      currentCanvas.renderAll();
    });
    currentCanvas.renderAll();
  };

  // Remove the selected object (textbox)
  const removeObject = () => {
    const selectedObject = currentCanvas.getActiveObject();
    if (selectedObject) {
      currentCanvas.remove(selectedObject);
      currentCanvas.renderAll();
    }
  };

  // Select object
  const selectObject = (obj) => {
    setSelectedObject(obj);
  };

  // clear current canvas
  const clearCanvas = () => {
    currentCanvas.clear();
  };

  // Function to save canvas content as JSON
  const saveAsJSON = () => {
    const json = currentCanvas.toJSON(); // Convert canvas to JSON
    delete json.backgroundImage; // Remove any background image
    console.log("JSON : ", json);
  };

  // Close slider
  const closeSliderRight = () => {
    setSliderCloseStatus(!sliderCloseStatus);
  };

  const closeSliderLeft = () => {
    const slider = document.getElementById("slider");
    const container = document.getElementById("zoom-in-out");
    if (slider.style.display === "none") {
      // If the slider is closed, shift the container to the left
      container.style.left = "15%"; // Reset to center
    } else {
      // If the slider is open, shift the container to the right
      container.style.left = "calc(15% - 200px)"; // Shifted by slider width
    }
    // Toggle the display of the slider
    slider.style.display = slider.style.display === "none" ? "block" : "none";

    setLeftSliderCloseStatus(!leftSliderCloseStatus);
  };

  return (
    <div>
      <div className="editorTopCon">
        <button onClick={() => closeSliderLeft()}>Close Left</button>
        <button onClick={() => closeSliderRight()}>Close Right</button>
        <button onClick={() => addRectangle()}>Add Rectangle</button>
        <button onClick={() => addNewText()}>Add Textbox</button>
        <button onClick={() => removeObject()}> Remove </button>
        <button onClick={() => clearCanvas()}>Clear Canvas</button>
        <button onClick={saveAsJSON}>Download</button>
      </div>
      <div className="container">
        <Sidebar
          id="slider"
          collapsed={leftSliderCloseStatus}
          width="200px"
          customBreakPoint="80px"
          collapsedWidth="1px"
        >
          <div>Template1</div>
        </Sidebar>
        <div className="middle">
          <div className="canvas-container">
            <ZoomPage id="zoom-in-out" handleZoomChange={(e) => handleZoomChange(e)}/> 
            <Container fluid ref={canvasContainerRef}>
              {[1].map((_, index) => (
                <Row style={{ marginBottom: 10 }}>
                  <Col lg={12} className="d-flex justify-content-center">
                    <Canvas
                      handleCurrentCanvas={(c) => handleCurrentCanvas(c)}
                      zoom={zoom}
                      loadData={(c) => loadJSONData(c)}
                      selectObject={(c) => selectObject(c)}
                    />
                  </Col>
                </Row>
              ))}
            </Container>
          </div>
        </div>
        {/* <ZoomInSlider handleZoomChange={(e) => handleZoomChange(e)} /> */}
        <EditTextBar
          collapsed={sliderCloseStatus}
          selectedObject={selectedObject}
          currentCanvas={currentCanvas}
        />
        {/* <WordEdit selectedObject={selectedObject} handleRender={() => handleRender()}/> */}
      </div>
      {/* Its there in bootsrap also */}
    </div>
  );
}

export default TextEditor44;
