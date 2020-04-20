import { User } from './models/User';

const user = new User({ name: 'one', age: 2 });

user.on('change', () => {
  console.log('chage one');
});

user.on('change', () => {
  console.log('chage two');
});

console.log(user.events);

user.trigger('change');
