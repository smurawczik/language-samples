// Memento: Stores the state of the text
class TextMemento {
  private text: string;

  constructor(text: string) {
    this.text = text;
  }

  getText(): string {
    return this.text;
  }
}

// Originator: Creates and restores the state
class TextOriginator {
  private text: string;

  constructor(text: string) {
    this.text = text;
  }

  getText(): string {
    return this.text;
  }

  setText(text: string): void {
    this.text = text;
  }

  save(): TextMemento {
    return new TextMemento(this.text);
  }

  restore(memento: TextMemento): void {
    this.text = memento.getText();
  }
}

// Caretaker: Manages the history of changes
class TextCaretaker {
  private history: TextMemento[] = [];

  addMemento(memento: TextMemento): void {
    this.history.push(memento);
  }

  getMemento(index: number): TextMemento | undefined {
    return this.history[index];
  }
}

// Usage
const originator = new TextOriginator("Initial text");
const caretaker = new TextCaretaker();

// Save the initial state
caretaker.addMemento(originator.save());

// Modify the text
originator.setText("Modified text");

// Save the modified state
caretaker.addMemento(originator.save());

// Restore the initial state
const initialMemento = caretaker.getMemento(0);
if (initialMemento) {
  originator.restore(initialMemento);
  console.log("Restored text:", originator.getText()); // Output: Restored text: Initial text
} else {
  console.log("No initial state available.");
}
