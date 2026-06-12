document.addEventListener('DOMContentLoaded', () => {
  // Video crossfade logic
  const videos = document.querySelectorAll('.fv-video');
  let currentIndex = 0;

  if (videos.length > 0) {
    videos[0].play().catch(err => {
      console.log('Autoplay was prevented', err);
    });

    setInterval(() => {
      const currentVideo = videos[currentIndex];
      currentVideo.classList.remove('active');
      
      currentIndex = (currentIndex + 1) % videos.length;
      const nextVideo = videos[currentIndex];
      
      nextVideo.classList.add('active');
      nextVideo.currentTime = 0;
      nextVideo.play().catch(err => {
        console.log('Play failed', err);
      });

      // Pause the previous video after the fade transition completes (1.5s) to save resources
      setTimeout(() => {
        currentVideo.pause();
      }, 1500);
    }, 4000);
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
