import { Page, Locator } from 'playwright';

export class CheckoutPage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;
  readonly summarySubtotal: Locator;
  readonly summaryTax: Locator;
  readonly summaryTotal: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;
  readonly completeText: Locator;

  constructor(private readonly page: Page) {
    this.firstName = page.locator('#first-name');
    this.lastName = page.locator('#last-name');
    this.postalCode = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.cancelButton = page.locator('#cancel');
    this.errorMessage = page.locator('[data-test="error"]');
    this.summarySubtotal = page.locator('.summary_subtotal_label');
    this.summaryTax = page.locator('.summary_tax_label');
    this.summaryTotal = page.locator('.summary_total_label');
    this.finishButton = page.locator('#finish');
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
  }

  async fillInfo(first: string, last: string, zip: string): Promise<void> {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(zip);
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async getError(): Promise<string> {
    if (await this.errorMessage.count() === 0) return '';
    return (await this.errorMessage.textContent())?.trim() ?? '';
  }

  async getSubtotal(): Promise<string> {
    return (await this.summarySubtotal.textContent())?.trim() ?? '';
  }

  async getTax(): Promise<string> {
    return (await this.summaryTax.textContent())?.trim() ?? '';
  }

  async getTotal(): Promise<string> {
    return (await this.summaryTotal.textContent())?.trim() ?? '';
  }

  async isOnStep1(): Promise<boolean> {
    return this.page.url().includes('/checkout-step-one');
  }

  async isOnStep2(): Promise<boolean> {
    return this.page.url().includes('/checkout-step-two');
  }

  async isOnComplete(): Promise<boolean> {
    return this.page.url().includes('/checkout-complete');
  }

  async getCompleteHeader(): Promise<string> {
    return (await this.completeHeader.textContent())?.trim() ?? '';
  }

  async getCompleteText(): Promise<string> {
    return (await this.completeText.textContent())?.trim() ?? '';
  }
}
