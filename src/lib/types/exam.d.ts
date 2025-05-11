declare interface ExamResponse {
  message: string;
  metadata: Metadata;
  exams: Exam[];
}

declare type Exam = {
  _id: string;
  title: string;
  duration: number;
  subject: string;
  numberOfQuestions: number;
  active: boolean;
  createdAt: string;
};

declare type ExamState = {
  questions: Array<{
    _id: string;
    question: string;
    type: "single_choice" | "multiple_choice";
    answers: Array<{
      key: string;
      answer: string;
    }>;
  }>;
  results: { total: string; correct: string; wrong: number; WrongQuestions: [] } | null;
  currentQuestion: number;
  selectedAnswers: {
    answers: Array<{
      questionId: string;
      correct: string | string[];
    }>;
  };
};
