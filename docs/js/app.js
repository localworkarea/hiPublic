(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    function addLoadedClass() {
        if (!document.documentElement.classList.contains("loading")) window.addEventListener("load", (function() {
            setTimeout((function() {
                document.documentElement.classList.add("loaded");
            }), 0);
        }));
    }
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        if (bodyLockStatus) {
            const lockPaddingElements = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                lockPaddingElements.forEach((lockPaddingElement => {
                    lockPaddingElement.style.paddingRight = "";
                }));
                document.body.style.paddingRight = "";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        if (bodyLockStatus) {
            const lockPaddingElements = document.querySelectorAll("[data-lp]");
            const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
            lockPaddingElements.forEach((lockPaddingElement => {
                lockPaddingElement.style.paddingRight = lockPaddingValue;
            }));
            document.body.style.paddingRight = lockPaddingValue;
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    function smoothScroll(smoothness = .1, inertia = .9) {
        let scrollPosition = window.pageYOffset;
        let targetPosition = scrollPosition;
        let isScrolling = false;
        let isDraggingScrollbar = false;
        function updateScroll() {
            scrollPosition += (targetPosition - scrollPosition) * smoothness;
            window.scrollTo(0, scrollPosition);
            if (Math.abs(targetPosition - scrollPosition) > .5) requestAnimationFrame(updateScroll); else isScrolling = false;
        }
        window.addEventListener("wheel", (function(event) {
            if (!isDraggingScrollbar) {
                targetPosition += event.deltaY;
                targetPosition = Math.max(0, Math.min(document.body.scrollHeight - window.innerHeight, targetPosition));
                event.preventDefault();
                if (!isScrolling) {
                    isScrolling = true;
                    requestAnimationFrame(updateScroll);
                }
            }
        }), {
            passive: false
        });
        window.addEventListener("scroll", (function() {
            if (!isScrolling) {
                scrollPosition = window.pageYOffset;
                targetPosition = scrollPosition;
            }
        }));
        window.addEventListener("mousedown", (function() {
            isDraggingScrollbar = true;
        }));
        window.addEventListener("mouseup", (function() {
            isDraggingScrollbar = false;
            scrollPosition = window.pageYOffset;
            targetPosition = scrollPosition;
        }));
    }
    if (document.body.getAttribute("data-smooth-scroll") === "true") smoothScroll(.08, .85);
    window["FLS"] = false;
    isWebp();
    addLoadedClass();
    menuInit();
})();