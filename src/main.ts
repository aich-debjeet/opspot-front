import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { OpspotModule } from './app/app.module';
import { environment } from './environments/environment';
import { Session } from './app/services/session';

if (environment.production) {
  enableProdMode();
}

window.Opspot.LoggedIn=new Session().isLoggedIn() ? true : false,

platformBrowserDynamic().bootstrapModule(OpspotModule);
