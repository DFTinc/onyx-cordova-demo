export interface IUser {
  name: any
}

export class User implements IUser {
  name: string;

  constructor(model?: IUser) {
    if (model) {
      if (model.hasOwnProperty("name")) {
        this.name = model.name;
      }
    }
  }
}
