const createStateMachine = () => {
  const mapping: Record<string, string> = {
    A: 'B',
    B: 'C',
    C: 'A',
  };

  let state: string = 'A';

  return {
    getText() {
      return `Current: ${state}`;
    },
    next() {
      state = mapping[state];
    },
  };
};

class Main {
  private readonly interval = 3000;
  private intervalId: number = 0;

  execute(element: HTMLDivElement) {
    const stateMachine = createStateMachine();
    const timerHandler = this.createTimerHandler(element, stateMachine);
    element.innerHTML = stateMachine.getText();
    this.intervalId = setInterval(timerHandler, this.interval);
  }

  private createTimerHandler(
    element: HTMLDivElement,
    stateMachine: ReturnType<typeof createStateMachine>
  ): TimerHandler {
    return () => {
      stateMachine.next();
      element.innerHTML = stateMachine.getText();
    };
  }

  cleanUp() {
    clearInterval(this.intervalId);
  }
}

export default Main;
