import React, { useState, useEffect, useRef } from "react";

// SVG Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { WordEditCont, ShowPanel } from "../css/styled";

interface HCProps {
  text: string;
  showClose: boolean;
  clickClose: () => void;
}

export const HeaderClose: React.FC<HCProps> = (props) => {
  const { text, showClose, clickClose } = props;

  useEffect(() => {
    console.log("Header close component mounted");
  }, []);

  const iconStyle = {
    cursor: "pointer",
    transition: "color 0.3s",
  };

  const handleClick = () => {
    clickClose();
  };

  return (
    <WordEditCont>
      <div className="header_p">{text}</div>
      {showClose && (
        <div className="close_p">
          <FontAwesomeIcon
            icon={faRemove as IconProp}
            size="lg"
            title="close"
            onClick={handleClick} // Add onClick event
            style={iconStyle}
            onMouseEnter={(e) => (e.target.style.color = "black")}
            onMouseLeave={(e) => (e.target.style.color = "")} // Revert color on mouse leave
          />
        </div>
      )}
    </WordEditCont>
  );
};
