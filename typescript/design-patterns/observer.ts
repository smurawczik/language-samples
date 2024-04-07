// Subject (Observable)
interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(): void;
}

// Concrete Subject
class ConcreteSubject implements Subject {
  private observers: Observer[] = [];
  private state: number = 0;

  getState(): number {
    return this.state;
  }

  setState(state: number): void {
    this.state = state;
    this.notify();
  }

  attach(observer: Observer): void {
    this.observers.push(observer);
  }

  detach(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(): void {
    this.observers.forEach((observer) => observer.update());
  }
}

// Observer
interface Observer {
  update(): void;
}

// Concrete Observer
class ConcreteObserver implements Observer {
  private subject: ConcreteSubject;

  constructor(subject: ConcreteSubject) {
    this.subject = subject;
    this.subject.attach(this);
  }

  update(): void {
    console.log(`Observer: Subject's state is now ${this.subject.getState()}`);
  }
}

// Use Case:
const subject = new ConcreteSubject();
const observer1 = new ConcreteObserver(subject);
const observer2 = new ConcreteObserver(subject);

subject.setState(5);
subject.setState(10);

subject.detach(observer1);
subject.setState(25);
