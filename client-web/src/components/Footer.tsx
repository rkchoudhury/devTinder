import React from "react";
import { Link } from "react-router-dom";

import packageJson from "../../package.json";

import { CODE_ICON, GITHUB_ICON, LINKEDIN_ICON } from "../assets";

const Footer = () => {
  const appVersion = packageJson.version;

  return (
    <div className="p-4 bottom-0 left-0 absolute w-full text-white bg-gradient-to-tr from-black flex justify-between items-center">
      <p className="text-sm font-bold">{`v${appVersion}`}</p>
      <div className="flex">
        <Link to={"https://www.linkedin.com/in/rakchoudhury/"}>
          <img
            src={LINKEDIN_ICON}
            alt="linkedin-icon"
            className="w-8 bg-white rounded-sm"
          />
        </Link>
        <Link to={"https://github.com/rkchoudhury"}>
          <img src={GITHUB_ICON} alt="github-icon" className="w-8 mx-12" />
        </Link>
        <Link to={"https://github.com/rkchoudhury/devTinder"}>
          <img
            src={CODE_ICON}
            alt="code-icon"
            className="w-8 bg-white rounded-sm"
          />
        </Link>
      </div>
      <p></p>
    </div>
  );
};

export default Footer;
