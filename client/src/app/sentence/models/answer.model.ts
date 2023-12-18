export interface answer{
  [key: string]: {
    word: string;
    label: string;
  };
}


export interface result{
  answer: answer,
  content_id: string
}

