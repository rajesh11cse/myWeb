import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";
import "../css/febric.css"; // Assume you have a CSS file for styling
import "../css/layout.css"; // Assume you have a CSS file for styling

function TextEditor4() {
  const canvasRef = useRef(null);
  const canvas = useRef(null);

  useEffect(() => {
    canvas.current = new fabric.Canvas(canvasRef.current);

    return () => {
      canvas.current.dispose();
    };
  }, []);


  const handleKeyDown = (e) => {
    // Adjust the height when Enter key is pressed to simulate line breaks
    if (e.keyCode === 13 && textBoxRef.current) {
      handleTextChange();
    }
  };

  
    // Function to add a textbox to the canvas
  const addTextBox = () => {
    const textBox = new fabric.Textbox('Your Text Here', {
      left: 50,
      top: 50,
      width: 200,
      height: 500,
      fontSize: 16, // Fixed font size
      fill: "#000",
      fontFamily: 'Arial',
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
    <button onClick={() => addTextBox()}>Add Textbox</button>
      <button onClick={() => removeSelectedObject()}>Remove Selected Object</button>
      <button onClick={() => clearCanvas()}>Clear Canvas</button>
    </div>
  </div>
  );
}

export default TextEditor4;


