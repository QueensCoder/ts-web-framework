import axios, { AxiosResponse, AxiosPromise } from 'axios';

// interface also cleans up code by not having a ton
// code in the constructor args
interface UserProps {
  name?: string;
  age?: number;
  id?: number;
}

type Callback = () => void;

export class User {
  events: { [key: string]: Callback[] } = {};
  constructor(private data: UserProps) {}

  get(propName: string): number | string {
    return this.data[propName];
  }

  set(update: UserProps): void {
    Object.assign(this.data, update);
  }

  on(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName];
    if (!handlers || !handlers.length) return;

    handlers.forEach((callback) => callback());
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
