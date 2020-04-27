import { User } from '../models/User';

export class UserForm {
  constructor(public parent: Element, public model: User) {
    this.bindModel();
  }

  //   listens to the  change event whenever this class is used
  //   any change to the user will result in a re render
  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    });
  }

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
    this.model.set({ name: input.value });
  };

  //   had to bind onSetAge or else loose context of this
  onSetAgeClick = (): void => {
    //   able to access model form the user class
    this.model.setRandomAge();
  };

  //   binds events to html tags
  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();
    for (let key in eventsMap) {
      // splits the keys and uses the key and eventname to bind to the element
      const [eventName, selector] = key.split(':');
      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[key]);
      });
    }
  }

  //   works like a pseudo react.render
  // creates a document template and then binds the events to the template
  // finally
  render(): void {
    //   first empty html in parent
    this.parent.innerHTML = '';

    // then re render it by inserting new html
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.parent.append(templateElement.content);
  }
}
