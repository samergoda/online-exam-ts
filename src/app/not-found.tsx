import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <h2 className="text-6xl font-bold text-[#4461F2] mb-4">404</h2>
      <p className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</p>
      <p className="text-gray-500 mb-8">The page you are looking for doesn&apos;t exist or has been moved.</p>
      <div className="w-48">
        <Link className="bg-[#4461f2] p-3 rounded-full text-white" href="/">
          Go Home
        </Link>
      </div>
    </div>
  );
}
