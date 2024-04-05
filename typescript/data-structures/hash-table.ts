export class HashTable<T> {
  private table: { [key: string]: T };

  constructor() {
    this.table = {};
  }

  put(key: string, value: T): void {
    this.table[key] = value;
  }

  get(key: string): T | undefined {
    return this.table[key];
  }

  remove(key: string): void {
    delete this.table[key];
  }

  containsKey(key: string): boolean {
    return key in this.table;
  }

  keys(): string[] {
    return Object.keys(this.table);
  }

  values(): T[] {
    return Object.values(this.table);
  }

  size(): number {
    return Object.keys(this.table).length;
  }

  clear(): void {
    this.table = {};
  }
}
