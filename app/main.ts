// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { registerElement } from 'nativescript-angular/element-registry';

import { AppModule } from "./app.module";

registerElement('VideoPlayer', () => {return require('nativescript-videoplayer').Video;});
registerElement('SlideContainer', () => {return require('nativescript-slides').SlideContainer;});
registerElement('Slide', () => {return require('nativescript-slides').Slide;});
platformNativeScriptDynamic().bootstrapModule(AppModule);