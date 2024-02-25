import React, { useRef, useEffect, useState } from "react";
import "../css/LeftSideBar.css"; // Assume you have a CSS file for styling
import { fabric } from "fabric";

const Canvas = (props) => {
  const width = 800;
  const height = 1000;
  const zoomLevel = props.zoom;
  // Current canvas Reference
  const canvasRef = useRef(null);
  let currentCanvas = useRef(null); // Use for loading the data in the canvas

  useEffect(() => {
    currentCanvas = new fabric.Canvas(canvasRef.current);
    currentCanvas.setDimensions({ width: width, height: height });

    props.loadData(currentCanvas);
    props.handleCurrentCanvas(currentCanvas);

    currentCanvas.selectionBorderColor = 'red'


    currentCanvas.on("object:scaling", function (options) {
      // Does not work on TexBox but works on Text and Rectangle
      let obj = options.target;
      let objWidth = obj.getScaledWidth().toFixed(2);
      let objHeight = obj.getScaledHeight().toFixed(2);
      // console.log("objWidth ==> ", objWidth)
      // console.log("objHeight ==> ", objHeight)
    });

    currentCanvas.on("mouse:over", (e) => {
      const object = e.target;
      const selectedObject = currentCanvas.getActiveObject()
      if (object && object != selectedObject) {
        object._renderControls(currentCanvas.contextTop, {
          hasControls: false, borderColor: "#4678f4"
        });
      }
    });

    currentCanvas.on("mouse:out", function (e) {
      const object = e.target;
      if (object) {
        currentCanvas.clearContext(currentCanvas.contextTop);      }
    });

    // Select Object
    currentCanvas.on("mouse:down", function (e) {
      const object = e.target;
      if (object) {
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
