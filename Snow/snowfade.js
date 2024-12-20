const NUMBER_OF_SNOWFLAKES = 300;
const MAX_SNOWFLAKE_SIZE = 5;
const MAX_SNOWFLAKE_SPEED = 2;
const SNOWFLAKE_COLOUR = '#ddd';
const snowflakes = [];
const FADE_OUT_DURATION = 5000; 
const TOTAL_ANIMATION_TIME = 15000; 

const canvas = document.createElement('canvas');
canvas.style.position = 'absolute';
canvas.style.top = '0px';
canvas.style.left = '0px';
canvas.style.pointerEvents = 'none';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.transition = `opacity ${FADE_OUT_DURATION}ms ease-in-out`; 
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

const createSnowflake = () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  radius: Math.floor(Math.random() * MAX_SNOWFLAKE_SIZE) + 1,
  colour: SNOWFLAKE_COLOUR,
  speed: Math.random() * MAX_SNOWFLAKE_SPEED + 3,
  sway: Math.random() - 0.5,
});

const drawSnowflake = (snowflake) => {
  ctx.beginPath();
  ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
  ctx.fillStyle = snowflake.colour;
  ctx.fill();
  ctx.closePath();
};

const updateSnowflake = (snowflake) => {
  snowflake.y += snowflake.speed;
  snowflake.x += snowflake.sway;
  if (snowflake.y > canvas.height) {
    Object.assign(snowflake, createSnowflake());
    snowflake.y = 0;
  }
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  snowflakes.forEach((snowflake) => {
    updateSnowflake(snowflake);
    drawSnowflake(snowflake);
  });

  requestAnimationFrame(animate);
};

for (let i = 0; i < NUMBER_OF_SNOWFLAKES; i++) {
  snowflakes.push(createSnowflake());
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

window.addEventListener('scroll', () => {
  canvas.style.top = `${window.scrollY}px`;
});

animate();

setTimeout(() => {
  canvas.style.opacity = '0'; 
}, TOTAL_ANIMATION_TIME - FADE_OUT_DURATION);

setTimeout(() => {
  canvas.remove();
}, TOTAL_ANIMATION_TIME);