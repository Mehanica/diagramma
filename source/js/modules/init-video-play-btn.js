const videos = document.querySelectorAll('.video__container');
const circlePlayButton = document.querySelector('.video__play-btn');


const initVideoPlayBtn = () => {
  if (videos.length) {
    videos.forEach((video) => {
      circlePlayButton.addEventListener('click', () => {
        if (video.paused || video.ended) {
          video.play();
        } else {
          video.pause();
        }
      });
      video.addEventListener('playing', function () {
        circlePlayButton.style.opacity = 0;
        video.controls = true;
        video.parentElement.querySelector('.video__overlay').style="display: none";
      });
      video.addEventListener('pause', function () {
        circlePlayButton.style.opacity = 1;
        video.controls = false;
        video.parentElement.querySelector('.video__overlay').style="display: block";
      });
    })
  }
}

export {initVideoPlayBtn};
