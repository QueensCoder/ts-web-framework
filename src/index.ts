import { User } from './models/User';

const user = new User({ name: 'test', age: 1 });

user.events.on('change', () => {
  console.log('change triggered');
});
user.events.trigger('change');
