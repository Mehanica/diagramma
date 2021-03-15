import { initAnimation } from './modules/init-animation';
import {ieFix} from './utils/ie-fix';
import {iosVhFix} from './utils/ios-vh-fix';


import {setAnimation} from './modules/init-animation';

// Utils
// ---------------------------------

ieFix();
iosVhFix();

// Modules
// ---------------------------------

setAnimation();
