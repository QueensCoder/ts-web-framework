import { View } from './View';
import { User, UserProps } from '../models/User';

export class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      //   finds a class with name from using query selectorall
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick,
      'click:.save-model': this.onSaveClick,
    };
  }
  template(): string {
    return `
    <div>                       
        <input placeholder=${this.model.get('name')}>
        <Button class='set-name'>Change Name</Button>
        <Button class="set-age">Set random age</Button>
        <Button class="save-model">Save User</Button>
    </div>
    `;
  }

  onSaveClick = (): void => {
    this.model.save();
  };

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
