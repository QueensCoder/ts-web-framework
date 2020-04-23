import axios, { AxiosResponse } from 'axios';
import { User, UserProps } from './User';
import { Eventing } from './Eventing';

export class Collection {
  models: User[] = [];
  events: Eventing = new Eventing();

  constructor(public rootUrl: string) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  async fetch(): Promise<void> {
    try {
      const { data }: AxiosResponse = await axios.get(this.rootUrl);
      data.forEach((userData: UserProps): void => {
        const user = User.buildUser(userData);
        this.models.push(user);
      });
    } catch (err) {
      console.log(err);
    }
    this.trigger('change');
  }
}
