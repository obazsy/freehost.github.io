document.addEventListener('DOMContentLoaded', function() {
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
});
