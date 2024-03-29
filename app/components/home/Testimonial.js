import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
// import "./testmoniol.css";
import { reviews } from "./utils/reviews";
import "./keen.css";
import { Row, Col, Image } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faStar,
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Testimonial = (props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "free",
    slides: {
      perView: 3,
      spacing: 5,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <div className="testimonial-container">
      <Row className="d-flex justify-content-center">
        <div className="heading-about-us">
          <p>
            What People Think <span>About Us</span>
          </p>
          <div className="divider"></div>
        </div>
      </Row>
      <Row>
        <Col>
          {" "}
          <div
            className="arrow arrow-left"
            onClick={(e) => e.stopPropagation() || instanceRef.current?.prev()}
          >
            <FontAwesomeIcon
              icon={faCircleChevronLeft}
              size="3x"
              color="#e7e7e7"
            />{" "}
          </div>
        </Col>
        <Col lg={11}>
          <div className="navigation-wrapper">
            <div ref={sliderRef} className="keen-slider">
              {reviews.map((review, index) => (
                <div className="keen-slider__slide number-slide1 ">
                  <div className="main-container">
                    <Row>
                      <Col lg={7} className="text-left">
                        <div className="ratting">
                          <FontAwesomeIcon
                            icon={faStar}
                            size="lg"
                            color="#FF8A00"
                          />
                          <FontAwesomeIcon
                            icon={faStar}
                            size="lg"
                            color="#FF8A00"
                          />
                          <FontAwesomeIcon
                            icon={faStar}
                            size="lg"
                            color="#FF8A00"
                          />
                          <FontAwesomeIcon
                            icon={faStar}
                            size="lg"
                            color="#E3E3E3"
                          />
                          <FontAwesomeIcon
                            icon={faStar}
                            size="lg"
                            color="#E3E3E3"
                          />
                        </div>
                      </Col>
                      <Col className="text-right">
                        <div className="date-time">28 March 2024</div>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-left">
                        <div className="review">{review.text}</div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={2}>
                        <div className="profile">
                          {/* <FontAwesomeIcon
                        icon={faCircleUser}
                        size="sm"
                        color="#e7e7e7"
                      />{" "} */}
                          <Image
                            src={review.imageUrl}
                            roundedCircle
                            width="50"
                          />
                        </div>
                      </Col>
                      <Col lg={10} className="text-left">
                        <Row>
                          <Col className="text-left">
                            <div className="user">{review.customer}</div>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="text-left">
                            <div className="company">{review.company}</div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Col>
        <Col>
          {" "}
          <div
            className="arrow arrow-right"
            onClick={(e) => e.stopPropagation() || instanceRef.current?.next()}
          >
            <FontAwesomeIcon
              icon={faCircleChevronRight}
              size="3x"
              color="#e7e7e7"
            />{" "}
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={12} className="d-flex justify-content-center">
          {loaded && instanceRef.current && (
            <div className="dots">
              {[
                ...Array(
                  instanceRef.current.track.details.slides.length
                ).keys(),
              ].map((idx) => {
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      instanceRef.current?.moveToIdx(idx);
                    }}
                    className={"dot" + (currentSlide === idx ? " active" : "")}
                  ></button>
                );
              })}
            </div>
          )}
        </Col>
      </Row>

      {/* {loaded && instanceRef.current && (
    <div className="dots">
      {[
        ...Array(instanceRef.current.track.details.slides.length).keys(),
      ].map((idx) => {
        return (
          <button
            key={idx}
            onClick={() => {
              instanceRef.current?.moveToIdx(idx);
            }}
            className={"dot" + (currentSlide === idx ? " active" : "")}
          ></button>
        );
      })}
    </div>
  )} */}
    </div>
  );

  // import React, { useEffect, useState, useRef } from "react";
  // import "./testmoniol.css";
  // import { reviews } from "./utils/reviews";

  // // SVG Icons
  // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  // import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

  // const Testimonial = (props) => {
  //   const [scrollPosition, setScrollPosition] = useState(0);
  //   const [activeReviews, setActiveReviews] = useState([]);

  //   useEffect(() => {
  //     const adjustScrollPosition = () => {
  //       let newPosition = scrollPosition;
  //       if (reviews.length >= 3) {
  //         newPosition = scrollPosition % reviews.length;
  //       }
  //       setScrollPosition(newPosition);
  //     };

  //     adjustScrollPosition();
  //   }, [scrollPosition]);

  //   useEffect(() => {
  //     setActiveReviews(getActiveReviews());
  //   }, [scrollPosition]);

  //   const getActiveReviews = () => {
  //     if (reviews.length === 0) return [];
  //     let active = [];
  //     for (let i = 0; i < 3; i++) {
  //       active.push(reviews[(scrollPosition + i) % reviews.length]);
  //     }
  //     return active;
  //   };

  //   const handleNextClick = () => {
  //     setScrollPosition(scrollPosition + 1);
  //   };

  //   const handlePrevClick = () => {
  //     setScrollPosition(scrollPosition - 1 < 0 ? reviews.length - 1 : scrollPosition - 1);
  //   };

  //   return (
  //     <div className="container-fluid bg-body-tertiary py-5 carousel-main">
  //       <div className="heading-about-us">
  //         What People Think About Us
  //       </div>
  //       <div id="testimonialCarousel" className="carousel">
  //         <div className="carousel-inner">
  //           {activeReviews.map((review, index) => (
  //             <div className="carousel-item" key={index}>
  //               <div className="card shadow-sm rounded-3">
  //                 <div className="quotes display-2 text-body-tertiary">
  //                   <i className="bi bi-quote"></i>
  //                 </div>
  //                 <div className="card-body">
  //                   <p className="card-text">{review.text}</p>
  //                   <div className="d-flex align-items-center pt-2">
  //                     <img src={review.imageUrl} alt={`testimonial-${index + 1}`} />
  //                     <div>
  //                       <h5 className="card-title">{review.customer}</h5>
  //                       <span className="occupation text-secondary">{review.company}</span>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //         <button
  //           className="carousel-control-prev"
  //           type="button"
  //           onClick={handlePrevClick}
  //         >
  //            <FontAwesomeIcon icon={faAngleRight} rotation={180} />
  //         </button>
  //         <button
  //           className="carousel-control-next"
  //           type="button"
  //           onClick={handleNextClick}
  //         >
  //            <FontAwesomeIcon icon={faAngleRight} />
  //         </button>
  //       </div>
  //     </div>
  //   );
};

export default Testimonial;
