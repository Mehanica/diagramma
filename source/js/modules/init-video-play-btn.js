const videos = document.querySelectorAll('.video__container');
const circlePlayButton = document.querySelector('.video__play-btn');

const breakpoint = window.matchMedia('(max-width: 1023px)');


const initVideoPlayBtn = () => {
  if (videos.length) {
    videos.forEach((video) => {
      const breakpointChecker = () => {
        if (breakpoint.matches) {
          video.poster = 'img/bg/video-bg-mob.jpg';
        } else {
          video.poster = 'img/bg/video-bg.jpg';
        }
      };

      if (breakpoint.matches) {
        breakpointChecker();
      }
      breakpoint.addListener(breakpointChecker);

      const playBtnHandler = () => {

        if (video.paused || video.ended) {
          video.play();
          video.controls = true;
        } else {
          video.pause();
          video.controls = false;
        }

        circlePlayButton.removeEventListener('click', playBtnHandler);
      };

      circlePlayButton.addEventListener('click', playBtnHandler);

      video.addEventListener('playing', function () {
        circlePlayButton.style.opacity = 0;
        video.parentElement.querySelector('.video__overlay').style.display = 'none';
      });
      video.addEventListener('pause', function () {
        circlePlayButton.style.opacity = 1;
        video.parentElement.querySelector('.video__overlay').style.display = 'block';

        circlePlayButton.addEventListener('click', playBtnHandler);
      });
    });
  }
};

export {initVideoPlayBtn};
