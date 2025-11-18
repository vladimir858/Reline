document.addEventListener('DOMContentLoaded', function () {
  const accordions = document.querySelectorAll('.accordion');

  accordions.forEach(accordion => {
    const head = accordion.querySelector('.accordion-head');
    const content = accordion.querySelector('.accordion-sub');
    const arrow = accordion.querySelector('.accordion-img');

    head.addEventListener('click', () => {
      const isOpen = accordion.classList.contains('open');


      accordions.forEach(item => {
        item.classList.remove('open');
      });

      if (!isOpen) {
        accordion.classList.add('open');
      }
    });
  });
});


