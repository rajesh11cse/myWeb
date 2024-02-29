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

  useEffect(() => {
    if (selectedObject != null) {
      setTextValue(selectedObject.text);
      const fontStyle = {
        fontWeight: selectedObject.fontWeight == "normal" ? true : false,
        fontStyle: selectedObject.fontStyle == "normal" ? true : false,
        underline: selectedObject.underline,
        textAlign: selectedObject.textAlign,
        fontSize: selectedObject.fontSize,
        fontFamily: selectedObject.fontFamily,
      };
      setFontStyle(fontStyle);
    }
  }, [selectedObject]);

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
    }
    console.log("selectedObject.fontFamily == > ", selectedObject.fontFamily);
    setFontStyle(fontStyleObj);
    props.currentCanvas.renderAll();
  }

  const handleColorChange = (color) => {
    console.log("Selected color:", selectedColor);
    setSelectedColor(color.hex);
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

  function capitalizeEachWord(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  }

  return (
    <DivCont>
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
                <div className="col-12"> {/* Adjust the width ratio here */}
                  <ButtonGroup>
                    <Button className="w-100" variant="success" style={{minWidth: '147px', textAlign:'left'}}>{fontStyle.fontFamily ? capitalizeEachWord(fontStyle.fontFamily):''}</Button>
                    <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                  </ButtonGroup>
                </div>
                <div className="col-3"> {/* Adjust the width ratio here */}
                  <Dropdown.Menu>
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
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  {fontStyle.fontSize}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => setFontStyleHandler("fontSize", 1)}
                  >
                    1
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setFontStyleHandler("fontSize", 2)}
                  >
                    2
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setFontStyleHandler("fontSize", 5)}
                  >
                    5
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setFontStyleHandler("fontSize", 10)}
                  >
                    10
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setFontStyleHandler("fontSize", 15)}
                  >
                    15
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </DropdownCont>
          </Col>
          <Col lg={7}>
            <ButtonGroupCont>
              <ButtonGroup className="w-100">
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
                  style={{ background: "#68b3fd" }}
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
