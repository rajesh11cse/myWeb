import React, { useContext } from "react";
import "./accordion.css";
import Accordion from "react-bootstrap/Accordion";
import AccordionContext from "react-bootstrap/AccordionContext";
import { useAccordionButton } from "react-bootstrap/AccordionButton";

// SVG Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const FAQs = (props) => {
  const {
    faq: { header, id, text },
  } = props;
  function CustomToggle({ children, eventKey, callback }) {
    const { activeEventKey } = useContext(AccordionContext);
    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey)
    );
    return (
      <div
        className={`rc-accordion-toggle p-3 ${
          activeEventKey == id ? "active" : ""
        }`}
        onClick={decoratedOnClick}
      >
        <h5 className="rc-accordion-title">{header}</h5>
        <FontAwesomeIcon
          icon={faAngleRight}
          style={{ transition: '0.35s' }}
          rotation={activeEventKey == id ? 90 : 0}
          color={activeEventKey == id ? "#fff" : "#727E8C"}
        />
        {children}
      </div>
    );
  }

  return (
    <div className="rc-accordion-card">
      <Accordion defaultActiveKey="0" flush>
        <div className="rc-accordion-header">
          <CustomToggle eventKey={id}></CustomToggle>
          <Accordion.Collapse eventKey={id}>
            <div className="rc-accordion-body">
              <p className="mb-0">{text}</p>
            </div>
          </Accordion.Collapse>
        </div>
      </Accordion>
    </div>
  );
};
export default FAQs;
