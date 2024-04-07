(() => {
  // Component
  interface Graphic {
    draw(): void;
  }

  // Leaf
  class Circle implements Graphic {
    draw(): void {
      console.log("Drawing a circle");
    }
  }

  // Leaf
  class Square implements Graphic {
    draw(): void {
      console.log("Drawing a square");
    }
  }

  // Composite
  class CompositeGraphic implements Graphic {
    private children: Graphic[] = [];

    add(graphic: Graphic): void {
      this.children.push(graphic);
    }

    draw(): void {
      console.log("Drawing composite graphic:");
      this.children.forEach((child) => child.draw());
    }
  }

  // Use Case:
  const composite = new CompositeGraphic();
  composite.add(new Circle());
  composite.add(new Square());

  composite.draw();
})();
