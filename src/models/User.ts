import { Eventing } from './Eventing';
import { Sync } from './Sync';
import { Attributes } from './Attributes';

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
}
