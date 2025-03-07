function learnMore() {
    alert("More information about Zeylia is coming soon!");
}

function buyToken() {
    alert("Redirecting to the token purchase page...");
}

// Placeholder for future Three.js integration
document.addEventListener("DOMContentLoaded", () => {
    console.log("Website Loaded! Ready to integrate 3D elements.");
});
function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("show");
}



document.addEventListener("DOMContentLoaded", function () {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1, // Only one image at a time
        loop: true,
        autoplay: {
            delay: 3000, // Auto-slide every 3s
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
});
