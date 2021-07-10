export interface Sentence {
  index: number;
  start_time: number;
  text: string;
  speaker: {
    name: string;
    index: number;
    id?: string;
    pictureSrc?: string;
  };
  confidence?: number;
  end_time?: number;
  words?: Word[];
  annotations?: any;
}

export interface Word {
  index: number;
  start_time: number;
  end_time: number;
  text: string;
  annotations?: any;
}
