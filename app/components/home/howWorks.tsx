import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Button, Image } from "react-bootstrap";

import doDynamicContentImg from "../../assets/images/do-dynamic-content.png";



import "./css/howWorks.css";

export const HowWorks: React.FC = (props) => {
  // const { currentCanvas, selectedObject } = props;
  // const [showColorPicker, setShowColorPicker] = useState(false);
  useEffect(() => {}, []);

  return (
    <div className="hw-container">
      <Row>
        <Col xs={12} sm={12} md={5}>
        <Row>
          <div className="hw-title">
            <h2>How this works?</h2>
            <p>Unlock the power to create professional templates effortlessly with RVDocs. Craft polished documents in just minutes</p>
          </div>
          </Row>
        </Col>
        <Col>
        <Image src={doDynamicContentImg} alt="Banner" fluid />
        </Col>
      </Row>
    </div>
  );
};
