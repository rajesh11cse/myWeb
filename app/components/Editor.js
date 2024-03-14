import React, { useEffect, useRef, useState } from "react";
import "../css/febric.css"; // Assume you have a CSS file for styling
import "../css/layout.css"; // Assume you have a CSS file for styling
import myData from "./abc.json";
import { Playground } from "./Playground";
import ZoomPage from "./ZoomPage";
import { fabric } from "fabric";
import { GetStyledClass, GetBodyContent } from "./htmlData";

GetStyledClass;

import {
  SetTextBoxProperties,
  borderControl,
  cornerControl,
  SetRectBoxProperties,
  SetLineProperties,
  SetHeadingTextProperties,
  SetImageProperties,
} from "./helper.js";
import EditTextBar from "./EditTextBar";
import { TopPanel } from "./TopPanel";
import Canvas from "./Canvas";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

function Editor() {
  // Refs
  const canvasContainerRef = useRef(null);
  // Stats
  const [zoom, setZoom] = useState(1);
  const [sliderCloseStatus, setSliderCloseStatus] = useState(false);
  const [leftSliderCloseStatus, setLeftSliderCloseStatus] = useState(false);
  const [currentCanvas, setCurrentCanvas] = useState(null);
  const [currentCanvasRef, setCurrentCanvasRef] = useState(null);

  const [selectedObject, setSelectedObject] = useState(null);

  // For undo and redo only
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const [canvases, setCanvases] = useState([]);

  let canvasRefs = [];
  for (let i = 0; i < 10; i++) {
    canvasRefs.push(useRef(null));
  }
  const loadJSONData = function (c, index) {
    if (index == 2) {
      return;
    }
    const data = JSON.parse(localStorage.getItem("jsonData"));
    console.log("data == > , ", data);
    if (data != null) {
      fabric.util.enlivenObjects(data.objects, (objs) => {
        objs.forEach((item) => {
          c.add(item);
          if (item.type == "rect") {
            c.sendToBack(item);
          }
          borderControl(item);
          cornerControl(item);
        });
        console.log("json data loads done");
        c.renderAll(); // Make sure to call this once you're ready!
      });
    } else {
      fabric.util.enlivenObjects(myData.objects, (objs) => {
        objs.forEach((item) => {
          c.add(item);
          borderControl(item);
          cornerControl(item);
        });
        c.renderAll(); // Make sure to call this once you're ready!
      });
    }
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
  const handleCurrentCanvas = (c, index) => {
    setCanvases((prevCanvases) => [...prevCanvases, c]);
    setCurrentCanvas(c);
    setCurrentCanvasRef(canvasRefs[index - 1]);
  };

  // Add a new Text
  const addNewText = () => {
    const activeObject = currentCanvas.getActiveObject();
    if (activeObject) {
      const activeCoords = activeObject.getBoundingRect();
      const newY = activeObject.top + activeCoords.height + 10;
      addTextBox({ left: activeObject.left + 10, top: newY });
    } else {
      addTextBox({ left: 20, top: 20 });
    }
  };

  // Create header or title
  const addTitle = () => {
    const activeObject = currentCanvas.getActiveObject();
    if (activeObject && activeObject.type === "text") {
      const activeCoords = activeObject.getBoundingRect();
      const newY = activeObject.top + activeCoords.height + 10;
      createTitle({ left: activeObject.left, top: newY });
    } else {
      createTitle({ left: 20, top: 20 });
    }
  };

  const createTitle = (position) => {
    let title = new fabric.IText("", {});
    SetHeadingTextProperties(title, position);
    currentCanvas.add(title);
    currentCanvas.setActiveObject(title);
    title.on("mouseenter", function () {
      this.set("fill", "blue");
      currentCanvas.renderAll();
    });
    currentCanvas.renderAll();
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
    currentCanvas.sendToBack(rectBox);
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
    localStorage.setItem("jsonData", JSON.stringify(json));
  };

  // Close slider
  const closeSliderRight = () => {
    setSliderCloseStatus(!sliderCloseStatus);
  };

  const closeSliderLeft = () => {
    setLeftSliderCloseStatus(!leftSliderCloseStatus);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      const imgObj = new Image();
      imgObj.src = event.target.result;
      imgObj.onload = function () {
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

  // http://fabricjs.com/assets/pug.jpg
  const handleLinkImageUpload = (e) => {
    const imgObj = new Image();
    imgObj.src = e;
    imgObj.onload = function () {
      const img = new fabric.Image(imgObj);
      img.scaleToWidth(30);
      img.scaleToHeight(60);
      SetImageProperties(img, { left: 20, top: 100 });
      currentCanvas.add(img);
      currentCanvas.setActiveObject(img);
      currentCanvas.requestRenderAll();
    };
  };

  function makeObject(type) {
    if (type == "rect") {
      addRectangle();
    } else if (type == "line") {
      addLine();
    } else if (type == "text") {
      addNewText();
    } else if (type == "header") {
      addTitle();
    }
  }

  function download() {
    const json = currentCanvas.toJSON(); // Convert canvas to JSON
    delete json.backgroundImage; // Remove any background image

    let finalStyledClass = `<style>`;
    let finalBodyContent = `<div>`;
    json.objects.forEach((element, i) => {
      let { className, styledClass } = GetStyledClass(element, i);
      let { bodyContent } = GetBodyContent(element, className);
      finalStyledClass = finalStyledClass + "\n" + styledClass;
      finalBodyContent = finalBodyContent + "\n" + bodyContent;
    });
    console.log("finalStyledClass == > ", finalStyledClass);
    console.log("finalBodyContent == > ", finalBodyContent);
  }

  useEffect(() => {
    if (currentCanvas) {
      const initialState = currentCanvas.toJSON();
      setUndoStack((prevUndoStack) => [...prevUndoStack, initialState]);
      const handleObjectModified = (options) => {
        const newState = currentCanvas.toJSON();
        setUndoStack((prevUndoStack) => [...prevUndoStack, newState]);
      };
      currentCanvas.on("object:modified", handleObjectModified);
      return () => {
        currentCanvas.off("object:modified", handleObjectModified);
      };
    }
  }, [currentCanvas]);

  useEffect(() => {
    const handleUndoRedo = (event) => {
      if (event.metaKey && event.key === "z" && !event.shiftKey) {
        event.preventDefault();
        undo();
      } else if (event.metaKey && event.key === "z" && event.shiftKey) {
        event.preventDefault();
        redo();
      }
    };

    document.addEventListener("keydown", handleUndoRedo);
    return () => {
      document.removeEventListener("keydown", handleUndoRedo);
    };
  }, [undoStack, redoStack]);

  const applyCustomPropertiesAndListeners = (c, jsonState) => {
    // Restore custom properties and listeners for each object in the JSON state
    c.loadFromJSON(jsonState, () => {
      c.getObjects().forEach((item) => {
        if (item.type == "rect") {
          c.sendToBack(item);
        }
        borderControl(item);
        cornerControl(item);
      });
      c.renderAll();
    });
  };

  const undo = () => {
    if (undoStack.length > 0 && currentCanvas) {
      const prevState = undoStack.slice(-1)[0];
      const newUndoStack = undoStack.slice(0, -1);
      setRedoStack([...redoStack, prevState]);
      applyCustomPropertiesAndListeners(currentCanvas, prevState);
      setUndoStack(newUndoStack);
    }
  };

  const redo = () => {
    if (redoStack.length > 0 && currentCanvas) {
      const nextState = redoStack.slice(-1)[0];
      const newRedoStack = redoStack.slice(0, -1);
      setUndoStack([...undoStack, nextState]);
      applyCustomPropertiesAndListeners(currentCanvas, nextState);
      setRedoStack(newRedoStack);
    }
  };

  const canvasClicked = (e, index) => {
    e.preventDefault();
    console.log("canvasClicked : ", index);
    const changeCanvas = currentCanvas != null &&
    currentCanvasRef != null &&
    currentCanvasRef.current.id == `canvas-${index}`
    if (!changeCanvas
    ) {
      setCurrentCanvasRef(canvasRefs[index - 1]);
      setCurrentCanvas(canvases[index - 1]);
    }
  };
  return (
    <div>
      <TopPanel
        saveFile={saveAsJSON}
        downloadFile={download}
        clearPage={clearCanvas}
      />
      <div className="container" style={{ padding: 0 }}>
        <Playground
          collapsed={leftSliderCloseStatus}
          makeObject={makeObject}
          uploadImage={handleLinkImageUpload}
        />
        <div className="middle">
          <div className="canvas-container">
            <ZoomPage
              id="zoom-in-out"
              handleZoomChange={(e) => handleZoomChange(e)}
            />
            <Container fluid ref={canvasContainerRef}>
              {[1, 2].map((_, index) => (
                <Row key={index} onClick={(e) => canvasClicked(e, index + 1)}>
                  <Col lg={12} className="d-flex justify-content-center">
                    <Canvas
                      handleCurrentCanvas={(c) =>
                        handleCurrentCanvas(c, index + 1)
                      }
                      zoom={zoom}
                      loadData={(c) => loadJSONData(c, index + 1)}
                      selectObject={(c) => selectObject(c)}
                      index={index}
                      canvasRef={canvasRefs[index]}
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

export default Editor;
