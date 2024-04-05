class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string): void {
    let node = this.root;
    for (let char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    node.isEndOfWord = true;
  }

  search(word: string): boolean {
    let node = this.root;
    for (let char of word) {
      if (!node.children.has(char)) {
        return false;
      }
      node = node.children.get(char)!;
    }
    return node.isEndOfWord;
  }

  startsWith(prefix: string): boolean {
    let node = this.root;
    for (let char of prefix) {
      if (!node.children.has(char)) {
        return false;
      }
      node = node.children.get(char)!;
    }
    return true;
  }
}

const trie = new Trie();

// Insert some words into the Trie
const words = ["apple", "app", "application", "banana", "ball", "bat"];
for (let word of words) {
  trie.insert(word);
}

// Autocomplete function
function autocomplete(prefix: string): string[] {
  let node = trie.root;
  for (let char of prefix) {
    if (!node.children.has(char)) {
      return [];
    }
    node = node.children.get(char)!;
  }
  return findAllWords(node, prefix);
}

// Helper function to find all words starting from a given node
function findAllWords(node: TrieNode, prefix: string): string[] {
  const result: string[] = [];
  if (node.isEndOfWord) {
    result.push(prefix);
  }
  for (let [char, childNode] of node.children) {
    result.push(...findAllWords(childNode, prefix + char));
  }
  return result;
}

// Example usage
const prefix = "app";
console.time(`Autocomplete suggestions for '${prefix}'`);
console.log(`Autocomplete suggestions for '${prefix}':`, autocomplete(prefix));
console.timeEnd(`Autocomplete suggestions for '${prefix}'`);
