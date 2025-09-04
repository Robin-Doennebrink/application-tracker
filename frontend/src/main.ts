import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';

registerLocaleData(localeDe);
registerLocaleData(localeEn);


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
