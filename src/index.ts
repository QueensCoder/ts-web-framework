import { User } from './models/User';
const collection = User.buildUserCollection();

collection.on('change', () => console.log('hello world', collection));
collection.fetch();
