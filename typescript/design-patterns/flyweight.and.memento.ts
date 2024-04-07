// Memento: Stores the state of the text
class EditorMemento {
  private text: string;

  constructor(text: string) {
    this.text = text;
  }

  getText(): string {
    return this.text;
  }
}

// Originator: Creates and restores the state
class EditorOriginator {
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

  save(): EditorMemento {
    return new EditorMemento(this.text);
  }

  restore(memento: EditorMemento): void {
    this.text = memento.getText();
  }
}

// Caretaker: Manages the history of changes
class EditorCaretaker {
  private history: EditorMemento[] = [];

  addMemento(memento: EditorMemento): void {
    this.history.push(memento);
  }

  getMemento(index: number): EditorMemento | undefined {
    return this.history[index];
  }

  getHistoryLength(): number {
    return this.history.length;
  }

  removeLastMemento(): void {
    this.history.pop();
  }
}

// Flyweight interface
interface Character {
  render(font: string): void;
}

// Concrete Flyweight: Character implementation
class ConcreteCharacter implements Character {
  private char: string;

  constructor(char: string) {
    this.char = char;
  }

  render(font: string): void {
    console.log(`Rendering character '${this.char}' with font '${font}'`);
  }
}

// Flyweight Factory
class CharacterFactory {
  private characters: { [key: string]: Character } = {};

  getCharacter(char: string): Character {
    if (!this.characters[char]) {
      this.characters[char] = new ConcreteCharacter(char);
    }
    return this.characters[char];
  }
}

// Client: Text Editor Application
class TextEditor {
  private characterFactory: CharacterFactory;
  private editorOriginator: EditorOriginator;
  private editorCaretaker: EditorCaretaker;

  constructor(characterFactory: CharacterFactory, text: string) {
    this.characterFactory = characterFactory;
    this.editorOriginator = new EditorOriginator(text);
    this.editorCaretaker = new EditorCaretaker();
    this.saveState();
  }

  renderText(font: string): void {
    const text = this.editorOriginator.getText();
    for (let char of text) {
      const character = this.characterFactory.getCharacter(char);
      character.render(font);
    }
  }

  updateFont(font: string): void {
    this.renderText(font);
    this.saveState();
  }

  undo(): void {
    const historyLength = this.editorCaretaker.getHistoryLength();
    if (historyLength >= 2) {
      const previousState = this.editorCaretaker.getMemento(historyLength - 2);
      if (previousState) {
        this.editorOriginator.restore(previousState);
        this.editorCaretaker.removeLastMemento(); // Remove the most recent state from history
        this.renderText("Arial"); // Restore text with default font
        console.log("Undo completed.");
        return;
      }
    }
    console.log("No previous state available for undo.");
  }

  private saveState(): void {
    const currentState = this.editorOriginator.save();
    this.editorCaretaker.addMemento(currentState);
  }
}

// Usage
const characterFactory = new CharacterFactory();
const textEditor = new TextEditor(characterFactory, "Hello World!");

// Render text with the default font
textEditor.renderText("Arial");

// Update font
textEditor.updateFont("Times New Roman");

// Undo operation
textEditor.undo();
textEditor.undo();
textEditor.undo();
