document.addEventListener('DOMContentLoaded', () => {
  // Responsive background video logic
  const bgVideo = document.querySelector('.fv-bg-video');
  if (bgVideo) {
    let currentVideoSrc = '';
    const updateVideoSource = () => {
      let newVideoSrc = 'img/fv-bg-pc.mov';
      let newPosterSrc = 'img/fv-bg-pc-poster.png';
      const width = window.innerWidth;
      if (width <= 767) {
        newVideoSrc = 'img/fv-bg-sp.mov';
        newPosterSrc = 'img/fv-bg-sp-poster.png';
      } else if (width <= 1024) {
        newVideoSrc = 'img/fv-bg-tab.mov';
        newPosterSrc = 'img/fv-bg-tab-poster.png';
      }
      
      if (currentVideoSrc !== newVideoSrc) {
        currentVideoSrc = newVideoSrc;
        bgVideo.src = currentVideoSrc;
        bgVideo.poster = newPosterSrc;
        bgVideo.load();
        bgVideo.play().catch(err => console.log('Play prevented on resize', err));
      }
    };

    updateVideoSource();
    window.addEventListener('resize', updateVideoSource);
    
    bgVideo.play().catch(err => console.log('Autoplay prevented', err));
  }


  // Pattern 2 Scroll Header logic
  const isPattern2 = document.body.classList.contains('page-pattern-2');
  if (isPattern2) {
    const header = document.querySelector('.header');
    const fv = document.querySelector('.fv');
    
    if (header && fv) {
      const handleScroll = () => {
        const fvHeight = fv.offsetHeight;
        // FVを通り越した位置にスクロールすると表示される
        if (window.scrollY > fvHeight) {
          header.classList.add('is-show');
        } else {
          header.classList.remove('is-show');
        }
      };
      
      window.addEventListener('scroll', handleScroll);
      // 初期化時にもチェック
      handleScroll();
    }
  }
});
