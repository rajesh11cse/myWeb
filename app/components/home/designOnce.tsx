import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Button, Image } from "react-bootstrap";

import doDynamicContentImg from "../../assets/images/do-dynamic-content.png";



import "./css/designOnce.css";

export const DesignOnce: React.FC = (props) => {
  // const { currentCanvas, selectedObject } = props;
  // const [showColorPicker, setShowColorPicker] = useState(false);
  useEffect(() => {}, []);

  return (
    <div className="do-container">
      <Row>
        <Col lg={7}>
        <Row>
          <div className="do-title">
            <h2>Design once!</h2>
            <h3>Get template with dynamic contents.</h3>
          </div>
          </Row>
          <Row>
              <Button variant="outline-info" size="sm" className="mr-2"> Design Now </Button>
              <Button variant="outline-success" size="sm"> Download </Button>
          </Row>
          <Row>
            <div className="do-desc">
            <p>Design your template here, and for dynamic content integration, upgrade to our premium <a href="/pricing">plan</a>! to access API keys. Discover more about our <a href="/">API Documentation</a>. Unlock the full potential of your system with seamless integration!</p>
            </div>
          </Row>
        </Col>
        <Col lg={5}>
        <Image src={doDynamicContentImg} alt="Banner" fluid />

        </Col>
      </Row>
    </div>
  );
};
