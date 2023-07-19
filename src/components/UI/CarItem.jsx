import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import useGetData from "../../hooks/useGetData";

const CarItem = (props) => {
  const { user } = useAuthContext();
  console.log(user.uid);

  const { result } = useGetData("verification", user.uid);
  if (!result) {
    return <p>loading</p>;
  }

  console.log(result);

  const { image, model, carName, automatic, speed, price, id } = props.item;

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__img">
          <img src={image} alt="" className="w-[100%] h-[40vh] object-cover" />
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{carName}</h4>
          <h6 className="rent__price text-center mt-">
            RS.{price} <span>/ Day</span>
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-car-line"></i> {model}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-settings-2-line"></i> {automatic}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-timer-flash-line"></i> {speed}
            </span>
          </div>

          {/* <button className=" w-50 car__item-btn car__btn-rent">
            <Link to={`/cars/${carName}`}>Rent</Link>
          </button> */}

          <Link to={`/cars/${id}`}>
            <div>
              {result && result.register ? (
                <button
                  disabled={false}
                  className="bg-[#f9a826] hover:[#c4aa81] text-white font-bold py-1 px-4 rounded-full"
                >
                  Detalis
                </button>
              ) : (
                <button
                  disabled={true}
                  className="bg-[#f9a826] hover:[#c4aa81] text-white font-bold py-1 px-4 rounded-full"
                >
                  Register
                </button>
              )}
            </div>
          </Link>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;
