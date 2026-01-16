// Toggle class active for mobile menu
const navbarDropdown = document.querySelector(".navbar-dropdown");
const hamburger = document.querySelector("#hamburger-menu");

// When hamburger menu is clicked
hamburger.onclick = (e) => {
  navbarDropdown.classList.toggle("active");
  e.preventDefault();
};

// Click outside sidebar to hide nav
document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarDropdown.contains(e.target)) {
    navbarDropdown.classList.remove("active");
  }
});

// Update active link based on scroll position
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navbar-links a, .navbar-dropdown-links a');

  // Start with no active link
  let current = '';

  // Check if we're at the very top of the page
  if (pageYOffset < 100) { // If near the top of the page
    current = 'home';
  } else {
    // Iterate through sections to find the one currently in view
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const sectionTop = section.offsetTop - 150; // Adjust for navbar height
      const sectionHeight = section.clientHeight;
      const sectionId = section.getAttribute('id');

      if (
        pageYOffset >= sectionTop &&
        pageYOffset < sectionTop + sectionHeight
      ) {
        current = sectionId;
        break; // Exit loop once we find the current section
      }
    }
  }

  // Remove active class from all links
  navLinks.forEach(link => {
    link.classList.remove('active');
  });

  // Add active class to the current link only if current is defined
  if (current) {
    const currentLink = document.querySelector(`.navbar-links a[href="#${current}"], .navbar-dropdown-links a[href="#${current}"]`);
    if (currentLink) {
      currentLink.classList.add('active');
    }
  }
});

// Handle click on navigation links
document.querySelectorAll('.navbar-links a, .navbar-dropdown-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    // Remove active class from all links
    document.querySelectorAll('.navbar-links a, .navbar-dropdown-links a').forEach(navLink => {
      navLink.classList.remove('active');
    });

    // Add active class to clicked link
    this.classList.add('active');

    // Close mobile menu if open
    navbarDropdown.classList.remove('active');
  });
});
