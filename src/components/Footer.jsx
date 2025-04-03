import React from "react";

function Footer() {
  return (
    <footer>
      <p>
        Based on D&D 5E Official Character Sheet. © {new Date().getFullYear()}{" "}
        Wizards of the Coast LLC.
      </p>
    </footer>
  );
}

export default Footer;