// Product: Computer
class Computer {
  private cpu: string;
  private ram: string;
  private storage: string;
  private gpu: string;

  constructor() {
    this.cpu = "";
    this.ram = "";
    this.storage = "";
    this.gpu = "";
  }

  public setCPU(cpu: string): void {
    this.cpu = cpu;
  }

  public setRAM(ram: string): void {
    this.ram = ram;
  }

  public setStorage(storage: string): void {
    this.storage = storage;
  }

  public setGPU(gpu: string): void {
    this.gpu = gpu;
  }

  public describe(): void {
    console.log(`Computer Configuration:
          CPU: ${this.cpu}
          RAM: ${this.ram}
          Storage: ${this.storage}
          GPU: ${this.gpu}`);
  }
}

// Builder Interface
interface ComputerBuilder {
  setCPU(cpu: string): void;
  setRAM(ram: string): void;
  setStorage(storage: string): void;
  setGPU(gpu: string): void;
  build(): Computer;
}

// Concrete Builder: Gaming Computer Builder
class GamingComputerBuilder implements ComputerBuilder {
  private computer: Computer;

  constructor() {
    this.computer = new Computer();
  }

  setCPU(cpu: string): void {
    this.computer.setCPU(cpu);
  }

  setRAM(ram: string): void {
    this.computer.setRAM(ram);
  }

  setStorage(storage: string): void {
    this.computer.setStorage(storage);
  }

  setGPU(gpu: string): void {
    this.computer.setGPU(gpu);
  }

  build(): Computer {
    return this.computer;
  }
}

// Concrete Builder: Office Computer Builder
class OfficeComputerBuilder implements ComputerBuilder {
  private computer: Computer;

  constructor() {
    this.computer = new Computer();
  }

  setCPU(cpu: string): void {
    this.computer.setCPU(cpu);
  }

  setRAM(ram: string): void {
    this.computer.setRAM(ram);
  }

  setStorage(storage: string): void {
    this.computer.setStorage(storage);
  }

  setGPU(gpu: string): void {
    this.computer.setGPU(gpu);
  }

  build(): Computer {
    return this.computer;
  }
}

// Concrete Builder: Home Theater Computer Builder
class HomeTheaterComputerBuilder implements ComputerBuilder {
  private computer: Computer;

  constructor() {
    this.computer = new Computer();
  }

  setCPU(cpu: string): void {
    this.computer.setCPU(cpu);
  }

  setRAM(ram: string): void {
    this.computer.setRAM(ram);
  }

  setStorage(storage: string): void {
    this.computer.setStorage(storage);
  }

  setGPU(gpu: string): void {
    this.computer.setGPU(gpu);
  }

  build(): Computer {
    return this.computer;
  }
}

// Director
class ComputerBuildDirector {
  private builder: ComputerBuilder;

  constructor(builder: ComputerBuilder) {
    this.builder = builder;
  }

  constructComputer(
    cpu: string,
    ram: string,
    storage: string,
    gpu: string
  ): void {
    this.builder.setCPU(cpu);
    this.builder.setRAM(ram);
    this.builder.setStorage(storage);
    this.builder.setGPU(gpu);
  }
}

// Usage
const gamingComputerBuilder = new GamingComputerBuilder();
const officeComputerBuilder = new OfficeComputerBuilder();
const homeTheaterComputerBuilder = new HomeTheaterComputerBuilder();

const gamingComputerBuildDirector = new ComputerBuildDirector(
  gamingComputerBuilder
);
const officeComputerBuildDirector = new ComputerBuildDirector(
  officeComputerBuilder
);
const homeTheaterComputerBuildDirector = new ComputerBuildDirector(
  homeTheaterComputerBuilder
);

gamingComputerBuildDirector.constructComputer(
  "Intel i9",
  "32GB DDR4",
  "1TB SSD",
  "Nvidia RTX 3080"
);
const gamingComputer = gamingComputerBuilder.build();
gamingComputer.describe();

officeComputerBuildDirector.constructComputer(
  "Intel i7",
  "16GB DDR4",
  "500GB HDD",
  "Integrated Graphics"
);
const officeComputer = officeComputerBuilder.build();
officeComputer.describe();

homeTheaterComputerBuildDirector.constructComputer(
  "AMD Ryzen 7",
  "16GB DDR4",
  "1TB HDD",
  "AMD Radeon RX 560"
);
const homeTheaterComputer = homeTheaterComputerBuilder.build();
homeTheaterComputer.describe();
