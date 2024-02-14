import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";
import "../css/febric.css"; // Assume you have a CSS file for styling
import "../css/layout.css"; // Assume you have a CSS file for styling
import myData from './abc.json';


function TextEditor4() {
  const canvasRef = useRef(null);
  const canvas = useRef(null);

  // const textBoxRef = useRef(null); // Reference to the text box object
  // const groupRef = useRef(null); // Reference to the text box object
  // const rectRef = useRef(null); // Reference to the rect object

  useEffect(() => {
    canvas.current = new fabric.Canvas(canvasRef.current);

    // loadGrid(canvas)
    // loadDataFromJSONFile(canvas);
    const canvasWidth = 842; 
    const canvasHeight = 895;

     // Event listener to prevent object from moving outside canvas boundaries
     canvas.current.on('object:moving', (e) => {
      const obj = e.target;
      const objWidth = obj.getScaledWidth();
      const objHeight = obj.getScaledHeight();
      const objLeft = obj.left;
      const objTop = obj.top;

      console.log("obj ===>  ", obj)
      // console.log("obj ===>  ", obj.left, obj.top, obj.right, obj.bottom)

       // Check if the object is trying to move outside canvas boundaries
       if (objLeft < 20 || objTop < 20 || objLeft + objWidth > canvasWidth || objTop + objHeight > canvasHeight) {
        // Prevent object from moving outside canvas boundaries
        obj.set({
          left: Math.min(Math.max(objLeft, 20), canvasWidth - objWidth),
          top: Math.min(Math.max(objTop, 20), canvasHeight - objHeight)
        });
      }
    });



  // canvas.current.on('object:scaling', (e) => {
  //   const obj = e.target;
  //   // const textboxWidth = obj.getWidth();
  //   // const newWidth = textboxWidth * obj.scaleX;

  //   console.log("textboxWidth : ")

  //   // if (newWidth > maxWidth) {
  //   //   obj.scaleX = maxWidth / textboxWidth;
  //   //   obj.width = maxWidth;
  //   // }
  // });


    return () => {
      canvas.current.dispose(canvas);
    };
  }, []);


  const loadGrid = function(canvas) {
    const ctx = canvas.current.getContext("2d");
    // Define the size of the canvas
    const canvasWidth = 895;
    const canvasHeight = 842;

    // Define the size of each grid cell
    const cellSize = 20; // Adjust this value as needed for your desired grid size
    // Function to draw grid lines directly on the canvas
    // Set grid color and line width
    ctx.strokeStyle = "gray";
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
  }

  const loadDataFromJSONFile = function(canvas){
    canvas.current.loadFromJSON(myData, () => {
      // Iterate over all objects in the canvas and set controls visibility
      canvas.current.getObjects().forEach(obj => {
        if (obj.type === 'textbox') {
          obj.set({
            borderColor: 'red',
            hasControls: true,
            lockMovementX: false,
            lockMovementY: false,
            textAlign: "left",
            editable: true, // Allow editing text inside the textbox
            centeredScaling: false, // Prevent resizing from center
            cornerStyle: "circle", // Use circular corner controls
            transparentCorners: false, // Make corner controls more visible
            cornerSize: 12, // Set corner control size
            padding: 10, // Set padding inside the textbox
            lockRotation: true, // Prevent rotation
          });

          obj.setControlsVisibility({
            mt: false,
            ml: false,
            mr: true,
            mb: true,
            tl: false,
            tr: false,
            bl: false,
            br: true,
            mtr: true
          });
        }
      });
      canvas.current.renderAll();
    });
  }


    // Function to add a textbox to the canvas
  const addTextBox = () => {
    const textBox = new fabric.Textbox('Your Text Here', {
      left: 50,
      top: 50,
      width: 500,
      height: 500,
      fontSize: 16, // Fixed font size
      fill: "#000",
      fontFamily: 'Arial',
      borderColor: 'red',
      cornerColor: 'green',
      hasControls: true,
      lockMovementX: false,
      lockMovementY: false,
      textAlign: "left",
      editable: true, // Allow editing text inside the textbox
      centeredScaling: false, // Prevent resizing from center
      // cornerStyle: "circle", // Use circular corner controls
      transparentCorners: false, // Make corner controls more visible
      cornerSize: 6, // Set corner control size
      padding: 10, // Set padding inside the textbox
      lockRotation: true, // Allow rotation
    });
    //  // Allow control on right bottom of text area only
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

    // Add a custom control to adjust rotatingPointOffset
    const control = new fabric.Control({
      x: -0.5,
      y: -0.5,
      offsetY: -0.5,
      actionHandler: function(dim, finalMatrix, fabricObject, options) {
        fabricObject.set('rotatingPointOffset', dim.y);
        canvas.current.requestRenderAll();
      },
      actionName: 'set', // Action name
    });




    // let isDragging = false;
    // let dragStartX = 0;
    // let dragStartY = 0;

    // textBox.on('mousedown', (e) => {
    //   isDragging = true;
    //   const pointer = canvas.getPointer(e.e);
    //   dragStartX = pointer.x - textBox.left;
    //   dragStartY = pointer.y - textBox.top;
    // });

    // const canvasWidth = canvas.current.getWidth();
    // const canvasHeight = canvas.current.getHeight();
    // textBox.on('mousemove', (e) => {
    //   console.log("==>",e)
    //   if (isDragging) {
    //     const pointer = canvas.current.getPointer(e.e);
    //     const newX = pointer.x - dragStartX;
    //     const newY = pointer.y - dragStartY;

    //     // Limit movement to within canvas boundaries
    //     // if (newX >= 0 && newX + textBox.width <= canvasWidth && newY >= 0 && newY + textBox.height <= canvasHeight) {
    //     //   textBox.set({ left: newX, top: newY });
    //     //   canvas.current.renderAll();
    //     // }
    //   }
    // });

    // textBox.on('mouseup', () => {
    //   isDragging = false;
    // });

    // textBox.on('mouseout', () => {
    //   isDragging = false;
    // });

    textBox.setControlVisible('mtr', true); // Make sure mtr control is visible
    textBox.controls.mtr = control; // Assign the custom control to mtr control
    textBox.setCoords(); // Update object's coordinates

    canvas.current.add(textBox);
    canvas.current.setActiveObject(textBox);
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
        width: 500,
        height: 250,
        padding: 10,
        fill: 'lightgreen', // Default fill color
        borderColor: 'red', // Default border color
        strokeWidth: 2, // Default border width
        selectable: true, // Object is selectable by default
        hasControls: true // Object has controls (resize, rotate, etc.)
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
    console.log("JSON : ", json)
  };

  return (
    <div className="container">
    <div className="left">Left</div>
    <div className="middle">
      <div className="canvas-container">
        <div className="canvas-overlay"></div>
          <canvas
            // id="canvas"
            width="895px"
            height="842px"
            ref={canvasRef}
          />
      </div>
    </div>
    <div className="right">
    {/* <button onClick={() => addTextBoxWithBoundingBox()}>Add Textbox with bound box</button> */}
    <button onClick={() => addTextBox()}>Add Textbox</button><br/>
    <button onClick={() => addRectangle()}>Add Rectangle</button><br/>
      <button onClick={() => removeSelectedObject()}>Remove Selected Object</button><br/>
      <button onClick={() => clearCanvas()}>Clear Canvas</button><br/>
      <button onClick={saveAsJSON}>Save as JSON</button>
    </div>
  </div>
  );
}

export default TextEditor4;


