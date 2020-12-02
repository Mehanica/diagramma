import {ieFix} from './utils/ie-fix';
import {iosVhFix} from './utils/ios-vh-fix';

import {initModals} from './modules/init-modals';
import {initMenu} from './modules/init-menu';
import {initVideoPlayBtn} from './modules/init-video-play-btn';
import moveToAnchor from './modules/move-to-anchor';

// Sliders
import {initRecipesSlider} from './modules/slider/init-recipes-slider';

// Animation


// Map
import {initMap} from './modules/map/init-map';

// Utils
// ---------------------------------

ieFix();
iosVhFix();

// Modules
// ---------------------------------

initModals();
initMenu();
initVideoPlayBtn();
moveToAnchor();

// Sliders
initRecipesSlider();

// Animation

// Map
initMap();
