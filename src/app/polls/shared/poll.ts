interface IOption {
  name: string;
}

export class Poll {
  _id?: string;
  title: string;
  options: IOption[];
}
