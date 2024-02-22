import React, { useRef, useEffect, useState } from "react";
import "../css/LeftSideBar.css"; // Assume you have a CSS file for styling
import { fabric } from "fabric";
// import 'fabric-customise-controls'; // Import the library



const Canvas = (props) => {
  const width = 800;
  const height = 1000;
  const zoomValue = props.zoom;
  // Current canvas Reference
  const canvasRef = useRef(null);
  const canvas = useRef(null); // Clean canvas before use it
  let currentCanvas = useRef(null); // Use for loading the data in the canvas
  const prevDimensions = useRef(null);
  const hoverRect = useRef(null);

  // Create states
  const [displayBoundary, setDisplayBoundary] = useState(false);
  
  // create a rect object






  console.log("props == > ", props)
  useEffect(() => {
    currentCanvas = new fabric.Canvas(canvasRef.current);
    currentCanvas.setDimensions({ width: width, height: height });


    props.loadData(currentCanvas)
    props.handleCurrentCanvas(currentCanvas)

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
    // Add mouse hover event listener
    currentCanvas.on("mouse:over", (e) => {
        const object = e.target;
        if (object && object.type === 'textbox' && !displayBoundary) { 
          setDisplayBoundary(true)
          const activeCoords = object.getBoundingRect();
          // console.log("activeCoords")
        //  CreateBoundary(activeCoords);
         // currentCanvas.renderAll();
        }
    });

    currentCanvas.on("mouse:out", function () {
     // removeHoverRect(currentCanvas)
    });

    // Select Object
    currentCanvas.on("mouse:down", function () {
      props.selectObject(currentCanvas.getActiveObject())
    });

    /*  
    canvas.on('mouse:up', function() {}
  */
    return () => {
      currentCanvas.dispose(canvas);
    };
  }, []);

  const removeHoverRect = (canvas) => {
    if (displayBoundary) {
      canvas.remove(hoverRect.current);
      hoverRect.current = null;
      setDisplayBoundary(false)
    }
  };

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
    currentCanvas.add(rect);
    currentCanvas.renderAll();
  }

  // function renderIcon(ctx, left, top, styleOverride, fabricObject) {
  //   console.log("renderIcon loaded:===> ")
  //   // Custom rendering logic for control icon
  //   // For example, render an X icon
  //   ctx.fillStyle = '#FF0000';
  //   ctx.fillRect(left, top, 16, 16);
  // }
  // This is used for zoom in scaling
  useEffect(() => {
    const canvas = canvasRef.current;
    // console.log("handleZoomChange2 == > ", zoomValue);
    canvas.style.transform = `scale(${zoomValue})`;
    canvas.style.transformOrigin = "top";
  }, [zoomValue]);

  return (
    <canvas id="canvas" ref={canvasRef} />
  );
};

export default Canvas;
