import getAllExams from "@/lib/api/exams.api";
import ExamCard from "./_component/ExamCard";

async function page() {
  const exams = await getAllExams();

  return (
    <>
      <ul className="w-full flex flex-col gap-8">
        {exams.exams.map((e, index) => (
          <ExamCard key={index} title={e.title} numberOfQuestions={e.numberOfQuestions} duration={e.duration} id={e._id} />
        ))}
      </ul>
    </>
  );
}

export default page;
