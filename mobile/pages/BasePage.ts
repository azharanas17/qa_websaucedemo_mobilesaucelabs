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
    await this.driver.execute('mobile: swipeGesture', {
      left: Math.floor(width * 0.1),
      top: Math.floor(height * 0.6),
      width: Math.floor(width * 0.8),
      height: Math.floor(height * 0.25),
      direction: 'up',
      percent: 1.0,
      speed: 150,
    });
  }

  protected async scrollIntoView(
    selector: string,
    opts: { maxScrolls?: number; delayMs?: number; settleTimeoutMs?: number } = {}
  ): Promise<void> {
    const { maxScrolls = 4, delayMs = 500, settleTimeoutMs = 3000 } = opts;
    let lastState = 'was not checked';
    let swipeError: Error | undefined;

    for (let scroll = 0; scroll <= maxScrolls; scroll += 1) {
      const element = await this.driver.$(selector);
      const exists = await element.isExisting().catch(() => false);
      if (exists) {
        const displayed = await element.isDisplayed().catch(() => false);
        lastState = displayed
          ? 'exists and is displayed'
          : 'exists but is not displayed';
        if (displayed) {
          return;
        }
      } else {
        lastState = 'is not present in the accessibility hierarchy';
      }

      if (scroll === maxScrolls) {
        break;
      }

      try {
        await this.swipeUp();
      } catch (error) {
        swipeError = error as Error;
        break;
      }

      await this.driver.pause(delayMs);
      await element.waitForExist({ timeout: settleTimeoutMs }).catch(() => undefined);
    }

    throw new Error(
      `Could not scroll ${selector} into view after up to ${maxScrolls} swipe(s); ` +
        `element ${lastState}` +
        (swipeError ? `; swipe failed: ${swipeError.message}` : '')
    );
  }

  protected async hideKeyboardIfVisible(): Promise<void> {
    const shown = await this.driver.execute('mobile: isKeyboardShown').catch(() => false);
    if (shown) {
      await this.driver.execute('mobile: hideKeyboard').catch(() => undefined);
      await this.driver.pause(300);
    }
  }

  protected async tapWhenVisible(selector: string, timeoutMs = 10000): Promise<void> {
    await this.scrollIntoView(selector, {
      maxScrolls: Math.max(1, Math.round(timeoutMs / 2500)),
    });
    const element = await this.driver.$(selector);
    await element.click();
  }
}
