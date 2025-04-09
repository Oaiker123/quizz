import React from "react";
import "./footer.scss";

const Footer = () =>{
  return (
    <footer className="simple-footer">
      <p>Presented by Quiz! &copy; {new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;
