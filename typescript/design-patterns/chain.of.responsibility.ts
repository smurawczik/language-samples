// Handler Interface
interface Handler {
  handle(request: string): void;
}

// Base Handler
abstract class BaseHandler implements Handler {
  private nextHandler: Handler | null = null;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public handle(request: string): void {
    if (this.nextHandler) {
      this.nextHandler.handle(request);
    } else {
      console.log("No handler found for the request:", request);
    }
  }
}

// Concrete Handler
class ConcreteHandler extends BaseHandler {
  private handlerName: string;

  constructor(handlerName: string) {
    super();
    this.handlerName = handlerName;
  }

  public handle(request: string): void {
    if (request === this.handlerName) {
      console.log(`Handler ${this.handlerName}: Handling request.`);
    } else {
      super.handle(request);
    }
  }
}

// Client
class Client {
  private handlers = new Map<string, Handler>();

  constructor(handlerNames: string[]) {
    this.buildChain(handlerNames);
  }

  private buildChain(handlerNames: string[]): void {
    let prevHandler: Handler | null = null;

    for (const handlerName of handlerNames.reverse()) {
      const handler = new ConcreteHandler(handlerName);
      if (prevHandler) {
        handler.setNext(prevHandler);
      }
      prevHandler = handler;
      this.handlers.set(handlerName, handler);
    }
  }

  public makeRequest(request: string): void {
    const handler = this.handlers.get(request);
    if (this.handlers.size > 0 && handler) {
      handler.handle(request);
    } else {
      console.log("No handlers found.");
    }
  }
}

// Use Case
const handlerNames = ["Handler1", "Handler2", "Handler3"];
const client = new Client(handlerNames);

client.makeRequest("Handler1"); // Output: Handler Handler1: Handling request.
client.makeRequest("Handler2"); // Output: Handler Handler2: Handling request.
client.makeRequest("Handler3"); // Output: Handler Handler3: Handling request.
client.makeRequest("Handler4"); // Output: No handler found for the request: Handler4
