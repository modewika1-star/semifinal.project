// ══════════════════════════
// 1  Hero Video Controls
//    (movies page only — exits immediately on all other pages)
// ══════════════════════════
(function () {
    const video = document.getElementById('hero-video');
    const soundBtn = document.getElementById('sound-btn');
    const playBtn = document.getElementById('hero-play-btn');

    if (!video) return;  // exits immediately on every other page

    function setSoundIcon(muted) {
        if (!soundBtn) return;
        const icon = soundBtn.querySelector('i');
        if (muted) {
            icon.className = 'fa-solid fa-volume-xmark';
            soundBtn.title = 'Unmute';
        } else {
            icon.className = 'fa-solid fa-volume-high';
            soundBtn.title = 'Mute';
        }
    }

    // Autoplay always muted
    video.muted = true;
    video.play().catch(() => {});
    setSoundIcon(true);

    // Sync button label with actual play state
    function setPlayLabel() {
        if (!playBtn) return;
        playBtn.textContent = video.paused ? 'Play Now' : 'Pause';
    }
    video.addEventListener('play', setPlayLabel);
    video.addEventListener('pause', setPlayLabel);
    setPlayLabel();

    // Sound button only — press to unmute, press again to mute
    if (soundBtn) {
        soundBtn.addEventListener('click', () => {
            video.muted = !video.muted;
            setSoundIcon(video.muted);
        });
    }

    // Play/Pause toggle
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
    }
})();


// ══════════════════════════
// 2  Live Clock
// ══════════════════════════
let dateText = document.querySelector(".date-now");
window.setInterval(() => {
    dateText.innerText = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
}, 1000);


// ══════════════════════════
// 3  Mobile Menu
// ══════════════════════════
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


// ══════════════════════════
// 4  FAQ Accordion
// ══════════════════════════
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


// ══════════════════════════
// 5  Plan Toggle
//    (home page + subscription page monthly / yearly)
// ══════════════════════════
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


// ══════════════════════════
// 6  Season Accordion
//    (shows page)
// ══════════════════════════
function toggleSeason(id) {
    const group = document.getElementById(id);
    if (group) group.classList.toggle('open');
}


// ══════════════════════════
// 7  Notification Overlay
//    (welcome popup)
// ══════════════════════════
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
