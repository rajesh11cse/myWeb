import React from "react";

import { Row, Col, Stack } from "react-bootstrap";

import styled from "styled-components";

import { Instagram } from "./assets/icons/Instagram";
import { Twitter } from "./assets/icons/Twitter";
import { Linkedin } from "./assets/icons/Linkedin";
import { Facebook } from "./assets/icons/Facebook";

export const DivText = styled.div`
  margin: 3rem 5rem;

  @media (max-width: 768px) {
    margin: 2rem 2rem 0 2rem;
  }
  .footerHeading {
    box-sizing: border-box;
    margin-bottom: 1rem;
    color: #fff;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    line-height: 1.25rem;
    letter-spacing: 2.5px;
    text-align: left;
  }
  .footerData {
    font: 300 13px Nunito Sans, sans-serif, -apple-system, BlinkMacSystemFont,
      Segoe UI, Oxygen, Ubuntu, Cantarell, Helvetica Neue;
    line-height: 1.5;
    display: flex;
    color: #9ca3af;
    &:hover {
      text-decoration: none !important;
      color: #fff;
    }
  }
  .footerData2 {
    font: 300 13px Nunito Sans, sans-serif, -apple-system, BlinkMacSystemFont,
      Segoe UI, Oxygen, Ubuntu, Cantarell, Helvetica Neue;
    color: #9ca3af;
    &:hover {
      text-decoration: none !important;
      color: #fff;
    }
  }
`;

export const DivContactUs = styled.div`
  display: flex;
  column-gap: 0.5rem;
`;

export const Divider = styled.div`
  display: inline-block;
  border-top: 1px solid #000000;
  width: 96%;
  margin: 6px 0;
`;

export const DivTextCopyRight = styled.div`
  margin-bottom: 1rem;
  font-size: 10px;
  color: #b2b2b2;
`;

class FooterWrapper extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <DivText>
              <div className="footerHeading">company</div>
              <div className="flex">
                <a aria-label="About Us" href="#">
                  <p className="footerData">About Us</p>
                </a>
              </div>
              <div className="flex">
                <a aria-label="In the News" href="#">
                  <p className="footerData">In the News</p>
                </a>
              </div>
              <div className="flex">
                <a aria-label="Careers" href="#">
                  <p className="footerData">Careers</p>
                </a>
              </div>
              <div className="flex">
                <a aria-label="Blog" href="#">
                  <p className="footerData">Blog</p>
                </a>
              </div>
            </DivText>
          </Col>
          <Col>
            <DivText>
              <div className="footerHeading">Business</div>
              <div className="flex">
                <a aria-label="Dynamic Contents" href="#">
                  <p className="footerData">Dynamic Templates</p>
                </a>
              </div>
              <div className="flex">
                <a aria-label="API Doc" href="#">
                  <p className="footerData">API Doc</p>
                </a>
              </div>
              <div className="flex">
                <a aria-label="Privacy Policy" href="#">
                  <p className="footerData">Privacy Policy</p>
                </a>
              </div>
              <div className="flex">
                <a aria-label="Terms of Service" href="#">
                  <p className="footerData">Terms of Service</p>
                </a>
              </div>
              <div className="flex">
                <a aria-label="Security" href="#">
                  <p className="footerData">Security</p>
                </a>
              </div>
            </DivText>
          </Col>
          <Col>
            <DivText>
              <div className="footerHeading">Pricing</div>
              <div className="flex">
                <a aria-label="Yearly" href="#">
                  <p className="footerData">Yearly</p>
                </a>
              </div>
              <div className="flex">
                <a aria-label="Monthly" href="#">
                  <p className="footerData">Monthly</p>
                </a>
              </div>
              <div className="flex">
                <a aria-label="For Individuals" href="#">
                  <p className="footerData">For Individuals</p>
                </a>
              </div>
              <div className="flex">
                <a aria-label="Try for Free" href="#">
                  <p className="footerData">Try for Free</p>
                </a>
              </div>
            </DivText>
          </Col>
          <Col>
            <DivText>
              <div className="footerHeading">Contact Us</div>
              <DivContactUs>
                <a aria-label="instagram" href="">
                  <Instagram />
                </a>
                <a aria-label="twitter" href="">
                  <Twitter />
                </a>

                <div style={{ marginTop: "-3px" }}>
                  <a aria-label="linkedin" href="">
                    <Linkedin />
                  </a>
                </div>

                <a aria-label="facebook" href="">
                  <Facebook />
                </a>
              </DivContactUs>
            </DivText>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Divider />
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <DivTextCopyRight>
              Copyright © 2024 rvdocs Inc, All rights reserved
            </DivTextCopyRight>
          </Col>
        </Row>
      </div>
    );
  }
}

export default FooterWrapper;
