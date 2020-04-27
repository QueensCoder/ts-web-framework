import { Eventing } from './Eventing';
import { Sync } from './Sync';
import { Attributes } from './Attributes';
import { Model } from './Model';
import { Collection } from './Collection';

// interface also cleans up code by not having a ton
// code in the constructor args
export interface UserProps {
  name?: string;
  age?: number;
  id?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User extends Model<UserProps> {
  // static methodi on class itself, takes in args to build an instance
  // of class and returns that instance of class
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new Sync<UserProps>(rootUrl)
    );
  }

  //static build collection
  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(rootUrl, (json) =>
      User.buildUser(json)
    );
  }

  setRandomAge(): void {
    const age = Math.round(Math.random() * 100);
    this.set({ age });
  }
}
