// Enhanced JavaScript with additional features and fixes

// Toggle hamburger menu
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");

  icon.classList.toggle("open");
  menu.classList.toggle("open");
}

// DOMContentLoaded event for all initializations
document.addEventListener("DOMContentLoaded", () => {
  // Get theme toggle elements
  const themeToggle = document.getElementById("theme-toggle");
  const mobileThemeToggle = document.getElementById("mobile-theme-toggle");

  // Check for saved theme preference or set based on user preference
  const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  // Apply saved theme on page load
  if (savedTheme === "dark") {
    document.body.setAttribute("data-theme", "dark");
    themeToggle.checked = true;
    mobileThemeToggle.checked = true;
  }

  // Function to toggle theme
  function toggleTheme() {
    if (document.body.getAttribute("data-theme") === "dark") {
      document.body.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    } else {
      document.body.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  }

  // Add event listeners to theme toggle buttons
  themeToggle.addEventListener("change", () => {
    toggleTheme();
    mobileThemeToggle.checked = themeToggle.checked;
  });

  mobileThemeToggle.addEventListener("change", () => {
    toggleTheme();
    themeToggle.checked = mobileThemeToggle.checked;
  });

  // Fix profile image sizing and positioning
  const profileImg = document.querySelector(".myphoto");
  if (profileImg) {
    profileImg.style.objectFit = "cover";
    profileImg.style.objectPosition = "center";
  }

  // Implement smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      // Close hamburger menu if open
      const menu = document.querySelector(".menu-links");
      const icon = document.querySelector(".hamburger-icon");
      if (menu.classList.contains("open")) {
        icon.classList.remove("open");
        menu.classList.remove("open");
      }

      // Scroll to the target element
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100, // Offset to account for fixed header
          behavior: "smooth",
        });
      }
    });
  });

  // Add animation to sections when they come into view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });

  // Add hover effects for project cards
  const projectCards = document.querySelectorAll(".color-container");
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)";
      card.style.boxShadow = "0 15px 30px var(--shadow-color)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "0 5px 15px var(--shadow-color)";
    });
  });

  // Typed.js-like effect for the title (simple version)
  function typeEffect(element, text, speed = 100) {
    let i = 0;
    // Clear the element first
    element.textContent = "";

    function typing() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typing, speed);
      }
    }

    typing();
  }

  // Apply typing effect to the name after a short delay
  setTimeout(() => {
    const titleElement = document.querySelector(".title");
    if (titleElement && titleElement.textContent.includes("Parwar Yassin")) {
      typeEffect(titleElement, "Parwar Yassin", 150);
    }
  }, 1000);

  // Update copyright year automatically
  const footerYear = document.querySelector("footer p");
  if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.innerHTML = footerYear.innerHTML.replace(/\d{4}/, currentYear);
  }
});

// Add a scroll-to-top button functionality
window.addEventListener("scroll", () => {
  // We'll create this button dynamically to avoid modifying HTML
  let scrollTopBtn = document.getElementById("scroll-top-btn");

  if (!scrollTopBtn) {
    scrollTopBtn = document.createElement("button");
    scrollTopBtn.id = "scroll-top-btn";
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.style.position = "fixed";
    scrollTopBtn.style.bottom = "20px";
    scrollTopBtn.style.right = "20px";
    scrollTopBtn.style.backgroundColor = "var(--accent-color)";
    scrollTopBtn.style.color = "white";
    scrollTopBtn.style.borderRadius = "50%";
    scrollTopBtn.style.width = "50px";
    scrollTopBtn.style.height = "50px";
    scrollTopBtn.style.border = "none";
    scrollTopBtn.style.cursor = "pointer";
    scrollTopBtn.style.display = "none";
    scrollTopBtn.style.boxShadow = "0 3px 10px var(--shadow-color)";
    scrollTopBtn.style.opacity = "0";
    scrollTopBtn.style.transition = "opacity 0.3s ease";

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    document.body.appendChild(scrollTopBtn);
  }

  // Show/hide the button based on scroll position
  if (window.scrollY > 300) {
    scrollTopBtn.style.display = "block";
    setTimeout(() => {
      scrollTopBtn.style.opacity = "1";
    }, 10);
  } else {
    scrollTopBtn.style.opacity = "0";
    setTimeout(() => {
      scrollTopBtn.style.display = "none";
    }, 300);
  }
});
