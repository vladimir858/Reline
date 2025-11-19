document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.slider');
  const prevBtn = document.querySelector('.prev-arrow');
  const nextBtn = document.querySelector('.next-arrow');
  const productCards = document.querySelectorAll('.product-card');
  const sliderTrack = document.querySelector('.slider-track');

  if (!slider || !prevBtn || !nextBtn || productCards.length === 0) {
    console.error('Один из элементов слайдера не найден!');
    return;
  }

  let cardWidth = 0;
  let currentIndex = 0;
  let visibleCards = 3;
  let isAnimating = false;
  let gap = 20;
  let resizeTimeout;

  function updateVisibleCards() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1250) return 2;
    return 3;
  }

  function updateCardWidth() {
    if (productCards.length === 0) return;

    const card = productCards[0];
    cardWidth = card.offsetWidth + gap;
  }

  function updateSlider() {
    if (isAnimating) return;
    isAnimating = true;


    const offset = -currentIndex * cardWidth * visibleCards;
    slider.style.transform = `translateX(${offset}px)`;
    prevBtn.disabled = true;
    nextBtn.disabled = true;
  }

  function updateButtons() {
    const maxIndex = Math.max(0, Math.ceil(productCards.length / visibleCards) - 1);
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
  }

  function slideNext() {
    if (isAnimating) return;
    const maxIndex = Math.max(0, Math.ceil(productCards.length / visibleCards) - 1);
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateSlider();
    }
  }

  function slidePrev() {
    if (isAnimating) return;
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  }

  function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (isAnimating) return;

      const prevVisibleCards = visibleCards;
      visibleCards = updateVisibleCards();

      if (prevVisibleCards !== visibleCards) {
        const maxIndex = Math.max(0, Math.ceil(productCards.length / visibleCards) - 1);
        currentIndex = Math.min(currentIndex, maxIndex);
      }

      updateCardWidth();
      slider.style.transition = 'none';

      slider.style.transform = `translateX(${-currentIndex * cardWidth * visibleCards}px)`;

      void slider.offsetWidth;

      slider.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      updateButtons();
    }, 100);
  }

  function initSlider() {
    visibleCards = updateVisibleCards();
    updateCardWidth();

    slider.style.transition = 'none';
    slider.style.transform = `translateX(0px)`;
    void slider.offsetWidth;
    slider.style.transition = '';

    updateButtons();
  }

  nextBtn.addEventListener('click', slideNext);
  prevBtn.addEventListener('click', slidePrev);
  window.addEventListener('resize', handleResize);

  slider.addEventListener('transitionend', () => {
    isAnimating = false;
    updateButtons();
  });

  initSlider();
});