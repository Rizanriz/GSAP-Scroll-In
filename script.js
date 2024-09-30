document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
    const stickySection = document.querySelector(".sticky");
    const totalStickyHeight = window.innerHeight * 4;

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const introParagraphs = document.querySelectorAll(".intro-col p");
    introParagraphs.forEach((paragraph) => {
        const text = paragraph.textContent;
        paragraph.innerHTML = text
            .split(/(\s+)/)
            .map((part) => {
                if (part.trim() === "") {
                    return part;
                } else {
                    return part
                        .split("")
                        .map(
                            (char) =>
                                `<span style="opacity: 0; display: inline-block;">${char}</span>`
                        )
                        .join("");
                }
            })
            .join("");
    });

    function flickerAnimation(targets, toOpacity) {
        gsap.to(targets, {
            opacity: toOpacity,
            duration: 0.05,
            stagger: {
                amount: 0.3,
                from: "random",
            },
        });
    }

    ScrollTrigger.create({
        trigger: stickySection,
        start: "top top",
        end: () => `${window.innerHeight * 3}`,
        onEnter: () => flickerAnimation(".intro-col p span", 1),
        onLeave: () => flickerAnimation(".intro-col p span", 0),
        onEnterBack: () => flickerAnimation(".intro-col p span", 1),
        onLeaveBack: () => flickerAnimation(".intro-col p span", 0),
    });

    ScrollTrigger.create({
        trigger: stickySection,
        start: "top top",
        end: () => `+=${totalStickyHeight}`,
        pin: true,
        pinSpacing: true,
    });

    gsap.to(".img-1 img", {
        scale: 1.125,
        ease: "none",
        scrollTrigger: {
            trigger: stickySection,
            start: "top top",
            end: () => `+=${window.innerHeight}`,
            scrub: true,
        }
    });

    gsap.to(".img-2", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "none",
        scrollTrigger: {
            trigger: stickySection,
            start: "top top",
            end: () => `+=${window.innerHeight}`,
            scrub: true,
            onUpdate: (self) => {
                const progress = self.progress;
                gsap.set('.img-2', {
                    clipPath: `polygon(
                        ${gsap.utils.interpolate(40, 0, progress)}% ${gsap.utils.interpolate(25, 0, progress)}%, 
                        ${gsap.utils.interpolate(60, 100, progress)}% ${gsap.utils.interpolate(25, 0, progress)}%, 
                        ${gsap.utils.interpolate(60, 100, progress)}% ${gsap.utils.interpolate(75, 100, progress)}%, 
                        ${gsap.utils.interpolate(40, 0, progress)}% ${gsap.utils.interpolate(75, 100, progress)}%
                    )`
                });
            }
        }
    });

    gsap.to(".img-3", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "none",
        scrollTrigger: {
            trigger: stickySection,
            start: () => `${window.innerHeight * 3}`,
            end: () => `${window.innerHeight * 4}`,
            scrub: true,
            onUpdate: (self) => {
                const progress = self.progress;
                gsap.set(".img-3", {
                    clipPath: `polygon(
                        ${gsap.utils.interpolate(50, 0, progress)}% ${gsap.utils.interpolate(50, 0, progress)}%, 
                        ${gsap.utils.interpolate(50, 100, progress)}% ${gsap.utils.interpolate(50, 0, progress)}%, 
                        ${gsap.utils.interpolate(50, 100, progress)}% ${gsap.utils.interpolate(50, 100, progress)}%, 
                        ${gsap.utils.interpolate(50, 0, progress)}% ${gsap.utils.interpolate(50, 100, progress)}%
                    )`
                });
            }
        }
    });

    gsap.fromTo(
        ".img-2 img",
        {
            scale: 1.125,
        },
        {
            scale: 1.25,
            ease: "none",
            scrollTrigger: {
                trigger: stickySection,
                start: () => `${window.innerHeight * 3}`,
                end: () => `${window.innerHeight * 4}`,
                scrub: true,
            },
        }
    );

    gsap.fromTo(".img-3 img", {
        scale: 2.9
    }, {
        scale: 1,
        ease: "none",
        scrollTrigger: {
            trigger: stickySection,
            start: () => `${window.innerHeight * 1}`,
            end: () => `${window.innerHeight * 6}`,
            scrub: true
        }
    });

    let tl = gsap.timeline({
        scrollTrigger: {
          trigger: stickySection,
          start: () => `${window.innerHeight * 4.53}`,  // Corrected the syntax
          end: () => `${window.innerHeight * 5.53}`,    // Corrected the syntax
          scrub: true,
          toggleActions: "play reverse play reverse",   // Fixed the toggleActions format
        },
      });
      
      tl.to(".copy", {
        display: "block",
        rotateY: 0,  // Fixed typo: 'rotatey' should be 'rotateY'
        scale: 1,
        duration: 1,
      });
      
});