import React, { useEffect } from "react";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { GetStyledClass, GetBodyContent } from "./htmlData";
import "../css/preview.css";

interface PreviewContentProps {
  currentCanvas: any;
  preview: boolean;
  togglePreview: () => void;
}

export const PreviewContent: React.FC<PreviewContentProps> = (props) => {
  const { preview, togglePreview, currentCanvas } = props;
  const [show, setShow] = useState(false);
  const [htmlContent, setHtmlContent] = useState(``);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    togglePreview();
  };

  function loadHtmlData() {
    const json = currentCanvas.toJSON(); // Convert canvas to JSON
    delete json.backgroundImage; // Remove any background image
    let finalStyledClass = ``;
    let finalBodyContent = ``;
    json.objects.forEach((element, i) => {
      let { className, styledClass } = GetStyledClass(element, i);
      let { bodyContent } = GetBodyContent(element, className);
      finalStyledClass = finalStyledClass + "\n" + styledClass;
      finalBodyContent = finalBodyContent + "\n" + bodyContent;
    });
    const htmlData = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          ${finalStyledClass}
        </style>
      </head>
      <body>
        ${finalBodyContent}
      </body>
    </html>
  `;
    setHtmlContent(htmlData);
  }

  useEffect(() => {
    setShow(true);
    if (currentCanvas && currentCanvas != null) {
      loadHtmlData();
    }
  }, [currentCanvas]);

  return (
    <React.Fragment>
      <Modal
        show={show}
        onHide={handleClose}
        fullscreen="true"
        dialogClassName="model-container"
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="page-container">
            <div className="content">
              <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>
          </div>
        {/*   <div className="page-break"></div>
          <div className="page-container">
            <div className="content">
              <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>
          </div> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};
