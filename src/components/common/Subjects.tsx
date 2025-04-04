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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {subjects.map((subject: Subject) => (
        <div key={subject._id} className="container rounded-lg w-full">
          <div className="relative lg:h-[310px] md:h-auto sm:h-auto w-full aspect-video overflow-hidden rounded-lg group">
            <Image
              src={subject.icon}
              alt={subject.name}
              fill
              className=" object-cover transition-transform duration-300 group-hover:scale-110"
            />

            <div className="absolute inset-0 flex items-end">
              <div className="w-full px-4 pb-4">
                <div
                  className="bg-gradient-to-t from-[#332e87] to-[#8181C3] 
                opacity-90 rounded-lg 
                w-full
                p-3
                text-white 
                space-y-1">
                  <h3 className="font-bold text-[15px] truncate">{subject.name}</h3>
                  <p className="text-[13px] font-medium">Test your skills now!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Subjects;
