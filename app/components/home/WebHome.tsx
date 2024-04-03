import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import styled from "styled-components";
import bannerImage from "../../assets/images/banner.png";
import FAQs from "./FAQs";
import { faqs } from "./utils/faqs";
import Testimonial from "./Testimonial";
import { DesignOnce } from "./designOnce";
import { HowWorks } from "./howWorks";


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
    .faq-outer-map{
      max-width: 75%;
      margin: 0 auto;
      margin-bottom: 40px;
      @media (max-width: 768px) {
        max-width: 100%;
       }
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
        <Image src={bannerImage} alt="Banner" fluid />
      </Row>

      {/* New Release templates*/}
      <Row>New Release templates</Row>

      {/* How Its works ?*/}
      <HowWorks />

      {/* Design once. Use all the time with dynamic contents.*/}
        <DesignOnce />
      {/* What People Think About Us*/}
      <Row>
        <Col lg={12}>
          <Testimonial />
        </Col>
      </Row>
      {/* Frequently asked question */}
      <FAQCont>
        <Row>
          <Col lg={12}>
            <div className="p-3  faq-outer-map">
            <h1>Frequently asked questions</h1>
            {faqs.map((faq, index) => (
              <FAQs faq={faq} />
            ))}
            </div>
          </Col>
        </Row>
      </FAQCont>
      {/* Other
         1. Solve Design Challenges Effortlessly
         1. Trusted & Featured By The Top Brands
         1. See why RVDocs is trusted by 20+ million users
         2. Frequently asked question */}
    </div>
  );
};
