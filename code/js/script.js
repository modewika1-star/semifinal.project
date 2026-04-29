let dateText = document.querySelector(".date-now");
window.setInterval(() => {
    dateText.innerText = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
}, 1000);

const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });

    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });
}

document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        const active = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('active');
            i.querySelector('.faq-q span:last-child').textContent = '+';
        });
        if (!active) {
            item.classList.add('active');
            item.querySelector('.faq-q span:last-child').textContent = '-';
        }
    });
});

function showHomeMonthly(event) {
    if (event) event.preventDefault();
    document.getElementById('home-monthly-section').style.display = 'block';
    document.getElementById('home-yearly-section').style.display = 'none';
    document.querySelectorAll('.home-plan-toggle a')[0].classList.add('active');
    document.querySelectorAll('.home-plan-toggle a')[1].classList.remove('active');
}

function showHomeYearly(event) {
    if (event) event.preventDefault();
    document.getElementById('home-monthly-section').style.display = 'none';
    document.getElementById('home-yearly-section').style.display = 'block';
    document.querySelectorAll('.home-plan-toggle a')[0].classList.remove('active');
    document.querySelectorAll('.home-plan-toggle a')[1].classList.add('active');
}

function showMonthly(event) {
    if (event) event.preventDefault();
    document.getElementById('monthly-section').style.display = 'block';
    document.getElementById('yearly-section').style.display = 'none';
    document.querySelectorAll('.plan-toggle a')[0].classList.add('active');
    document.querySelectorAll('.plan-toggle a')[1].classList.remove('active');
}

function showYearly(event) {
    if (event) event.preventDefault();
    document.getElementById('monthly-section').style.display = 'none';
    document.getElementById('yearly-section').style.display = 'block';
    document.querySelectorAll('.plan-toggle a')[0].classList.remove('active');
    document.querySelectorAll('.plan-toggle a')[1].classList.add('active');
}

function toggleSeason(id) {
    const group = document.getElementById(id);
    if (group) group.classList.toggle('open');
}

(function () {
    const overlay = document.getElementById('noti-overlay');
    if (!overlay) return;

    const navType = performance.getEntriesByType('navigation')[0]?.type;
    const isReload = navType === 'reload';

    // Hide if user already saw it this session and this is not a refresh
    if (!isReload && sessionStorage.getItem('notiShown')) {
        overlay.remove();
        return;
    }

    sessionStorage.setItem('notiShown', '1');
    overlay.style.display = 'flex';
    overlay.style.animation = 'overlayFadeIn 0.4s ease both';

    const btn = overlay.querySelector('.noti-click');
    if (!btn) return;

    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        overlay.style.animation = 'overlayFadeOut 0.4s ease both';
        setTimeout(() => overlay.remove(), 400);
    });
})();
