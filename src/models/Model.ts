import { AxiosPromise, AxiosResponse } from 'axios';

// generic interface
interface ModelAttributes<T> {
  set(value: T): void; //method definition
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

interface HasId {
  id?: number;
}

// this generic class will serve as a parent class for several other classes
// it passses the type to attributes and sync
export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  //   this getter returns a reference to the on method
  // this way we do not pass args into the on method by using an on method on this class
  // prevents against passing args from method to method which can get messy

  //   shorten syntax
  on = this.events.on;

  trigger = this.events.trigger;

  get = this.attributes.get;

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  async fetch(): Promise<void> {
    const id = this.attributes.get('id');
    if (typeof id !== 'number') {
      throw new Error('Cannot fetch without an id');
    }

    try {
      // axios response is type inferred
      const { data }: AxiosResponse = await this.sync.fetch(id);
      this.set(data);
    } catch (err) {
      console.log(err);
    }
  }

  async save(): Promise<void> {
    try {
      await this.sync.save(this.attributes.getAll());
      this.trigger('save');
    } catch (err) {
      this.trigger('error');
    }
  }
}
