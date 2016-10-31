interface IOption {
  name: string;
  _id?: string;
  votes?: string[];
}

export class Poll {
  _id: string;
  title: string;
  options: IOption[];
}
