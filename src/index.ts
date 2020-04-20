import { User } from './models/User';

const userOne = new User({ id: 1 });

userOne.set({ name: 'new name', age: 1000 });

const newUser = new User({ name: 'new record', age: 0 });
newUser.save();

userOne.save();
