export class Attributes<T> {
  constructor(private data: T) {}

  //   generic constraint on a method
  //   key has to be a key of t aka name age id
  // bind context of this for attributes get
  get = <K extends keyof T>(propName: K): T[K] => {
    return this.data[propName];
  };

  set(update: T): void {
    Object.assign(this.data, update);
  }

  getAll(): T {
    return this.data;
  }
}
