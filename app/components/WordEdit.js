import React, { useEffect, useState } from "react";
import "../css/wordEdit.css"; // Assume you have a CSS file for styling
import { DivCont } from "../css/styled";




import { TextEdit } from "./TextEdit";
import { LineEdit } from "./LineEdit";
import { BoxEdit } from "./BoxEdit";


const WordEdit = (props) => {
  var selectedObject = props.selectedObject;
  const [objectType, setObjectType] = useState("");
  useEffect(() => {
    if (selectedObject != null ){
      setObjectType(selectedObject.type)
    }
  }, [selectedObject]);


  return (
    <DivCont>
      {/* {objectType} */}
      {(objectType == "textbox" ||  objectType == "i-text" )  && <TextEdit  currentCanvas={ props.currentCanvas} selectedObject={selectedObject}/>}
      {objectType == "line" && <LineEdit  currentCanvas={ props.currentCanvas} selectedObject={selectedObject}/>}
      {objectType == "rect" && <BoxEdit  currentCanvas={ props.currentCanvas} selectedObject={selectedObject}/>}
    </DivCont>
  );
};

export default WordEdit;
