// const mainMenu = document.querySelector('.mainMenu');
// const closeMenu = document.querySelector('.closeMenu');
// const openMenu = document.querySelector('.openMenu');
// const menu_items = document.querySelectorAll('nav .mainMenu li a');

// openMenu.addEventListener('click',show);
// closeMenu.addEventListener('click',close);

// // close menu when you click on a menu item 
// menu_items.forEach(item => {
//     item.addEventListener('click',function(){
//         close();
//     })
// })

// function show(){
//     mainMenu.style.display = 'flex';
//     mainMenu.style.top = '0';
// }
// function close(){
//     mainMenu.style.top = '-100%';
// }


document.addEventListener("DOMContentLoaded", function() {
    const openMenu = document.querySelector(".openMenu");
    const closeMenu = document.querySelector(".closeMenu");
    const mainMenu = document.querySelector(".mainMenu");

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
        speed:600,
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
            init: function() {
                animateSlide(this.slides[this.activeIndex]);
            },
            slideChangeTransitionStart: function() {
                // Reset all slides
                resetAllSlides();
            },
            slideChangeTransitionEnd: function() {
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

    function start3DFlipEffect() {
        const boxes = document.querySelectorAll(".box");
        let index = 0;
        let totalBoxes = boxes.length;

        function updateSlides() {
            boxes.forEach((box, i) => {
                let offset = (i - index + totalBoxes) % totalBoxes;
                let scale = offset === 0 ? 0.8 : 0.5; // Larger center card
                let translateZ = offset === 0 ? 100 : -100; // Push back side cards
                let rotateY = offset === 0 ? 0 : offset === 1 ? -15 : 15; // Flip effect
                let opacity = offset === 0 ? 1 : 0.6; // Highlight active card

                box.style.transform = `perspective(1000px) rotateY(${rotateY}deg) scale(${scale}) translateZ(${translateZ}px)`;
                box.style.opacity = opacity;
                box.style.zIndex = offset === 0 ? 2 : 1;
            });

            index = (index + 1) % totalBoxes; // Cycle through cards
        }

        document.querySelector(".container-slider").style.perspective = "1200px";
        updateSlides();
        setInterval(updateSlides, 3000);
    }

    function handleResize() {
        if (isMobile()) {
            start3DFlipEffect();
        }
    }

    if (isMobile()) {
        start3DFlipEffect();
    }

    window.addEventListener("resize", handleResize);
});


//video slider
const carouselWrapper = document.querySelector('.video-carousel-wrapper');
const prevBtn = document.querySelector('.video-btn-prev');
const nextBtn = document.querySelector('.video-btn-next');
const dots = document.querySelectorAll('.video-dot');
const videos = document.querySelectorAll('.video-carousel-item video');

let index = 1; // Start with second video playing
let totalVideos = videos.length;
let interval;

function updateCarousel() {
    carouselWrapper.style.transform = `translateX(${-index * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');

    // Stop all videos and play only the active one
    videos.forEach(video => video.pause());
    videos[index].play();
}

function nextSlide() {
    index = (index + 1) % totalVideos;
    updateCarousel();
}

function prevSlide() {
    index = (index - 1 + totalVideos) % totalVideos;
    updateCarousel();
}

function setAutoSlide() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

prevBtn.addEventListener('click', () => {
    prevSlide();
    setAutoSlide();
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    setAutoSlide();
});

dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        index = parseInt(e.target.dataset.index);
        updateCarousel();
        setAutoSlide();
    });
});

//text animation
const h1 = document.querySelector('.hero-heading');
const h3 = document.querySelector('.hero-subheading');

h1.innerHTML = h1.textContent.replace(/\S/g,"<span class='char'>$&</span>");
h3.innerHTML = h3.textContent.replace(/\S/g,"<span class='char'>$&</span>");

// GSAP ANIMATION
let tl = gsap.timeline({ease: "back"});
    tl.from('.char',{y:50,opacity: 0, stagger: 0.08})