(() => {
  // Subject Interface
  interface Subject {
    request(): void;
  }

  // Real Subject
  class RealSubject implements Subject {
    request(): void {
      console.log("RealSubject: Handling request.");
    }
  }

  // Proxy
  class Proxy implements Subject {
    private realSubject: RealSubject;

    constructor(realSubject: RealSubject) {
      this.realSubject = realSubject;
    }

    request(): void {
      if (this.checkAccess()) {
        this.realSubject.request();
        this.logAccess();
      } else {
        console.log("Proxy: Access denied.");
      }
    }

    private checkAccess(): boolean {
      // Simulate access check logic
      return Math.random() < 0.5;
    }

    private logAccess(): void {
      console.log("Proxy: Logging access.");
    }
  }

  // Use Case:
  const realSubject = new RealSubject();
  const proxy = new Proxy(realSubject);

  // Client interacts with the proxy
  proxy.request();
})();
