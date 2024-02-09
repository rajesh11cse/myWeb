import React from 'react';

class FooterMobile extends React.Component{
    render(){
        return(
            <div className="footer-mobile">
               {/* <div className="footer-item">Item 1</div>
               <div className="footer-item">Item 2</div>
               <div className="footer-item">Item 3</div> */}

                <div className="footer-item">
                    <img src=""/>
                    <span className="caption">Item 1</span>
                </div>
                <div className="footer-item">
                    <img src=""/>
                    <span className="caption">Item 2</span>
                </div>
                <div className="footer-item">
                    <img src=""/>
                    <span className="caption">Item 3</span>
                </div>

            </div>
        )
    }
}

export default FooterMobile;