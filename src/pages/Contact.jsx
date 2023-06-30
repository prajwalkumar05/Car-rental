import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { v4 as uuid } from 'uuid';
import "../styles/contact.css";
import { db } from "../firebase/config";
import { collection, doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const socialLinks = [
  {
    url: "#",
    icon: "ri-facebook-line",
  },
  {
    url: "#",
    icon: "ri-instagram-line",
  },
  {
    url: "#",
    icon: "ri-linkedin-line",
  },
  {
    url: "#",
    icon: "ri-twitter-line",
  },
];

const Contact = () => {

  const newContactRef = doc(collection(db, "contact"));

  const [contactMessage,setContactMessage] = useState({
    name:"",
    email:"",
    message:"",
  })

  const handleInputChange = (e) =>{

    e.preventDefault();
    const { name, value } = e.target;

    setContactMessage({
      ...contactMessage,
      [name]: value,
    });
  }



  

  const handleClick = async (e) => {
    e.preventDefault()
    console.log("click")

    setDoc(newContactRef, {
      id:uuid(),
      name:contactMessage.name,
      email:contactMessage.email,
      message:contactMessage.message,

      
    }).catch((err) =>{
      toast.error("SomeThing Problem!", {
        position: toast.POSITION.TOP_CENTER
      });
      console.log(err)
    });

    toast.success("Message Sent Successfully !", {
      position: toast.POSITION.TOP_CENTER
    });
    

    
  }

          

    
    

  console.log(contactMessage)


  return (
    <Helmet title="Contact">
      <CommonSection title="Contact" />
      <section>
        <Container>
          <Row>
            <Col lg="7" md="7">
              <h6 className="fw-bold mb-4">Get In Touch</h6>

              <Form>
                <FormGroup className="contact__form">
                  <Input name="name" value={contactMessage.name} onChange={handleInputChange} placeholder="Your Name" type="text" />
                </FormGroup>
                <FormGroup className="contact__form">
                  <Input name="email" value={contactMessage.email} onChange={handleInputChange}  placeholder="Email" type="email" />
                </FormGroup>
                <FormGroup className="contact__form">
                  <textarea
                  name="message" value={contactMessage.message} onChange={handleInputChange} 
                    rows="5"
                    placeholder="Message"
                    className="textarea"
                  ></textarea>
                </FormGroup>

                <button onClick={handleClick} className=" contact__btn" type="submit">
                  Send Message
                </button>
              </Form>
            </Col>

            <Col lg="5" md="5">
              <div className="contact__info">
                <h6 className="fw-bold">Contact Information</h6>
                <p className="section__description mb-0">
                  Prajwal kumar, karnataka
                </p>
                <div className=" d-flex align-items-center gap-2">
                  <h6 className="fs-6 mb-0">Phone:</h6>
                  <p className="section__description mb-0">+7019385449</p>
                </div>

                <div className=" d-flex align-items-center gap-2">
                  <h6 className="mb-0 fs-6">Email:</h6>
                  <p className="section__description mb-0">prajwalkumaredu8@gmail.com</p>
                </div>

                <h6 className="fw-bold mt-4">Follow Us</h6>

                <div className=" d-flex align-items-center gap-4 mt-3">
                  {socialLinks.map((item, index) => (
                    <Link
                      to={item.url}
                      key={index}
                      className="social__link-icon"
                    >
                      <i class={item.icon}></i>
                    </Link>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Contact;
