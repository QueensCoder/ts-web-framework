export class UserForm {
  constructor(public parent: Element) {}
  template(): string {
    return `
    <div>
        <h1>User Form</h1>
        <input/>
        <Button>Click me</Button>
    </div>
    `;
  }

  eventsMap(): { [key: string]: () => void } {
    return {
      'click:button': this.onButtonClick,
      'mouseover:h1': this.onHover,
    };
  }

  onHover(): void {
    console.log('hoevered over h1');
  }

  onButtonClick(): void {
    console.log('hello there from button');
  }

  //   binds events to html tags
  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();
    for (let key in eventsMap) {
      const [eventName, selector] = key.split(':');
      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[key]);
      });
    }
  }

  render(): void {
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.parent.append(templateElement.content);
  }
}
