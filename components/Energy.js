import web3 from "../ethereum/web3";
import json from "json5";
import { useState, useEffect } from "react";
import { Font } from "../styles/Styling";
export default function Energy({amount}) {

  return (
    <>
      <Font>Energy : {amount}</Font>
    </>
  );
}
