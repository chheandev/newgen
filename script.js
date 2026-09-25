/* =================================
   AUDIO
================================= */

let audioContext;


function initAudio() {

    if (!audioContext) {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

    }

    if (
        audioContext.state === "suspended"
    ) {

        audioContext.resume();

    }

}


function playSound(
    frequency = 500,
    duration = 0.1,
    volume = 0.08,
    type = "sine"
) {

    try {

        initAudio();

        const oscillator =
            audioContext.createOscillator();

        const gain =
            audioContext.createGain();

        oscillator.type = type;

        oscillator.frequency.setValueAtTime(
            frequency,
            audioContext.currentTime
        );

        gain.gain.setValueAtTime(
            volume,
            audioContext.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audioContext.currentTime + duration
        );

        oscillator.connect(gain);

        gain.connect(
            audioContext.destination
        );

        oscillator.start();

        oscillator.stop(
            audioContext.currentTime + duration
        );

    } catch (error) {

        console.log("Audio unavailable.");

    }

}


/* =================================
   LOADER
================================= */

window.addEventListener(
    "load",
    () => {

        setTimeout(
            () => {

                const loader =
                    document.getElementById(
                        "loader"
                    );

                loader.classList.add(
                    "loaded"
                );

            },
            1800
        );

    }
);


/* =================================
   CUSTOM CURSOR
================================= */

const cursorDot =
    document.querySelector(
        ".cursor-dot"
    );

const cursorOutline =
    document.querySelector(
        ".cursor-outline"
    );

const mouseGlow =
    document.querySelector(
        ".mouse-glow"
    );


let mouseX = 0;
let mouseY = 0;

let outlineX = 0;
let outlineY = 0;


document.addEventListener(
    "mousemove",
    (event) => {

        mouseX = event.clientX;

        mouseY = event.clientY;

        cursorDot.style.left =
            mouseX + "px";

        cursorDot.style.top =
            mouseY + "px";

        mouseGlow.style.left =
            mouseX + "px";

        mouseGlow.style.top =
            mouseY + "px";

    }
);


function animateCursor() {

    outlineX +=
        (mouseX - outlineX) * 0.15;

    outlineY +=
        (mouseY - outlineY) * 0.15;

    cursorOutline.style.left =
        outlineX + "px";

    cursorOutline.style.top =
        outlineY + "px";

    requestAnimationFrame(
        animateCursor
    );

}


animateCursor();


function setupCursorHover() {

    const hoverElements =
        document.querySelectorAll(
            "a, button, .album-card, .activity-card"
        );

    hoverElements.forEach(
        (element) => {

            element.addEventListener(
                "mouseenter",
                () => {

                    cursorOutline.classList.add(
                        "hover"
                    );

                }
            );

            element.addEventListener(
                "mouseleave",
                () => {

                    cursorOutline.classList.remove(
                        "hover"
                    );

                }
            );

        }
    );

}


setupCursorHover();


/* =================================
   MOBILE MENU
================================= */

const menuToggle =
    document.getElementById(
        "menu-toggle"
    );

const navLinks =
    document.getElementById(
        "nav-links"
    );


menuToggle.addEventListener(
    "click",
    () => {

        navLinks.classList.toggle(
            "active"
        );

        if (
            navLinks.classList.contains(
                "active"
            )
        ) {

            menuToggle.textContent = "×";

            playSound(
                650,
                0.08,
                0.08,
                "triangle"
            );

        } else {

            menuToggle.textContent = "☰";

        }

    }
);


document
    .querySelectorAll(".nav-links a")
    .forEach(
        (link) => {

            link.addEventListener(
                "click",
                () => {

                    navLinks.classList.remove(
                        "active"
                    );

                    menuToggle.textContent =
                        "☰";

                }
            );

        }
    );


/* =================================
   DARK MODE
================================= */

const themeToggle =
    document.getElementById(
        "theme-toggle"
    );


themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark"
        );

        if (
            document.body.classList.contains(
                "dark"
            )
        ) {

            themeToggle.textContent =
                "☀";

            playSound(
                750,
                0.13,
                0.1,
                "sine"
            );

        } else {

            themeToggle.textContent =
                "☾";

            playSound(
                450,
                0.13,
                0.1,
                "sine"
            );

        }

    }
);


