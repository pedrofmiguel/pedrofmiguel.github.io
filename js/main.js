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
  tl.to('img', { clipPath: "polygon(0 0 , 100% 0 ,100% 100%,  0% 100%)" }, "-=1.1")
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
      }
    }]
  });
}


