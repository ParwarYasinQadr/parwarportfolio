// Toggle hamburger menu
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");

  icon.classList.toggle("open");
  menu.classList.toggle("open");
}

// Theme toggle functionality
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
});
