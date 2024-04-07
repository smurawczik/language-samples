// Prototype
interface Shape {
  clone(): Shape;
  getInfo(): string;
}

// Concrete Prototype 1
class Circle implements Shape {
  private radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  clone(): Shape {
    return new Circle(this.radius);
  }

  getInfo(): string {
    return `Circle with radius ${this.radius}`;
  }
}

// Concrete Prototype 2
class Square implements Shape {
  private sideLength: number;

  constructor(sideLength: number) {
    this.sideLength = sideLength;
  }

  clone(): Shape {
    return new Square(this.sideLength);
  }

  getInfo(): string {
    return `Square with side length ${this.sideLength}`;
  }
}

// Use Case:
const circlePrototype = new Circle(5);
const clonedCircle = circlePrototype.clone();
console.log(clonedCircle.getInfo()); // Output: "Circle with radius 5"

const squarePrototype = new Square(10);
const clonedSquare = squarePrototype.clone();
console.log(clonedSquare.getInfo()); // Output: "Square with side length 10"
