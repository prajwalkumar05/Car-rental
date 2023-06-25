import React from 'react'
import { useCollection } from '../hooks/useCollection'
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/car-item.css"

const Test = () => {

    const {document}=useCollection('cars')
    console.log(document)

  return (
    <div>
        {document && document.map((item) =>{
            return(
                <Col lg="4" md="4" sm="6" className="mb-5">
                <div className="car__item">
                  <div className="car__img">
                    <img src={item.image} alt="" className="w-100" />
                  </div>
          
                  <div className="car__item-content mt-4">
                    <h4 className="section__title text-center">carName</h4>
                    <h6 className="rent__price text-center mt-">
       *               $price.00 <span>/ Day</span>
                    </h6>
          
                    <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
                      <span className=" d-flex align-items-center gap-1">
                        <i class="ri-car-line"></i> model
                      </span>
                      <span className=" d-flex align-items-center gap-1">
                        <i class="ri-settings-2-line"></i> automatic
                      </span>
                      <span className=" d-flex align-items-center gap-1">
                        <i class="ri-timer-flash-line"></i> 120
                      </span>
                    </div>
          
                    {/* <button className=" w-50 car__item-btn car__btn-rent">
                      <Link to={`/cars/${carName}`}>Rent</Link>
                    </button> */}
          
                    <Link to="/" className="w-50 car__item-btn car__btn-details">
                      <p >Details</p>
                    </Link>
                  </div>
                </div>
              </Col>
            )

        })}
    </div>
  )
}

export default Test