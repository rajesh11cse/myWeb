import React from 'react';
import FooterMobile from './FooterMobile';
import FooterDesktop from './FooterDesktop';
import './css/footer.css';


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