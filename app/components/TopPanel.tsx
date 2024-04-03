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
  TopPanelCon,
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

import { DownloadFile } from "../assets/icons/DownloadFile";
import {  SaveFile } from "../assets/icons/SaveFile";
import {  PreviewFile } from "../assets/icons/PreviewFile";


interface PanelProps {
  saveFile: () => void;
  downloadFile: () => void;
  clearPage: () => void;
  previewFile: () => void;
}

  export const TopPanel: React.FC<PanelProps> = (props) => {
  const { saveFile, downloadFile, clearPage, previewFile } = props;
  // const [textValue, setTextValue] = useState("");

  useEffect(() => {}, []);

  return (
    <TopPanelCon>
        <Row className="w-100 justify-content-end">
          <Col lg={6} className="text-left">
            <ButtonGroup id="download" className="mr-3" onClick={()=>clearPage()}>
              <Button variant="link" size="sm">
                Clear Form
              </Button>
            </ButtonGroup>
          </Col>
          <Col lg={6} className="text-right">
            <ButtonGroup id="download" className="mr-3" onClick={()=>downloadFile()}>
              <Button variant="secondary" size="sm">
                Download
              </Button>
              <Button variant="primary" size="sm">
                <DownloadFile /> 
              </Button>
            </ButtonGroup>
            <ButtonGroup id="save" className="mr-3" onClick={()=>saveFile()}>
              <Button variant="success" size="sm">
                Save
              </Button>
              <Button variant="primary" size="sm">
                <SaveFile />
              </Button>
            </ButtonGroup>
            <ButtonGroup id="preview">
              <Button variant="dark" size="sm"  onClick={()=>previewFile()}>
                Preview
              </Button>
              <Button variant="primary" size="sm">
                <PreviewFile />
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
    </TopPanelCon>
  );
};
