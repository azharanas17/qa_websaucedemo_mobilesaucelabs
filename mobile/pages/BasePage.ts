import type { Browser, Element } from 'webdriverio';

export class BasePage {
  constructor(protected driver: any) {}

  async waitForCondition(
    condition: () => Promise<boolean>,
    timeoutMs = 20000
  ): Promise<void> {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      if (await condition()) {
        return;
      }
      await this.driver.pause(250);
    }
    throw new Error(`Condition not met within ${timeoutMs}ms`);
  }

  protected async swipeUp(): Promise<void> {
    const { width, height } = await this.driver.getWindowSize();
    await this.driver.execute('mobile: swipe', {
      left: Math.floor(width * 0.2),
      top: Math.floor(height * 0.6),
      width: Math.floor(width * 0.6),
      height: Math.floor(height * 0.3),
      direction: 'up',
      percent: 1.0,
    });
  }

  protected async tapWhenVisible(selector: string, timeoutMs = 10000): Promise<void> {
    const el = await this.driver.$(selector);
    await el.waitForExist({ timeout: timeoutMs });
    if (!(await el.isDisplayed().catch(() => false))) {
      await this.swipeUp();
      await this.driver.pause(500);
    }
    await el.click();
  }
}
