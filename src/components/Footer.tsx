// 0065ca // blue
// f14d52 // red

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mx-auto w-fit py-10 text-center">
      <p>
        &copy; 2025 Sharon Children’s Services Ethiopia. All Rights Reserved.
      </p>
      <p className="*:hover:text-[#ffb500] *:hover:underline">
        <a href="#contact">
          <Link to="/Contact">Contact Us</Link>
        </a>{" "}
        | <a href="#privacy">Privacy Policy</a> |{" "}
        <a href="#terms">Terms of Service</a>
      </p>
    </footer>
  );
};

export default Footer;
