import StepCounterModel from './StepCounterModel';

class StepCounterController {
  private model: StepCounterModel;

  constructor() {
    this.model = new StepCounterModel();
  }

  incrementStep() {
    if (this.model.isCountingActive()) {
      this.model.incrementStep();
    }
  }

  resetCounter() {
    this.model.reset();
  }

  toggleCounting() {
    this.model.toggleCounting();
  }

  getMotionCount() {
    return this.model.getMotionCount();
  }

  getCaloriesBurned() {
    return this.model.getCaloriesBurned();
  }

  isCountingActive() {
    return this.model.isCountingActive();
  }

  getLastStepTime() {
    return this.model.getLastStepTime();
  }

  updateLastStepTime(time: number) {
    this.model.updateLastStepTime(time);
  }
}

export default StepCounterController; 