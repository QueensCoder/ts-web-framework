import { Eventing } from './Eventing';
import { Sync } from './Sync';
import { Attributes } from './Attributes';
import { AxiosResponse, AxiosPromise } from 'axios';

// interface also cleans up code by not having a ton
// code in the constructor args
export interface UserProps {
  name?: string;
  age?: number;
  id?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User {
  // use composition to have classes handle different tasks
  //   hard coded composition because we will always want to use eventing
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
  public attributes: Attributes<UserProps>;

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }

  //   this getter returns a reference to the on method
  // this way we do not pass args into the on method by using an on method on this class
  // prevents against passing args from method to method which can get messy
  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(update: UserProps): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  async fetch(): Promise<void> {
    const id = this.attributes.get('id');
    if (typeof id !== 'number') {
      throw new Error('Cannot fetch without an id');
    }

    try {
      // axios response is type inferred
      const { data }: AxiosResponse = await this.sync.fetch(id);
      this.set(data);
    } catch (err) {
      console.log(err);
    }
  }

  async save(): Promise<void> {
    try {
      await this.sync.save(this.attributes.getAll());
      this.trigger('save');
    } catch (err) {
      this.trigger('error');
    }
  }
}
