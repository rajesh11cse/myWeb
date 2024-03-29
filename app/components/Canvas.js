import React, { useRef, useEffect, useState } from "react";
import "../css/LeftSideBar.css"; // Assume you have a CSS file for styling
import { fabric } from "fabric";

import { NewPageDashLineCon, DeletePageCon } from "../css/styled";

// SVG Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCut } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

const Canvas = (props) => {
  const width = 800;
  const height = 1000;
  // const height = 200;
  const zoomLevel = props.zoom;
  // Current canvas Reference
  const canvasRef = props.canvasRef;
  const {
    index,
    addPage,
    removePage,
    clickCan,
    isPageAdditionAllowed,
    isActiveCanvas,
    activePageCount,
  } = props;
  let currentCanvas = useRef(null); // Use for loading the data in the canvas

  useEffect(() => {
    // fabric.Object.prototype.minScaleLimit = 0.5;
    currentCanvas = new fabric.Canvas(canvasRef.current, {
      renderOnAddRemove: false,
      noScaleCache: true,
    });
    fabric.Object.prototype.minScaleLimit = 0.5;
    currentCanvas.setDimensions({ width: width, height: height });

    props.loadData(currentCanvas);
    props.handleCurrentCanvas(currentCanvas);
    currentCanvas.selectionBorderColor = "red";

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
      const selectedObject = currentCanvas.getActiveObject();
      if (object && object != selectedObject) {
        object._renderControls(currentCanvas.contextTop, {
          hasControls: false,
          borderColor: "#4678f4",
        });
      }
    });

    currentCanvas.on("mouse:out", function (e) {
      const object = e.target;
      const selectedObject = currentCanvas.getActiveObject();
      if (object && object != selectedObject) {
        currentCanvas.clearContext(currentCanvas.contextTop);
      }
    });

    // Select Object
    currentCanvas.on("mouse:down", function (e) {
      const object = e.target;
      if (object) {
        currentCanvas.clearContext(currentCanvas.contextTop);
        props.selectObject(currentCanvas.getActiveObject());
      }
    });

    return () => {
      currentCanvas.dispose(currentCanvas);
    };
  }, []);

  // This is used for zoom in scaling
  useEffect(() => {
    if (currentCanvas != null && currentCanvas.style) {
      currentCanvas.style.transform = `scale(${zoomLevel})`;
      currentCanvas.style.transformOrigin = "top";
    }
  }, [zoomLevel]);

  function clickCanvas(e) {
    e.preventDefault();
    clickCan(e);
  }
  function allowPageAdd() {
    if ((index == 1 && activePageCount == 1) || activePageCount == index) {
      // return 'Add page';
      return true;
    } else {
      // return 'Insert page';
      // return `page ${index} of ${activePageCount}`;
      return false;
    }
    /* Handle other like duplicate page, lock page etc. */
  }
  return (
    <div>
      <div
        onClick={clickCanvas}
        style={isActiveCanvas ? { border: "1px dashed #706969" } : {}}
      >
        <canvas id={`canvas-${index}`} ref={canvasRef} />
      </div>
      <div style={{ margin: "5px" }}>
        <NewPageDashLineCon />
        {allowPageAdd() && (
          <Button
            disabled={isPageAdditionAllowed}
            variant="link"
            size="sm"
            onClick={addPage}
          >
            Add page
          </Button>
        )}
        {!allowPageAdd() && (
          <span style={{ color: "#bbbbbb", fontSize: "13px", padding: "5px" }}>
            {" "}
            page {index} of {activePageCount}
          </span>
        )}
        <NewPageDashLineCon />
        {props.index > 1 && (
          <DeletePageCon>
            <FontAwesomeIcon
              icon={faCut}
              color="gray"
              size="sm"
              rotation={270}
              title="delete page"
              onClick={removePage}
            />
          </DeletePageCon>
        )}
      </div>
    </div>
  );
};

export default Canvas;
