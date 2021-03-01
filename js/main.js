'use strict'

let loading = document.querySelector('.loading')
let nav;

const delay = (n) => {
  n = n || 2000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });

}

const pageTransition = () => {
  let tl = gsap.timeline();
  tl.to(".loading-screen", {
    duration: 1.2,
    width: "100%",
    left: "0%",
    ease: "Expo.easeInOut",
  });

  tl.to(".loading-screen", {
    duration: 1,
    width: "100%",
    left: "100%",
    ease: "Expo.easeInOut",
    delay: 0.3,
  });
  tl.set(".loading-screen", { left: "-100%" });
}

const contentAnimation = () => {
  setTimeout(() => {
    document.querySelector('.left-name').classList.add('left-name-show')
  }, 200)
  setTimeout(() => {
    document.querySelector('.left-title').classList.add('left-title-show')
  }, 1000)

  let tl = gsap.timeline();
  tl.from('.left', { duration: 1.5, translateY: 50, opacity: 0 })
  tl.to('.right img', { clipPath: "polygon(0 0 , 100% 0 ,100% 100%,  0% 100%)" }, "-=1.1")
  tl.to('.hoverables', { duration: 1.5, translateY: 50, opacity: 1 })

}

window.onload = () => {
  barba.init({
    transitions: [{
      async leave(data) {
        const done = this.async();
        pageTransitionIn()
        await delay(1500)
        data.current.container.remove()
        done()
      },

      async enter(data) {
        contentAnimation();
      },

      async once(data) {
        contentAnimation();
        const $bigBall = document.querySelector('.cursor__ball--big');
        const $smallBall = document.querySelector('.cursor__ball--small');
        const $hoverables = document.querySelectorAll('.hoverable');
    
        // Listeners
        document.body.addEventListener('mousemove', onMouseMove);
        for (let i = 0; i < $hoverables.length; i++) {
            $hoverables[i].addEventListener('mouseenter', onMouseHover);
            $hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
        }
    
        // Move the cursor
        function onMouseMove(e) {
            TweenMax.to($bigBall, .4, {
                x: e.pageX - 15,
                y: e.pageY - 15
            })
            TweenMax.to($smallBall, .1, {
                x: e.pageX - 5,
                y: e.pageY - 7
            })
        }
    
        // Hover an element
        function onMouseHover() {
            TweenMax.to($bigBall, .3, {
                scale: 4
            })
        }
        function onMouseHoverOut() {
            TweenMax.to($bigBall, .3, {
                scale: 1
            })
        }
      }
    }]
  });
}


