import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./testmoniol.css";
import { reviews } from "./utils/reviews";
import "./keen.css";
import { Row, Col, Image } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Testimonial = (props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "free",
    slides: {
      perView: 3,
      spacing: 15,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <>
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
          <div className="keen-slider__slide number-slide1">1</div>
          {reviews.map((review, index) => (
            // <p className="car">{review.text}</p>
            <div className="keen-slider__slide number-slide1 ">
              <Row>
                <Col lg={7}>
                <div className="ratting">title</div>
                </Col>
                <div className="time">time</div>
                <Col>
                </Col>
                </Row>
                <Row>
                <div className="review">review</div>
                </Row>
                <Row>
                <div className="user">user</div>
                </Row>

              {/* <div className="review-card">
                <div className="ratting">title</div>
                <div className="review">review</div>
                <div className="user">user</div>
              </div> */}
            </div>
          ))}
          {/* <div className="keen-slider__slide number-slide2">2</div>
          <div className="keen-slider__slide number-slide3">3</div>
          <div className="keen-slider__slide number-slide4">4</div>
          <div className="keen-slider__slide number-slide5">5</div>
          <div className="keen-slider__slide number-slide6">6</div> */}
        </div>
        {loaded && instanceRef.current && (
          <>
            <div
              className="arrow arrow-left"
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                size="3x"
                color="#fff"
                style={{ opacity: "0.5" }}
              />{" "}
            </div>
            <div
              className="arrow arrow-right"
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
            >
              <FontAwesomeIcon
                icon={faChevronRight}
                size="3x"
                color="#fff"
                style={{ opacity: "0.5" }}
              />{" "}
            </div>
          </>
        )}
      </div>
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
    </>
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
