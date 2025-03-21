import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

export default function integrateAnimation() {
  gsap.registerPlugin(MotionPathPlugin);

  const initializeAnimation = () => {
    MotionPathPlugin.convertToPath(".integrate_orbit-circle");
    const orbitWraps = document.querySelectorAll(".discover_orbit-wrap");

    orbitWraps.forEach((orbitWrap) => {
      let duration = 40;
      let direction = 1;

      if (orbitWrap.classList.contains("is-middle")) {
        //duration = 20;
        direction = -1;
      }

      const circle = orbitWrap.querySelector(".integrate_orbit-circle");
      const items = orbitWrap.querySelectorAll(".integrate_orbit-img");

      // Clear any previous animation instances
      gsap.killTweensOf(items);

      items.forEach((item) => {
        orbitWrap.appendChild(item);
      });

      // Set initial positions
      gsap.set(items, {
        motionPath: {
          path: circle,
          align: circle,
          alignOrigin: [0.5, 0.5],
        },
      });

      // Create a timeline to animate items along the path
      const tl = gsap.timeline({
        repeat: -1,
        ease: "none",
      });

      items.forEach((item, i) => {
        tl.to(
          item,
          {
            motionPath: {
              path: circle,
              align: circle,
              alignOrigin: [0.5, 0.5],
              start: i / items.length,
              end: i / items.length + direction,
              immediateRender: true,
            },
            duration: duration,
            ease: "none",
          },
          0
        );
      });
    });
  };

  // Initialize animation on load
  initializeAnimation();

  const mm = gsap.matchMedia();

  mm.add("(min-width: 992px)", () => {
    const resizeHandler = () => {
      initializeAnimation();
    };

    // Add the resize event listener when the media query matches
    window.addEventListener("resize", resizeHandler);

    // Run the function initially to handle the current state
    initializeAnimation();

    // Return a cleanup function to remove the event listener when the media query no longer matches
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  });
}
