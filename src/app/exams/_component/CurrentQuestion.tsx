function CurrentQuestion({
  examState,
  setExamState,
}: {
  examState: ExamState;
  setExamState: React.Dispatch<React.SetStateAction<ExamState>>;
}) {
  // Check if an answer is selected
  function isAnswerSelected(questionId: string, key: string) {
    const answerForQuestion = examState.selectedAnswers.answers.find((ans) => ans.questionId === questionId);

    if (!answerForQuestion) return false;

    if (Array.isArray(answerForQuestion.correct)) {
      return answerForQuestion.correct.includes(key);
    }

    return answerForQuestion.correct === key;
  }

  function handleAnswerSelect(questionId: string, key: string, type: string) {
    setExamState((prev) => {
      const updated = { ...prev };
      updated.selectedAnswers.answers = updated.selectedAnswers.answers || [];

      if (type === "single_choice") {
        updated.selectedAnswers.answers = updated.selectedAnswers.answers.filter((ans) => ans.questionId !== questionId);
        updated.selectedAnswers.answers.push({ questionId, correct: key });
      } else if (type === "multiple_choice") {
        const answerIndex = updated.selectedAnswers.answers.findIndex((ans) => ans.questionId === questionId);
        if (answerIndex > -1) {
          const currentAnswers = updated.selectedAnswers.answers[answerIndex].correct || [];
          updated.selectedAnswers.answers[answerIndex].correct = currentAnswers.includes(key)
            ? (currentAnswers as string[]).filter((val: string) => val !== key)
            : [...(currentAnswers as string[]), key];
        } else {
          updated.selectedAnswers.answers.push({ questionId, correct: [key] });
        }
      }
      return updated;
    });
  }
  return (
    <div>
      <p className="text-[24px] font-medium">{examState.questions[examState.currentQuestion].question}</p>
      <ul>
        {examState.questions[examState.currentQuestion].answers.map((answer, aIndex) => (
          <li key={`answer-${examState.currentQuestion}-${aIndex}`} className="bg-[#EDEFF3] mb-3 rounded-[10px] p-[16px_8px]">
            <input
              type={examState.questions[examState.currentQuestion].type === "single_choice" ? "radio" : "checkbox"}
              name={`question-${examState.currentQuestion}`}
              id={`answer-${examState.currentQuestion}-${aIndex}`}
              className="me-3"
              onChange={() =>
                handleAnswerSelect(
                  examState.questions[examState.currentQuestion]._id,
                  answer.key,
                  examState.questions[examState.currentQuestion].type
                )
              }
              checked={isAnswerSelected(examState.questions[examState.currentQuestion]._id, answer.key)}
            />
            <label className="text-[20px]" htmlFor={`answer-${examState.currentQuestion}-${aIndex}`}>
              {answer.answer}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CurrentQuestion;
