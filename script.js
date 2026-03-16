// Skills text animation 
const skills = ['JAVASCRIPT', 'HTML', 'CSS', 'REACT', 'TYPESCRIPT', 'PHOTOSHOP', 'GIT', 'JAVASCRIPT', 'HTML', 'CSS', 'REACT', 'TYPESCRIPT', 'PHOTOSHOP', 'GIT'];
const roles = ['FRONTEND', 'GRAPHIC-DESIGN', 'REACT', 'CSS', 'JAVASCRIPT', 'TYPESCRIPT', 'FRONTEND', 'GRAPHIC-DESIGN', 'REACT', 'CSS', 'JAVASCRIPT', 'TYPESCRIPT'];

const bwTrack = document.querySelectorAll('.bwTrack');
const bdTrack = document.querySelectorAll('.bdTrack');

const bwHtml = skills.map(s =>
    `<div class="bw-item"><span class="dot"></span>${s}</div>`
).join('');

bwTrack.forEach(track => {
    track.innerHTML = bwHtml + bwHtml;
});

const bdHtml = roles.map(r =>
    `<div class="bd-item"><span class="dot"></span>${r}</div>`
).join('');

bdTrack.forEach(track => {
    track.innerHTML = bdHtml + bdHtml;
});

// Slider script


// JavaScript
const track = document.getElementById('track');
const dotsContainer = document.getElementById('dots');
const slides = track.querySelectorAll('.slide');
const total = slides.length;

let current = 0;

function buildDots() {
    for (let i = 0; i < total; i++) {
        const d = document.createElement('div');
        d.className = 'dot' + (i === 0 ? ' active' : '');
        d.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(d);
    }
}

function updateDots() {
    dotsContainer.querySelectorAll('.dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
    });
}

function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    updateDots();
}

document.getElementById('prevBtn').addEventListener('click', () => goTo(current - 1));
document.getElementById('nextBtn').addEventListener('click', () => goTo(current + 1));

// Hamburger Toggle
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

buildDots();
goTo(0);