export class Graph<T> {
  private vertices: Map<T, T[]>;

  constructor() {
    this.vertices = new Map();
  }

  addVertex(vertex: T): void {
    if (!this.vertices.has(vertex)) {
      this.vertices.set(vertex, []);
    }
  }

  addEdge(vertex1: T, vertex2: T): void {
    if (!this.vertices.has(vertex1)) {
      this.addVertex(vertex1);
    }
    if (!this.vertices.has(vertex2)) {
      this.addVertex(vertex2);
    }
    this.vertices.get(vertex1)?.push(vertex2);
    this.vertices.get(vertex2)?.push(vertex1);
  }

  getVertices(): IterableIterator<T> {
    return this.vertices.keys();
  }

  getEdges(vertex: T): T[] | undefined {
    return this.vertices.get(vertex);
  }

  hasVertex(vertex: T): boolean {
    return this.vertices.has(vertex);
  }

  hasEdge(vertex1: T, vertex2: T): boolean {
    return Boolean(
      this.vertices.has(vertex1) &&
        this.vertices.get(vertex1)?.includes(vertex2)
    );
  }

  removeVertex(vertex: T): void {
    this.vertices.delete(vertex);
    this.vertices.forEach((adjList, _) => {
      const index = adjList.indexOf(vertex);
      if (index !== -1) {
        adjList.splice(index, 1);
      }
    });
  }

  removeEdge(vertex1: T, vertex2: T): void {
    if (this.vertices.has(vertex1)) {
      const index = this.vertices.get(vertex1)?.indexOf(vertex2);
      if (index && index !== -1) {
        this.vertices.get(vertex1)?.splice(index, 1);
      }
    }
    if (this.vertices.has(vertex2)) {
      const index = this.vertices.get(vertex2)?.indexOf(vertex1);
      if (index && index !== -1) {
        this.vertices.get(vertex2)?.splice(index, 1);
      }
    }
  }
}
