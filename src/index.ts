import { User } from './models/User';

const user = User.buildUser({ name: 'hello world', age: 1 });

user.on('save', () => {
  console.log(user, 'save word');
});

user.save();
