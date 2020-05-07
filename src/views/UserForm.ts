import { View } from './View';
import { User, UserProps } from '../models/User';

export class UserForm extends View<User, UserProps> {
  template(): string {
    return `
    <div>
        <h1>User Form</h1>
        <div>User name: ${this.model.get('name')}</div>
        <div>User age: ${this.model.get('age')}</div>
        <input/>
        <Button class='set-name'>Change Name</Button>
        <Button class="set-age">Set random age</Button>
    </div>
    `;
  }

  eventsMap(): { [key: string]: () => void } {
    return {
      //   finds a class with name from using query selectorall
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick,
    };
  }

  onSetNameClick = (): void => {
    const input = this.parent.querySelector('input');
    // input has type union of html element or null
    // to protect our code we use a type guard to ensure the input is not null
    if (input) {
      this.model.set({ name: input.value });
    }
  };

  //   had to bind onSetAge or else loose context of this
  onSetAgeClick = (): void => {
    //   able to access model form the user class
    this.model.setRandomAge();
  };

  //   binds events to html tags
}