/* =================================
   SCROLL REVEAL
================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "show"
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(
    (element) => {

        observer.observe(
            element
        );

    }
);


/* =================================
   BUTTON SOUNDS
================================= */

document
    .querySelectorAll(".button")
    .forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    playSound(
                        520,
                        0.07,
                        0.07,
                        "triangle"
                    );

                }
            );

        }
    );


/* =================================
   ALBUM FILTER
================================= */

const filterButtons =
    document.querySelectorAll(
        ".filter-button"
    );

const albumCards =
    document.querySelectorAll(
        ".album-card"
    );


filterButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const filter =
                    button.dataset.filter;


                filterButtons.forEach(
                    (item) => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                albumCards.forEach(
                    (card) => {

                        const category =
                            card.dataset.category;


                        if (
                            filter === "all" ||
                            category === filter
                        ) {

                            card.classList.remove(
                                "hidden"
                            );

                        } else {

                            card.classList.add(
                                "hidden"
                            );

                        }

                    }
                );


                playSound(
                    600,
                    0.08,
                    0.07,
                    "triangle"
                );

            }
        );

    }
);


/* =================================
   ALBUM VIEWER
================================= */

const albumViewer =
    document.getElementById(
        "album-viewer"
    );

const viewerImage =
    document.getElementById(
        "viewer-image"
    );

const viewerTitle =
    document.getElementById(
        "viewer-title"
    );

const viewerNumber =
    document.getElementById(
        "viewer-number"
    );

const albumClose =
    document.getElementById(
        "album-close"
    );

const albumPrev =
    document.getElementById(
        "album-prev"
    );

const albumNext =
    document.getElementById(
        "album-next"
    );


let currentAlbum = 0;


const albumData =
    Array.from(albumCards).map(
        (card, index) => {

            return {

                image:
                    card.querySelector(
                        "img"
                    ).src,

                title:
                    card.dataset.title,

                number:
                    String(index + 1)
                        .padStart(2, "0")

            };

        }
    );


function showAlbum(index) {

    currentAlbum = index;

    const item =
        albumData[currentAlbum];


    viewerImage.src =
        item.image;

    viewerTitle.textContent =
        item.title;

    viewerNumber.textContent =
        item.number;


    albumViewer.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";


    playSound(
        620,
        0.12,
        0.09,
        "triangle"
    );

}


function closeAlbum() {

    albumViewer.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}


function nextAlbum() {

    currentAlbum++;

    if (
        currentAlbum >=
        albumData.length
    ) {

        currentAlbum = 0;

    }

    showAlbum(
        currentAlbum
    );

}


function previousAlbum() {

    currentAlbum--;

    if (
        currentAlbum < 0
    ) {

        currentAlbum =
            albumData.length - 1;

    }

    showAlbum(
        currentAlbum
    );

}


albumCards.forEach(
    (card, index) => {

        card.addEventListener(
            "click",
            () => {

                showAlbum(
                    index
                );

            }
        );

    }
);


albumClose.addEventListener(
    "click",
    closeAlbum
);


albumNext.addEventListener(
    "click",
    nextAlbum
);


albumPrev.addEventListener(
    "click",
    previousAlbum
);


albumViewer.addEventListener(
    "click",
    (event) => {

        if (
            event.target ===
            albumViewer
        ) {

            closeAlbum();

        }

    }
);


/* =================================
   KEYBOARD CONTROLS
================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            !albumViewer.classList.contains(
                "active"
            )
        ) {

            return;

        }


        if (
            event.key === "Escape"
        ) {

            closeAlbum();

        }


        if (
            event.key === "ArrowRight"
        ) {

            nextAlbum();

        }


        if (
            event.key === "ArrowLeft"
        ) {

            previousAlbum();

        }

    }
);


/* =================================
   PARALLAX HERO
================================= */

const hero =
    document.querySelector(
        ".hero"
    );

const heroImage =
    document.querySelector(
        ".hero-image"
    );


window.addEventListener(
    "scroll",
    () => {

        const scroll =
            window.scrollY;


        if (
            scroll < window.innerHeight
        ) {

            heroImage.style.transform =
                `scale(1.04) translateY(${scroll * 0.08}px)`;

        }

    }
);


/* =================================
   SMOOTH IMAGE PRELOAD
================================= */

albumData.forEach(
    (item) => {

        const image =
            new Image();

        image.src =
            item.image;

    }
);