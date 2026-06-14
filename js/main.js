document.addEventListener('DOMContentLoaded', () => {
  // Seamless video loop logic
  const bgVideos = document.querySelectorAll('.fv-bg-video');
  if (bgVideos.length > 1) {
    let isTransitioning = false;
    bgVideos[0].classList.add('active');
    bgVideos[0].play().catch(err => console.log('Autoplay prevented', err));

    bgVideos.forEach((vid, idx) => {
      // Loop crossfade
      vid.addEventListener('timeupdate', function() {
        // Start fading into the next video 1.5 seconds before this one ends
        if (!isTransitioning && this.duration && this.currentTime >= this.duration - 1.5 && this.classList.contains('active')) {
          isTransitioning = true;
          const nextIdx = (idx + 1) % bgVideos.length;
          const nextVid = bgVideos[nextIdx];
          
          nextVid.currentTime = 0;
          
          // Put the new video on top
          nextVid.style.zIndex = '2';
          this.style.zIndex = '1';

          nextVid.play().then(() => {
            nextVid.classList.add('active');
            // Do NOT remove 'active' from the current video yet,
            // so it remains fully opaque underneath while the new one fades in.
            
            // Wait for the CSS transition (1.5s) to finish before hiding and pausing the old video
            setTimeout(() => {
              this.classList.remove('active');
              this.pause();
              isTransitioning = false;
            }, 1500);
          }).catch(err => {
            console.log('Play failed', err);
            isTransitioning = false;
          });
        }
      });
    });
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
