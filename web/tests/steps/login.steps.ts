import { Given, When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'node:assert';
import { CustomWorld } from '../world';

Given('the user is on the login page', async function (this: CustomWorld) {
  await this.loginPage.open();
});

When(
  'the user logs in with username {string} and password {string}',
  async function (this: CustomWorld, username: string, password: string) {
    await this.loginPage.login(username, password);
  },
);

When(
  'the user submits the login form with username {string} and password {string}',
  async function (this: CustomWorld, username: string, password: string) {
    await this.loginPage.login(username, password);
  },
);

Then(
  'the user should be redirected to the inventory page',
  async function (this: CustomWorld) {
    await this.inventoryPage.waitForInventoryLoaded();
    assert.ok(this.page.url().includes('/inventory.html'));
  },
);

Then(
  'the login error message should be {string}',
  async function (this: CustomWorld, expectedMessage: string) {
    assert.equal(await this.loginPage.getErrorMessage(), expectedMessage);
  },
);
