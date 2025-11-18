
document.querySelectorAll('.filter-option').forEach(button => {
  button.addEventListener('click', function () {
    this.classList.toggle('active');
  });
});
document.querySelector('.reset-btn').addEventListener('click', function () {
  document.querySelectorAll('.filter-option').forEach(button => {
    button.classList.remove('active');
  });
});
document.addEventListener('DOMContentLoaded', function () {
  const katalogWrap = document.querySelector('.katalog-wrap');
  const filterSection = document.querySelector('.filter');
  if (katalogWrap && filterSection) {
    katalogWrap.addEventListener('click', function () {
      filterSection.classList.toggle('filter-open');
      const arrow = this.querySelector('.katalog-img-arrow');
      if (arrow) {
        arrow.classList.toggle('rotate-180', filterSection.classList.contains('filter-open'));
      }
    });
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const catalogItems = document.querySelectorAll('.katalog-item');
  const filterOptions = document.querySelectorAll('.filter-option');
  const resetButtons = document.querySelectorAll('.reset-btn');

  let filters = {
    'Категории': null,
    'Рекомендации': null
  };

  const getFilterType = (button) => {
    const columnTitle = button.closest('.filter-column')?.querySelector('.column-title');
    return columnTitle ? columnTitle.textContent.trim() : '';
  };

  const updateActiveClasses = () => {
    filterOptions.forEach(btn => {
      const type = getFilterType(btn);
      const text = btn.textContent.trim().toLowerCase();
      btn.classList.toggle('active', filters[type] === text);
    });
  };

  const filterProducts = () => {
    catalogItems.forEach(item => {
      const category = item.getAttribute('data-category')?.toLowerCase();
      const recommendation = item.getAttribute('data-recommendation')?.toLowerCase();

      const matchCategory = !filters['Категории'] || category === filters['Категории'];
      const matchRecommendation = !filters['Рекомендации'] || recommendation === filters['Рекомендации'];

      item.style.display = matchCategory && matchRecommendation ? 'block' : 'none';
    });
  };

  filterOptions.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = getFilterType(btn);
      const text = btn.textContent.trim().toLowerCase();
      if (text === 'отменить все') {
        filters[type] = null;
      }
      filters[type] = filters[type] === text ? null : text;

      updateActiveClasses();
      filterProducts();
    });
  });

  resetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filters = {
        'Категории': null,
        'Рекомендации': null
      };
      
      updateActiveClasses();
      filterProducts();
    });
  });
});