document.addEventListener("DOMContentLoaded", function () {
    const openMenu = document.querySelector(".openMenu");
    const closeMenu = document.querySelector(".closeMenu");
    const mainMenu = document.querySelector(".mainMenu");
    const menuLinks = document.querySelectorAll(".mainMenu li a"); // Select all menu links

    if (openMenu && closeMenu && mainMenu) {
        // Open menu
        openMenu.addEventListener("click", () => {
            mainMenu.classList.add("active");
        });

        // Close menu
        closeMenu.addEventListener("click", () => {
            mainMenu.classList.remove("active");
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!mainMenu.contains(e.target) && !openMenu.contains(e.target) && mainMenu.classList.contains("active")) {
                mainMenu.classList.remove("active");
            }
        });

        // Close menu when clicking a link and allow navigation
        menuLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                mainMenu.classList.remove("active");

                // Ensure the link follows its href after closing the menu
                const targetHref = link.getAttribute("href");
                if (targetHref && targetHref.startsWith("#")) {
                    e.preventDefault(); // Prevent default jump behavior
                    setTimeout(() => {
                        window.location.href = targetHref;
                    }, 100); // Delay to ensure menu closes smoothly
                }
            });
        });
    }
});


//Sweper Slider and animation start here
document.addEventListener("DOMContentLoaded", function () {
    // Initialize Swiper
    const swiper = new Swiper(".mySwiper", {
        autoplay: {
            delay: 5000, // Adjust as needed
            disableOnInteraction: false,
        },
        loop: true,
        speed: 600,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".slide-next",
            prevEl: ".slide-prev",
        },
        // Add Swiper events for animation control
        on: {
            init: function () {
                animateSlide(this.slides[this.activeIndex]);
            },
            slideChangeTransitionStart: function () {
                // Reset all slides
                resetAllSlides();
            },
            slideChangeTransitionEnd: function () {
                // Animate the active slide
                animateSlide(this.slides[this.activeIndex]);
            }
        }
    });

    // Function to reset animations for all slides
    function resetAllSlides() {
        const slides = document.querySelectorAll(".swiper-slide");
        slides.forEach((slide) => {
            const heading = slide.querySelector(".slide-heading");
            const text = slide.querySelector(".slide-text");
            const button = slide.querySelector(".discover-btn");

            gsap.set([heading, text, button], {
                opacity: 0,
                y: 20
            });
        });
    }

    // Function to animate the current slide
    function animateSlide(slide) {
        const heading = slide.querySelector(".slide-heading");
        const text = slide.querySelector(".slide-text");
        const button = slide.querySelector(".discover-btn");

        // Create a timeline for synchronized animations
        const tl = gsap.timeline();

        tl.to(heading, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
        })
            .to(text, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out"
            }, "-=0.5") // Overlap with heading animation
            .to(button, {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power3.out"
            }, "-=0.7"); // Overlap with text animation
    }

    // Optional: Pause autoplay on hover
    const swiperContainer = document.querySelector('.mySwiper');
    swiperContainer.addEventListener('mouseenter', () => {
        swiper.autoplay.stop();
    });

    swiperContainer.addEventListener('mouseleave', () => {
        swiper.autoplay.start();
    });
});

//CA copy function
function copyToClipboard() {
    let textToCopy = document.getElementById("ca").innerText;

    navigator.clipboard.writeText(textToCopy).then(() => {
        let icon = document.querySelector(".copy-icon");
        icon.classList.add("copied"); // Change icon color
        icon.classList.replace("bi-copy", "bi-check-lg"); // Change to checkmark

        setTimeout(() => {
            icon.classList.remove("copied");
            icon.classList.replace("bi-check-lg", "bi-copy"); // Revert icon
        }, 2000);
    }).catch(err => {
        console.error("Failed to copy: ", err);
    });
}


//slider-2
var swiper = new Swiper('.custom-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".custom-swiper-pagination",
        clickable: true,
        bulletClass: "custom-swiper-bullet",
        bulletActiveClass: "custom-swiper-bullet-active",
    },
    breakpoints: {
        1024: {
            slidesPerView: 2,
            spaceBetween: 20,
        }
    }
});


//slider -3
document.addEventListener("DOMContentLoaded", function () {
    function isMobile() {
        return window.innerWidth <= 768;
    }

    function startSimpleSlider() {
        const boxes = document.querySelectorAll(".box");
        let index = 0;
        let totalBoxes = boxes.length;

        function updateSlides() {
            boxes.forEach((box, i) => {
                if (i === index) {
                    box.style.display = "block";
                    box.style.transform = "scale(1)";
                } else {
                    box.style.display = "none";
                    box.style.transform = "scale(0.8)";
                }
            });
            index = (index + 1) % totalBoxes;
        }

        // Initialize
        updateSlides();

        // Auto change slides every 3 seconds
        setInterval(updateSlides, 3000);
    }

    // Start the slider on mobile
    if (isMobile()) {
        startSimpleSlider();
    }
});


// Video slider
const carouselWrapper = document.querySelector('.video-carousel-wrapper');
const prevBtn = document.querySelector('.video-btn-prev');
const nextBtn = document.querySelector('.video-btn-next');
const dots = document.querySelectorAll('.video-dot');
const videos = document.querySelectorAll('.video-carousel-item video');

let index = 0; // Start from the first video
let totalVideos = videos.length;
let interval;

// Function to update carousel position
function updateCarousel() {
    carouselWrapper.style.transform = `translateX(${-index * 100}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');

    // Stop all videos and ensure the current video plays
    videos.forEach((video, i) => {
        if (i === index) {
            video.currentTime = 0; // Reset video time to ensure playback
            video.play();
        } else {
            video.pause();
        }
    });
}

// Function to move to the next slide
function nextSlide() {
    index = (index + 1) % totalVideos;
    updateCarousel();
}

// Function to move to the previous slide
function prevSlide() {
    index = (index - 1 + totalVideos) % totalVideos;
    updateCarousel();
}

// Function to start auto sliding
function setAutoSlide() {
    clearInterval(interval);
    interval = setInterval(() => {
        nextSlide();
    }, 5000); // Slide changes every 5 seconds
}

// Event listeners for next and previous buttons
prevBtn.addEventListener('click', () => {
    prevSlide();
    setAutoSlide();
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    setAutoSlide();
});

// Event listeners for dot navigation
dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        index = i;
        updateCarousel();
        setAutoSlide();
    });
});

// Start the auto slide when the page loads
setAutoSlide();

//text animation
const h1 = document.querySelector('.paragraph');


h1.innerHTML = h1.textContent.replace(/\S/g, "<span class='char'>$&</span>");

// GSAP ANIMATION
let tl = gsap.timeline({ ease: "back" });
tl.from('.char', { y: 50, opacity: 0, stagger: 0.02 })

// Notifications 

document.addEventListener("DOMContentLoaded", function () {
    const alertOverlay = document.getElementById("alertOverlay");
    const alertButton = document.getElementById("alertButton");

    // Show the alert message when the page loads
    setTimeout(() => {
        alertOverlay.classList.add("active");
    }, 1000); // Delay for 1 second after page load

    // Hide the alert message when the button is clicked
    alertButton.addEventListener("click", () => {
        alertOverlay.classList.remove("active");
    });
});
