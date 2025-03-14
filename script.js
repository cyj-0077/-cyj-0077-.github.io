const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const fallingCharacters = [];
const colors = ["#00FFFF", "#00CCFF", "#0099FF", "#0066FF", "#0033FF", "#0000FF"];

for (let i = 0; i < canvas.width / 10; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speed = Math.random() * 5 + 1;
    const charIndex = Math.floor(Math.random() * characters.length);
    const colorIndex = Math.floor(Math.random() * colors.length);
    fallingCharacters.push({
        x: x,
        y: y,
        speed: speed,
        char: characters[charIndex],
        color: colors[colorIndex]
    });
}

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    fallingCharacters.forEach(char => {
        ctx.fillStyle = char.color;
        ctx.font = '12px Courier';
        ctx.fillText(char.char, char.x, char.y);
        char.y += char.speed;
        if (char.y > canvas.height) {
            char.y = -10;
            char.x = Math.random() * canvas.width;
            char.char = characters[Math.floor(Math.random() * characters.length)];
            char.color = colors[Math.floor(Math.random() * colors.length)];
        }
    });

    requestAnimationFrame(draw);
}

draw();

let countdown = 5;
const countdownElement = document.getElementById('countdown');
const messageElement = document.getElementById('message');

function updateCountdown() {
    countdownElement.textContent = countdown;
    if (countdown === 0) {
        countdownElement.style.display = 'none';
        messageElement.style.display = 'block';
    } else {
        countdown--;
        setTimeout(updateCountdown, 1000);
    }
}

updateCountdown();