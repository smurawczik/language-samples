// Strategy Interface
interface SortingStrategy {
  sort(data: number[]): number[];
}

// Concrete Strategy 1
class BubbleSort implements SortingStrategy {
  sort(data: number[]): number[] {
    // Implement bubble sort algorithm
    return data.slice().sort((a, b) => a - b);
  }
}

// Concrete Strategy 2
class QuickSort implements SortingStrategy {
  sort(data: number[]): number[] {
    // Implement quick sort algorithm
    return data.slice().sort((a, b) => a - b);
  }
}

// Context
class Sorter {
  private strategy: SortingStrategy;

  constructor(strategy: SortingStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: SortingStrategy): void {
    this.strategy = strategy;
  }

  sort(data: number[]): number[] {
    return this.strategy.sort(data);
  }
}

// Use Case:
const data = [3, 1, 4, 1, 5, 9, 2, 6, 5];
const bubbleSorter = new Sorter(new BubbleSort());
console.log("Bubble Sort:", bubbleSorter.sort(data));

const quickSorter = new Sorter(new QuickSort());
console.log("Quick Sort:", quickSorter.sort(data));
