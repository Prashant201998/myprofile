document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Dark mode toggle functionality
  const themeSwitch = document.getElementById('theme-switch');
  
  // Check for saved user preference or use system preference
  const savedTheme = localStorage.getItem('darkMode');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'true' || (!savedTheme && systemPrefersDark)) {
      document.body.classList.add('dark-mode');
      themeSwitch.checked = true;
  }
  
  themeSwitch.addEventListener('change', function() {
      document.body.classList.toggle('dark-mode', this.checked);
      localStorage.setItem('darkMode', this.checked);
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 80,
                  behavior: 'smooth'
              });
              
              // Close mobile menu if open
              const nav = document.querySelector('nav ul');
              if (nav.classList.contains('active')) {
                  nav.classList.remove('active');
              }
          }
      });
  });

  // Header scroll effect
  window.addEventListener('scroll', function() {
      const header = document.querySelector('header');
      if (window.scrollY > 100) {
          header.classList.add('scrolled');
      } else {
          header.classList.remove('scrolled');
      }
      
      // Back to top button visibility
      const backToTop = document.querySelector('.back-to-top');
      if (window.scrollY > 300) {
          backToTop.classList.add('active');
      } else {
          backToTop.classList.remove('active');
      }
  });

  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Get form values
          const name = document.getElementById('name').value;
          const email = document.getElementById('email').value;
          const subject = document.getElementById('subject').value;
          const message = document.getElementById('message').value;
          
          // Simple validation
          if (!name || !email || !message) {
              showFormStatus('Please fill in all required fields', 'error');
              return;
          }
          
          // Show loading state
          const submitBtn = contactForm.querySelector('button[type="submit"]');
          const originalBtnText = submitBtn.innerHTML;
          submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
          submitBtn.disabled = true;
          
          // In a real implementation, you would send this data to your server
          // For demonstration, we'll simulate a successful submission
          setTimeout(() => {
              showFormStatus('Your message has been sent successfully! I will get back to you soon.', 'success');
              contactForm.reset();
              submitBtn.innerHTML = originalBtnText;
              submitBtn.disabled = false;
          }, 1500);
          
          // Actual implementation would use fetch() to send to your backend
          /*
          fetch('/send-email', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name, email, subject, message }),
          })
          .then(response => response.json())
          .then(data => {
              showFormStatus('Your message has been sent successfully! I will get back to you soon.', 'success');
              contactForm.reset();
          })
          .catch(error => {
              showFormStatus('There was an error sending your message. Please try again later.', 'error');
          })
          .finally(() => {
              submitBtn.innerHTML = originalBtnText;
              submitBtn.disabled = false;
          });
          */
      });
  }
  
  function showFormStatus(message, type) {
      formStatus.textContent = message;
      formStatus.className = 'form-status';
      formStatus.classList.add(`form-${type}`);
      formStatus.style.display = 'block';
      
      // Hide status after 5 seconds
      setTimeout(() => {
          formStatus.style.display = 'none';
      }, 5000);
  }

  // Animate elements when they come into view
  const animateOnScroll = function() {
      const elements = document.querySelectorAll('.timeline-item, .skill-category, .education-item, .contact-info, .contact-form');
      
      elements.forEach(element => {
          const elementPosition = element.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          
          if (elementPosition < windowHeight - 100) {
              element.style.opacity = '1';
              element.style.transform = 'translateY(0)';
          }
      });
  };
  
  // Set initial state for animated elements
  document.querySelectorAll('.timeline-item, .skill-category, .education-item, .contact-info, .contact-form').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Run once on load
  animateOnScroll();
  
  // Then run on scroll
  window.addEventListener('scroll', animateOnScroll);

  // Mobile menu toggle (for smaller screens)
  const menuToggle = document.createElement('div');
  menuToggle.className = 'menu-toggle';
  menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  menuToggle.addEventListener('click', function() {
      document.querySelector('nav ul').classList.toggle('active');
      this.querySelector('i').classList.toggle('fa-bars');
      this.querySelector('i').classList.toggle('fa-times');
  });
  
  const headerContainer = document.querySelector('header .container');
  if (window.innerWidth <= 768) {
      headerContainer.appendChild(menuToggle);
  }
  
  window.addEventListener('resize', function() {
      if (window.innerWidth <= 768) {
          if (!document.querySelector('.menu-toggle')) {
              headerContainer.appendChild(menuToggle);
          }
      } else {
          const toggle = document.querySelector('.menu-toggle');
          if (toggle) {
              toggle.remove();
          }
          document.querySelector('nav ul').classList.remove('active');
      }
  });
});