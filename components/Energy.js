
import { useState, useEffect } from "react";
import { Font } from "../styles/Styling";
export default function Energy({amount}) {
  return (
    <>
      <Font>ENERGY : {amount}</Font>
    </>
  );
}
