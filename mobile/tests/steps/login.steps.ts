import { Given, When, Then } from '@cucumber/cucumber';
import { MobileWorld } from '../world';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import assert from 'assert';

Given('I am on the mobile login screen', async function (this: MobileWorld) {
  const loginPage = new LoginPage(this.driver);
  const displayed = await loginPage.isDisplayed();
  assert(displayed, 'Login screen should be displayed');
});

When(
  'I login with username {string} and password {string}',
  async function (this: MobileWorld, username: string, password: string) {
    const loginPage = new LoginPage(this.driver);
    await loginPage.login(username, password);
  }
);

Then('I should see the products screen', async function (this: MobileWorld) {
  const inventoryPage = new InventoryPage(this.driver);
  const displayed = await inventoryPage.isDisplayed();
  assert(displayed, 'Products screen should be displayed');
});

Then(
  'I should see the mobile login error {string}',
  async function (this: MobileWorld, expected: string) {
    const loginPage = new LoginPage(this.driver);
    const actual = await loginPage.getErrorMessage();
    assert.strictEqual(actual, expected, `Expected login error "${expected}" but got "${actual}"`);
  }
);
