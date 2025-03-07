class StepCounterModel {
  private motionCount: number;
  private caloriesBurned: number;
  private lastStepTime: number;
  private countingActive: boolean;

  constructor() {
    this.motionCount = 0;
    this.caloriesBurned = 0;
    this.lastStepTime = Date.now();
    this.countingActive = false;
  }

  incrementStep() {
    this.motionCount += 2;
    this.updateCaloriesBurned(0.04 * 2);
  }

  private updateCaloriesBurned(calories: number) {
    this.caloriesBurned += calories;
  }

  reset() {
    this.motionCount = 0;
    this.caloriesBurned = 0;
    this.lastStepTime = Date.now();
  }

  toggleCounting() {
    this.countingActive = !this.countingActive;
  }

  isCountingActive() {
    return this.countingActive;
  }

  getMotionCount() {
    return this.motionCount;
  }

  getCaloriesBurned() {
    return this.caloriesBurned;
  }

  getLastStepTime() {
    return this.lastStepTime;
  }

  updateLastStepTime(time: number) {
    this.lastStepTime = time;
  }
}

export default StepCounterModel; 