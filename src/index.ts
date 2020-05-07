import { UserForm } from './views/UserForm';
import { User } from './models/User';
import { UserEdit } from './views/UserEdit';

const user = User.buildUser({ name: 'Name', age: 30 });

const root = document.getElementById('root');

// type guard to make sure root is not null
if (root) {
  const userForm = new UserEdit(root, user);
  userForm.render();
  console.log(userForm);
} else {
  throw new Error('Root element not found on dom');
}
