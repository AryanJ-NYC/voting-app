export interface Option {
  name: string;
  _id?: string;
  votes?: string[];
}

export class Poll {
  _id: string;
  title: string;
  creatorId: string;
  options: Option[];
}
