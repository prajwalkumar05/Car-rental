import React from "react";
import { useCollection } from "../hooks/useCollection";

const NotFound = () => {

  const {document} =useCollection("verification")
  console.log(document)

  return <div>
    <p>name:{document && document[0].fname}</p>
    <img src={document[0].licenseURL} alt="" />
  </div>;
};

export default NotFound;
