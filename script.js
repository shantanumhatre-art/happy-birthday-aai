/* =========================================
   ELEMENTS
========================================= */

const startBtn = document.getElementById("startBtn");
const mainContent = document.getElementById("mainContent");

const birthdaySong = document.getElementById("birthdaySong");

const wishBtn = document.getElementById("wishBtn");
const cakeStartBtn = document.getElementById("cakeStartBtn");

const giftBox = document.getElementById("giftBox");
const giftMessage = document.getElementById("giftMessage");
const reasonBalloons = document.querySelectorAll(".reason-balloon");
const reasonsFinale = document.getElementById("reasonsFinale");

const confettiContainer =
    document.getElementById("confettiContainer");
const heartRainContainer =
    document.getElementById("heartRainContainer");

let balloonSequenceTimer = null;

setInterval(() => {
    createHeartRain(10);
    createConfetti(12);
}, 1800);

setTimeout(() => {
    createHeartRain(36);
    createConfetti(90);
    createSparkles();
}, 800);

const revealNextBalloon = () => {
    const nextBalloon = Array.from(reasonBalloons).find(balloon => !balloon.disabled);

    if (!nextBalloon) return;

    if (balloonSequenceTimer) {
        clearTimeout(balloonSequenceTimer);
    }

    balloonSequenceTimer = setTimeout(() => {
        nextBalloon.click();
    }, 700);
};

/* =========================================
   POP THE REASONS BALLOONS
========================================= */

reasonBalloons.forEach(balloon => {

    balloon.addEventListener("click", () => {

        if (balloon.disabled) return;

        balloon.disabled = true;
        balloon.setAttribute("aria-pressed", "true");
        balloon.classList.add("is-popped");

        const surprise = balloon.nextElementSibling;

        if (surprise) {
            surprise.hidden = false;
        }

        createConfetti(28);

        const poppedCount =
            document.querySelectorAll(".reason-balloon.is-popped").length;

        if (poppedCount < reasonBalloons.length) {
            revealNextBalloon();
        }

        if (poppedCount === reasonBalloons.length && reasonsFinale) {
            reasonsFinale.hidden = false;
            createConfetti(140);
            createSparkles();
            createHeartRain(22);
        }

    });

});


/* =========================================
   START SURPRISE
========================================= */

const celebrateButton = document.querySelector(".scroll-button");

