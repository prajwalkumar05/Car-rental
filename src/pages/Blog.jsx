import React, { useState } from "react";
import { Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import BlogList from "../components/UI/BlogList";
import { useAuthContext } from "../hooks/useAuthContext";
import { db, storage } from "../firebase/config";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import useGetData from "../hooks/useGetData";
import { toast } from "react-toastify";

const Blog = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [license, setLicense] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState("");
  const [progress, setProgress] = useState(0);
  const [Lnumber, setLNumber] = useState("");
  const [profilePhotoURL, setProfilePhotoURL] = useState("");
  const [licenseURL, setLicenseURL] = useState("");

  const { user } = useAuthContext();
  console.log(user);

  const {result} = useGetData('verification',user.uid)

  if(result && result.register){
    return (<div className=" h-80 text-center py-4 lg:px-4">
    <div className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
      <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">New</span>
      <span className="font-semibold mr-2 text-left flex-auto">You Already Registerd</span>
      <svg className="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
    </div>
  </div>)
  }



 

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(firstName, lastName, address, age, license, profilePhoto);

    const LicenseRef = ref(storage, `license-img/${license.name}/${user.uid}`);
    await uploadBytes(LicenseRef, license);
    const LicenseFile = await getDownloadURL(LicenseRef);

    const profileStorageRef = ref(
      storage,
      `profile-img/${profilePhoto.name}/${user.uid}`
    );
    await uploadBytes(profileStorageRef, profilePhoto);
    const profileFile = await getDownloadURL(profileStorageRef);

    await setDoc(doc(db, "verification", user.uid), {
      fname: firstName,
      lname: lastName,
      address: address,
      age: age,
      LicenseFile,
      profileFile,
      register: false,
      LicenseNumber:Lnumber,
      uid:user.uid
    }).catch((err) => {
      console.log(err);
    });


    toast.success("register Successfull", {
      position: toast.POSITION.TOP_CENTER,
    });

    setFirstName("")
    setLastName("")
    setAddress("")
    setAge("")
    setLicense("")
    setProfilePhoto("")
    setLNumber("")


   
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
            <div className="max-w-md mx-auto">
              <div className="flex justify-center items-center space-x-5">
                <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                  <h2 className="leading-relaxed">Register Form</h2>
                  <p className="text-sm text-gray-500 font-normal leading-relaxed">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="flex flex-col">
                    <label className="leading-loose">First Name</label>
                    <input
                    value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      type="text"
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Event title"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Last Name</label>
                    <input
                    value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      type="text"
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Event title"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Address</label>
                    <textarea
                    value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      type="text"
                      className="h-20 px-2 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Address"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Age</label>
                    <div className="relative focus-within:text-gray-600 text-gray-400">
                      <input
                      value={age}
                        onChange={(e) => setAge(e.target.value)}
                        type="date"
                        className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        placeholder="26/02/2020"
                      />
                      <div className="absolute left-3 top-2"></div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col">
                      <label className="leading-loose">Licenece Photo</label>
                      <div className="relative focus-within:text-gray-600 text-gray-400">
                        <input
                        
                          onChange={(e) => setLicense(e.target.files[0])}
                          type="file"
                          className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                          placeholder="25/02/2020"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <label className="leading-loose">Aaddar photo</label>
                      <div className="relative focus-within:text-gray-600 text-gray-400">
                        <input
                     
                          onChange={(e) => setProfilePhoto(e.target.files[0])}
                          type="file"
                          className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                          placeholder="26/02/2020"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Licence Number</label>
                    <input
                    value={Lnumber}
                    onChange={(e) => setLNumber(e.target.value)}
                      type="text"
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Optional"
                    />
                  </div>
                </div>
                <div className="pt-4 flex items-center space-x-4">
                  <button className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none">
                    Cancel
                  </button>
                  <button
                    onClick={handleClick}
                    className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
