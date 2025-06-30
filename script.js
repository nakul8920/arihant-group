// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navCenter = document.querySelector('.nav-center');

hamburger.addEventListener('click', () => {
    navCenter.style.display = navCenter.style.display === 'flex' ? 'none' : 'flex';
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Contact form modal functions
function openContactForm() {
    document.getElementById('contactModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeContactForm() {
    document.getElementById('contactModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('contactModal');
    if (event.target === modal) {
        closeContactForm();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeContactForm();
    }
});

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        // Reset form
        this.reset();
        
        // Show success message
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = '#28a745';
        
        // Reset button after 2 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '#2c5530';
            submitBtn.disabled = false;
            closeContactForm();
        }, 2000);
        
        // Log form data (for demonstration)
        console.log('Form submitted:', data);
        
        // Here you would typically send the data to your server
        // fetch('/submit-contact', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data)
        // });
        
    }, 1500);
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.amenity-card, .layout-card, .pricing-card, .advantage-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.particle');
    
    parallaxElements.forEach((element, index) => {
        const speed = (index + 1) * 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Animate counters when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statElement = entry.target.querySelector('h4');
            const targetValue = parseInt(statElement.textContent);
            animateCounter(statElement, targetValue);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statElements = document.querySelectorAll('.stat');
    statElements.forEach(stat => {
        statsObserver.observe(stat);
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Smooth reveal animations for sections
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        revealObserver.observe(section);
    });
});

// Add hover effects for interactive elements
document.querySelectorAll('.blurred-image').forEach(img => {
    img.addEventListener('mouseenter', () => {
        img.style.filter = 'blur(2px)';
    });
    
    img.addEventListener('mouseleave', () => {
        img.style.filter = 'blur(5px)';
    });
});

// Preload images for better performance
function preloadImages() {
    const imageUrls = [
        '/placeholder.svg?height=400&width=600',
        '/placeholder.svg?height=300&width=400',
        '/placeholder.svg?height=500&width=800'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize preloading
document.addEventListener('DOMContentLoaded', preloadImages);

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #b31217, #ff4e50);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
document.addEventListener('DOMContentLoaded', createScrollProgress);

// Overview slider functionality
(function() {
  const images = document.querySelectorAll('.overview-slider .slider-image');
  const dots = document.querySelectorAll('.overview-slider .slider-dot');
  let current = 0;
  let timer;

  function showSlide(idx) {
    images.forEach((img, i) => {
      img.classList.toggle('active', i === idx);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
    });
    current = idx;
  }

  function nextSlide() {
    showSlide((current + 1) % images.length);
  }

  function startAutoSlide() {
    timer = setInterval(nextSlide, 4000);
  }

  function stopAutoSlide() {
    clearInterval(timer);
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
      stopAutoSlide();
      startAutoSlide();
    });
  });

  showSlide(0);
  startAutoSlide();
})();

// Overview slider image click-to-front logic
const overviewSliderImages = document.querySelectorAll('.overview-slider .slider-image');
const overviewSliderDots = document.querySelectorAll('.overview-slider .slider-dot');
if (overviewSliderImages.length > 0 && overviewSliderDots.length > 0) {
  overviewSliderImages.forEach((img, idx) => {
    img.addEventListener('click', () => {
      overviewSliderImages.forEach(i => i.classList.remove('active'));
      overviewSliderDots.forEach(d => d.classList.remove('active'));
      img.classList.add('active');
      if (overviewSliderDots[idx]) overviewSliderDots[idx].classList.add('active');
    });
  });
  overviewSliderDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      overviewSliderImages.forEach(i => i.classList.remove('active'));
      overviewSliderDots.forEach(d => d.classList.remove('active'));
      overviewSliderImages[idx].classList.add('active');
      dot.classList.add('active');
    });
  });
}

// --- Navbar Dropdown (Desktop & Mobile) ---
const dropdown = document.querySelector('.dropdown');
const dropdownMenu = document.querySelector('.dropdown-menu');

if (dropdown && dropdownMenu) {
    // For mobile: open dropdown on click
    dropdown.addEventListener('click', function(e) {
        if (window.innerWidth < 900) {
            e.preventDefault();
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        }
    });
    // For desktop: close dropdown on outside click
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target) && window.innerWidth < 900) {
            dropdownMenu.style.display = 'none';
        }
    });
}



// --- Hamburger Menu for new nav structure ---
const hamburgerBtn = document.querySelector('.hamburger');
const navCenterMenu = document.querySelector('.nav-center');

if (hamburgerBtn && navCenterMenu) {
    hamburgerBtn.addEventListener('click', () => {
        navCenterMenu.classList.toggle('active');
        hamburgerBtn.classList.toggle('active');
        if (navCenterMenu.classList.contains('active')) {
            navCenterMenu.style.display = 'flex';
        } else {
            navCenterMenu.style.display = '';
        }
    });
    // Close menu on link click (mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navCenterMenu.classList.remove('active');
            hamburgerBtn.classList.remove('active');
            navCenterMenu.style.display = '';
        });
    });
}



document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', function(e) {
    // Prevent flip on click, only open contact form
    if (typeof openContactForm === 'function') {
      openContactForm();
    }
    e.stopPropagation();
    e.preventDefault();
  });
});

// Floor Plans Section Particles Animation
(function() {
  const canvas = document.getElementById('floorParticlesBg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let w = 0, h = 0, dpr = window.devicePixelRatio || 1;
  const colors = ['#ff4e5088', '#ffb19988', '#b3121744'];
  const PARTICLE_COUNT = 28;

  function resize() {
    const section = document.getElementById('layouts');
    if (!section) return;
    w = section.offsetWidth;
    h = section.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 18 + Math.random() * 22,
        color: colors[Math.floor(Math.random() * colors.length)],
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        alpha: 0.18 + Math.random() * 0.18,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    for (let p of particles) {
      p.x += p.dx;
      p.y += p.dy;
      p.phase += 0.01 + Math.random() * 0.01;
      let a = p.alpha + Math.sin(p.phase) * 0.08;
      ctx.globalAlpha = Math.max(0, Math.min(1, a));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      // Bounce off edges
      if (p.x < -p.r) p.x = w + p.r;
      if (p.x > w + p.r) p.x = -p.r;
      if (p.y < -p.r) p.y = h + p.r;
      if (p.y > h + p.r) p.y = -p.r;
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }

  function init() {
    resize();
    createParticles();
    animate();
  }

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });
  setTimeout(init, 300); // Wait for section to render
})();

// Show contact form modal on page load
window.addEventListener('DOMContentLoaded', function() {
    openContactForm();
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
  
        fetch('https://script.google.com/macros/s/AKfycbxvEHFcB2NHs2Wyz3OKPaye1cwQ-OrkXVyrGFNz3bTSV3wDLkQvmvFwZoWO4GJFQj0/exec', { // <-- yaha apna webhook url daalo
          method: 'POST',
          mode: 'no-cors', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, phone, message })
        }).then(() => {
       
          form.reset();
          closeContactForm(); 
        }).catch(() => {
          alert('There was an error. Please try again.');
        });
      });
    }
  });