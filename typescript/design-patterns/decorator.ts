// Component Interface
interface Coffee {
  cost(): number;
  getDescription(): string;
}

// Concrete Component
class SimpleCoffee implements Coffee {
  cost(): number {
    return 5; // $5 for a simple coffee
  }

  getDescription(): string {
    return "Simple coffee";
  }
}

// Decorator
abstract class CoffeeDecorator implements Coffee {
  protected decoratedCoffee: Coffee;

  constructor(coffee: Coffee) {
    this.decoratedCoffee = coffee;
  }

  cost(): number {
    return this.decoratedCoffee.cost();
  }

  getDescription(): string {
    return this.decoratedCoffee.getDescription();
  }
}

// Concrete Decorator 1
class MilkDecorator extends CoffeeDecorator {
  cost(): number {
    return this.decoratedCoffee.cost() + 2; // $2 for milk
  }

  getDescription(): string {
    return this.decoratedCoffee.getDescription() + ", with milk";
  }
}

// Concrete Decorator 2
class SugarDecorator extends CoffeeDecorator {
  cost(): number {
    return this.decoratedCoffee.cost() + 1; // $1 for sugar
  }

  getDescription(): string {
    return this.decoratedCoffee.getDescription() + ", with sugar";
  }
}

// Use Case:
let coffee: Coffee = new SimpleCoffee();
console.log(coffee.getDescription() + " costs $" + coffee.cost());

coffee = new MilkDecorator(coffee);
console.log(coffee.getDescription() + " costs $" + coffee.cost());

coffee = new SugarDecorator(coffee);
console.log(coffee.getDescription() + " costs $" + coffee.cost());
