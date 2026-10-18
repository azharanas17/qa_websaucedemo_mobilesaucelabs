import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { MobileWorld } from './world';

setDefaultTimeout(120000);

Before({ tags: '@mobile' }, async function (this: MobileWorld) {
  await this.initDriver();
});

After({ tags: '@mobile' }, async function (this: MobileWorld) {
  await this.quitDriver();
});
