declare interface Question {
  question: string;
  answers: [];
  type: string;
  correct: string;
  subject: [];
  exam: [];
}
declare interface QuestionsResponse {
  message: string;
  questions: Question[];
}
