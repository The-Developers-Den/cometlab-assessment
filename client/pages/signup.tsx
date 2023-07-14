import Link from "next/link";
import React from "react";

const Signup = () => {
  return (
    <div className="flex justify-center items-center min-h-screen font-poppins text-white bg-[#0c0f1a]">
      <form className=" w-[80vw] md:w-[30vw] mx-auto rounded-xl flex flex-col justify-center items-center p-3 ">
        <h2 className="text-xl font-semibold">Sign Up</h2>

        <input
          placeholder={"oko"}
          className="border-b-2 border-white/[0.3] p-1 w-1/2 my-5 outline-none bg-transparent mx-auto "
          id="wallet_address"
          name="wallet_address"
          type="text"
        />

        <button className=" outline-none bg-[#18c99d] p-2 rounded-lg w-1/2 my-7 mx-auto hover:scale-95 cursor-pointer duration-300">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
