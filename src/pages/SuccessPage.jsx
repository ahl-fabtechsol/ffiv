import React from "react";

const SuccessPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-green-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-600">
          Payment Successful!
        </h1>
        <p className="mt-4 text-gray-600">
          Thank you for your support! Your payment was completed successfully.
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg"
        >
          Go Back to Home
        </a>
      </div>
    </div>
  );
};

export default SuccessPage;
