export default function ShowWrongAnswers({
  wrongQ,
  index,
  examState,
}: {
  wrongQ: {
    QID: string;
    correctAnswer: string;
    inCorrectAnswer: string;
  };
  index: number;
  examState: {
    questions: {
      _id: string;
      question: string;
      answers: {
        key: string;
        answer: string;
      }[];
    }[];
  };
}) {
  return (
    <>
      <div key={`wrong-question-${index}`} className="w-1/2">
        {examState.questions.map((question) => {
          if (question._id === wrongQ.QID) {
            return (
              <div key={`question-${question._id}`}>
                <p className="text-[24px] font-medium mb-4">{question.question}</p>
                <ul>
                  {question.answers.map((answer, aIndex) => (
                    <li
                      key={`answer-${question._id}-${aIndex}`}
                      className={`bg-[#EDEFF3] mb-3 rounded-[10px] p-[16px_8px] ${
                        answer.key === wrongQ.correctAnswer ? "bg-green-600" : answer.key === wrongQ.inCorrectAnswer ? "bg-red-600" : ""
                      }`}>
                      <input
                        type="radio"
                        name={`question-${question._id}`}
                        id={`answer-${question._id}-${aIndex}`}
                        className="me-3"
                        disabled
                        checked={answer.key === wrongQ.correctAnswer}
                      />
                      <label className={`text-[20px] `} htmlFor={`answer-${question._id}-${aIndex}`}>
                        {answer.answer}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            );
          }
        })}
      </div>
    </>
  );
}
