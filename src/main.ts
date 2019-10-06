import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { OpspotModule } from './app/app.module';
import { environment } from './environments/environment';
// TODO @debjeet: Is this requires?
// import 'hammerjs';

if (environment.production) {
  enableProdMode();
}


platformBrowserDynamic().bootstrapModule(OpspotModule);
