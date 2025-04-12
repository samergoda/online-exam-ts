"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import LogoGoogle from "@/public/images/LogoGoogle.png";
import Logo from "@/public/images/Logo.png";
import facebookLogo from "@/public/images/facebookLogo.png";

function ProvidersButtons() {
  return (
    <div className="mt-10">
      <div className="flex items-center justify-center mb-4">
        <div className="h-px bg-gray-300 flex-grow"></div>
        <p className="text-[#6C737F] mx-4">or continue with</p>
        <div className="h-px bg-gray-300 flex-grow"></div>
      </div>
      <div className="flex gap-4  justify-between ">
        {/* Google auth */}
        <button className="rounded-[16px] shadow-[0px_18px_30px_0px_#4461f21c] p-5 border w-16" onClick={() => signIn("google")}>
          <Image alt="idenity provider" width="30" height="30" src={LogoGoogle} />
        </button>

        {/* Twitter auth */}
        <button onClick={() => signIn("twitter")} className="rounded-[16px] shadow-[0px_18px_30px_0px_#4461f21c] w-16 p-5 border ">
          <Image alt="idenity provider" width="30" height="30" src={Logo} />
        </button>

        {/* Facebook auth */}
        <button onClick={() => signIn("facebook")} className="rounded-[16px] shadow-[0px_18px_30px_0px_#4461f21c] w-16 p-5 border ">
          <Image alt="idenity provider" width="30" height="30" src={facebookLogo} />
        </button>
      </div>
    </div>
  );
}

export default ProvidersButtons;
