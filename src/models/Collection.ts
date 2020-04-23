import axios, { AxiosResponse } from 'axios';
import { Eventing } from './Eventing';

//    a class with two generics
// t is the class type of the collection aka user blog post etc
// k is the props associated with the collection type
export class Collection<T, K> {
  models: T[] = [];
  events: Eventing = new Eventing();

  //   deserialize takes in json in that satisfies K and returns an instance of T
  //   now our fetch can work with any build method and not only User.build
  constructor(public rootUrl: string, public deserialize: (json: K) => T) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  async fetch(): Promise<void> {
    try {
      const { data }: AxiosResponse = await axios.get(this.rootUrl);
      data.forEach((value: K): void => {
        this.models.push(this.deserialize(value));
      });
    } catch (err) {
      console.log(err);
    }
    this.trigger('change');
  }
}
