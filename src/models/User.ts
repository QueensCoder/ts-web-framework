import { Eventing } from './Eventing';

// interface also cleans up code by not having a ton
// code in the constructor args
export interface UserProps {
  name?: string;
  age?: number;
  id?: number;
}

export class User {
  // use composition to have classes handle different tasks
  public events: Eventing = new Eventing();

  constructor(private data: UserProps) {}

  get(propName: string): number | string {
    return this.data[propName];
  }

  set(update: UserProps): void {
    Object.assign(this.data, update);
  }
}
