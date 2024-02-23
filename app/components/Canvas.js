import React, { useRef, useEffect, useState } from "react";
import "../css/LeftSideBar.css"; // Assume you have a CSS file for styling
import { fabric } from "fabric";
// import 'fabric-customise-controls'; // Import the library

const Canvas = (props) => {
  const width = 800;
  const height = 1000;
  const zoomLevel = props.zoom;
  // Current canvas Reference
  const canvasRef = useRef(null);
  let currentCanvas = useRef(null); // Use for loading the data in the canvas
  const prevDimensions = useRef(null);

  useEffect(() => {
    currentCanvas = new fabric.Canvas(canvasRef.current);
    currentCanvas.setDimensions({ width: width, height: height });

    props.loadData(currentCanvas);
    props.handleCurrentCanvas(currentCanvas);

    // Event listener to prevent object from moving outside canvas boundaries
    currentCanvas.on("object:moving", (e) => {
      const obj = e.target;
      const objWidth = obj.getScaledWidth().toFixed(2);
      const objHeight = obj.getScaledHeight().toFixed(2);
      const objLeft = obj.left;
      const objTop = obj.top;

      // Check if the object is trying to move outside canvas boundaries
      if (
        objLeft < 20 ||
        objTop < 20 ||
        objLeft + objWidth > width ||
        objTop + objHeight > height
      ) {
        // Prevent object from moving outside canvas boundaries
        obj.set({
          left: Math.min(Math.max(objLeft, 20), width - objWidth),
          top: Math.min(Math.max(objTop, 20), height - objHeight),
        });
      }
    });

    currentCanvas.on("object:scaling", function (options) {
      // Does not work on TexBox but works on Text and Rectangle
      let obj = options.target;
      let objWidth = obj.getScaledWidth().toFixed(2);
      let objHeight = obj.getScaledHeight().toFixed(2);
      if (
        parseInt(obj.left) + parseInt(objWidth) > width - 20 ||
        parseInt(obj.top) + parseInt(objHeight) > height - 20
      ) {
        obj.set({
          width: prevDimensions.current.width,
          height: prevDimensions.current.height,
          lockScalingX: true,
          lockScalingY: true,
        });
        currentCanvas.requestRenderAll(); // Render canvas
      } else {
        prevDimensions.current = { width: obj.width, height: obj.height };
      }
    });

    currentCanvas.on("mouse:over", (e) => {
      const object = e.target;
      if (object && object.type === "textbox") {
        object._renderControls(currentCanvas.contextTop, {
          hasControls: false
        });
      }
    });

    currentCanvas.on("mouse:out", function (e) {
      const object = e.target;
      if (object && object.type == "textbox") {
        currentCanvas.clearContext(currentCanvas.contextTop);      }
    });

    // Select Object
    currentCanvas.on("mouse:down", function (e) {
      const object = e.target;
      if (object && object.type == "textbox") {
        currentCanvas.clearContext(currentCanvas.contextTop); 
        props.selectObject(currentCanvas.getActiveObject());
      }
    });

    /*  
    canvas.on('mouse:up', function() {}
  */
    return () => {
      currentCanvas.dispose(canvas);
    };
  }, []);


  // This is used for zoom in scaling
  useEffect(() => {
    if (currentCanvas != null && currentCanvas.style){
      currentCanvas.style.transform = `scale(${zoomLevel})`;
      currentCanvas.style.transformOrigin = "top";
    }
  }, [zoomLevel]);

  return <canvas id="canvas" ref={canvasRef} />;
};

export default Canvas;
