import { Link } from "react-router-dom";

import packageJson from "../../package.json";

import { CODE_ICON, GITHUB_ICON, LINKEDIN_ICON } from "../assets";

const Footer = () => {
  const appVersion = packageJson.version;

  return (
    <footer className="footer bg-base-200 text-neutral-content flex justify-between items-center p-3 bottom-0 fixed">
      <p className="text-sm font-bold">{`v${appVersion}`}</p>
      <div className="flex gap-8">
        <Link to={"https://www.linkedin.com/in/rakchoudhury/"}>
          <img
            src={LINKEDIN_ICON}
            alt="linkedin-icon"
            className="w-6 bg-white rounded-sm"
          />
        </Link>
        <Link to={"https://github.com/rkchoudhury"}>
          <img src={GITHUB_ICON} alt="github-icon" className="w-6" />
        </Link>
        <Link to={"https://github.com/rkchoudhury/devTinder"}>
          <img
            src={CODE_ICON}
            alt="code-icon"
            className="w-6 bg-white rounded-sm"
          />
        </Link>
      </div>
      <p></p>
    </footer>
  );
};

export default Footer;
