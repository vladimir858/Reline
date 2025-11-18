document.addEventListener('DOMContentLoaded', function () {

    const loginBtn = document.querySelector('.header__btn-box');
    const modals = document.querySelectorAll('.modal-с');
    const closeButtons = document.querySelectorAll('.close-button-с');
    const registerBtns = document.querySelectorAll('.contact-form-b');
    const getCodes = document.querySelectorAll('.contact-form-black');


    if (!loginBtn || modals.length === 0) return;


    function openModal(modal) {

        modals.forEach(m => m.classList.remove('active'));


        const overlay = document.getElementById('overlay');
        if (overlay) {
            overlay.classList.add('active');
            requestAnimationFrame(() => {
                modal.classList.add('active');
            });
        }
    }


    function closeModal() {
        modals.forEach(m => m.classList.remove('active'));


        const hasOtherPopups = document.querySelector('.Order.active, .Order-geo.active, .acc.active');


        const overlay = document.getElementById('overlay');
        if (overlay && !hasOtherPopups) {
            setTimeout(() => {
                overlay.classList.remove('active');
            }, 400);
        }
    }


    loginBtn.addEventListener('click', function (e) {

        if (e.target.closest('.header__box-img')) return;


        if (modals[0]) openModal(modals[0]);
    });


    closeButtons.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });


    registerBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();

            if (modals[3]) openModal(modals[3]);
        });
    });


    getCodes.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();


            const currentModal = this.closest('.modal-с');
            let currentIndex = -1;


            for (let i = 0; i < modals.length; i++) {
                if (modals[i] === currentModal) {
                    currentIndex = i;
                    break;
                }
            }

            let nextModalIndex = -1;

            if (currentIndex === 0) {

                nextModalIndex = 1;
            } else if (currentIndex === 1) {

                closeModal();
                return;
            } else if (currentIndex === 3) {

                nextModalIndex = 2;
            }

            if (nextModalIndex >= 0 && modals[nextModalIndex]) {
                openModal(modals[nextModalIndex]);
            }
        });
    });


    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal();
            }
        });
    }


    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});