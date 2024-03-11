import React, { useState, useEffect, useRef } from "react";

import { SketchPicker } from "react-color";
import {
  DropdownCont,
  Divider,
  Text,
  ButtonGroupCont,
  InputGroupCont,
  TextAreaCont,
  ColorPickCont,
} from "../css/styled";
import {
  Button,
  ButtonGroup,
  Dropdown,
  InputGroup,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";


// SVG Icons
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown, faAlignCenter, faAlignJustify, faAlignLeft, faAlignRight } from '@fortawesome/free-solid-svg-icons';

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
  const colorPickerRef = useRef<HTMLDivElement>(null);

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
      fontStyleObj.fontStyle = v
      v = v ? "italic" : "normal";
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
    // Trigger modification event
    currentCanvas.fire('object:modified', { target: selectedObject });
    currentCanvas.renderAll();
  }


  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (
        colorPickerRef.current && !colorPickerRef.current.contains(event.target)
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



  useEffect(() => {
    currentCanvas.on('mouse:up', function(event:any) {
      const selection = event.target;
      // Check if there is a selection
      if (selection && selection.isEditing) {
        const selectionStart = selection.selectionStart;
        const selectionEnd = selection.selectionEnd;
        console.log("selectionStart == > ", selectionStart)
      }
    });
  }, [])


  function setTextNewValue(v:string) {
    setTextValue(v);
    selectedObject.text = v;
    // Trigger modification event
    currentCanvas.fire('object:modified', { target: selectedObject });
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
                          key={index}
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
                <Button onClick={()=>setFontStyleHandler("fontSize", fontStyle.fontSize-1)}>
                  <FontAwesomeIcon icon={faAngleDown as IconProp} />
                </Button>
                <Button disabled variant="primary">{fontStyle.fontSize}</Button>
               {/*  <input
                  type="number"
                  value={fontSize}
                  onChange={handleFontSizeChange}
                  style={{ width: '60px', textAlign: 'center' }}
                /> */}

                <Button onClick={()=>setFontStyleHandler("fontSize", fontStyle.fontSize+1)}>
                  <FontAwesomeIcon icon={faAngleUp as IconProp} />
                </Button>
              </ButtonGroup>
{/* 
                <Dropdown.Menu className="drop_down_menu">
                  {fontSizeArray.map((val, index) => (
                    <Dropdown.Item
                    key={index}
                      onClick={() => setFontStyleHandler("fontSize", val)}
                    >
                      {val}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu> */}
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
                  onClick={() => setFontStyleHandler("fontStyle", !fontStyle.fontStyle)} 
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
                  <FontAwesomeIcon icon={faAlignLeft} />
                </Button>
                <Button
                  variant="success"
                  active={fontStyle.textAlign == "center" ? true : false}
                  onClick={() => setFontStyleHandler("textAlign", "center")}
                >
                  <FontAwesomeIcon icon={faAlignCenter} />
                </Button>
                <Button
                  variant="success"
                  active={fontStyle.textAlign == "right" ? true : false}
                  onClick={() => setFontStyleHandler("textAlign", "right")}
                >
                   <FontAwesomeIcon icon={faAlignRight} />
                </Button>
                <Button
                  variant="success"
                  active={fontStyle.textAlign == "justify" ? true : false}
                  onClick={() => setFontStyleHandler("textAlign", "justify")}
                >
                  <FontAwesomeIcon icon={faAlignJustify} />
                </Button>
              </ButtonGroup>
            </ButtonGroupCont>
          </Col>
        </Row>
      </Container>
    </>
  );
};
