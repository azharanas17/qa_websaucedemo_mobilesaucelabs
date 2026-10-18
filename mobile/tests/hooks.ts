import { After, Before, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { MobileWorld } from './world';

setDefaultTimeout(120000);

Before({ tags: '@mobile' }, async function (this: MobileWorld) {
  await this.initDriver();
});

After({ tags: '@mobile' }, async function (this: MobileWorld, { result }) {
  if (result?.status === Status.FAILED) {
    try {
      const screenshot = await this.driver.takeScreenshot();
      await this.attach(Buffer.from(screenshot, 'base64'), {
        mediaType: 'image/png',
        fileName: 'failure.png',
      });
    } catch (error) {
      console.warn('Could not capture failure screenshot:', (error as Error).message);
    }
    try {
      const pageSource = await this.driver.getPageSource();
      await this.attach(pageSource, {
        mediaType: 'text/xml',
        fileName: 'failure-page-source.xml',
      });
    } catch (error) {
      console.warn('Could not capture page source:', (error as Error).message);
    }
  }
  await this.quitDriver();
});
