import React from "react";

export const Premium = () => {
  return (
    <div className="">
      <h1 className="font-bold text-3xl mt-5 mb-8 text-center">
        Premuim Plans
      </h1>
      <div className="ml-20 mr-20 mb-20">
        <div className="flex w-full flex-col lg:flex-row">
          <div className="card bg-base-300 rounded-box grid grow place-items-center">
            <h1 className="font-bold text-2xl mt-5">Silver Membership</h1>
            <ul className="pt-10 pb-10">
              <li>- Chat with other people</li>
              <li>- 100 connection requests per day</li>
              <li>- Blue Tick</li>
              <li>- 3 Months</li>
            </ul>
            <button className="btn btn-outline btn-secondary mb-5 btn-wide">
              Buy Silver
            </button>
          </div>
          <div className="divider lg:divider-horizontal">OR</div>
          <div className="card bg-base-300 rounded-box grid grow place-items-center">
            <h1 className="font-bold text-2xl mt-5">Gold Membership</h1>
            <ul className="pt-10 pb-10">
              <li>- Chat with other people</li>
              <li>- Unlimited requests per day</li>
              <li>- Blue Tick</li>
              <li>- 6 Months</li>
            </ul>
            <button className="btn btn-outline btn-warning mb-5 btn-wide">
              Buy Gold
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
