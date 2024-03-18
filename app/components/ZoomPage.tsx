import React, { useState, useEffect } from "react";
import { ZoomInCont } from "../css/styled";

function ZoomPage(props: any) {
  let { handleZoomChange , isSideBarCollapsed} = props;
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    // Set default zoom level to 1 when component loads
    setZoomLevel(1);
  }, []);

  const handleZoom = (type: any) => {
    console.log("called handleZoom")
    let newZoom
    if (type == "zoom-in") {
      newZoom = Math.min(2, Math.max(0.5, zoomLevel+0.25));
    }else{
      newZoom = Math.min(1.5, Math.max(0.5, zoomLevel-0.25));
    }
    setZoomLevel(newZoom);
    handleZoomChange(newZoom);
  };

  console.log("isSideBarCollapsed == > ", isSideBarCollapsed)
  return (
    <ZoomInCont id="zoom-in-out" style={{ left: `${!isSideBarCollapsed ? '251px' : '8px'}` }}>
      <button aria-label="Zoom In" onClick={()=> handleZoom("zoom-in")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="zoom-icon"
        >
          <path
            fillRule="evenodd"
            d="M13 8a1 1 0 1 0-2 0v3H8a1 1 0 1 0 0 2h3v3a1 1 0 1 0 2 0v-3h3a1 1 0 1 0 0-2h-3V8Z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      <div>{zoomLevel*100}%</div>
      <button aria-label="Zoom Out" onClick={()=> handleZoom("zoom-out")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="zoom-icon"
        >
          <path
            fillRule="evenodd"
            d="M7 12a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </ZoomInCont>
  );
}
export default ZoomPage;
