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


interface TextEditProps {
  selectedObject: any;
  currentCanvas: any;
}

export const BoxEdit: React.FC<TextEditProps> = (props) => {
  const { currentCanvas, selectedObject } = props;
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000"); // Default color
  const [opacity, setOpacity] = useState(1); // Opacity

  const colorPickerRef = useRef(null);

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
    if (selectedObject != null) {
      setOpacity(selectedObject.opacity * 100);
      setSelectedColor(selectedObject.fill);
    }
  }, [selectedObject]);

  const handleBgColorChange = (color: any) => {
    setSelectedColor(color.hex);
    selectedObject.set("fill", selectedColor);
    currentCanvas.renderAll();
  };


  const handleOpacity = (event: any) => {
    if (event.target.value < 5 || event.target.value > 100) {
      return;
    }
    setOpacity(event.target.value);
    selectedObject.set("opacity", parseInt(event.target.value) / 100);
    currentCanvas.renderAll();
  };


  useEffect(() => {
   /*  currentCanvas.on("object:scaling", function (options:any) {
      let obj = options.target;
      console.log("selectedObject = > ", obj)
    }); */
  }, []);


  return (
    <>
      <Container fluid>
        <Row>
          <Col lg={12}>
            <Text>Background Color</Text>
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col lg={12}>
            <InputGroupCont>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="#HFG54D"
                  aria-label="Color code"
                  aria-describedby="basic-addon2"
                  value={selectedColor}
                  onChange={handleBgColorChange}
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
                  onChange={handleBgColorChange}
                />
              </div>
            )}
          </ColorPickCont>
        </Row>
        <Divider />
      </Container>
      <Container fluid>
        <Row>
          <Col lg={12}>
            <Text>Background Opacity</Text>
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
                <Button style={{ padding: "5px" }} disabled variant="secondary">
                  {" "}
                  %{" "}
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
