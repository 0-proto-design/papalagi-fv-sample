document.addEventListener('DOMContentLoaded', () => {
  // Seamless video loop logic
  const bgVideos = document.querySelectorAll('.fv-bg-video');
  if (bgVideos.length > 1) {
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
        bgVideos.forEach(vid => {
          vid.src = currentVideoSrc;
          vid.poster = newPosterSrc;
          vid.load();
          if (vid.classList.contains('active')) {
            vid.play().catch(err => console.log('Play prevented on resize', err));
          }
        });
      }
    };

    updateVideoSource();
    window.addEventListener('resize', updateVideoSource);

    let isTransitioning = false;
    const fadeDuration = 0.5; // フェード時間を0.5秒に短縮して動画を最後まで再生させる

    bgVideos[0].classList.add('active', 'zoom-start');
    bgVideos[0].play().catch(err => console.log('Autoplay prevented', err));

    bgVideos.forEach((vid, idx) => {
      // Loop crossfade
      vid.addEventListener('timeupdate', function() {
        // 動画の終了0.5秒前（10秒動画の場合は9.5秒時点）から次の動画へフェードインを開始する
        if (!isTransitioning && this.duration && this.currentTime >= this.duration - fadeDuration && this.classList.contains('active')) {
          isTransitioning = true;
          const nextIdx = (idx + 1) % bgVideos.length;
          const nextVid = bgVideos[nextIdx];
          
          nextVid.currentTime = 0;
          
          // 新しいビデオを前面に配置
          nextVid.style.zIndex = '2';
          this.style.zIndex = '1';

          nextVid.play().then(() => {
            nextVid.classList.add('active');
            
            // CSSのトランジション（0.5秒）完了後に、古いビデオのactiveクラスを外して一時停止する
            setTimeout(() => {
              this.classList.remove('active');
              this.classList.remove('zoom-start');
              this.pause();
              isTransitioning = false;
            }, fadeDuration * 1000);
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
