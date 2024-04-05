export class TreeNode<T> {
  data: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;

  constructor(data: T) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export class BinarySearchTree<T> {
  private root: TreeNode<T> | null;

  constructor() {
    this.root = null;
  }

  insert(data: T): void {
    const newNode = new TreeNode(data);
    if (!this.root) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  private insertNode(node: TreeNode<T>, newNode: TreeNode<T>): void {
    if (newNode.data < node.data) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  search(data: T): boolean {
    return this.searchNode(this.root, data);
  }

  private searchNode(node: TreeNode<T> | null, data: T): boolean {
    if (!node) {
      return false;
    }

    if (data < node.data) {
      return this.searchNode(node.left, data);
    } else if (data > node.data) {
      return this.searchNode(node.right, data);
    } else {
      return true;
    }
  }
}
