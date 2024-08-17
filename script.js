gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

/* Main navigation */
let panelsSection = document.querySelector("#panels"),
    panelsContainer = document.querySelector("#panels-container"),
    tween;

// Banner element
const banner = document.querySelector("#masthead");
// Vertical section
const verticalSection = document.querySelector("#vertical");

document.querySelectorAll(".anchor").forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        let targetElem = document.querySelector(e.target.getAttribute("href")),
            y = targetElem;
        if (targetElem && panelsContainer.isSameNode(targetElem.parentElement)) {
            let totalScroll = tween.scrollTrigger.end - tween.scrollTrigger.start,
                totalMovement = (panels.length - 1) * targetElem.offsetWidth;
            y = Math.round(tween.scrollTrigger.start + (targetElem.offsetLeft / totalMovement) * totalScroll);
        }
        gsap.to(window, {
            scrollTo: {
                y: y,
                autoKill: false
            },
            duration: 1
        });
    });
});

/* Panels */
const panels = gsap.utils.toArray("#panels-container .panel");
tween = gsap.to(panels, {
    xPercent: -100 * (panels.length - 1),
    ease: "none",
    scrollTrigger: {
        trigger: "#panels-container",
        pin: true,
        start: "top top",
        scrub: 1,
        snap: {
            snapTo: 1 / (panels.length - 1),
            inertia: false,
            duration: { min: 0.1, max: 0.1 }
        },
        end: () => "+=" + (panelsContainer.offsetWidth - innerWidth),
        onUpdate: (self) => {
            const progress = self.progress;
            const panelIndex = Math.floor(progress * (panels.length - 1));
            
            // Check if we've reached the vertical section
            const verticalSectionRect = verticalSection.getBoundingClientRect();
            const isVerticalSectionVisible = verticalSectionRect.top <= window.innerHeight && verticalSectionRect.bottom >= 0;
            
            if (isVerticalSectionVisible) {
                // Hide banner in vertical section
                gsap.set(banner, { display: "none" });
            } else if (panelIndex >= 6) {
                // Hide banner on intro panel (index 0)
                gsap.set(banner, { display: "none" });
            } else if (panelIndex >= 1 && panelIndex <= 6) {
                // Show banner from panel-1 to panel-6 (index 1 to 6)
                gsap.set(banner, { display: "flex" });
            } else {
                // Hide banner after panel-6
                gsap.set(banner, { display: "none" });
            }
        }
    }
});

// Initial check for banner visibility
gsap.set(banner, { display: "none" });