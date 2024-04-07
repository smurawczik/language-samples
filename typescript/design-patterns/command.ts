// Receiver
class Light {
  turnOn(): void {
    console.log("Light is on.");
  }

  turnOff(): void {
    console.log("Light is off.");
  }
}

// Command Interface
interface Command {
  execute(): void;
}

// Concrete Command 1
class TurnOnCommand implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute(): void {
    this.light.turnOn();
  }
}

// Concrete Command 2
class TurnOffCommand implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute(): void {
    this.light.turnOff();
  }
}

// Invoker
class RemoteControl {
  private command: Command | null = null;

  setCommand(command: Command): void {
    this.command = command;
  }

  pressButton(): void {
    if (!this.command) {
      throw new Error("No command is set.");
    }
    this.command.execute();
  }
}

// Use Case:
const light = new Light();
const turnOnCommand = new TurnOnCommand(light);
const turnOffCommand = new TurnOffCommand(light);

const remote = new RemoteControl();
remote.setCommand(turnOnCommand);
remote.pressButton(); // Output: "Light is on."

remote.setCommand(turnOffCommand);
remote.pressButton(); // Output: "Light is off."
remote.pressButton();

remote.setCommand(turnOnCommand);
remote.pressButton(); // Output: "Light is on."
