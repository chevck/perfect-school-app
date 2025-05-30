export interface Question {
  questionText: string;
  options: {
    text: string;
    correct: boolean;
  }[];
  correctOption: string;
  marks: number;
}

export interface ExamDetails {
  name: string;
  grade: string;
  term: string;
  year: string;
  teacher: string;
  date: string;
  questions: number;
  totalMarks: number;
  id: number;
}

export interface UserInformation {
  schoolName: string;
  adminName: string;
  expiresAt: number;
}
