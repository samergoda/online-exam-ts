"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import useSubject from "@/src/hooks/use-subject";

function Subjects() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const { payload, error } = useSubject();

  useEffect(() => {
    if (payload?.subjects) {
      setSubjects(payload.subjects);
    }
  }, [payload]);

  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <div className="flex flex-wrap gap-96 w-full">
      {subjects.map((subject: Subject) => (
        <div key={subject._id} className="relative w-full rounded-lg shadow-lg overflow-hidden">
          <Image
            src={subject.icon}
            alt="Background"
            width={27280} // ✅ Set fixed width
            height={72280} // ✅ Set fixed height
            className="object-cover"
          />

          {/* ✅ Text Overlay */}
          <div className=" w-full bg-[#1935CA66] backdrop-blur-lg p-2">
            <h3 className="text-black text-center font-medium truncate">{subject.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Subjects;
