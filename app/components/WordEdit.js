import React, { useEffect } from "react";
import "../css/wordEdit.css"; // Assume you have a CSS file for styling

import {
  Button,
  ButtonGroup,
  DropdownButton,
  Dropdown,
  FloatingLabel,
  Form,
} from "react-bootstrap";

function WordEdit() {
  useEffect(() => {}, []);
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* <FloatingLabel controlId="floatingTextarea" label="Comments" className="mb-3" > */}
            <Form.Control
              className="textarea-cont"
              as="textarea"
              placeholder="Leave a comment here"
            />
            {/* </FloatingLabel> */}
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
              <Button variant="secondary">B</Button>
              <Button variant="secondary">
                <i>I</i>
              </Button>
              <Button variant="secondary">
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
                variant="secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="20" >
                  <path d="M20 6H4V4h16v2zm0 5H4V9h16v2zm0 5H4v-2h16v2zm0 4H4v-2h16v2z" />
                </svg>
              </Button>
              <Button
              className="customBtn" 
                variant="secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="20" >
                  <path d="M20 6H4V4h16v2zm0 5H4V9h16v2zm0 5H4v-2h16v2zm0 4H4v-2h16v2z" />
                </svg>
              </Button>
              <Button
              className="customBtn" 
                variant="secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="20" >
                  <path d="M20 6H4V4h16v2zm0 5H4V9h16v2zm0 5H4v-2h16v2zm0 4H4v-2h16v2z" />
                </svg>
              </Button>
              <Button
              className="customBtn" 
                variant="secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="20" >
                  <path d="M20 6H4V4h16v2zm0 5H4V9h16v2zm0 5H4v-2h16v2zm0 4H4v-2h16v2z" />
                </svg>
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WordEdit;
