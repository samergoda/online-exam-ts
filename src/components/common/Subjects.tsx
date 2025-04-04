"use client";

import { useEffect, useState } from "react";
// import Image from "next/image";
import useSubject from "@/src/hooks/use-subject";
import QuizCard from "./QuizCard";

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
      {subjects.map((subject) => (
        <QuizCard key={subject._id} subject={subject} />
      ))}
    </div>
  );
}

export default Subjects;