if (celebrateButton) {
    celebrateButton.addEventListener("click", (event) => {
        event.preventDefault();

        const messageSection = document.querySelector(".letter-section");

        if (messageSection) {
            messageSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
}

if (startBtn) {

    startBtn.addEventListener("click", () => {

        /* Start birthday music */

        if (birthdaySong) {

            birthdaySong.currentTime = 0;

            birthdaySong.play().catch(error => {

                console.log(
                    "Music needs another tap:",
                    error
                );

            });

        }


        /* Hide opening screen */

        document.body.style.overflow = "auto";

        const opening =
            document.getElementById("opening");

        if (opening) {

            opening.style.display = "none";

        }


        /* Show main website */

        if (mainContent) {

            mainContent.classList.remove("hidden");

        }


        /* Small celebration */

        createConfetti(45);
        createHeartRain(24);
        createSparkles();

    });

}


function startCakeAnimation() {
    const cakeSection =
        document.querySelector(".cake-section");

    if (!cakeSection) return;

    cakeSection.classList.remove("is-animated");

    void cakeSection.offsetWidth;

    cakeSection.classList.add("is-animated");
}

/* =========================================
   WISH BUTTON 🎂
========================================= */

if (wishBtn) {

    wishBtn.addEventListener("click", () => {

        const flames =
            document.querySelectorAll(".flame");


        /* Blow out candles */

        flames.forEach((flame, index) => {

            flame.style.animation = "blowOutFlame 0.7s ease forwards";

            setTimeout(() => {

                flame.style.opacity = "0";
                flame.style.transform =
                    "translateX(-50%) scale(.2)";

            }, 200 + index * 120);

        });

        const cakeSection =
            document.querySelector(".cake-section");

        if (cakeSection && !cakeSection.classList.contains("is-animated")) {
            startCakeAnimation();
        }

        /* Change button */

        wishBtn.innerHTML =
            "Wish Sent to the Stars ❤️";


        /* Celebration */

        setTimeout(() => {

            createConfetti(160);
            launchCakeFireworks();
            createSparkles();

        }, 300);

    });

}

if (cakeStartBtn) {
    cakeStartBtn.addEventListener("click", () => {
        startCakeAnimation();
        cakeStartBtn.textContent = "Cake is Live ✨";
        cakeStartBtn.disabled = true;
        cakeStartBtn.style.opacity = "0.8";
    });
}


/* =========================================
   GIFT 🎁
========================================= */

if (giftBox) {

    giftBox.addEventListener("click", () => {

        if (giftMessage) {

            giftMessage.classList.add("show");

        }

        giftBox.style.transform =
            "translateY(-10px) scale(1.12)";

        createConfetti(100);
        createHeartRain(20);

    });

}


/* =========================================
   CONFETTI 🎉
========================================= */

function createConfetti(amount = 80) {

    if (!confettiContainer) return;


    for (let i = 0; i < amount; i++) {

        const confetti =
            document.createElement("div");


        confetti.className =
            "confetti";


        confetti.style.left =
            Math.random() * 100 + "vw";


        confetti.style.background =
            randomColor();


        confetti.style.animationDelay =
            Math.random() * 1.5 + "s";


        confetti.style.animationDuration =
            3 + Math.random() * 3 + "s";


        confetti.style.transform =
            `rotate(${Math.random() * 360}deg)`;


        confettiContainer.appendChild(
            confetti
        );


        setTimeout(() => {

            confetti.remove();

        }, 7000);

    }

}


/* =========================================
   CONFETTI COLORS
========================================= */

function randomColor() {

    const colors = [

        "#ff6f91",
        "#ffd166",
        "#ff9f68",
        "#c77dff",
        "#70d6ff",
        "#ffffff",
        "#f8a5c2"

    ];


    return colors[
        Math.floor(
            Math.random() * colors.length
        )
    ];

}


/* =========================================
   SPARKLES ✨
========================================= */

function createSparkles() {

    for (let i = 0; i < 35; i++) {

        const sparkle =
            document.createElement("div");


        sparkle.innerHTML = "✨";


        sparkle.style.position =
            "fixed";


        sparkle.style.left =
            Math.random() * 100 + "vw";


        sparkle.style.top =
            Math.random() * 100 + "vh";


        sparkle.style.fontSize =
            15 + Math.random() * 25 + "px";


        sparkle.style.zIndex =
            "10000";


        sparkle.style.pointerEvents =
            "none";


        sparkle.style.animation =
            "sparklePop 1.5s ease forwards";


        document.body.appendChild(
            sparkle
        );


        setTimeout(() => {

            sparkle.remove();

        }, 1600);

    }

}


/* =========================================
   CAKE FIREWORKS 🎆
========================================= */

function launchCakeFireworks() {

    const cakeSection = document.querySelector(".cake-section");

    if (!cakeSection) return;

    const rect = cakeSection.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height * 0.45;
    const colors = [
        "#ffd166",
        "#ff6f91",
        "#7ae582",
        "#c77dff",
        "#70d6ff",
        "#ffffff"
    ];

    const burstCount = 22;

    for (let i = 0; i < burstCount; i++) {

        const piece = document.createElement("span");
        const angle = (Math.PI * 2 * i) / burstCount;
        const burstRadius = 30 + Math.random() * 90;

        piece.className = "cake-firework";
        piece.style.left = `${centerX}px`;
        piece.style.top = `${centerY}px`;
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.setProperty("--dx", `${Math.cos(angle) * burstRadius}px`);
        piece.style.setProperty("--dy", `${Math.sin(angle) * burstRadius}px`);
        piece.style.setProperty("--size", `${7 + Math.random() * 12}px`);

        document.body.appendChild(piece);

        setTimeout(() => {
            piece.remove();
        }, 1100);
    }
}


/* =========================================
   HEART RAIN ❤️
========================================= */

function createHeartRain(amount = 20) {

    if (!heartRainContainer) return;

    for (let i = 0; i < amount; i++) {

        const heart = document.createElement("div");

        heart.className = "heart-rain";
        heart.textContent = "❤";
        heart.style.left = (Math.random() * 100) + "vw";
        heart.style.animationDelay = (Math.random() * 0.7) + "s";
        heart.style.fontSize = (14 + Math.random() * 18) + "px";
        heart.style.opacity = (0.4 + Math.random() * 0.6).toFixed(2);

        heartRainContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 2600);
    }

}


/* =========================================
   SPARKLE ANIMATION
========================================= */

const sparkleStyle =
    document.createElement("style");


sparkleStyle.innerHTML = `

@keyframes sparklePop {

    0% {

        opacity: 0;

        transform:
            scale(.2)
            rotate(0deg);

    }

    50% {

        opacity: 1;

        transform:
            scale(1.4)
            rotate(180deg);

    }

    100% {

        opacity: 0;

        transform:
            scale(.2)
            rotate(360deg);

    }

}

`;


document.head.appendChild(
    sparkleStyle
);


/* =========================================
   FALLING HEARTS ❤️
========================================= */

function createTreeRain(
    amount = 60
) {


    for (
        let i = 0;
        i < amount;
        i++
    ) {


        const heart =
            document.createElement("div");


        heart.className =
            "falling-heart";


        /* Random heart */

        heart.textContent =
            heartTypes[
                Math.floor(
                    Math.random() *
                    heartTypes.length
                )
            ];


        /* Horizontal position */

        heart.style.left =
            Math.random() *
            100 +
            "vw";


        /* Start above screen */

        heart.style.top =
            -30 -
            Math.random() * 100 +
            "px";


        /* Random falling delay */

        heart.style.animationDelay =
            Math.random() *
            0.8 +
            "s";


        /* Random size */

        heart.style.fontSize =
            18 +
            Math.random() * 25 +
            "px";


        document.body.appendChild(
            heart
        );


        /* Remove after animation */

        setTimeout(() => {

            heart.remove();

        }, 3500);

    }

}
/* =========================================================
   📸 PHOTO REVEAL
========================================================= */

const photoCards = document.querySelectorAll(".photo-card");
const galleryRevealBtn = document.getElementById("galleryRevealBtn");
let galleryRevealTimer = null;
let galleryRevealActive = false;

const finishGalleryReveal = () => {
    galleryRevealActive = false;

    if (galleryRevealBtn) {
        galleryRevealBtn.textContent = "All Memories Revealed ✨";
        galleryRevealBtn.disabled = true;
    }
};

const revealNextPhoto = () => {
    const nextCard = Array.from(photoCards).find((card) => !card.classList.contains("revealed"));

    if (!nextCard) {
        finishGalleryReveal();
        return;
    }

    nextCard.classList.add("revealed");

    const img = nextCard.querySelector("img");
    const fallback = nextCard.querySelector(".photo-fallback");

    if (img) {
        img.style.opacity = "1";
    }

    if (fallback) {
        fallback.style.opacity = "0";
    }

    const remaining = Array.from(photoCards).filter((card) => !card.classList.contains("revealed")).length;

    if (remaining > 0) {
        if (galleryRevealBtn) {
            galleryRevealBtn.textContent = "Revealing...";
        }

        galleryRevealTimer = setTimeout(() => {
            revealNextPhoto();
        }, 700);
    } else {
        finishGalleryReveal();
    }
};

photoCards.forEach((card, index) => {
    const img = card.querySelector("img");
    if (img) {
        img.style.opacity = "0";
        img.style.transition = "opacity 0.7s ease";
    }

    const fallback = card.querySelector(".photo-fallback");
    if (fallback) {
        fallback.style.transition = "opacity 0.5s ease";
    }

    card.addEventListener("click", () => {
        if (!card.classList.contains("revealed")) {
            card.classList.add("revealed");
            if (img) img.style.opacity = "1";
            if (fallback) fallback.style.opacity = "0";
        } else {
            card.classList.remove("revealed");
            if (img) img.style.opacity = "0";
            if (fallback) fallback.style.opacity = "1";
        }
    });

    card.style.transitionDelay = `${index * 0.18}s`;
});

if (galleryRevealBtn) {
    galleryRevealBtn.addEventListener("click", () => {
        if (galleryRevealActive) return;

        galleryRevealActive = true;
        if (galleryRevealTimer) {
            clearTimeout(galleryRevealTimer);
        }

        revealNextPhoto();
    });
}
