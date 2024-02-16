import React, { useEffect, useState } from "react";
import "../css/wordEdit.css"; // Assume you have a CSS file for styling

import { DropdownCont } from '../css/styled';

import {
  Button,
  ButtonGroup,
  DropdownButton,
  Dropdown,
  FloatingLabel,
  Form,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";

const WordEdit = (props) => {
  var selectedObject = props.selectedObject;
  const [textValue, setTextValue] = useState("");
  const [fontStyle, setFontStyle] = useState({
    fontWeight: true,
    fontStyle: true,
    underline: false,
    textAlign: "",
    fontSize: 10,
  });

  useEffect(() => {
    if (selectedObject != null && selectedObject.text !== textValue) {
      setTextValue(selectedObject.text);
    }
  }, [textValue]);

  useEffect(() => {
    if (selectedObject != null) {
      setTextValue(selectedObject.text);
      const fontStyle = {
        fontWeight: selectedObject.fontWeight == "normal" ? true : false,
        fontStyle: selectedObject.fontStyle == "normal" ? true : false,
        underline: selectedObject.underline,
        textAlign: selectedObject.textAlign,
        fontSize: selectedObject.fontSize,
      };
      setFontStyle(fontStyle);
    }
  }, [selectedObject]);

  function setTextNewValue(e) {
    setTextValue(e);
    selectedObject.text = e;
    props.handleRender();
  }
  function setFontStyleHandler(type, v) {
    let fontStyleObj = {
      fontWeight: fontStyle.fontWeight,
      fontStyle: fontStyle.fontStyle,
      underline: fontStyle.underline,
      textAlign: fontStyle.textAlign,
      fontSize: fontStyle.fontSize,
    };
    if (type === "fontWeight") {
      fontStyleObj.fontWeight = v;
      selectedObject.fontWeight = v ? "normal" : "bold";
    } else if (type === "fontStyle") {
      fontStyleObj.fontStyle = v;
      selectedObject.fontStyle = v ? "normal" : "italic";
    } else if (type === "underline") {
      fontStyleObj.underline = v;
      selectedObject.underline = v;
    } else if (type === "textAlign") {
      fontStyleObj.textAlign = v;
      selectedObject.textAlign = v;
    }else if (type === "fontSize") {
      fontStyleObj.fontSize = v;
      selectedObject.fontSize = v;
    }
    console.log("selectedObject.fontSize == > ", selectedObject.fontSize);
    setFontStyle(fontStyleObj);
    props.handleRender();
  }
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Form.Control
              className="textarea-cont"
              as="textarea"
              value={textValue}
              onChange={(e) => setTextNewValue(e.target.value)}
              placeholder="Text.."
            />
          </div>
        </div>
      </div>
      {/* Font */}
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="font-cont">Font 1</div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
          <DropdownCont w={'65px'} aml={'1em'}>
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              {fontStyle.fontSize}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setFontStyleHandler("fontSize", 1)}>1</Dropdown.Item>
                <Dropdown.Item onClick={() => setFontStyleHandler("fontSize", 2)}>2</Dropdown.Item>
                <Dropdown.Item onClick={() => setFontStyleHandler("fontSize", 5)}>5</Dropdown.Item>
                <Dropdown.Item onClick={() => setFontStyleHandler("fontSize", 10)}>10</Dropdown.Item>
                <Dropdown.Item onClick={() => setFontStyleHandler("fontSize", 15)}>15</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            </DropdownCont>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="font-cont">Font 1</div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <DropdownCont>
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Courier New
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            </DropdownCont>
          </div>
        </div>
      </div>
      {/* Font */}
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="font-cont">Font</div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-8">
            <ButtonGroup aria-label="Basic example" className="customBtnGroup">
              <Button
                variant="secondary"
                value={fontStyle.fontWeight}
                onClick={() =>
                  setFontStyleHandler("fontWeight", !fontStyle.fontWeight)
                }
              >
                B
              </Button>
              <Button
                variant="secondary"
                value={fontStyle.fontStyle}
                onClick={() =>
                  setFontStyleHandler("fontStyle", !fontStyle.fontStyle)
                }
              >
                <i>I</i>
              </Button>
              <Button
                variant="secondary"
                value={fontStyle.underline}
                onClick={() =>
                  setFontStyleHandler("underline", !fontStyle.underline)
                }
              >
                <u>U</u>
              </Button>
            </ButtonGroup>
          </div>
          <div className="col-4">
            <DropdownButton
              title="@"
              id="bg-vertical-dropdown-2"
              className="customDropdownBtn"
            >
              <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
              <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="font-cont">Font</div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <ButtonGroup aria-label="Basic example" className="customBtnGroup">
              <Button
                className="customBtn"
                variant="secondary"
                onClick={() => setFontStyleHandler("textAlign", "left")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="30"
                  height="20"
                >
                  <path d="M20 6H4V4h16v2zm0 5H4V9h16v2zm0 5H4v-2h16v2zm0 4H4v-2h16v2z" />
                </svg>
              </Button>
              <Button
                className="customBtn"
                variant="secondary"
                onClick={() => setFontStyleHandler("textAlign", "center")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="30"
                  height="20"
                >
                  <path d="M20 6H4V4h16v2zm0 5H4V9h16v2zm0 5H4v-2h16v2zm0 4H4v-2h16v2z" />
                </svg>
              </Button>
              <Button
                className="customBtn"
                variant="secondary"
                onClick={() => setFontStyleHandler("textAlign", "right")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="30"
                  height="20"
                >
                  <path d="M20 6H4V4h16v2zm0 5H4V9h16v2zm0 5H4v-2h16v2zm0 4H4v-2h16v2z" />
                </svg>
              </Button>
              <Button
                className="customBtn"
                variant="secondary"
                onClick={() => setFontStyleHandler("textAlign", "justify")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="30"
                  height="20"
                >
                  <path d="M20 6H4V4h16v2zm0 5H4V9h16v2zm0 5H4v-2h16v2zm0 4H4v-2h16v2z" />
                </svg>
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordEdit;
