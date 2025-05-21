import Image from "next/image";
import ProvidersButtons from "../../components/common/ProvidersButtons";
import Link from "next/link";
import bro from "./../../../public/images/bro.png";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col container lg:flex-row justify-between items-center gap-8 lg:gap-[132px] p-6 lg:p-0">
      <div className="bg-[#F0F4FC] rounded-r-[100px] shadow-[0_5px_100px_0_#0000001A] p-8 lg:p-[80px] w-full lg:w-auto text-center lg:text-left">
        <h1 className="font-bold text-4xl lg:text-5xl mb-4">
          Welcome to <br />
          <span className="text-[#122D9C] leading-tight">Elevate</span>
        </h1>
        <p className="font-normal text-[16px] lg:text-[18px] leading-7 mb-6">
          Elevate is a platform that helps you improve your software skills.
        </p>
        <div className="flex justify-center lg:justify-start">
          <Image alt="bro" width={400} height={500} src={bro} className="w-full max-w-[400px] h-auto" />
        </div>
      </div>

      <div className="w-full lg:max-w-[50%] mt-10 lg:mt-0">
        <nav className="mb-10 lg:mb-28">
          <ul className="flex justify-center lg:justify-end gap-4 lg:gap-8">
            <li>
              <Link href="/auth/login" className="font-bold text-[18px] lg:text-[20px] text-[#4461F2]">
                Sign in
              </Link>
            </li>
            <li>
              <Link href="/auth/signup" className="p-2 text-sm lg:text-base leading-6 rounded-[15px] border">
                Register
              </Link>
            </li>
          </ul>
        </nav>
        {children}
        <div className="mt-6">
          <ProvidersButtons />
        </div>
      </div>
    </div>
  );
}

export default layout;
