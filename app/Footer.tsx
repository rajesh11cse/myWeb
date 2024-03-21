import React from 'react';

import {
    Row,
    Col,
  } from "react-bootstrap";

class FooterWrapper extends React.Component{
    render(){
        return(
            <div style={{color:'white'}}>
                <Row>
                    <Col lg={3}>
                        Company
                    </Col>
                    <Col lg={3}>
                        Business
                    </Col>
                    <Col lg={3}>
                        Learn
                    </Col>
                    <Col lg={3}>
                        Contact Us
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                    Copyright © 2024 rvdocs Inc, All rights reserved
                    </Col>
                </Row>
            </div>
        )
    }
}

export default FooterWrapper;