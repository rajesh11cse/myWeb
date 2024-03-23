import React, { useEffect, useRef, useState } from "react";
import "../css/febric.css"; // Assume you have a CSS file for styling
import "../css/layout.css"; // Assume you have a CSS file for styling
import myData from "./abc.json";
import { Playground } from "./Playground";
import ZoomPage from "./ZoomPage";
import ZoomInSlider from "./ZoomInSlider";
import { fabric } from "fabric";
import { GetStyledClass, GetBodyContent } from "./htmlData";



import styled from 'styled-components';

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #f8f9fa; /* Set your desired background color */
  padding: 20px; /* Add padding for spacing */
  box-sizing: border-box; /* Include padding in total width */
`;


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

  const [activePageCount, setActivePageCount] = useState(0);
  const canvasRefs = Array.from({ length: 5 }, () => useRef(null));

  const [pages, setPages] = useState([
    {
      id: 1,
      ref: useRef(null),
      canvas: null,
      onfocus: true,
      active: true,
    },
    {
      id: 2,
      ref: useRef(null),
      canvas: null,
      onfocus: false,
      active: false,
    },
    {
      id: 3,
      ref: useRef(null),
      canvas: null,
      onfocus: false,
      active: false,
    },
    {
      id: 4,
      ref: useRef(null),
      canvas: null,
      onfocus: false,
      active: false,
    },
    {
      id: 5,
      ref: useRef(null),
      canvas: null,
      onfocus: false,
      active: false,
    },
  ]);

  const loadJSONData = function (c, index) {
    if (index > 1) {
      return;
    }
    const data = JSON.parse(localStorage.getItem("jsonData"));
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
    container.style.overflowX = "hidden";
  }, [zoom]);
  const handleZoomChange = (value) => {
    setZoom(parseFloat(value));
  };

  // handle current active canvas
  const handleCurrentCanvas = (c, index) => {
    setPages((prevPages) => {
      // Create a new array by mapping over the previous pages
      return prevPages.map((page, i) => {
        // If the index matches, update the canvas reference
        if (page.id == index) {
          return {
            ...page, // Copy existing page properties
            canvas: c, // Update the canvas reference
          };
        }
        return page;
      });
    });
  };

  useEffect(() => {
    let activePage = 0
    for (let i = 0; i < pages.length; i++) {
      if (pages[i].active){
        activePage++;
      }
      if (pages[i].onfocus) {
        setCurrentCanvasRef(pages[i].ref);
        setCurrentCanvas(pages[i].canvas);
      }
    }
    setActivePageCount(activePage)
  }, [pages]);
  

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
    setSliderCloseStatus(false)
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
    // Add check if already active then don't do anything
    setPages((prevPages) => {
      return prevPages.map((page, i) => {
        if (page.id == index) {
          return {
            ...page, 
            onfocus: true
          };
        }else if (page.onfocus && page.id != index) {
          return {
            ...page, 
            onfocus: false
          };
        }
        return page;
      });
    });

  };

  function shiftElements(arr, index) {
    if (index >= activePageCount){
      return arr
    }
    const clonedArray = arr.slice(); // Create a shallow copy of the original array
    let c = clonedArray[index];
    let p = { ...clonedArray[index] }; // Create a copy of the object at index 'index'
    for (let i = index; i < clonedArray.length; i++) {
      c = clonedArray[i];
      const id = c.id; // Store the original id
      p.id = id; // Restore the original id
      clonedArray[i] = p; // Update 'clonedArray[i]' with the modified 'p'
      p = { ...c }; // Copy properties from 'c' to 'p'
    }
    return clonedArray
  }

  // function oneStepRotation(arr, index) {
  //   const element = arr[index];
  //   arr.splice(index + 1, 0, element); // Step 1: Insert the element at index + 1
  //   arr.splice(index, 1); // Step 2: Remove the original element at the specified index
  //   return arr;
  // }
  
  const addNewPage = (e, id) => {
    // e.stopPropagation();
    console.log("NON Shifted elements : ", id)
    const elements = shiftElements(pages, id)
    console.log("shiftElements : ", elements)
    setPages(elements);
    console.log("pages==> : ", pages)

    setPages(elements);
    setPages((prevPages) => {
      return prevPages.map((page, i) => {
        if (page.id == id+1) {
            return {
              ...page, 
              onfocus: true, 
              active: true, 
            };
        }else if (page.onfocus && page.id != id+1) {
          return {
            ...page, 
            onfocus: false
          };
        }
        return page;
      });
    });
  }

  const removePage = (e, id) => {
    setPages((prevPages) => {
      return prevPages.map((page, i) => {
        if (page.id == id) {
          return {
            ...page, 
            onfocus: false, 
            active: false, 
          };
        }else if (!page.onfocus && page.id == id-1) {
          return {
            ...page, 
            onfocus: true
          };
        }
        return page;
      });
    });
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
          makeObject={makeObject}
          uploadImage={handleLinkImageUpload}
          isCollapsed={(c)=>setLeftSliderCloseStatus(c)}
        />
        <div className="middle">
          <div className="canvas-container">
            <ZoomPage
              id="zoom-in-out"
              handleZoomChange={(e) => handleZoomChange(e)}
              isSideBarCollapsed={leftSliderCloseStatus}
            />
            <div ref={canvasContainerRef}>
              {pages.map((page, index) => (
                page.active && <Row key={index}>
                  <Col lg={12} className="d-flex justify-content-center">
                    <Canvas
                      handleCurrentCanvas={(c) =>
                        handleCurrentCanvas(c, page.id)
                      }
                      zoom={zoom}
                      loadData={(c) => loadJSONData(c, index + 1)}
                      selectObject={(c) => selectObject(c)}
                      index={page.id}
                      canvasRef={canvasRefs[page.id-1]}
                      addPage={(e) => addNewPage(e, page.id)}
                      removePage={(e) => removePage(e, page.id)}
                      clickCan={(e) => canvasClicked(e, index + 1)}
                      isPageAdditionAllowed={ activePageCount >= pages.length }
                      activePageCount={activePageCount}
                      isActiveCanvas={page.onfocus}
                    />
                  </Col>
                </Row>
              ))}
            </div>
          </div>
        </div>
        {/* <ZoomInSlider handleZoomChange={(e) => handleZoomChange(e)} /> */}
        {/* <Playground2 collapsed={sliderCloseStatus}/> */}
        <EditTextBar
          collapsed={sliderCloseStatus}
          isCollapsed={()=>setSliderCloseStatus(true)}
          selectedObject={selectedObject}
          currentCanvas={currentCanvas}
        />
      </div>
      <StyledFooter>
        <ZoomInSlider zoom={zoom} handleZoomChange={(e) => handleZoomChange(e)} />
      </StyledFooter>
    </div>
  );
}

export default Editor;
