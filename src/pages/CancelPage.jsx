import React from "react";

const CancelPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-red-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">Payment Canceled!</h1>
        <p className="mt-4 text-gray-600">
          It seems you canceled the payment. No worries, you can try again
          anytime.
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-3 text-white bg-red-600 hover:bg-red-700 rounded-lg"
        >
          Go Back to Home
        </a>
      </div>
    </div>
  );
};

export default CancelPage;
