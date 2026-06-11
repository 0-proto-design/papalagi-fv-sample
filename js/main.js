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

  // Bubbles generation logic
  const bubblesContainer = document.getElementById('bubbles-container');
  if (bubblesContainer) {
    function createBubble() {
      const bubble = document.createElement('div');
      bubble.classList.add('bubble');
      
      // Randomize size (5px to 25px)
      const size = 5 + Math.random() * 20;
      // Determine positions based on window width (responsive diver mouth position)
      const isMobile = window.innerWidth <= 768;
      const left = isMobile 
        ? (52 + Math.random() * 4)
        : (72 + Math.random() * 4);
      const bottom = isMobile
        ? (28 + Math.random() * 6)
        : (52 + Math.random() * 6);
      // Randomize animation duration (2s to 5s for a natural rise)
      const duration = 2 + Math.random() * 3;
      
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${left}%`;
      bubble.style.bottom = `${bottom}%`;
      bubble.style.animationDuration = `${duration}s`;
      
      bubblesContainer.appendChild(bubble);
      
      // Remove bubble from DOM after animation completes
      setTimeout(() => {
        bubble.remove();
      }, duration * 1000);
    }

    // Create a new bubble frequently to increase the amount (every 100ms)
    setInterval(createBubble, 100);
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
