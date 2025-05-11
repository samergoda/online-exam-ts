"use client";
import Link from "next/link";

export default function Error({ statusCode }: { statusCode?: number }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <h1 className="text-5xl font-bold text-red-600 mb-4">{statusCode ? `Error ${statusCode}` : "An unexpected error occurred"}</h1>
      <p className="text-gray-700 text-lg mb-6">
        {statusCode === 404
          ? "The page you are looking for does not exist."
          : "Something went wrong during your exam session. Please try again or contact support."}
      </p>
      <Link href="/">
        <a className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Go to Home</a>
      </Link>
    </div>
  );
}
