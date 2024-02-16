import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import "../css/febric.css"; // Assume you have a CSS file for styling
import "../css/layout.css"; // Assume you have a CSS file for styling
import myData from "./abc.json";
import WordEdit from "./WordEdit";
import {SetTextBoxProperties, SetTextBoxControlProperties, SetTextBoxControlsVisibility} from "./helper.js";

function TextEditor4() {
  const canvasRef = useRef(null);
  const canvas = useRef(null);
  const prevDimensions = useRef(null);
  const [selectedObject, setSelectedObject] = useState(null);

  const hoverRect = useRef(null);
  useEffect(() => {
    canvas.current = new fabric.Canvas(canvasRef.current);
    canvas.current.setDimensions({ width: 800, height: 700 });
   
    // loadGrid(canvas)
    loadDataFromJSONFile(canvas);
    const canvasWidth = 800;
    const canvasHeight = 700;

    // Event listener to prevent object from moving outside canvas boundaries
    canvas.current.on("object:moving", (e) => {
      const obj = e.target;
      const objWidth = obj.getScaledWidth().toFixed(2);
      const objHeight = obj.getScaledHeight().toFixed(2);
      const objLeft = obj.left;
      const objTop = obj.top;

      // Check if the object is trying to move outside canvas boundaries
      if (
        objLeft < 20 ||
        objTop < 20 ||
        objLeft + objWidth > canvasWidth ||
        objTop + objHeight > canvasHeight
      ) {
        // Prevent object from moving outside canvas boundaries
        obj.set({
          left: Math.min(Math.max(objLeft, 20), canvasWidth - objWidth),
          top: Math.min(Math.max(objTop, 20), canvasHeight - objHeight),
        });
      }
    });

    canvas.current.on("object:scaling", function (options) {
      // Does not work on TexBox but works on Text and Rectangle
      let obj = options.target;
      let objWidth = obj.getScaledWidth().toFixed(2);
      let objHeight = obj.getScaledHeight().toFixed(2);
      if (
        parseInt(obj.left) + parseInt(objWidth) > canvasWidth - 20 ||
        parseInt(obj.top) + parseInt(objHeight) > canvasHeight - 20
      ) {
        obj.set({
          width: prevDimensions.current.width,
          height: prevDimensions.current.height,
          lockScalingX: true,
          lockScalingY: true,
        });
        canvas.current.requestRenderAll(); // Render canvas
      } else {
        prevDimensions.current = { width: obj.width, height: obj.height };
      }
    });
     // Add mouse hover event listener
     canvas.current.on("mouse:over", (e) => {
      // 
        const object = e.target;
        if (object && object.type === 'textbox' && !hoverRect.current) { 

          const activeCoords = object.getBoundingRect();
          // console.log(activeCoords)
          // CreateBoundary(activeCoords);
          // canvas.current.renderAll();
        }
    });



    const CreateBoundary = function(coordinates){
      const rect = new fabric.Rect({
        left: coordinates.left,
        top: coordinates.top,
        width: coordinates.width,
        height: coordinates.height,
        fill: 'transparent',
        stroke: 'lightblue',
        strokeWidth: 1,
        selectable: false
      });
      hoverRect.current = rect;
      canvas.current.add(rect);
      canvas.current.renderAll();
    }

    const removeHoverRect = (canvas) => {
      if (hoverRect.current) {
        canvas.remove(hoverRect.current);
        hoverRect.current = null;
      }
    };

    canvas.current.on("mouse:out", function () {
      removeHoverRect(canvas.current)
    }); 

    // Select Object
    canvas.current.on("mouse:down", function () {
      setSelectedObject(canvas.current.getActiveObject())
    }); 


/*  
    canvas.on('mouse:up', function() {}
  */
    return () => {
      canvas.current.dispose(canvas);
    };
  }, []);

  const loadGrid = function (canvas) {
    const ctx = canvas.current.getContext("2d");
    // Define the size of the canvas
    const canvasWidth = 800;
    const canvasHeight = 700;

    // Define the size of each grid cell
    const cellSize = 20; // Adjust this value as needed for your desired grid size
    // Function to draw grid lines directly on the canvas
    // Set grid color and line width
    ctx.strokeStyle = "lightgray";
    ctx.lineWidth = 1;

    // Draw vertical grid lines
    for (let x = 0; x <= canvasWidth; x += cellSize) {
      ctx.beginPath();
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, canvasHeight);
      ctx.stroke();
    }
    // Draw horizontal grid lines
    for (let y = 0; y <= canvasHeight; y += cellSize) {
      ctx.beginPath();
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(canvasWidth, y + 0.5);
      ctx.stroke();
    }
  };

  const loadDataFromJSONFile = function (canvas) {
    canvas.current.loadFromJSON(myData, () => {
      // Iterate over all objects in the canvas and set controls visibility
      canvas.current.getObjects().forEach((obj) => {
        if (obj.type === "textbox") {
          SetTextBoxControlProperties(obj)
          SetTextBoxControlsVisibility(obj)
        }
      });
      canvas.current.renderAll();
    });
  };

  const addTextboxBelowActive = () => {
    const activeObject = canvas.current.getActiveObject();
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
    let textBox = new fabric.Textbox('', {});
    SetTextBoxProperties(textBox, position)
    canvas.current.add(textBox);
    canvas.current.setActiveObject(textBox);
    textBox.on('mouseenter', function() {
      this.set('fill', 'blue');
      canvas.current.renderAll();
    });
    canvas.current.renderAll();
  };

  // Function to add a text box with outer bounding box to the canvas
  const addTextBoxWithBoundingBox = () => {
    // textarea.enterEditing(); // Start editing automatically
  };

  // Function to add a textbox to the canvas
  const addRectangle = () => {
    const textBox = new fabric.Rect({
      left: 50,
      top: 50,
      width: 250,
      height: 100,
      padding: 10,
      fill: "lightgreen", // Default fill color
      borderColor: "red", // Default border color
      strokeWidth: 2, // Default border width
      selectable: true, // Object is selectable by default
      hasControls: true, // Object has controls (resize, rotate, etc.)
    });
    // Allow control on right bottom of text area only
    textBox.setControlsVisibility({
      mt: false,
      ml: false,
      mr: true,
      mb: true,
      tl: false,
      tr: false,
      bl: false,
      br: true,
      mtr: true,
    });

    canvas.current.add(textBox);
    canvas.current.setActiveObject(textBox);
    canvas.current.renderAll();
  };

  // Function to remove the selected object (textbox)
  const removeSelectedObject = () => {
    const selectedObject = canvas.current.getActiveObject();
    if (selectedObject) {
      canvas.current.remove(selectedObject);
      canvas.current.renderAll();
    }
  };

  // Function to clear the canvas
  const clearCanvas = () => {
    canvas.current.clear();
  };

  // Function to save canvas content as JSON
  const saveAsJSON = () => {
    const json = canvas.current.toJSON(); // Convert canvas to JSON
    delete json.backgroundImage; // Remove any background image
    console.log("JSON : ", json);
  };


  const handleRender = () => {
    canvas.current.renderAll();
  }

  return (
    <div className="container">
      <div className="left">Left</div>
      <div className="middle">
        <div className="canvas-container">
          <div className="canvas-overlay"></div>
          <canvas id="canvas" ref={canvasRef} />
        </div>
      </div>
      <div className="right">
        {/* <button onClick={() => addTextBoxWithBoundingBox()}>Add Textbox with bound box</button> */}
        <button onClick={() => addTextboxBelowActive()}>Add Textbox</button>
        {/* <br />
        <button onClick={() => addRectangle()}>Add Rectangle</button>
        <br /> */}
        <button onClick={() => removeSelectedObject()}>
          Remove Selected Object
        </button>
        <br />
        <button onClick={() => clearCanvas()}>Clear Canvas</button>
        <br />
        {/* <button onClick={saveAsJSON}>Save as JSON</button> */}
        <WordEdit selectedObject={selectedObject} handleRender={() => handleRender()}/>
      </div>
    </div>
  );
}

export default TextEditor4;
