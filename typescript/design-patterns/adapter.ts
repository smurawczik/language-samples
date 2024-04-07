// Target Interface
interface Target {
  request(): string;
}

// Adaptee
class Adaptee {
  specificRequest(): string {
    return "Adaptee's specific request";
  }
}

// Adapter
class Adapter implements Target {
  private adaptee: Adaptee;

  constructor(adaptee: Adaptee) {
    this.adaptee = adaptee;
  }

  request(): string {
    return this.adaptee.specificRequest();
  }
}

// Client
function clientCode(target: Target): void {
  console.log(target.request());
}

// Use Case:
const adaptee = new Adaptee();
const adapter = new Adapter(adaptee);
clientCode(adapter); // Output: "Adaptee's specific request"
