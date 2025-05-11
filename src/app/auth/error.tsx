"use client";
const ErrorPage = (error: { error: Error }) => {
  console.log("error", error);
  return (
    <div className="error-page">
      <h1>Oops! Something went wrong.</h1>
      {/* <p>{error}</p> */}
      {/* <a href="/">Go back to Home</a> */}
    </div>
  );
};

export default ErrorPage;
