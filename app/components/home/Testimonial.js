import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./testmoniol.css";

const Testimonial = (props) => {
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const multipleItemCarousel = document.querySelector("#testimonialCarousel");
    const carouselWidth = multipleItemCarousel.querySelector(".carousel-inner").scrollWidth;
    const cardWidth = multipleItemCarousel.querySelector(".carousel-item").offsetWidth;
    setCarouselWidth(carouselWidth);
    setCardWidth(cardWidth);

    function handleNextClick() {
      if (scrollPosition < carouselWidth - cardWidth * 3) {
        setScrollPosition(scrollPosition + cardWidth);
        multipleItemCarousel.querySelector(".carousel-inner").scrollLeft += cardWidth;
      }
    }

    function handlePrevClick() {
      if (scrollPosition > 0) {
        setScrollPosition(scrollPosition - cardWidth);
        multipleItemCarousel.querySelector(".carousel-inner").scrollLeft -= cardWidth;
      }
    }

    multipleItemCarousel.querySelector(".carousel-control-next").addEventListener("click", handleNextClick);
    multipleItemCarousel.querySelector(".carousel-control-prev").addEventListener("click", handlePrevClick);

    return () => {
      multipleItemCarousel.querySelector(".carousel-control-next").removeEventListener("click", handleNextClick);
      multipleItemCarousel.querySelector(".carousel-control-prev").removeEventListener("click", handlePrevClick);
    };
  }, [carouselWidth, cardWidth, scrollPosition]);

  return (
    <div className="container-fluid bg-body-tertiary py-3">
      <div id="testimonialCarousel" className="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="card shadow-sm rounded-3">
              <div className="quotes display-2 text-body-tertiary">
                <i className="bi bi-quote"></i>
              </div>
              <div className="card-body">
                <p className="card-text">
                  "Some quick example text to build on the card title and make
                  up the bulk of the card's content."
                </p>
                <div className="d-flex align-items-center pt-2">
                  <img
                    src="https://codingyaar.com/wp-content/uploads/square-headshot-1.png"
                    alt="bootstrap testimonial carousel slider 2"
                  ></img>
                  <div>
                    <h5 className="card-title fw-bold">Jane Doe</h5>
                    <span className="text-secondary">CEO, Example Company</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="card shadow-sm rounded-3">
              <div className="quotes display-2 text-body-tertiary">
                <i className="bi bi-quote"></i>
              </div>
              <div className="card-body">
                <p className="card-text">
                  "Some quick example text to build on the card title and make
                  up the bulk of the card's content."
                </p>
                <div className="d-flex align-items-center pt-2">
                  <img
                    src="https://codingyaar.com/wp-content/uploads/square-headshot-2.png"
                    alt="bootstrap testimonial carousel slider 2"
                  ></img>
                  <div>
                    <h5 className="card-title fw-bold">June Doe</h5>
                    <span className="text-secondary">CEO, Example Company</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="card shadow-sm rounded-3">
              <div className="quotes display-2 text-body-tertiary">
                <i className="bi bi-quote"></i>
              </div>
              <div className="card-body">
                <p className="card-text">
                  "Some quick example text to build on the card title and make
                  up the bulk of the card's content."
                </p>
                <div className="d-flex align-items-center pt-2">
                  <img
                    src="https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg"
                    alt="bootstrap testimonial carousel slider 2"
                  ></img>
                  <div>
                    <h5 className="card-title fw-bold">John Doe</h5>
                    <span className="text-secondary">CEO, Example Company</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="card shadow-sm rounded-3">
              <div className="quotes display-2 text-body-tertiary">
                <i className="bi bi-quote"></i>
              </div>
              <div className="card-body">
                <p className="card-text">
                  "Some quick example text to build on the card title and make
                  up the bulk of the card's content."
                </p>
                <div className="d-flex align-items-center pt-2">
                  <img
                    src="https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg"
                    alt="bootstrap testimonial carousel slider 2"
                  ></img>
                  <div>
                    <h5 className="card-title fw-bold">John Doe</h5>
                    <span className="text-secondary">CEO, Example Company</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="card shadow-sm rounded-3">
              <div className="quotes display-2 text-body-tertiary">
                <i className="bi bi-quote"></i>
              </div>
              <div className="card-body">
                <p className="card-text">
                  "Some quick example text to build on the card title and make
                  up the bulk of the card's content."
                </p>
                <div className="d-flex align-items-center pt-2">
                  <img
                    src="https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg"
                    alt="bootstrap testimonial carousel slider 2"
                  ></img>
                  <div>
                    <h5 className="card-title fw-bold">John Doe</h5>
                    <span className="text-secondary">CEO, Example Company</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="card shadow-sm rounded-3">
              <div className="quotes display-2 text-body-tertiary">
                <i className="bi bi-quote"></i>
              </div>
              <div className="card-body">
                <p className="card-text">
                  "Some quick example text to build on the card title and make
                  up the bulk of the card's content."
                </p>
                <div className="d-flex align-items-center pt-2">
                  <img
                    src="https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg"
                    alt="bootstrap testimonial carousel slider 2"
                  ></img>
                  <div>
                    <h5 className="card-title fw-bold">John Doe</h5>
                    <span className="text-secondary">CEO, Example Company</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="card shadow-sm rounded-3">
              <div className="quotes display-2 text-body-tertiary">
                <i className="bi bi-quote"></i>
              </div>
              <div className="card-body">
                <p className="card-text">
                  "Some quick example text to build on the card title and make
                  up the bulk of the card's content."
                </p>
                <div className="d-flex align-items-center pt-2">
                  <img
                    src="https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg"
                    alt="bootstrap testimonial carousel slider 2"
                  ></img>
                  <div>
                    <h5 className="card-title fw-bold">John Doe</h5>
                    <span className="text-secondary">CEO, Example Company</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="card shadow-sm rounded-3">
              <div className="quotes display-2 text-body-tertiary">
                <i className="bi bi-quote"></i>
              </div>
              <div className="card-body">
                <p className="card-text">
                  "Some quick example text to build on the card title and make
                  up the bulk of the card's content."
                </p>
                <div className="d-flex align-items-center pt-2">
                  <img
                    src="https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg"
                    alt="bootstrap testimonial carousel slider 2"
                  ></img>
                  <div>
                    <h5 className="card-title fw-bold">John Doe</h5>
                    <span className="text-secondary">CEO, Example Company</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="card shadow-sm rounded-3">
              <div className="quotes display-2 text-body-tertiary">
                <i className="bi bi-quote"></i>
              </div>
              <div className="card-body">
                <p className="card-text">
                  "Some quick example text to build on the card title and make
                  up the bulk of the card's content."
                </p>
                <div className="d-flex align-items-center pt-2">
                  <img
                    src="https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg"
                    alt="bootstrap testimonial carousel slider 2"
                  ></img>
                  <div>
                    <h5 className="card-title fw-bold">John Doe</h5>
                    <span className="text-secondary">CEO, Example Company</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#testimonialCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#testimonialCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};
export default Testimonial;
