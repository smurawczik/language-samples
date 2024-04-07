(() => {
  // State interface
  interface VendingMachineState {
    insertMoney(amount: number): void;
    selectItem(item: string): void;
    dispenseItem(): void;
  }

  // Concrete States
  class ReadyState implements VendingMachineState {
    private vendingMachine: VendingMachine;

    constructor(vendingMachine: VendingMachine) {
      this.vendingMachine = vendingMachine;
    }

    insertMoney(amount: number): void {
      console.log(`Inserted money: $${amount}`);
      this.vendingMachine.setCurrentAmount(amount);
      console.log("Please select an item.");
      this.vendingMachine.setState(new ItemSelectedState(this.vendingMachine));
    }

    selectItem(item: string): void {
      console.log("Please insert money first.");
    }

    dispenseItem(): void {
      console.log("Please select an item first.");
    }
  }

  class ItemSelectedState implements VendingMachineState {
    private vendingMachine: VendingMachine;

    constructor(vendingMachine: VendingMachine) {
      this.vendingMachine = vendingMachine;
    }

    insertMoney(amount: number): void {
      console.log(
        "Money already inserted. Please select the item or cancel the transaction."
      );
    }

    selectItem(item: string): void {
      console.log(`Selected item: ${item}`);
      this.vendingMachine.setItem(item);
      this.vendingMachine.setState(new DispensingState(this.vendingMachine));
    }

    dispenseItem(): void {
      console.log("Please select an item first.");
    }
  }

  class DispensingState implements VendingMachineState {
    private vendingMachine: VendingMachine;

    constructor(vendingMachine: VendingMachine) {
      this.vendingMachine = vendingMachine;
    }

    insertMoney(amount: number): void {
      console.log("Cannot insert money during dispensing.");
    }

    selectItem(item: string): void {
      console.log("Cannot select another item during dispensing.");
    }

    dispenseItem(): void {
      console.log(`Dispensing ${this.vendingMachine.getItem()}...`);
      this.vendingMachine.setCurrentAmount(0);
      this.vendingMachine.setItem("");
      this.vendingMachine.setState(new ReadyState(this.vendingMachine));
    }
  }

  // Context
  class VendingMachine {
    private state: VendingMachineState;
    private currentAmount: number;
    private currentItem: string;

    constructor() {
      this.state = new ReadyState(this);
      this.currentAmount = 0;
      this.currentItem = "";
    }

    setState(state: VendingMachineState): void {
      this.state = state;
    }

    setCurrentAmount(amount: number): void {
      this.currentAmount = amount;
    }

    setItem(item: string): void {
      this.currentItem = item;
    }

    getCurrentAmount(): number {
      return this.currentAmount;
    }

    getItem(): string {
      return this.currentItem;
    }

    insertMoney(amount: number): void {
      this.state.insertMoney(amount);
    }

    selectItem(item: string): void {
      this.state.selectItem(item);
    }

    dispenseItem(): void {
      this.state.dispenseItem();
    }
  }

  // Usage
  const vendingMachine = new VendingMachine();

  vendingMachine.insertMoney(5); // Inserted money: $5
  vendingMachine.selectItem("Soda"); // Selected item: Soda
  vendingMachine.dispenseItem(); // Dispensing Soda...
  vendingMachine.selectItem("Water"); // Please insert money first.
})();
