(() => {
  // Product interface
  interface Pizza {
    prepare(): void;
    bake(): void;
    cut(): void;
    box(): void;
  }

  // Concrete Product: Margherita Pizza
  class MargheritaPizza implements Pizza {
    prepare(): void {
      console.log("Preparing Margherita pizza...");
    }

    bake(): void {
      console.log("Baking Margherita pizza...");
    }

    cut(): void {
      console.log("Cutting Margherita pizza...");
    }

    box(): void {
      console.log("Boxing Margherita pizza...");
    }
  }

  // Concrete Product: Pepperoni Pizza
  class PepperoniPizza implements Pizza {
    prepare(): void {
      console.log("Preparing Pepperoni pizza...");
    }

    bake(): void {
      console.log("Baking Pepperoni pizza...");
    }

    cut(): void {
      console.log("Cutting Pepperoni pizza...");
    }

    box(): void {
      console.log("Boxing Pepperoni pizza...");
    }
  }

  // Factory class
  class PizzaFactory {
    createPizza(type: string): Pizza {
      let pizza: Pizza;

      switch (type) {
        case "Margherita":
          pizza = new MargheritaPizza();
          break;
        case "Pepperoni":
          pizza = new PepperoniPizza();
          break;
        default:
          throw new Error(`Invalid pizza type: ${type}`);
      }

      return pizza;
    }
  }

  // Client
  class Customer {
    private pizzaFactory: PizzaFactory;

    constructor(pizzaFactory: PizzaFactory) {
      this.pizzaFactory = pizzaFactory;
    }

    orderPizza(type: string): void {
      const pizza = this.pizzaFactory.createPizza(type);

      pizza.prepare();
      pizza.bake();
      pizza.cut();
      pizza.box();

      console.log(`Enjoy your ${type} pizza!`);
    }
  }

  // Usage
  const pizzaFactory = new PizzaFactory();
  const customer = new Customer(pizzaFactory);

  customer.orderPizza("Margherita");
  customer.orderPizza("Pepperoni");
})();
