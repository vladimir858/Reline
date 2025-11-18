document.addEventListener('DOMContentLoaded', function () {
    const burgerBtn = document.getElementById('burgerBtn');
    const popupMenu = document.getElementById('popupMenu');
    const menuOverlay = document.getElementById('overlay');
    const headerTop = document.querySelector('.header__top');
    const body = document.body;
    const orderButton = document.querySelector('.button-link');
    const orderPopup = document.querySelector('.Order');
    const orderGeoPopup = document.querySelector('.Order-geo');
    const accPopup = document.querySelector('.acc');
    const orderYesBtn = orderPopup ? orderPopup.querySelector('.Order-btn--white') : null;
    const orderOtherBtn = orderPopup ? orderPopup.querySelector('.Order-btn--black') : null;
    const geoItems = orderGeoPopup ? orderGeoPopup.querySelectorAll('.geo-item-title') : null;
    const orderCloseBtn = orderPopup ? orderPopup.querySelector('.Order-close') : null;
    const orderGeoCloseBtn = orderGeoPopup ? orderGeoPopup.querySelector('.Order-close-geo') : null;
    const accCloseBtn = accPopup ? accPopup.querySelector('.acc-close-geo') : null;
    const modal = document.querySelector('.modal');
    const openModalBtns = document.querySelectorAll('[data-modal-open]');
    const closeModalBtns = document.querySelectorAll('[data-modal-close]');
const headerBoxImg = document.querySelector('.header__box-img');
const modalWindow = document.getElementById('1'); 

if (headerBoxImg && modalWindow) {
    headerBoxImg.addEventListener('click', (e) => {
        e.preventDefault();
        openPopup(modalWindow);
    });
} else {
    if (!headerBoxImg) console.warn('Элемент .header__box-img не найден');
    if (!modalWindow) console.warn('Модальное окно с id="1" не найдено');
}

    if (!menuOverlay) {
        console.error('Элемент #overlay не найден!');
        return;
    }

    function openPopup(popup) {
        if (!popup) return;


        document.querySelectorAll('.Order.active, .Order-geo.active, .acc.active, .modal.active').forEach(p => {
            p.classList.remove('active');
        });


        menuOverlay.classList.add('active');


        requestAnimationFrame(() => {
            popup.classList.add('active');
        });
    }


    function closePopup(popup) {
        if (!popup) return;

        popup.classList.remove('active');


        const hasOtherPopups = document.querySelector('.Order.active, .Order-geo.active, .acc.active, .modal.active');


        if (!hasOtherPopups) {
            setTimeout(() => {
                menuOverlay.classList.remove('active');
            }, 400);
        }
    }


    if (burgerBtn && popupMenu && headerTop) {
        burgerBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            this.classList.toggle('active');
            popupMenu.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            headerTop.classList.toggle('active');
            body.classList.toggle('no-scroll');
        });

        menuOverlay.addEventListener('click', closeMenu);

        const popupLinks = document.querySelectorAll('.popup-link');
        popupLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        function closeMenu() {
            burgerBtn.classList.remove('active');
            popupMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            headerTop.classList.remove('active');
            body.classList.remove('no-scroll');
        }

        window.addEventListener('resize', function () {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });
    }


    if (orderButton) {
        orderButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (orderPopup) openPopup(orderPopup);
        });
    }


if (orderYesBtn) {
    orderYesBtn.addEventListener('click', () => {
        if (orderPopup && accPopup) {
         
            const accHead = accPopup.querySelector('.acc-head');
            if (accHead) accHead.textContent = 'Москва';
            
  
            openPopup(accPopup);
        }
    });
}


    if (orderOtherBtn) {
        orderOtherBtn.addEventListener('click', () => {
            if (orderPopup && orderGeoPopup) {
                openPopup(orderGeoPopup);
            }
        });
    }


    if (geoItems) {
        geoItems.forEach(item => {
            item.addEventListener('click', () => {
                const cityName = item.textContent;

                if (orderGeoPopup && accPopup) {

                    const accHead = accPopup.querySelector('.acc-head');
                    if (accHead) accHead.textContent = cityName;

                    openPopup(accPopup);
                }
            });
        });
    }


    if (orderCloseBtn) {
        orderCloseBtn.addEventListener('click', () => {
            if (orderPopup) closePopup(orderPopup);
        });
    }

    if (orderGeoCloseBtn) {
        orderGeoCloseBtn.addEventListener('click', () => {
            if (orderGeoPopup) closePopup(orderGeoPopup);
        });
    }

    if (accCloseBtn) {
        accCloseBtn.addEventListener('click', () => {
            if (accPopup) closePopup(accPopup);
        });
    }


    openModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (modal) openPopup(modal);
        });
    });


    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (modal) closePopup(modal);
        });
    });


    menuOverlay.addEventListener('click', (e) => {
        if (e.target === menuOverlay) {

            document.querySelectorAll('.Order.active, .Order-geo.active, .acc.active, .modal.active').forEach(popup => {
                closePopup(popup);
            });
        }
    });


    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {

            document.querySelectorAll('.Order.active, .Order-geo.active, .acc.active, .modal.active').forEach(popup => {
                closePopup(popup);
            });
        }
    });
});