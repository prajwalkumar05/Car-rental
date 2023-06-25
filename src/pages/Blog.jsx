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

const Blog = () => {
  const { user } = useAuthContext();
  console.log(user.uid);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [license, setLicense] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState("");
  const [progress, setProgress] = useState(0);
  const [profilePhotoURL,setProfilePhotoURL]=useState('')
  const [licenseURL,setLicenseURL]=useState('')

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(firstName, lastName, address, age, license, profilePhoto);

    // const LicenseRef = ref(storage, `license-img/${license.name}/${user.uid}`);
    // await uploadBytes(LicenseRef, license);
    // const LicenseFile = await getDownloadURL(LicenseRef);

    const storageRef = ref(storage, `license-img/${license.name}/${user.uid}`);
    const LicenseFile = uploadBytesResumable(storageRef, license);
    console.log("updated");

    LicenseFile.on(
      "state_changed",
      (snapshot) => {
        var progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        // setProgress(progress);
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(LicenseFile.snapshot.ref).then((url) => {setLicenseURL(url)});
      }
    );

    const profileStorageRef = ref(storage, `profile-img/${profilePhoto.name}/${user.uid}`);
    const profilePhotoFile = uploadBytesResumable(profileStorageRef, license);

    profilePhotoFile.on(
      "state_changed",
      (snapshot) => {
        var progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        // setProgress(progress);
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(profilePhotoFile.snapshot.ref).then((url) => {setProfilePhotoURL(url)});
      }
    );


    await setDoc(
      doc(db, "verification", user.uid),
      {
        fname:firstName,
        lname:lastName,
        address:address,
        age:age,
        profilePhotoURL,
        licenseURL

      },
    ).catch((err) => {
     console.log(err);
    });
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
                      onChange={(e) => setFirstName(e.target.value)}
                      type="text"
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Event title"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Last Name</label>
                    <input
                      onChange={(e) => setLastName(e.target.value)}
                      type="text"
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Event title"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Address</label>
                    <textarea
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
                      <label className="leading-loose">Profile photo</label>
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
                    <label className="leading-loose">Event Description</label>
                    <input
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
