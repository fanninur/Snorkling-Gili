(() => {
  const { gsap, ScrollTrigger } = window;
  const hero = document.querySelector(".hero");
  const visual = document.querySelector("[data-hero-visual]");
  const image = document.querySelector(".hero__media");
  const content = document.querySelector("[data-hero-content]");

  if (!gsap || !ScrollTrigger || !hero || !visual || !image || !content) return;

  gsap.registerPlugin(ScrollTrigger);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  gsap.fromTo(
    content.querySelectorAll(".hero__eyebrow, .hero__title, .hero__description, .hero__actions"),
    { autoAlpha: 0, y: 14 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.72,
      stagger: 0.09,
      ease: "power2.out",
      clearProps: "transform",
    },
  );

  const media = gsap.matchMedia();

  media.add(
    {
      desktop: "(min-width: 1101px)",
      tablet: "(min-width: 681px) and (max-width: 1100px)",
      mobile: "(max-width: 680px)",
    },
    (context) => {
      const { desktop, tablet, mobile } = context.conditions;
      const width = mobile ? 0.94 : tablet ? 0.91 : 0.88;
      const height = mobile ? 0.59 : tablet ? 0.53 : 0.48;
      const imageScale = 1.05;
      const duration = mobile ? 440 : tablet ? 620 : 700;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: `+=${duration}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const returnHomeLinks = document.querySelectorAll('a[href="#home"]');
      returnHomeLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
          event.preventDefault();

          if (window.location.hash !== "#home") {
            window.history.pushState(null, "", "#home");
          }

          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        });
      });

      timeline
        .to(
          visual,
          {
            scaleX: width,
            scaleY: height,
            borderRadius: mobile ? 18 : 24,
            ease: "none",
            duration: 1,
          },
          0,
        )
        .to(
          image,
          {
            scaleX: imageScale / width,
            scaleY: imageScale / height,
            ease: "none",
            duration: 1,
          },
          0,
        )
        .to(
          content.querySelectorAll(".hero__eyebrow, .hero__description, .hero__actions"),
          {
            autoAlpha: 0,
            y: -18,
            ease: "none",
            duration: 0.68,
          },
          0.28,
        );

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    },
  );
})();
