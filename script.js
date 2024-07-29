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
let hasSpun = false; // Variable to track if the user has already spun the wheel
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

function spin() {
    if (isSpinning || !canSpin) return; // Prevent spinning if already spinning or can't spin

    isSpinning = true;
    message.textContent = 'Good luck!';
    let spinAngle = (Math.random() * 3000 + 3000) * 0.35; // Adjust this to control the randomness and speed (35%)
    let duration = 3000; // Duration of the spin in milliseconds

    const startTime = Date.now();

    function rotate() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;

        if (elapsed >= duration) {
            clearTimeout(spinTimeout);
            stopSpin();
            return;
        }

        currentAngle += (spinAngle / duration) * (1000 / 60); // Adjust speed here
        wheel.style.transform = `rotate(${currentAngle}deg)`;

        spinTimeout = setTimeout(rotate, 1000 / 60); // 60 FPS
    }

    rotate();
}

function stopSpin() {
    const prizeIndex = Math.floor(totalSlices - ((currentAngle % 360) / (360 / totalSlices)));
    message.textContent = `You won: ${prizes[prizeIndex]}!`;
    isSpinning = false;
    hasSpun = true; // Set the flag to true indicating the user has spun the wheel
    canSpin = false; // Set canSpin to false indicating the user can't spin again
    spinButton.textContent = 'Done'; // Change the button text to 'Done'
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Show popup when page loads
window.onload = function() {
    const popup = document.getElementById('popup');
    const closePopupButton = document.getElementById('close-popup');
    
    popup.classList.add('show');
    
    closePopupButton.addEventListener('click', () => {
        popup.classList.remove('show');
    });

    shuffleArray(prizes); // Shuffle prizes when the page loads
    drawWheel(); // Redraw the wheel with shuffled prizes
    showData1(); // Initialize with Data1
    document.getElementById('currentYear').textContent = new Date().getFullYear(); // Set current year in footer
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
