import { setWorldConstructor, World } from '@cucumber/cucumber';
import { remote } from 'webdriverio';

const APP_PACKAGE = 'com.swaglabsmobileapp';
const APP_ACTIVITY = 'com.swaglabsmobileapp.MainActivity';

export class MobileWorld extends World {
  public driver!: any;

  constructor(options: any) {
    super(options);
  }

  async initDriver(): Promise<void> {
    const opts: any = {
      hostname: '127.0.0.1',
      port: 4723,
      path: '/',
      capabilities: {
        platformName: 'Android',
        'appium:deviceName': 'Android Emulator',
        'appium:automationName': 'UiAutomator2',
        'appium:appPackage': APP_PACKAGE,
        'appium:appActivity': APP_ACTIVITY,
        'appium:noReset': false,
        'appium:fullReset': false,
        'appium:autoGrantPermissions': true,
        'appium:newCommandTimeout': 120,
        'appium:adbExecTimeout': 60000,
        'appium:appWaitDuration': 30000,
        'appium:uiautomator2ServerLaunchTimeout': 60000,
        'appium:uiautomator2ServerInstallTimeout': 60000,
        'appium:waitForIdleTimeout': 0,
      } as any,
      logLevel: 'error' as const,
      connectionRetryTimeout: 120000,
    };
    this.driver = await remote(opts);
  }

  async quitDriver(): Promise<void> {
    if (this.driver) {
      try {
        await this.driver.deleteSession();
      } catch (e) {
        // ignore cleanup errors
      }
      this.driver = undefined as any;
    }
  }
}

setWorldConstructor(MobileWorld);
