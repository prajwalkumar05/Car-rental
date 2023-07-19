import React, { useState } from "react";
import "../../styles/booking-form.css";
import { Form, FormGroup } from "reactstrap";
import { useAuthContext } from "../../hooks/useAuthContext";
import { db } from "../../firebase/config";
import { Timestamp, collection, doc, setDoc } from "firebase/firestore";
import useGetData from "../../hooks/useGetData";
import { useFirestore } from "../../hooks/useFirestore";
import Checkout from "./Checkout";
import { toast } from "react-toastify";

const BookingForm = ({price}) => {
  const { user } = useAuthContext();

  const { updateDocument } = useFirestore("users");

  const newOrderRef = doc(collection(db, "orders"));

  const [bookingDeatils, setBookingDeatils] = useState({
    fname: "",
    lname: "",
    email: "",
    phone_number: "",
    from: "",
    to: "",
    description: "",
    luggage: "",
    persons: "",
    date: "",
    time: "",
    holderName:"",
    cvv:"",
    cardNumber:"",
    
  });

  const { result } = useGetData("users", user.uid);
  console.log(result);

  if (!result) {
    return <p>Loading</p>;
  }

  console.log(bookingDeatils);

  const handleInputChange = async (e) => {
    e.preventDefault();
    //const name = e.target.name
    //const value = e.target.value
    const { name, value } = e.target;

    setBookingDeatils({
      ...bookingDeatils,
      [name]: value,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const orderDetalis = {
      firstName: bookingDeatils.fname,
      lastname: bookingDeatils.lname,
      email: bookingDeatils.email,
      phone_number: bookingDeatils.phone_number,
      from: bookingDeatils.from,
      to: bookingDeatils.to,
      description: bookingDeatils.description,
      luggage: bookingDeatils.luggage,
      persons: bookingDeatils.persons,
      date: bookingDeatils.date,
      time: bookingDeatils.time,
      orderAt: Timestamp.fromDate(new Date()),
      holderName:bookingDeatils.holderName,
      pay:price,
      cvv:bookingDeatils.cvv,
      cardNumber:bookingDeatils.cardNumber,

    };

    await updateDocument(user.uid, [...result.orders, orderDetalis]);

    console.log("update");

    setDoc(newOrderRef, {
      firstName: bookingDeatils.fname,
      lastname: bookingDeatils.lname,
      email: bookingDeatils.email,
      phone_number: bookingDeatils.phone_number,
      from: bookingDeatils.from,
      to: bookingDeatils.to,
      description: bookingDeatils.description,
      luggage: bookingDeatils.luggage,
      persons: bookingDeatils.persons,
      date: bookingDeatils.date,
      time: bookingDeatils.time,
      orderAt: Timestamp.fromDate(new Date()),
      holderName:bookingDeatils.holderName,
      pay:price,
      cvv:bookingDeatils.cvv,
      cardNumber:bookingDeatils.cardNumber,
    });

    

    setBookingDeatils({
      fname: "",
      lname: "",
      email: "",
      phone_number: "",
      from: "",
      to: "",
      description: "",
      luggage: "",
      persons: "",
      date: "",
      time: "",
    })

    toast.success("Order Successfull", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <Form>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input
          name="fname"
          value={bookingDeatils.fname}
          onChange={handleInputChange}
          type="text"
          placeholder="First Name"
        />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input
          name="lname"
          onChange={handleInputChange}
          value={bookingDeatils.lname}
          type="text"
          placeholder="Last Name"
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input
          name="email"
          onChange={handleInputChange}
          value={bookingDeatils.email}
          type="email"
          placeholder="Email"
        />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input
          name="phone_number"
          onChange={handleInputChange}
          value={bookingDeatils.phone_number}
          type="number"
          placeholder="Phone Number"
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input
          name="from"
          onChange={handleInputChange}
          value={bookingDeatils.from}
          type="text"
          placeholder="From Address"
        />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input
          name="to"
          onChange={handleInputChange}
          value={bookingDeatils.to}
          type="text"
          placeholder="To Address"
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <select
          onChange={handleInputChange}
          value={bookingDeatils.persons}
          name="persons"
          id=""
        >
          <option value="1 person">1 Person</option>
          <option value="2 person">2 Person</option>
          <option value="3 person">3 Person</option>
          <option value="4 person">4 Person</option>
          <option value="5+ person">5+ Person</option>
        </select>
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <select
          onChange={handleInputChange}
          value={bookingDeatils.luggage}
          name="luggage"
          id=""
        >
          <option value="1 luggage">1 luggage</option>
          <option value="2 luggage">2 luggage</option>
          <option value="3 luggage">3 luggage</option>
          <option value="4 luggage">4 luggage</option>
          <option value="5+ luggage">5+ luggage</option>
        </select>
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input
          name="date"
          onChange={handleInputChange}
          value={bookingDeatils.date}
          type="date"
          placeholder="Journey Date"
        />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input
          name="time"
          onChange={handleInputChange}
          value={bookingDeatils.time}
          type="date"
          placeholder="Journey Time"
          className="time__picker"
        />
      </FormGroup>

      <h3>Card Details</h3>

      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <label className="my-2 w-8 font-bold">Price</label>
        <input
          name="to"
          onChange={handleInputChange}
          value={price + " only"}
          type="text"
          
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <label className="my-2 font-bold ">Card Number</label>
        <input
          name="cardNumber"
          onChange={handleInputChange}
          value={bookingDeatils.cardNumber}
          type="text"
          
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <label className="my-2 font-bold ">CVV</label>
        <input
          name="cvv"
          onChange={handleInputChange}
          value={bookingDeatils.cvv}
          type="text"
          
        />
      </FormGroup>

      
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <label className="my-2 font-bold ">Holder Name</label>
        <input
          name="holderName"
          onChange={handleInputChange}
          value={bookingDeatils.holderName}
          type="text"
          
        />
      </FormGroup>

      

      <FormGroup>
        <textarea
          onChange={handleInputChange}
          name="description"
          value={bookingDeatils.description}
          rows={5}
          type="textarea"
          className="textarea"
          placeholder="Write"
        ></textarea>
      </FormGroup>
      <button
        onClick={submitHandler}
        
        className="bg-[#f9a826] hover:[#c4aa81] text-white font-bold py-1 px-4 rounded-full"
      >
        Submit
      </button>

      
    </Form>
  );
};

export default BookingForm;

// await setDoc(doc(db, "orders", user.uid), {
//   firstName:bookingDeatils.fname,
//   lastname:bookingDeatils.lname,
//   email:bookingDeatils.email,
//   phone_number:bookingDeatils.phone_number,
//   from:bookingDeatils.from,
//   to:bookingDeatils.to,
//   description:bookingDeatils.description,
//   luggage:bookingDeatils.luggage,
//   persons:bookingDeatils.persons,
//   date:bookingDeatils.date,
//   time:bookingDeatils.time,
//   orderAt:Timestamp.fromDate(new Date())
// }).catch((err) => {
//   console.log(err);
// });
