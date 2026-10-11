const form = document.getElementById('calorie-form');
const errorMessage = document.getElementById('form-error');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  errorMessage.textContent = '';

  const age = Number(document.getElementById('age').value);
  const height = Number(document.getElementById('height').value);
  const weight = Number(document.getElementById('weight').value);
  const activity = Number(document.getElementById('activity').value);
  const gender = document.querySelector('input[name="gender"]:checked').value;

  if (!age || !height || !weight || age < 15 || age > 100 || height < 100 || height > 250 || weight < 30 || weight > 300) {
    errorMessage.textContent = 'Please enter realistic values: age 15–100, height 100–250 cm, and weight 30–300 kg.';
    return;
  }

  // Mifflin–St Jeor equation, multiplied by the selected activity factor.
  const baseMetabolicRate = (10 * weight) + (6.25 * height) - (5 * age) + (gender === 'male' ? 5 : -161);
  const maintenance = Math.round(baseMetabolicRate * activity);
  const lose = Math.max(1200, maintenance - 500);
  const gain = maintenance + 300;

  animateValue('maintain-calories', maintenance);
  animateValue('lose-calories', lose);
  animateValue('gain-calories', gain);
});

function animateValue(elementId, target) {
  const element = document.getElementById(elementId);
  const start = Number(element.textContent.replace(/,/g, '')) || 0;
  const duration = 520;
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.round(start + (target - start) * eased).toLocaleString();
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
