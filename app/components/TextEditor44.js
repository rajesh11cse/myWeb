import React, { useEffect, useRef, useState } from "react";
import "../css/febric.css"; // Assume you have a CSS file for styling
import "../css/layout.css"; // Assume you have a CSS file for styling
import myData from "./abc.json";
import {Playground} from "./Playground";
import ZoomPage from "./ZoomPage";
import {
  SetTextBoxProperties,
  borderControl,
  cornerControl,
  SetRectBoxProperties,
  SetLineProperties,
} from "./helper.js";
import EditTextBar from "./EditTextBar";
import Canvas from "./Canvas";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
function TextEditor44() {
  // Refs
  const canvasContainerRef = useRef(null);
  // Stats
  const [zoom, setZoom] = useState(1);
  const [sliderCloseStatus, setSliderCloseStatus] = useState(false);
  const [leftSliderCloseStatus, setLeftSliderCloseStatus] = useState(false);
  const [currentCanvas, setCurrentCanvas] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [canvasHistory, setCanvasHistory] = useState([]);
  const loadJSONData = function (c) {
    c.loadFromJSON(myData, () => {
      c.getObjects().forEach((obj) => {
        console.log(obj.type);
        borderControl(obj);
        cornerControl(obj);
      });
      c.renderAll();
    });
  };

  // Zoom scaling functions
  useEffect(() => {
    const container = canvasContainerRef.current;
    container.style.transform = `scale(${zoom})`;
    container.style.transformOrigin = "top";
  }, [zoom]);
  const handleZoomChange = (value) => {
    setZoom(parseFloat(value));
  };

  // handle current active canvas
  const handleCurrentCanvas = (c) => {
    setCurrentCanvas(c);
    console.log("==>>", c.current);
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

  const addRectangle = () => {
    let rectBox = new fabric.Rect("", {});
    SetRectBoxProperties(rectBox, { left: 20, top: 20 });
    currentCanvas.add(rectBox);
    currentCanvas.setActiveObject(rectBox);
    currentCanvas.renderAll();
  };

  const addLine = () => {
    var line = new fabric.Line([50, 50, 200, 50]);
    SetLineProperties(line, { left: 20, top: 100 });
    currentCanvas.add(line);
    currentCanvas.setActiveObject(line);
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
    setLeftSliderCloseStatus(!leftSliderCloseStatus);
  };

  // Function to undo
  const undo = () => {
    console.log("anvasHistory ==> ", canvasHistory.length);
    if (canvasHistory.length > 1) {
      const previousState = canvasHistory[canvasHistory.length - 2];
      setCanvasHistory((prevHistory) => prevHistory.slice(0, -1));
      // const canvas = canvasRef.current;
      if (currentCanvas) {
        currentCanvas.clear();
        currentCanvas.loadFromJSON(previousState);
        currentCanvas.renderAll();
      }
    }
  };

  // Function to redo
  const redo = () => {
    const currentState = canvasHistory[canvasHistory.length - 1];
    // const canvas = canvasRef.current;
    if (currentCanvas && currentState) {
      currentCanvas.clear();
      currentCanvas.loadFromJSON(currentState);
      currentCanvas.renderAll();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
      const imgObj = new Image();
      imgObj.src = event.target.result;
      
      imgObj.onload = function() {
        const imgInstance = new fabric.Image(imgObj);
        imgInstance.set({
          left: 100,
          top: 100,
        });
        currentCanvas.add(imgInstance);
      };
    };
    
    reader.readAsDataURL(file);
  };

  function makeObject(type){
      if (type == "rect"){
        addRectangle()
      } else if (type == "line"){
        addLine()
      } else if (type == "text"){
        addNewText()
      }
  }

  return (
    <div>
      <div className="editorTopCon">
        <button onClick={() => undo()}>Undo</button>
        <button onClick={() => redo()}>Redo</button>
        {/* <button onClick={() => removeObject()}> Remove </button> */}
        <Button variant="outline-success" size="sm" onClick={() => closeSliderLeft()}>Close L</Button>{' '}
        <Button variant="outline-success" size="sm" onClick={() => closeSliderRight()}>Close R</Button>{' '}
        <Button variant="outline-success" size="sm">Clear</Button>{' '}
        <Button variant="outline-success" size="sm" onClick={saveAsJSON}>Save</Button>{' '}
        <Button variant="outline-primary" size="sm">Download</Button>{' '}
      </div>
      <div className="container" style={{padding: 0}}>
        <Playground collapsed={leftSliderCloseStatus} makeObject={makeObject}/>
        <div className="middle">
          <div className="canvas-container">
            <ZoomPage
              id="zoom-in-out"
              handleZoomChange={(e) => handleZoomChange(e)}
            />
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
        {/* <Playground2 collapsed={sliderCloseStatus}/> */}
        <EditTextBar
          collapsed={sliderCloseStatus}
          selectedObject={selectedObject}
          currentCanvas={currentCanvas}
        />
      </div>
    </div>
  );
}

export default TextEditor44;
