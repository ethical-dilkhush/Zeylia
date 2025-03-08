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
        slidesPerView: 1,
        loop: true,

        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".custom-prev",
            prevEl: ".custom-next",
        },
    });

    // Toggle Button Animation
    document.querySelectorAll(".toggle-btn").forEach(button => {
        button.addEventListener("click", function () {
            this.classList.toggle("active");
            if (this.classList.contains("active")) {
                this.textContent = "Toggled On";
            } else {
                this.textContent = "Toggle Me";
            }
        });
    });
});
