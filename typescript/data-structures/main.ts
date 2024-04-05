import { BinarySearchTree } from "./binary-search-tree";
import { LinkedList } from "./linked-list";
import { Queue } from "./queue";
import { Stack } from "./stack";

const stack = new Stack<number>();
stack.push(1);
stack.push(2);
stack.push(3);
console.log("stack.peek()", stack.peek()); // 3

stack.pop();
console.log("stack.peek()", stack.peek()); // 2

const binarySearchTree = new BinarySearchTree<number>();
binarySearchTree.insert(11);
binarySearchTree.insert(7);
binarySearchTree.insert(15);
binarySearchTree.insert(5);
binarySearchTree.insert(3);
binarySearchTree.insert(9);
console.log("binarySearchTree.search(9)", binarySearchTree.search(9)); // true
console.log("binarySearchTree.search(50)", binarySearchTree.search(50)); // false

const queue = new Queue<string>();

// Enqueue elements into the queue
queue.enqueue("apple");
queue.enqueue("banana");
queue.enqueue("orange");

// Dequeue elements from the queue
console.log("queue.dequeue()", queue.dequeue());
console.log("queue.dequeue()", queue.dequeue());

// Get the front element of the queue
console.log("queue.front()", queue.front());

// Check if the queue is empty
console.log("queue.isEmpty()", queue.isEmpty());

// Get the size of the queue
console.log("queue.size()", queue.size());

const linkedList = new LinkedList<number>();

// Append elements to the linked list
linkedList.append(10);
linkedList.append(20);
linkedList.append(30);

// Print the elements of the linked list
linkedList.print(); // Output: 10, 20, 30

// Check if the linked list is empty
console.log("linkedList.isEmpty()", linkedList.isEmpty());

// Get the size of the linked list
console.log("linkedList.getSize()", linkedList.getSize());
