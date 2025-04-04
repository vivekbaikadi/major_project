import ScrollReveal from 'scrollreveal';

const initScrollReveal = () => {
  // Reset ScrollReveal instances
  ScrollReveal().clean('.sr-element');
  
  ScrollReveal({
    reset: false, // Important for React
    distance: '50px',
    duration: 1000,
    easing: 'ease-out'
  }).reveal('.sr-element', {
    interval: 200,
    delay: 300
  });
};

export default initScrollReveal;