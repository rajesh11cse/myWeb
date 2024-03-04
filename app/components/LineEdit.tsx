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
  FormInputCont,
  RangeSlider,
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

export const LineEdit: React.FC<TextEditProps> = (props) => {
  const { currentCanvas, selectedObject } = props;
  const [lineStyle, setLineStyle] = useState({
    stroke: "#000",
    strokeWidth: 0,
    strokeDashArray: null,
  });
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000000"); // Default color
  const [thicknessRangeValue, setThicknessRangeValue] = useState(100); // Thickness range Value

  const colorPickerRef = useRef(null);
  function capitalizeEachWord(str: string) {
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
  const lineStyleArray = ["dotted", "dashed", "solid"];
  const lineWidthArray = [1,2,3,4,5];
  function setLineStyleHandler(type: string, v: any) {
    let lineStyle = {
      stroke: selectedObject.stroke,
      strokeWidth: selectedObject.strokeWidth,
      strokeDashArray: selectedObject.strokeDashArray,
    };
    if (type === "stroke") {
      lineStyle.stroke = v;
    } else if (type === "strokeWidth") {
      lineStyle.strokeWidth = v;
    }else if (type === "lineStyle") {
      if (v == "dotted") {
        lineStyle.strokeDashArray = [2, 2];
        type = "strokeDashArray";
        v = [2, 2];
      } else if (v == "dashed") {
        lineStyle.strokeDashArray = [5, 2];
        type = "strokeDashArray";
        v = [5, 2];
      } else if (v == "solid") {
        lineStyle.strokeDashArray = null;
        type = "strokeDashArray";
        v = null;
      }
    }
    selectedObject.set(type, v);
    setLineStyle(lineStyle);
    currentCanvas.renderAll();
  }

  useEffect(() => {
    const handleClickOutside = (event: any) => {
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
    if (
      selectedObject != null &&
      selectedObject.type == "line") {
      let lineStyle = {
        stroke: selectedObject.stroke,
        strokeWidth: selectedObject.strokeWidth,
        strokeDashArray: selectedObject.strokeDashArray,
      };
      setLineStyle(lineStyle);
      setThicknessRangeValue(selectedObject.strokeWidth*10);
    }
  }, [selectedObject]);

  const handleColorChange = (color: any) => {
    setSelectedColor(color.hex);
    setLineStyleHandler("stroke", selectedColor);
  };



  const handleChange = (event:any) => {
    setThicknessRangeValue(event.target.value);
    setLineStyleHandler("strokeWidth", parseInt(event.target.value)/10)
  };

  return (
    <>
    <Container fluid>
      <Row>
        <Col lg={6}>
          <Text>Line Style</Text>
        </Col>
        <Col lg={6}>
          <Text>Border Color</Text>
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
                      {capitalizeEachWord(
                        getLineStyleValue(lineStyle.strokeDashArray)
                      )}
                    </Button>
                    <Dropdown.Toggle
                      split
                      variant="success"
                      id="dropdown-split-basic"
                    />
                  </ButtonGroup>
                </div>
                <div className="col-3">
                  <Dropdown.Menu className="drop_down_menu">
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
                // value={fontStyle.fontWeight}
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
    </Container>
    <Divider />
       <Container fluid>
       <Row>
         <Col lg={12}>
           <Text>Line Thickness</Text>
         </Col>
         {/* <Col lg={6}>
           <Text>Line Opacity</Text>
         </Col> */}
       </Row>
       <Row style={{ marginBottom: 10 }}>
         <Col lg={12}>
         <DropdownCont>
            <Dropdown className="w-100" as={ButtonGroup}>
              <div className="row">
                <div className="col-3">
                <FormInputCont>
                  <Form.Control
                    type="text"
                    value={thicknessRangeValue+"%"}
                    aria-describedby="thickness"
                  />
                  </FormInputCont>
                </div>
                <div className="col-9">
                <RangeSlider value={thicknessRangeValue}>
                    <input type="range" min="1" max="100" value={thicknessRangeValue} onChange={handleChange}/>
                </RangeSlider>
                </div>
              </div>
            </Dropdown>
          </DropdownCont>
         </Col>
       </Row>
     </Container>
     </>
  );
};
