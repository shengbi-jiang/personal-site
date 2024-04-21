type Subscriber = (milliseconds: number) => void;

export default class TickProvider {
  private readonly subscribers: Subscriber[] = [];
  private intervalId: number | null = null;
  private previousTime: Date = new Date();

  private tick = () => {
    const nowTime = new Date();
    const elapsed = nowTime.getTime() - this.previousTime.getTime();
    this.subscribers.forEach((sub) => sub(elapsed));
    this.previousTime = nowTime;
  };

  public start(): void {
    if (this.intervalId) {
      return;
    }
    this.previousTime = new Date();
    this.intervalId = setInterval(this.tick as TimerHandler, 1);
  }

  public stop(): void {
    if (!this.intervalId) {
      return;
    }
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  public subscribe(subscriber: Subscriber): void {
    this.subscribers.push(subscriber);
  }

  public unsubscribe(subscriber: Subscriber): void {
    const index = this.subscribers.findIndex((sub) => sub === subscriber);
    if (!index) {
      return;
    }
    this.subscribers.splice(index, 1);
  }
}
