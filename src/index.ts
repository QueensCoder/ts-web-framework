import { UserForm } from './views/UserForm';
import { User, UserProps } from './models/User';
import { UserEdit } from './views/UserEdit';
import { UserList } from './views/UserList';
import { Collection } from './models/Collection';

// const user = User.buildUser({ name: 'Name', age: 30 });

// const root = document.getElementById('root');

// // type guard to make sure root is not null
// if (root) {
//   const userForm = new UserEdit(root, user);
//   userForm.render();
//   console.log(userForm);
// } else {
//   throw new Error('Root element not found on dom');
// }

const users = new Collection(
  'http://localhost:3000/users',
  (json: UserProps) => {
    return User.buildUser(json);
  }
);

users.on('change', () => {
  const root = document.getElementById('root');
  if (root) {
    new UserList(root, users).render();
  }
});

users.fetch();
