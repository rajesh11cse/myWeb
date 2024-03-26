import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import styled from "styled-components";
import bannerImage from "../../assets/images/banner.png";
import FAQs from "./FAQs";
import { faqs } from "./utils/faqs";
import Testimonial from "./Testimonial";

export const WebHome: React.FC = (props) => {
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
        <Image src={bannerImage} alt="Banner" fluid/>
      </Row>
      <FAQCont>
        <Row>
          <Col></Col>
          <Col lg={7}>
            <h1>Frequently asked questions</h1>
            {faqs.map((faq, index) => (
              <FAQs faq={faq} />
            ))}
          </Col>
          <Col></Col>
        </Row>
      </FAQCont>
      <Row>
      <Testimonial />
      </Row>
    </div>
  );
};
