import { Page, Locator } from 'playwright';

export class LoginPage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(private readonly page: Page) {
    this.usernameInput = page.locator('input[name="user-name"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async open(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/');
  }

 
async login(username: string, password: string): Promise<void> {
  await this.usernameInput.fill(username);
  await this.passwordInput.fill(password);
  await this.loginButton.click();
}


  async getErrorMessage(): Promise<string> {
    return (await this.errorMessage.textContent())?.trim() ?? '';
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }
}
