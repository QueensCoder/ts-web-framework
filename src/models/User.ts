import axios, { AxiosResponse } from 'axios';
import { Eventing } from './Eventing';

// interface also cleans up code by not having a ton
// code in the constructor args
interface UserProps {
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

  async fetch(): Promise<void> {
    const resp: AxiosResponse = await axios.get(
      `http://localhost:3000/users/${this.get('id')}`
    );
    this.set(resp.data);
  }

  async save(): Promise<void> {
    if (this.get('id'))
      await axios.put(
        `http://localhost:3000/users/${this.get('id')}`,
        this.data
      );
    else await axios.post(`http://localhost:3000/users`, this.data);
  }
}
