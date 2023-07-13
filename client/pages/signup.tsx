import React from "react";

const Signup = () => {
  return (
    <div className="flex justify-center items-center min-h-screen font-poppins">
      <section className="bg-[#A8FF35] w-[80vw] md:w-[30vw] mx-auto rounded-xl flex flex-col justify-center items-center p-3 ">
        <h2 className="text-xl font-semibold">Sign Up</h2>
        {/* <label>Username</label> */}
        <input
          className="bg-white rounded-lg w-[80%] my-2 px-5 py-2 mx-auto outline-none"
          placeholder="Enter username"
        />
        <input
          className="bg-white rounded-lg w-[80%] px-5 py-2 my-2 mx-auto outline-none"
          placeholder="Enter email"
        />
        <input
          className="bg-white rounded-lg w-[80%] px-5 py-2 my-2 mx-auto outline-none"
          placeholder="Enter email"
        />
        <input
          className="bg-white rounded-lg w-[80%] px-5 py-2 my-2 mx-auto outline-none"
          placeholder="Enter email"
        />
        <button>Submit</button>
      </section>
    </div>
  );
};

export default Signup;
