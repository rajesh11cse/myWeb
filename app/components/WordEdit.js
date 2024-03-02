import React, { useEffect, useState, useRef } from "react";
import "../css/wordEdit.css"; // Assume you have a CSS file for styling
import { SketchPicker } from "react-color";
import {
  DropdownCont,
  Divider,
  Text,
  DivCont,
  ButtonGroupCont,
  InputGroupCont,
  TextAreaCont,
  ColorPickCont,
  WordEditCont,
  DropdownMenuCont,
  CBtn,
} from "../css/styled";

import {
  Button,
  ButtonGroup,
  DropdownButton,
  Dropdown,
  FloatingLabel,
  InputGroup,
  Form,
  FormControl,
  ToggleButton,
  ToggleButtonGroup,
  Container,
  Row,
  Col,
  InputGroupAppend,
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
    fontFamily: "",
    fill: ""
  });
  const [lineStyle, setLineStyle] = useState({
    stroke: "#000",
    strokeWidth: 0,
    strokeDashArray: null
  });

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000000"); // Default color
  const colorPickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target)
      ) {
        setShowColorPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (selectedObject != null && selectedObject.text !== textValue) {
      setTextValue(selectedObject.text);
    }
  }, [textValue]);

  function setTextNewValue(e) {
    setTextValue(e);
    selectedObject.text = e;
    props.currentCanvas.renderAll();
  }
  function setFontStyleHandler(type, v) {
    let fontStyleObj = {
      fontWeight: fontStyle.fontWeight,
      fontStyle: fontStyle.fontStyle,
      underline: fontStyle.underline,
      textAlign: fontStyle.textAlign,
      fontSize: fontStyle.fontSize,
      fontFamily: fontStyle.fontFamily,
      fill: fontStyle.fill,
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
    } else if (type === "fontSize") {
      fontStyleObj.fontSize = v;
      selectedObject.fontSize = v;
    } else if (type === "fontFamily") {
      fontStyleObj.fontFamily = v;
      selectedObject.fontFamily = v;
    } else if (type === "fill") {
      fontStyleObj.fill = v;
      selectedObject.fill = v;
    }
    console.log("selectedObject.fill == > ", selectedObject.fontFamily);
    setFontStyle(fontStyleObj);
    props.currentCanvas.renderAll();
  }

  function setLineStyleHandler(type, v) {
    let lineStyle = {
      stroke: selectedObject.stroke,
      strokeWidth: selectedObject.stroke,
      strokeDashArray: selectedObject.strokeDashArray,
    };
    if (type === "stroke") {
      lineStyle.stroke = v;
      selectedObject.stroke = v;
    } else if (type === "strokeWidth") {
      lineStyle.strokeWidth = v;
      selectedObject.strokeWidth = v;
    } else if (type === "lineStyle") {
      if (v == "dotted") {
        lineStyle.strokeDashArray = [2, 2];
        selectedObject.strokeDashArray = [2, 2];
      } else if (v == "dashed") {
        lineStyle.strokeDashArray = [5, 2];
        selectedObject.strokeDashArray = [5, 2];
      } else if (v == "solid") lineStyle.strokeDashArray = null;
      selectedObject.strokeDashArray = null;
    }
    setLineStyle(lineStyle);
    console.log("selectedObject == > ", selectedObject);
    props.currentCanvas.renderAll();
  }

  const handleColorChange = (color) => {
    console.log("Selected color:", selectedColor);
    setSelectedColor(color.hex);
    setFontStyleHandler("fill", selectedColor);
  };

  const fontFamilyArray = [
    "arial",
    "helvetica",
    "myriad pro",
    "delicious",
    "verdana",
    "georgia",
    "courier",
    "comic sans",
    "impact",
    "monaco",
    "optima",
    "hoefler text",
    "plaster",
    "engagement",
  ];

  const lineStyleArray = ["dotted", "dashed", "solid"];

  const fontSizeArray = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  ];

  function capitalizeEachWord(str) {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  }
  function getLineStyleValue(str) {
    if (str == undefined || str == "") {
      return "solid";
    } else if (typeof str == "object" && str[0] == 2) {
      return "dotted";
    } else {
      return "dashed";
    }
  }

  return (
    <DivCont>
       <WordEditCont>Text Editing</WordEditCont>
      {/* FOnt Family */}
      <Container fluid>
        <Row style={{ marginBottom: 10 }}>
          <Col lg={12}>
            <Text>Your entered text</Text>
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col lg={12}>
            <TextAreaCont>
              <Form.Control
                className="textarea-cont"
                as="textarea"
                value={textValue}
                onChange={(e) => setTextNewValue(e.target.value)}
                placeholder="Text.."
              />
            </TextAreaCont>
          </Col>
        </Row>
      </Container>
      <Divider />
      <Container fluid>
        <Row style={{ marginBottom: 10 }}>
          <Col lg={5}>
            <Text>Font Family</Text>
          </Col>
          <Col lg={7}>
            <DropdownCont>
              <Dropdown className="w-100" as={ButtonGroup}>
                <div className="row">
                  <div className="col-12">
                    {" "}
                    {/* Adjust the width ratio here */}
                    <ButtonGroup>
                      <Button
                        className="w-100"
                        variant="success"
                        style={{ minWidth: "147px", textAlign: "left" }}
                      >
                        {fontStyle.fontFamily
                          ? capitalizeEachWord(fontStyle.fontFamily)
                          : ""}
                      </Button>
                      <Dropdown.Toggle
                        split
                        variant="success"
                        id="dropdown-split-basic"
                      />
                    </ButtonGroup>
                  </div>
                  <div className="col-3">
                    {" "}
                    {/* Adjust the width ratio here */}
                    <Dropdown.Menu className="drop_down_menu">
                      {fontFamilyArray.map((val, index) => (
                        <Dropdown.Item
                          href="#/action-1"
                          onClick={() => setFontStyleHandler("fontFamily", val)}
                        >
                          {capitalizeEachWord(val)}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </div>
                </div>
              </Dropdown>
            </DropdownCont>
          </Col>
        </Row>
        <Row>
          <Col lg={5}>
            <Text>Font Size</Text>
          </Col>
          <Col lg={7}>
            <Text>Font Style</Text>
          </Col>
        </Row>
        <Row>
          <Col lg={5}>
            <DropdownCont>
              <Dropdown className="mr-3">
                <ButtonGroup>
                  <Button
                    className="w-100"
                    variant="success"
                    style={{ minWidth: "73px", textAlign: "left" }}
                  >
                    {fontStyle.fontSize}
                  </Button>
                  <Dropdown.Toggle
                    split
                    variant="success"
                    id="dropdown-split-basic"
                  />
                </ButtonGroup>
                <Dropdown.Menu>
                  {fontSizeArray.map((val, index) => (
                    <Dropdown.Item
                      onClick={() => setFontStyleHandler("fontSize", val)}
                    >
                      {val}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </DropdownCont>
          </Col>
          <Col lg={7}>
            <ButtonGroupCont>
              <ButtonGroup className="w-100">
                <Button
                  variant="success"
                  value={fontStyle.fontWeight}
                  onClick={() =>
                    setFontStyleHandler("fontWeight", !fontStyle.fontWeight)
                  }
                >
                  B
                </Button>
                <Button
                  variant="success"
                  value={fontStyle.fontStyle}
                  style={{ background: "#68b3fd" }}
                  onClick={() =>
                    setFontStyleHandler("fontStyle", !fontStyle.fontStyle)
                  }
                >
                  <i>I</i>
                </Button>
                <Button
                  variant="success"
                  value={fontStyle.underline}
                  onClick={() =>
                    setFontStyleHandler("underline", !fontStyle.underline)
                  }
                >
                  <u>U</u>
                </Button>
              </ButtonGroup>
            </ButtonGroupCont>
          </Col>
        </Row>
      </Container>
      <Divider />
      <Container fluid>
        <Row style={{ marginBottom: 10 }}>
          <Col lg={5}>
            <Text>Text Color</Text>
          </Col>
          <Col lg={7}>
            <InputGroupCont>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="#HFG54D"
                  aria-label="Color code"
                  aria-describedby="basic-addon2"
                  value={fontStyle.fill}
                />
                <Button
                  variant="secondary"
                  // value={fontStyle.fill}
                  onClick={() => setShowColorPicker(!showColorPicker)}
                >
                  Clr
                </Button>
              </InputGroup>
            </InputGroupCont>
          </Col>
        </Row>
        <Row>
          <ColorPickCont ref={colorPickerRef}>
            {showColorPicker && (
              <div>
                <SketchPicker
                  color={selectedColor}
                  onChange={handleColorChange}
                />
              </div>
            )}
          </ColorPickCont>
        </Row>
        <Row>
          <Col lg={12}>
            <Text>Text Alignment</Text>
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col lg={12}>
            <ButtonGroupCont>
              <ButtonGroup className="w-100">
                <Button
                  variant="secondary"
                  onClick={() => setFontStyleHandler("textAlign", "left")}
                  style={{ background: "#68b3fd" }}
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
            </ButtonGroupCont>
          </Col>
        </Row>

        {/* Line Styles */}
        <Row>
          <Col lg={6}>
            <Text>Line Style</Text>
          </Col>
          <Col lg={6}>
            <Text>Line Color</Text>
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col lg={6}>
            <DropdownCont>
              <Dropdown className="w-100" as={ButtonGroup}>
                <div className="row">
                  <div className="col-12">
                    <ButtonGroup>
                      <Button
                        className="w-100"
                        variant="success"
                        style={{ minWidth: "117px", textAlign: "left" }}
                      >
                        {getLineStyleValue(lineStyle.strokeDashArray)}
                      </Button>
                      <Dropdown.Toggle
                        split
                        variant="success"
                        id="dropdown-split-basic"
                      />
                    </ButtonGroup>
                  </div>
                  <div className="col-3">
                    <Dropdown.Menu>
                      {lineStyleArray.map((val, index) => (
                        <Dropdown.Item
                          href="#/action-1"
                          onClick={() => setLineStyleHandler("lineStyle", val)}
                        >
                          {capitalizeEachWord(val)}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </div>
                </div>
              </Dropdown>
            </DropdownCont>
          </Col>
          <Col lg={6}>
            <InputGroupCont>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="#HFG54D"
                  aria-label="Color code"
                  aria-describedby="basic-addon2"
                />
                <Button
                  variant="secondary"
                  value={fontStyle.fontWeight}
                  onClick={() => setShowColorPicker(!showColorPicker)}
                >
                  Clr
                </Button>
              </InputGroup>
            </InputGroupCont>
          </Col>
        </Row>
        <Row>
          {/*  <ColorPickCont ref={colorPickerRef}>
          </ColorPickCont> */}
        </Row>
        <Row>
          <Col lg={12}>
            <Text>Text Alignment</Text>
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col lg={12}></Col>
        </Row>

        <Row style={{ marginBottom: 10 }}>
          <Col lg={12}>
            <Text> More..</Text>
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col lg={12}>
            <Text> More..</Text>
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col lg={12}>
            <Text> More..</Text>
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col lg={12}>
            <Text> More..</Text>
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col lg={12}>
            <Text> More..</Text>
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col lg={12}>
            <Text> More..</Text>
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col lg={12}>
            <Text> More..</Text>
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col lg={12}>
            <Text> More..</Text>
          </Col>
        </Row>
      </Container>
      {/* <Divider /> */}
    </DivCont>
  );
};

export default WordEdit;
