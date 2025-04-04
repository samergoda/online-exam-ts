"use client";
import Image from "next/image";
interface QuizCardProps {
  _id: string;
  name: string;
  icon: string;
}

export default function QuizCard({ subject }: { subject: QuizCardProps }): JSX.Element {
  const { name, icon } = subject;

  return (
    <div className="container rounded-lg w-full">
      <div className="relative lg:h-[310px] md:h-auto sm:h-auto w-full aspect-video overflow-hidden rounded-lg group">
        <Image src={icon} alt="quiz" fill className="object-cover" />

        <div className="">
          <div className="w-full px-4 pb-4">
            <div
              className="bg-gradient-to-t from-[#332e87] to-[#8181C3] 
              opacity-90 rounded-lg 
              w-full
              p-3
              text-white 
              space-y-1">
              <h3 className="font-bold text-[15px] truncate">{name}</h3>
              <p className="text-[13px] font-medium">Test your skills now!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
