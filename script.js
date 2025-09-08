// Initialize GSAP

gsap.registerPlugin(ScrollTrigger);

// DOM Elements

const navbar = document.querySelector(".navbar");
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
let lastScroll = 0;
// Loader Animation
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  gsap.to(loader, {
    opacity: 0,
    duration: 1,
    onComplete: () => {
      loader.style.display = "none";
    },
  });

  // CV download functionality
const cvButton = document.querySelector(".cv-download");

cvButton.addEventListener("click", (e) => {
  e.preventDefault();

  // Direct download URL from Google Drive
  const downloadUrl = "https://drive.google.com/uc?export=download&id=1SKghxNAbGj_6f6Tvz2KP4cb3gp6m-1jx";

  // Create a temporary anchor element to start download
  const a = document.createElement("a");
  a.href = downloadUrl;
  a.download = "Anwesh_mund(Resume).pdf"; // This name will be used for the downloaded file
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  alert("CV download started!");
});
  // Initial animations
  initializeAnimations();

  // Initialize typing animation
  initializeTypingAnimation();

  // Footer animations and interactions
  initializeFooterAnimations();
});

// Initialize all animations
function initializeAnimations() {
  // Hero content animations
  gsap.from(".hero-text h1", {
    y: 100,
    opacity: 0,
    duration: 1,
    delay: 0.5,
  });
  gsap.from(".hero-text p", {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.8,
  });

  gsap.from(".hero-image", {
    x: 100,
    opacity: 0,
    duration: 1,
    delay: 1,
  });

  // Scroll animations

  initializeScrollAnimations();
}

// Scroll-based animations

function initializeScrollAnimations() {
  gsap.from(".about-content", {
    scrollTrigger: {
      trigger: ".about-content",

      start: "top center+=100",

      toggleActions: "play none none reverse",
    },

    y: 50,

    opacity: 0,

    duration: 1,
  });

  gsap.from(".project-card", {
    scrollTrigger: {
      trigger: ".projects",

      start: "top center+=100",

      toggleActions: "play none none reverse",
    },

    y: 50,

    opacity: 0,

    duration: 1,

    stagger: 0.2,
  });

  // Enhanced name animation

  gsap.to(".hero-text h1", {
    scrollTrigger: {
      trigger: ".hero-text",

      start: "top center",

      end: "bottom center",

      scrub: 1,
    },

    scale: 1.1,

    duration: 1,
  });

  // About section animations

  gsap.from(".about-image", {
    scrollTrigger: {
      trigger: ".about-image",

      start: "top center+=100",

      toggleActions: "play none none reverse",
    },

    x: -100,

    opacity: 0,

    duration: 1,
  });

  gsap.from(".about-right", {
    scrollTrigger: {
      trigger: ".about-right",

      start: "top center+=100",

      toggleActions: "play none none reverse",
    },

    x: 100,

    opacity: 0,

    duration: 1,
  });

 

  // Project cards animation

  gsap.from(".project-card", {
    scrollTrigger: {
      trigger: ".project-grid",

      start: "top center+=100",

      toggleActions: "play none none reverse",
    },

    y: 50,

    opacity: 0,

    duration: 0.5,

    stagger: 0.2,
  });

  gsap.from(".section-title", {
    scrollTrigger: {
      trigger: ".section-title",

      start: "top center+=100",

      toggleActions: "play none none reverse",
    },

    y: 50,

    opacity: 0,

    duration: 1,
  });

  gsap.from(".growth-card", {
    scrollTrigger: {
      trigger: ".growth-grid",

      start: "top center+=100",

      toggleActions: "play none none reverse",
    },

    y: 50,

    opacity: 0,

    duration: 0.5,

    stagger: 0.2,
  });

  // Animate skills card on scroll
  gsap.fromTo(
    ".skills-card",
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".skills-section",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );

  gsap.utils.toArray(".skill-item").forEach((item, i) => {
    gsap.fromTo(
      item,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        delay: 0.15 * i,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: item,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
}

// Navigation functionality

function toggleMobileMenu() {
  hamburger.classList.toggle("active");

  navMenu.classList.toggle("active");

  document.body.classList.toggle("no-scroll");
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;

    const sectionHeight = section.clientHeight;

    const id = section.getAttribute("id");

    if (
      window.pageYOffset >= sectionTop &&
      window.pageYOffset < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

// Event Listeners

hamburger.addEventListener("click", toggleMobileMenu);

// Scroll handlers

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // Navbar hide/show

  if (currentScroll > lastScroll && currentScroll > 100) {
    navbar.classList.add("hidden");
  } else {
    navbar.classList.remove("hidden");
  }

  lastScroll = currentScroll;

  // Update active nav link

  updateActiveNavLink();

  // Parallax effect for hero text

  const heroText = document.querySelector(".hero-text h1");

  if (heroText) {
    heroText.style.transform = `translateY(${currentScroll * 0.3}px)`;
  }
});

// Smooth scrolling

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const targetId = link.getAttribute("href");

    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      if (navMenu.classList.contains("active")) {
        toggleMobileMenu();
      }

      window.scrollTo({
        top: targetSection.offsetTop - 70,

        behavior: "smooth",
      });
    }
  });
});

// Close mobile menu when clicking outside

document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    hamburger.classList.remove("active");

    navMenu.classList.remove("active");

    document.body.classList.remove("no-scroll");
  }
});

