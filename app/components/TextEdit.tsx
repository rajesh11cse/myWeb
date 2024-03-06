import React, { useState, useEffect, useRef } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  menuClasses,
  MenuItemStyles,
} from "react-pro-sidebar";
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
} from "react-bootstrap";

import { TextAlignJustify } from "../assets/icons/TextAlignJustify";
import { TextAlignCenter } from "../assets/icons/TextAlignCenter";
import { TextAlignRight } from "../assets/icons/TextAlignRight";
import { TextAlignLeft } from "../assets/icons/TextAlignLeft";

interface TextEditProps {
  selectedObject: any;
  currentCanvas: any;
}

export const TextEdit: React.FC<TextEditProps> = (props) => {
  const { currentCanvas, selectedObject } = props;
  const [textValue, setTextValue] = useState("");
  const [fontStyle, setFontStyle] = useState({
    fontWeight: "",
    fontStyle: "",
    underline: false,
    textAlign: "",
    fontSize: 10,
    fontFamily: "",
    fill: "",
  });
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000000"); // Default color

  const colorPickerRef = useRef(null);

  function capitalizeEachWord(str: string) {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  }

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

  const fontSizeArray = [
    5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    25, 26, 50
  ];

  function setFontStyleHandler(type: string, v: any) {
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
      v = v ? "normal" : "bold";
    } else if (type === "fontStyle") {
      fontStyleObj.fontStyle = v;
    } else if (type === "underline") {
      fontStyleObj.underline = v;
    } else if (type === "textAlign") {
      fontStyleObj.textAlign = v;
    } else if (type === "fontSize") {
      fontStyleObj.fontSize = v;
    } else if (type === "fontFamily") {
      fontStyleObj.fontFamily = v;
    } else if (type === "fill") {
      fontStyleObj.fill = v;
    }
    selectedObject.set(type, v);
    setFontStyle(fontStyleObj);
    currentCanvas.renderAll();
  }


  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (
        colorPickerRef.current
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
    if (
      selectedObject != null &&
      selectedObject.type == "textbox" &&
      selectedObject.text !== textValue
    ) {
      setTextValue(selectedObject.text);
      // Set font text styles properties
      let fontStyleObj = {
        fontWeight: selectedObject.fontWeight,
        fontStyle: selectedObject.fontStyle,
        underline: selectedObject.underline,
        textAlign: selectedObject.textAlign,
        fontSize: selectedObject.fontSize,
        fontFamily: selectedObject.fontFamily,
        fill: selectedObject.fill,
      };
      setFontStyle(fontStyleObj);
    }
  }, [selectedObject]);

  function setTextNewValue(v:string) {
    setTextValue(v);
    selectedObject.text = v;
    currentCanvas.renderAll();
  }

  const handleColorChange = (color: any) => {
    setSelectedColor(color.hex);
    setFontStyleHandler("fill", selectedColor);
  };

  const handleColorTextChange = (e: any) => {
    setSelectedColor(e.target.value);
    setFontStyleHandler("fill", selectedColor);
  };


  return (
    <>
      <Container fluid>
        <Row style={{ marginBottom: 10 }}>
          <Col lg={12}>
            <Text>Your message</Text>
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
                placeholder="Enter your text.."
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
                          <span style={{fontFamily:val}}>{capitalizeEachWord(val)}</span>
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
              <Dropdown className="mr-3" drop="down">
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
                <Dropdown.Menu className="drop_down_menu">
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
                  active={fontStyle.fontWeight == "bold" ? true : false}
                  onClick={() =>
                    setFontStyleHandler("fontWeight", !fontStyle.fontWeight)
                  }
                >
                  B
                </Button>
                <Button
                  variant="success"
                  value={fontStyle.fontStyle}
                  active={fontStyle.fontStyle == "italic" ? true : false}
                  onClick={() => setFontStyleHandler("fontStyle", !fontStyle)}
                >
                  <i>I</i>
                </Button>
                <Button
                  variant="success"
                  active={fontStyle.underline}
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
                  onChange={handleColorTextChange}
                />
                <Button
                style={{color: `${fontStyle.fill}`, backgroundColor: `${fontStyle.fill}`, border: `1px solid ${fontStyle.fill}`}}
                  variant="secondary"
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
                  variant="success"
                  active={fontStyle.textAlign == "left" ? true : false}
                  onClick={() => setFontStyleHandler("textAlign", "left")}
                >
                  <TextAlignLeft />
                </Button>
                <Button
                  variant="success"
                  active={fontStyle.textAlign == "center" ? true : false}
                  onClick={() => setFontStyleHandler("textAlign", "center")}
                >
                  <TextAlignCenter />
                </Button>
                <Button
                  variant="success"
                  active={fontStyle.textAlign == "right" ? true : false}
                  onClick={() => setFontStyleHandler("textAlign", "right")}
                >
                  <TextAlignRight />
                </Button>
                <Button
                  variant="success"
                  active={fontStyle.textAlign == "justify" ? true : false}
                  onClick={() => setFontStyleHandler("textAlign", "justify")}
                >
                  <TextAlignJustify />
                </Button>
              </ButtonGroup>
            </ButtonGroupCont>
          </Col>
        </Row>
      </Container>
    </>
  );
};
