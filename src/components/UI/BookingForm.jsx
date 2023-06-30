import React, { useState } from "react";
import "../../styles/booking-form.css";
import { Form, FormGroup } from "reactstrap";
import { useAuthContext } from "../../hooks/useAuthContext";
import { db } from "../../firebase/config";
import { Timestamp, collection, doc, setDoc } from "firebase/firestore";
import useGetData from "../../hooks/useGetData";
import { useFirestore } from "../../hooks/useFirestore";

const BookingForm = () => {
  const { user } = useAuthContext();

  const {updateDocument}=useFirestore('users')

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
  });

  const {result} = useGetData('users',user.uid)
  console.log(result)

  if(!result){
    return <p>Loading</p>
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
      firstName:bookingDeatils.fname,
        lastname:bookingDeatils.lname,
        email:bookingDeatils.email,
        phone_number:bookingDeatils.phone_number,
        from:bookingDeatils.from,
        to:bookingDeatils.to,
        description:bookingDeatils.description,
        luggage:bookingDeatils.luggage,
        persons:bookingDeatils.persons,
        date:bookingDeatils.date,
        time:bookingDeatils.time,
        orderAt:Timestamp.fromDate(new Date())
    }



    

    await updateDocument(user.uid,
      [...result.orders,orderDetalis]
     )

     console.log("update")

     setDoc(newOrderRef, {
      firstName:bookingDeatils.fname,
      lastname:bookingDeatils.lname,
      email:bookingDeatils.email,
      phone_number:bookingDeatils.phone_number,
      from:bookingDeatils.from,
      to:bookingDeatils.to,
      description:bookingDeatils.description,
      luggage:bookingDeatils.luggage,
      persons:bookingDeatils.persons,
      date:bookingDeatils.date,
      time:bookingDeatils.time,
      orderAt:Timestamp.fromDate(new Date())
      
    });

    // setBookingDeatils({
    //   fname: "",
    //   lname: "",
    //   email: "",
    //   phone_number: "",
    //   from: "",
    //   to: "",
    //   description: "",
    //   luggage: "",
    //   persons: "",
    //   date: "",
    //   time: "",
    // })
    


   
  };

  return (
    <Form >
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
          type="time"
          placeholder="Journey Time"
          className="time__picker"
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

      <button onClick={submitHandler}>Submit</button>
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