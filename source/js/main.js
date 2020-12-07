import {ieFix} from './utils/ie-fix';
import {iosVhFix} from './utils/ios-vh-fix';

import {initModals} from './modules/init-modals';
import {initMenu} from './modules/init-menu';
import {initVideoPlayBtn} from './modules/init-video-play-btn';
import moveToAnchor from './modules/move-to-anchor';

// Header
import {fixHeader} from './modules/header/fix-header';

// Animation
import {initAnimation} from './modules/animation/init-animation';

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

// Header
fixHeader();

// Animation
initAnimation();

// Map
initMap();
