document.addEventListener('DOMContentLoaded', function() {
  // Check if the screen width is greater than 1024px
  if (window.innerWidth > 1024) {
    document.querySelector('.services-section').addEventListener('mousemove', function(event) {
      const words = document.querySelectorAll('.word');
      const rect = this.getBoundingClientRect();
      const mouseX = event.clientX - rect.left; // X position within .services-section
      const mouseY = event.clientY - rect.top; // Y position within .services-section
      
      words.forEach(word => {
        const wordRect = word.getBoundingClientRect();
        const wordX = wordRect.left + wordRect.width / 2 - rect.left;
        const wordY = wordRect.top + wordRect.height / 2 - rect.top;
        const distance = Math.sqrt(Math.pow(mouseX - wordX, 2) + Math.pow(mouseY - wordY, 2));
        const opacity = Math.min(Math.max(1 - distance / 300, 0), 1);
        word.style.opacity = opacity;
      });
    });
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      } else {
        entry.target.classList.remove('in-view');
      }
    });
  });

  const logos = document.querySelectorAll('.logoright, .logoleft');
  logos.forEach(logo => observer.observe(logo));
});

