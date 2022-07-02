export type User = {
  id: string;
  user_name: string;
  email: string;
  password: string;
  img_path: string;
  created_at: Date;
  updated_at: Date;
  game_history: Game[];
};

export type SingleQuiz = {
  index: number;
  answerText: string;
  splitedText: DraggableText[];
};

export type DraggableText = {
  id: string;
  singleText: string;
};

export type Game = {
  id: string;
  user_id: string;
  trial_time: number;
  correct_count: number;
  vocabulary_point: number;
  total_point: number;
  created_at: Date;
};

export type Word = {
  id: string;
  text: string;
  level: number;
};

export type GameState = {
  id: string;
  user_id: string;
  trial_time: number;
  correct_count: number;
  vocabulary_point: number;
  total_point: number;
  created_at: Date;
  current_index: number;
  word_list: Word[];
};
