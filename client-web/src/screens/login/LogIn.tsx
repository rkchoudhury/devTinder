const LogIn = () => {
  return (
    <div className="flex justify-center mt-40">
      <div className="card bg-neutral text-neutral-content w-96">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Log In</h2>
          <div className="w-full mt-4">
            <input
              type="text"
              className="input"
              placeholder="Enter Your Email Id"
            />
            <div className="mt-4">
              <input
                type="password"
                className="input"
                placeholder="Enter Your Password"
              />
            </div>
          </div>
          <div className="w-full mt-4">
            <button className="btn btn-outline btn-primary btn-wide">
              Login ❤️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
