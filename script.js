const wheel = document.getElementById('wheel');
const spinButton = document.getElementById('spin');
const message = document.getElementById('message');
const ctx = wheel.getContext('2d');
const totalSlices = 18;
const arcSize = (2 * Math.PI) / totalSlices;
let prizes = [
    'Smartphone', 'Tablet', 'Laptop', 'Smartwatch', 'Bluetooth Speaker', 
    'Headphones', 'Camera', 'E-reader', 'Fitness Tracker', 'Gaming Console', 
    'Drone', 'Wireless Charger', 'Portable Hard Drive', 'Smart Home Assistant', 
    '4K TV', 'VR Headset', 'Projector', 'Robot Vacuum'
];
let isSpinning = false;
let hasSpun = false;
let canSpin = true; // Global variable to check if the user can spin
let currentAngle = 0;
let spinTimeout;

const colors = ['#FF5733', '#FFC300', '#DAF7A6', '#FFC300', '#FF5733', '#DAF7A6'];

function drawWheel() {
    for (let i = 0; i < totalSlices; i++) {
        const angle = i * arcSize;
        ctx.beginPath();
        ctx.arc(250, 250, 250, angle, angle + arcSize);
        ctx.lineTo(250, 250);
        ctx.fillStyle = colors[i % 2];
        ctx.fill();
        ctx.stroke();

        ctx.save();
        ctx.translate(250, 250);
        ctx.rotate(angle + arcSize / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#000';
        ctx.font = 'bold 16px Arial';
        ctx.fillText(prizes[i], 200, 10);
        ctx.restore();
    }
}

// Easing function for cubic ease-out effect
function cubicEaseOut(t) {
    return 1 - Math.pow(1 - t, 3);
}

function spin() {
    if (isSpinning || !canSpin) return;

    isSpinning = true;
    message.textContent = 'Good luck!';
    let spinAngle = Math.random() * 3000 + 3000; // Random angle between 3000 and 6000 degrees
    let duration = 5000; // 5 seconds

    const startTime = Date.now();

    function rotate() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const t = Math.min(elapsed / duration, 1); // t goes from 0 to 1

        if (t < 1) {
            const easedT = cubicEaseOut(t);
            currentAngle = spinAngle * easedT;
            wheel.style.transform = `rotate(${currentAngle}deg)`;
            spinTimeout = requestAnimationFrame(rotate);
        } else {
            stopSpin();
        }
    }

    rotate();
}

function stopSpin() {
    const prizeIndex = Math.floor(totalSlices - ((currentAngle % 360) / (360 / totalSlices)));
    
    isSpinning = false;
    hasSpun = true;
    canSpin = false;
    spinButton.textContent = 'Done';

    // Menunggu 3 detik sebelum menampilkan popup
    setTimeout(() => {
        // Display the prize popup
        const prizePopup = document.getElementById('prize-popup');
        const winnerName = document.getElementById('winner-name');
        const winnerPrize = document.getElementById('winner-prize');

        winnerName.textContent = `Nama Pemenang: ${getRandomWinner()}`;
        winnerPrize.textContent = `Hadiah: ${prizes[prizeIndex]}`;

        prizePopup.style.display = 'flex';
        prizePopup.classList.add('show');
        document.body.classList.add('no-scroll');
    }, 3000); // 3000 milidetik = 3 detik
}

function closePrizePopup() {
    const prizePopup = document.getElementById('prize-popup');
    prizePopup.classList.remove('show');
    document.body.classList.remove('no-scroll');
}

function redirect() {
    window.location.href = 'https://www.example.com'; // Replace with your desired link
}

function getRandomWinner() {
    const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Hannah', 'Ivy', 'Jack', 'Kara', 'Liam', 'Mia', 'Nora', 'Oscar'];
    return names[Math.floor(Math.random() * names.length)];
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

window.onload = function() {
    const popup = document.getElementById('popup');
    const closePopupButton = document.getElementById('close-popup');
    
    // Show the popup and prevent scrolling
    popup.classList.add('show');
    document.body.classList.add('no-scroll');
    
    closePopupButton.addEventListener('click', () => {
        popup.classList.remove('show');
        document.body.classList.remove('no-scroll'); // Allow scrolling after closing the popup
    });

    shuffleArray(prizes);
    drawWheel();
    showData1();
    document.getElementById('currentYear').textContent = new Date().getFullYear();
}

const winners = [];
const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Hannah', 'Ivy', 'Jack', 'Kara', 'Liam', 'Mia', 'Nora', 'Oscar'];

for (let i = 0; i < 15; i++) {
    const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
    winners.push({ name: names[i % names.length], prize: randomPrize });
}

function showData1() {
    const table = document.getElementById('dataTable');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Prize</th>
            </tr>
        </thead>
        <tbody>
            ${prizes.map(prize => `<tr><td>${prize}</td></tr>`).join('')}
        </tbody>
    `;
}

function showData2() {
    const table = document.getElementById('dataTable');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Name</th>
                <th>Prize</th>
            </tr>
        </thead>
        <tbody>
            ${winners.map(winner => `<tr><td>${winner.name}</td><td>${winner.prize}</td></tr>`).join('')}
        </tbody>
    `;
}
