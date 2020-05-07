import {Model} from '../models/Model'

export abstract class View<T> {
  constructor(public parent: Element, public model: T extends Model) {
    this.bindModel();
  }

  abstract eventsMap(): { [key: string]: () => void };
  abstract template(): string;

  //   listens to the  change event whenever this class is used
  //   any change to the user will result in a re render
  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    });
  }

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
