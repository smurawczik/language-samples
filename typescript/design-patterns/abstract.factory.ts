// Abstract Product A
interface Button {
  paint(): string;
}

// Concrete Product A1
class WindowsButton implements Button {
  paint(): string {
    return "Render a button in Windows style";
  }
}

// Concrete Product A2
class MacOSButton implements Button {
  paint(): string {
    return "Render a button in macOS style";
  }
}

// Abstract Product B
interface Checkbox {
  paint(): string;
}

// Concrete Product B1
class WindowsCheckbox implements Checkbox {
  paint(): string {
    return "Render a checkbox in Windows style";
  }
}

// Concrete Product B2
class MacOSCheckbox implements Checkbox {
  paint(): string {
    return "Render a checkbox in macOS style";
  }
}

// Abstract Factory
interface GUIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

// Concrete Factory 1
class WindowsFactory implements GUIFactory {
  createButton(): Button {
    return new WindowsButton();
  }

  createCheckbox(): Checkbox {
    return new WindowsCheckbox();
  }
}

// Concrete Factory 2
class MacOSFactory implements GUIFactory {
  createButton(): Button {
    return new MacOSButton();
  }

  createCheckbox(): Checkbox {
    return new MacOSCheckbox();
  }
}

// Client
class Application {
  private factory: GUIFactory;

  constructor(factory: GUIFactory) {
    this.factory = factory;
  }

  createUI(): void {
    const button = this.factory.createButton();
    const checkbox = this.factory.createCheckbox();

    console.log(button.paint());
    console.log(checkbox.paint());
  }
}

// Use Case:
const windowsApp = new Application(new WindowsFactory());
windowsApp.createUI();
const macOSApp = new Application(new MacOSFactory());
macOSApp.createUI();
