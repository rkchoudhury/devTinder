import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

import { ROUTE_NAMES } from "../../navigation/Routes";
import Footer from "../../components/Footer";

const Error = () => {
  const error: any = useRouteError();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(ROUTE_NAMES.HOME);
  };

  return (
    <div className="bg-error text-neutral-content h-screen text-white">
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-4xl">Something went wrong!!</h1>
          <h2 className="text-2xl my-4">{`${error?.status} - ${error?.statusText}`}</h2>
          <button
            onClick={handleGoBack}
            className="px-5 py-5 border-2 border-white rounded"
          >
            Go to Home
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Error;
