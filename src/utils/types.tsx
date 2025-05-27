export interface Question {
  questionText: string;
  options: {
    text: string;
    correct: boolean;
  }[];
  correctOption: string;
  marks: number;
}
