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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPercent } from '@fortawesome/free-solid-svg-icons';


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
  const [opacity, setOpacity] = useState(1); // Opacity

  const colorPickerRef = useRef<HTMLDivElement>(null);
  function capitalizeEachWord(str: string) {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  }
  function getLineStyleValue(str:string) {
    if (str == undefined || str == "") {
      return "solid";
    } else if (typeof str == "object" && str[0] == 2) {
      return "dotted";
    } else {
      return "dashed";
    }
  }
  const lineStyleArray = ["dotted", "dashed", "solid"];
  function setLineStyleHandler(type: string, v: any) {
    let lineStyle = {
      stroke: selectedObject.stroke,
      strokeWidth: selectedObject.strokeWidth,
      strokeDashArray: selectedObject.strokeDashArray,
      opacity: selectedObject.opacity,
    };
    if (type === "stroke") {
      lineStyle.stroke = v;
    } else if (type === "strokeWidth") {
      lineStyle.strokeWidth = v;
    } else if (type === "lineStyle") {
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
      } else if (v == "opacity") {
        lineStyle.opacity = v;
      }
    }
    selectedObject.set(type, v);
    // Trigger modification event
    currentCanvas.fire('object:modified', { target: selectedObject });
    setLineStyle(lineStyle);
    currentCanvas.renderAll();
  }

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        setShowColorPicker(false)
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (selectedObject != null) {
      let lineStyle = {
        stroke: selectedObject.stroke,
        strokeWidth: selectedObject.strokeWidth,
        strokeDashArray: selectedObject.strokeDashArray,
        opacity: selectedObject.opacity,
      };
      setLineStyle(lineStyle);
      setThicknessRangeValue(selectedObject.strokeWidth * 10);
      setOpacity(selectedObject.opacity * 100);
      setSelectedColor(selectedObject.stroke);
    }
  }, [selectedObject]);

  const handleColorChange = (color: any) => {
    setSelectedColor(color.hex);
    setLineStyleHandler("stroke", selectedColor);
  };

  const handleColorLineChange = (e: any) => {
    setSelectedColor(e.target.value);
    setLineStyleHandler("stroke", selectedColor);
  };


  const handleThickness = (event: any) => {
    if (event.target.value < 1 || event.target.value > 100) {
      return;
    }
    setThicknessRangeValue(event.target.value);
    setLineStyleHandler("strokeWidth", parseInt(event.target.value) / 10);
  };

  const handleOpacity = (event: any) => {
    if (event.target.value < 1 || event.target.value > 100) {
      return;
    }
    setOpacity(event.target.value);
    setLineStyleHandler("opacity", parseInt(event.target.value) / 100);
  };


  useEffect(() => {
    currentCanvas.on("object:scaling", function (options:any) {
      let obj = options.target;
     /*  if (obj.strokeDashArray != null) {
        console.log("current strokeDashArray : ", obj.strokeDashArray[0], obj.strokeDashArray[1])
        let width = obj.width * obj.scaleX;
        let perc = (obj.width * obj.scaleX - obj.width) / obj.width * 100;
        let newDashValue = obj.strokeDashArray[0] - (obj.strokeDashArray[0] * perc / 100);
        let newDashDiff = obj.strokeDashArray[1] - (obj.strokeDashArray[1] * perc / 100);
        console.log("new strokeDashArray : ", Math.round(newDashValue),  Math.round(newDashDiff));
        selectedObject.set("strokeDashArray", [Math.round(newDashValue),  Math.round(newDashDiff)]);
      } */
    });
  }, []);


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
                          key={index}
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
                  value={selectedColor}
                  onChange={handleColorLineChange}
                />
                <Button
                  style={{padding: "5px", color: `${selectedColor}`, backgroundColor: `${selectedColor}`, border: `1px solid ${selectedColor}`}}
                  variant="secondary"
                  onClick={() => setShowColorPicker(!showColorPicker)}
                >
                  Clrr
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
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col lg={12}>
                <Row>
                  <Col lg={3}>
                    <InputGroupCont>
                      <InputGroup className="mb-3">
                        <Form.Control
                          type="text"
                          value={thicknessRangeValue}
                          aria-describedby="thickness"
                          onChange={handleThickness}
                          style={{ padding: "5px" }}
                        />
                        <Button
                          style={{ padding: "5px" }}
                          disabled
                          variant="primary"
                        >
                         <FontAwesomeIcon icon={faPercent} />
                        </Button>
                      </InputGroup>
                    </InputGroupCont>
                  </Col>

                  <Col lg={9}>
                    <RangeSlider value={thicknessRangeValue}>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={thicknessRangeValue}
                        onChange={handleThickness}
                      />
                    </RangeSlider>
                  </Col>
                </Row>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col lg={12}>
            <Text>Line Opacity</Text>
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col lg={3}>
            <InputGroupCont>
              <InputGroup className="mb-3">
                <Form.Control
                  type="text"
                  value={opacity}
                  aria-describedby="thickness"
                  onChange={handleOpacity}
                  style={{ padding: "5px" }}
                />
                <Button style={{ padding: "5px" }} disabled variant="primary">
                  <FontAwesomeIcon icon={faPercent} />
                </Button>
              </InputGroup>
            </InputGroupCont>
          </Col>
          <Col lg={9}>
            <RangeSlider value={opacity}>
              <input
                type="range"
                min="1"
                max="100"
                value={opacity}
                onChange={handleOpacity}
              />
            </RangeSlider>
          </Col>
        </Row>
      </Container>
    </>
  );
};
