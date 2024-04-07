// State interface
interface TrafficLightState {
  changeState(trafficLight: TrafficLight): void;
}

// Concrete States
class RedState implements TrafficLightState {
  changeState(trafficLight: TrafficLight): void {
    console.log("Changing state from Red to Green");
    trafficLight.setState(new GreenState());
  }
}

class YellowState implements TrafficLightState {
  changeState(trafficLight: TrafficLight): void {
    console.log("Changing state from Yellow to Red");
    trafficLight.setState(new RedState());
  }
}

class GreenState implements TrafficLightState {
  changeState(trafficLight: TrafficLight): void {
    console.log("Changing state from Green to Yellow");
    trafficLight.setState(new YellowState());
  }
}

// Context
class TrafficLight {
  private state: TrafficLightState;

  constructor() {
    this.state = new RedState(); // Initial state is Red
  }

  setState(state: TrafficLightState): void {
    this.state = state;
  }

  requestStateChange(): void {
    this.state.changeState(this);
  }
}

// Usage
const trafficLight = new TrafficLight();
trafficLight.requestStateChange(); // Change state from Red to Green
trafficLight.requestStateChange(); // Change state from Green to Yellow
trafficLight.requestStateChange(); // Change state from Yellow to Red
