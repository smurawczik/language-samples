class Graph {
  vertices: Map<string, string[]>;

  constructor() {
    this.vertices = new Map();
  }

  addVertex(vertex: string): void {
    if (!this.vertices.has(vertex)) {
      this.vertices.set(vertex, []);
    }
  }

  addEdge(vertex1: string, vertex2: string): void {
    this.vertices.get(vertex1)?.push(vertex2);
    this.vertices.get(vertex2)?.push(vertex1);
  }

  getAdjacentVertices(vertex: string): string[] {
    return this.vertices.get(vertex) || [];
  }
}

// Create a new social network graph
const socialNetwork = new Graph();

// Add users as vertices
const users = ["Alice", "Bob", "Charlie", "David", "Eve"];
for (let user of users) {
  socialNetwork.addVertex(user);
}

// Add friendships as edges
socialNetwork.addEdge("Alice", "Bob");
socialNetwork.addEdge("Alice", "Charlie");
socialNetwork.addEdge("Bob", "David");
socialNetwork.addEdge("Charlie", "Eve");

// Find friends of a user
function findFriends(username: string): string[] {
  return socialNetwork.getAdjacentVertices(username);
}

// Example usage
const username = "Alice";
console.log(`Friends of ${username}:`, findFriends(username));