// Form handling

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitBtn = contactForm.querySelector(".submit-btn");

  submitBtn.disabled = true;

  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

  // Simulate form submission

  await new Promise((resolve) => setTimeout(resolve, 2000));

  submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';

  contactForm.reset();

  setTimeout(() => {
    submitBtn.disabled = false;

    submitBtn.innerHTML =
      '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
  }, 3000);
});

// Form animations

const formGroups = document.querySelectorAll(".form-group");

formGroups.forEach((group) => {
  const input = group.querySelector("input, textarea");

  const label = group.querySelector("label");

  input.addEventListener("focus", () => {
    label.classList.add("active");
  });

  input.addEventListener("blur", () => {
    if (!input.value) {
      label.classList.remove("active");
    }
  });
});

// CV download

const cvButton = document.querySelector(".cv-download");

cvButton.addEventListener("click", (e) => {
  e.preventDefault();

  alert("CV download started!");
});

// Footer animations and interactions

function initializeFooterAnimations() {
  // Animate footer sections on scroll

  gsap.from(".footer-section", {
    scrollTrigger: {
      trigger: ".footer",

      start: "top bottom-=100",

      toggleActions: "play none none reverse",
    },

    y: 50,

    opacity: 0,

    duration: 1,

    stagger: 0.2,
  });

  // Animate social icons on hover

  const socialLinks = document.querySelectorAll(".footer-social a");

  socialLinks.forEach((link) => {
    link.addEventListener("mouseenter", (e) => {
      gsap.to(e.target, {
        y: -5,

        scale: 1.2,

        duration: 0.3,
      });
    });

    link.addEventListener("mouseleave", (e) => {
      gsap.to(e.target, {
        y: 0,

        scale: 1,

        duration: 0.3,
      });
    });
  });

  // Add hover effect for footer links

  const footerLinks = document.querySelectorAll(".footer-section ul li a");

  footerLinks.forEach((link) => {
    link.addEventListener("mouseenter", (e) => {
      gsap.to(e.target, {
        x: 10,

        duration: 0.3,
      });
    });

    link.addEventListener("mouseleave", (e) => {
      gsap.to(e.target, {
        x: 0,

        duration: 0.3,
      });
    });
  });

  // Add parallax effect to footer background

  window.addEventListener("mousemove", (e) => {
    const footer = document.querySelector(".footer");

    const mouseX = e.clientX / window.innerWidth - 0.5;

    const mouseY = e.clientY / window.innerHeight - 0.5;

    gsap.to(footer, {
      duration: 0.5,

      backgroundPosition: `${mouseX * 50}px ${mouseY * 50}px`,

      ease: "power1.out",
    });
  });
}

function initializeTypingAnimation() {
  const professionElement = document.querySelector(".profession");
  const professions = [
    "Web Developer",
    "UI/UX Designer",
    "Problem Solver",
    "Creative Thinker",
    "Full Stack Developer",
  ];

  let professionIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typingSpeed = 100;
  const deletingSpeed = 50;
  const wordDelay = 2000;
  const deleteDelay = 1000;

  function type() {
    const currentProfession = professions[professionIndex];

    if (isDeleting) {
      professionElement.textContent = currentProfession.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        professionIndex = (professionIndex + 1) % professions.length;
        setTimeout(type, deleteDelay);
        return;
      }
    } else {
      professionElement.textContent = currentProfession.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentProfession.length) {
        isDeleting = true;
        setTimeout(type, wordDelay);
        return;
      }
    }

    setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
  }

  // Start the typing animation
  type();
}

// Add mouse move parallax effect to the hero section
document.addEventListener("mousemove", (e) => {
  const hero = document.querySelector(".hero");
  const mouseX = e.clientX / window.innerWidth - 0.5;
  const mouseY = e.clientY / window.innerHeight - 0.5;

  gsap.to(".hero-text", {
    duration: 0.5,
    x: mouseX * 30,
    y: mouseY * 30,
    ease: "power2.out",
  });

  gsap.to(".profile-frame", {
    duration: 0.5,
    x: mouseX * -30,
    y: mouseY * -30,
    ease: "power2.out",
  });
});

function handleTerminalSearch() {
  const input = document.getElementById("terminalInput").value.trim().toLowerCase();
  const result = document.getElementById("terminalResult");

  const sectionMap = {
    home: "home",
    about: "about",
    project: "projects",
    projects: "projects",
    contact: "contact",
    growth: "growth",
    education: "growth",
    edu: "growth",
    Certificate: "growth",
    certificates: "growth",
    skills: "about",

    // Add more sections as needed
  };
  if (sectionMap[input]) {
    result.textContent = `Redirecting to ${input}...`;
    setTimeout(() => {
      document.getElementById(sectionMap[input]).scrollIntoView({ behavior: "smooth" });
      result.textContent = "";
      document.getElementById("terminalInput").value = "";
    }, 800);
  } else if (input === "") {
    result.textContent = "";
  } else {
    result.textContent = "Command not found";
  }
}

document.querySelectorAll('.skill-item').forEach(item => {
  item.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = `${e.offsetX}px`;
    ripple.style.top = `${e.offsetY}px`;
    ripple.style.width = ripple.style.height = `${Math.max(item.offsetWidth, item.offsetHeight)}px`;
    item.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});
