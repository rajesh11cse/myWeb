import React from 'react';

import './footer.css';

import FooterMobile from './FooterMobile';
import FooterDesktop from './FooterDesktop';

class FooterWrapper extends React.Component{
    render(){
        return(
            <div id="footer-container">
                <FooterMobile />
                <FooterDesktop />
            </div>
        )
    }
}

export default FooterWrapper;