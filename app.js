const mainMenu = document.querySelector('.mainMenu');
const closeMenu = document.querySelector('.closeMenu');
const openMenu = document.querySelector('.openMenu');
const menu_items = document.querySelectorAll('nav .mainMenu li a');

openMenu.addEventListener('click',show);
closeMenu.addEventListener('click',close);

// close menu when you click on a menu item 
menu_items.forEach(item => {
    item.addEventListener('click',function(){
        close();
    })
})

function show(){
    mainMenu.style.display = 'flex';
    mainMenu.style.top = '0';
}
function close(){
    mainMenu.style.top = '-100%';
}

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