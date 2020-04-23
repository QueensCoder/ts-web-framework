import { User } from './models/User';

const user = new User({ id: 1, name: 'new name', age: 1 });

user.on('save', () => {
  console.log(user, 'save word');
});

user.save();
