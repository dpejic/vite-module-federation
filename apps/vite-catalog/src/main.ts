import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { Injector } from '@angular/core';

import './styles.css';

bootstrapApplication(AppComponent, appConfig).then(() => {
  const catalogSelectorElement = createCustomElement(AppComponent, {
    injector: Injector.create({ providers: [] }),
  });
  customElements.define('catalog-element', catalogSelectorElement);
});
