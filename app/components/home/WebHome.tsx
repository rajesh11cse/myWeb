import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Image } from "react-bootstrap";
import styled from "styled-components";
import bannerImage from "../../assets/images/banner.png";
import FAQs from "./FAQs";
import { faqs } from "./utils/faqs";

export const WebHome: React.FC = (props) => {
  


  const [active, setActive] = useState(null);

  const handleToggle = (index:any) => {
      if (active === index) {
          setActive(null);
      } else {
          setActive(index);
      }
  }

  const FAQCont = styled.div`
    margin: 18px 0;
    padding: 36px 0;
    background-color: #fafafa;
    h1 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 30px;
    }
  `;

  return (
    <div>
      {/* 1. Banner
         1. Solve Design Challenges Effortlessly
         1. Trusted & Featured By The Top Brands
         1. See why RVDocs is trusted by 20+ million users
         2. Frequently asked question */}
      <Row>
        <Image src={bannerImage} alt="Banner" width={"100%"} height={400} />
      </Row>
      <FAQCont>
        <Row>
          <Col></Col>
          <Col lg={7}>
            <h1>Frequently asked questions</h1>
            
            {faqs.map((faq, index) => (
              // <FAQs title={title} content={content} />
                <FAQs key={index} active={active} handleToggle={handleToggle} faq={faq} />
            ))}
          </Col>
          <Col></Col>
        </Row>
      </FAQCont>
    </div>
  );
};
