import React, { useState, useRef, useEffect } from "react";
import "./accordion.css";



// SVG Icons
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';


const FAQs = (props) => {
  const contentEl = useRef(null);
  const { handleToggle, active, faq } = props;
  const { header, id, text } = faq;
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentEl.current) {
      // Set content height to scrollHeight if active, otherwise 0
      setContentHeight(active === id ? contentEl.current.scrollHeight : 0);
    }
  }, [active, id]);

  return (
    <div className="rc-accordion-card">
    <div className="rc-accordion-header">
      <div
        className={`rc-accordion-toggle p-3 ${active == id ? 'active' : ''}`}
        onClick={() => handleToggle(id)}
      >
        <h5 className="rc-accordion-title">{header}</h5>
        <FontAwesomeIcon icon={faAngleRight} rotation={active == id ? 90 : 0} color={active == id ? "#fff" : "#727E8C"}/>
      </div>
    </div>
    <div
      className={`rc-collapse ${active === id ? "show" : ""}`}
      style={{ height: `${contentHeight}px` }}
    >
      <div ref={contentEl}  className="rc-accordion-body">
        <p className="mb-0">{text}</p>
      </div>
    </div>
  </div>
  );
};
export default FAQs;