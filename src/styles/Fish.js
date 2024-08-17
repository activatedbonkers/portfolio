import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger, MotionPathPlugin } from 'gsap/all';
import './fish.scss';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const Fish = () => {
  useEffect(() => {
    const rx = window.innerWidth < 1000 ? window.innerWidth / 1200 : 1;
    const ry = window.innerHeight < 700 ? window.innerHeight / 1200 : 1;

    const path = [
      { x: 800, y: 200 },
      { x: 900, y: 20 },
      { x: 1100, y: 100 },
      { x: 1000, y: 200 },
      { x: 900, y: 20 },
      { x: 10, y: 500 },
      { x: 100, y: 300 },
      { x: 500, y: 400 },
      { x: 1000, y: 200 },
      { x: 1100, y: 300 },
      { x: 400, y: 400 },
      { x: 200, y: 250 },
      { x: 100, y: 300 },
      { x: 500, y: 450 },
      { x: 1100, y: 500 },
    ];

    const scaledPath = path.map(({ x, y }) => ({
      x: x * rx,
      y: y * ry,
    }));

    const fish = document.querySelector('.fish');
    const fishHeadAndBody = [
      ...document.querySelectorAll('.fish__head'),
      ...document.querySelectorAll('.fish__body'),
    ];
    const lights = [...document.querySelectorAll('[data-lights]')];

    // Define the bubbles animation timeline
    const bubbles = gsap.timeline({ paused: true });
    bubbles
      .set('.bubbles__bubble', { y: 100, scale: 1, opacity: 0 })
      .to('.bubbles__bubble', { scale: 1.2, y: -300, opacity: 1, duration: 2, stagger: 0.2 })
      .to('.bubbles__bubble', { scale: 1, opacity: 0, duration: 1 }, '-=1');

    // Timeline for fish motion
    const tl = gsap.timeline({ scrollTrigger: { scrub: 1.5 } });
    tl.to(fish, {
      motionPath: {
        path: scaledPath,
        align: 'self',
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
      },
      duration: 10,
      immediateRender: true,
    })
      .to('.indicator', { opacity: 0 }, 0)
      .to(fish, { rotateX: 180 }, 1)
      .to(fish, { rotateX: 0 }, 2.5)
      .to(fish, { z: -500, duration: 2 }, 2.5)
      .to(fish, { rotateX: 180 }, 4)
      .to(fish, { rotateX: 0 }, 5.5)
      .to(fish, { z: -50, duration: 2 }, 5)
      .to(fish, { rotate: 0, duration: 1 }, '-=1')
      .to('.fish__skeleton', { opacity: 0.6, duration: 0.1, repeat: 4 }, '-=3')
      .to(fishHeadAndBody, { opacity: 0, duration: 0.1, repeat: 4 }, '-=3')
      .to('.fish__inner', { opacity: 0.1, duration: 1 }, '-=1')
      .to('.fish__skeleton', { opacity: 0.1, duration: 1 }, '-=1')
      .pause();

    // Timeline for lights animation
    const lightsTl = gsap.timeline({ scrollTrigger: { scrub: 6 } });
    lightsTl
      .from(
        lights[0],
        { x: window.innerWidth * -1, y: window.innerHeight, ease: 'power4.out', duration: 80 },
        0,
      )
      .to(
        lights[0],
        { x: window.innerWidth, y: window.innerHeight * -1, ease: 'power4.out', duration: 80 },
        '-=5',
      );

    // ScrollTrigger for bubbles
    ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: self => {
        const progress = self.progress;
        if (progress > 0) {
          if (bubbles.paused()) {
            bubbles.restart();
          }
          gsap.to('.bubbles', { opacity: 1 });
        } else {
          gsap.to('.bubbles', { opacity: 1 });
        }
      },
    });

    const rotateFish = self => {
      if (self.direction === -1) {
        gsap.to(fish, { rotationY: 180, duration: 0.4 });
      } else {
        gsap.to(fish, { rotationY: 0, duration: 0.4 });
      }
    };

    const hideText = p => {
      gsap.to(p, { opacity: 0, duration: 1 });
    };

    const sections = [...document.querySelectorAll('section')];
    sections.forEach((section, i) => {
      const p = section.querySelector('p');
      gsap.to(p, { opacity: 0 });

      ScrollTrigger.create({
        trigger: '.fish-wrapper',
        start: 'top top',
        onEnterBack: () => {
          if (i <= 6) {
            gsap.to('.bubbles', { opacity: 1 });
          }
        },
        onLeave: () => {
          hideText(p);
          if (i === 0) {
            gsap.to('.rays', {
              opacity: 0,
              y: -500,
              duration: 8,
              ease: 'power4.in',
            });
          }
        },
        onLeaveBack: () => hideText(p),
        onUpdate: self => rotateFish(self),
      });
    });
  }, []);

  return (
    <div>
      <div className="fish-wrapper">
        <div className="fish">
          <div className="fish__skeleton"></div>
          <div className="fish__inner">
            <div className="fish__body"></div>
            <div className="fish__body"></div>
            <div className="fish__body"></div>
            <div className="fish__body"></div>
            <div className="fish__head"></div>
            <div className="fish__head fish__head--2"></div>
            <div className="fish__head fish__head--3"></div>
            <div className="fish__head fish__head--4"></div>
            <div className="fish__tail-main"></div>
            <div className="fish__tail-fork"></div>
            <div className="fish__fin"></div>
            <div className="fish__fin fish__fin--2"></div>
          </div>
        </div>
      </div>

      <div className="bubbles">
        <div className="bubbles__inner">
          <div className="bubbles__bubble"></div>
          <div className="bubbles__bubble"></div>
          <div className="bubbles__bubble"></div>
          <div className="bubbles__bubble"></div>
        </div>
      </div>

      <div className="lights">
        <div className="lights__group" data-lights="1">
          <div className="lights__light"></div>
          <div className="lights__light"></div>
          <div className="lights__light"></div>
          <div className="lights__light"></div>
          <div className="lights__light"></div>
          <div className="lights__light"></div>
          <div className="lights__light"></div>
          <div className="lights__light"></div>
          <div className="lights__light"></div>
          <div className="lights__light"></div>
          <div className="lights__light"></div>
          <div className="lights__light"></div>
          <div className="lights__light"></div>
          <div className="lights__light"></div>
          <div className="lights__light"></div>
          <div className="lights__light"></div>
        </div>
      </div>
    </div>
  );
};

export default Fish;
