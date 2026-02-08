let currentPlanIndex = 0;
const totalPlans = 5;
let currentScreen = 'initial'; // initial, celebration, photo, plans

// Get elements
const yesButtons = document.querySelectorAll('#yesBtn, #yesBtn2');
const initialButtons = document.getElementById('initialButtons');
const celebrationSection = document.getElementById('celebrationSection');
const plansSection = document.getElementById('plansSection');
const celebrationNextBtn = document.getElementById('celebrationNextBtn');
const backBtn = document.getElementById('backBtn');
const nextBtn = document.getElementById('nextBtn');

// Check if device is mobile
function isMobile() {
  return window.innerWidth <= 480;
}

// Show celebration when Yes is clicked
yesButtons.forEach(btn => {
  btn.addEventListener('click', showCelebration);
});

function showCelebration() {
  initialButtons.style.display = 'none';
  
  // On mobile, skip celebration and go directly to plans
  if (isMobile()) {
    showPlans();
  } else {
    celebrationSection.style.display = 'block';
    currentScreen = 'celebration';
  }
}

celebrationNextBtn.addEventListener('click', showPlans);

function showPlans() {
  celebrationSection.style.display = 'none';
  plansSection.style.display = 'block';
  currentScreen = 'plans';
  currentPlanIndex = 0;
  updatePlanView();
}

function updatePlanView() {
  // Hide all plan views
  for (let i = 0; i < totalPlans; i++) {
    document.getElementById(`plan-${i}`).classList.remove('active');
  }
  
  // Show current plan with fade-in
  setTimeout(() => {
    document.getElementById(`plan-${currentPlanIndex}`).classList.add('active');
  }, 50);
  
  // Update button states
  backBtn.disabled = false;
  nextBtn.disabled = currentPlanIndex === totalPlans - 1;
}

backBtn.addEventListener('click', () => {
  if (currentPlanIndex > 0) {
    currentPlanIndex--;
    updatePlanView();
  } else if (!isMobile()) {
    // Go back to celebration screen if on first plan (desktop only)
    plansSection.style.display = 'none';
    celebrationSection.style.display = 'block';
    currentScreen = 'celebration';
  }
});

nextBtn.addEventListener('click', () => {
  if (currentPlanIndex < totalPlans - 1) {
    currentPlanIndex++;
    updatePlanView();
  }
});
