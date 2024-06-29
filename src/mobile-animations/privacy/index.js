import gsap from "gsap";

export default function privacyAnimation() {
  const tl = gsap.timeline({});
  tl.to(".privacy_svg", {
    scale: 1.5,
    duration: 1.6,
  })
    .to(
      ".privacy-svg-hide",
      {
        opacity: 0.1,
        duration: 1,
      },
      "<0%"
    )
    .to(
      ".privacy_tooltip",
      {
        opacity: 1,
        duration: 1,
      },
      "<75%"
    )
    .to("#glow feGaussianBlur", {
      attr: { stdDeviation: 1 },
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });
}
