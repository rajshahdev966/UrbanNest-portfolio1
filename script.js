/**
 * ==========================================================================
 * URBANNEST LUXE — Premium Cinematic Interaction Controller
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize modular features
  initCustomCursor();
  initScrollEffects();
  initHeroSlider();
  initBeforeAfterSlider();
  initRoomVisualizer();
  initPricingEstimator();
  initBookingWizard();
  initPortfolioFilter();
  initMobileInteractions();
  initMobileTimelineScroll();
});

/* ==========================================================================
   1. CUSTOM PREMIUM CURSOR
   ========================================================================== */
/**
 * Initializes the premium custom cursor.
 * Tracks mouse movements with linear interpolation (lerp) for smooth easing,
 * and adds contextual hover classes (.hover, .drag) on interactive elements.
 */
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.custom-cursor-follower');
  
  if (!cursor || !follower) return;

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let followerX = 0;
  let followerY = 0;

  // Track mouse coordinates
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth interpolation (easing animation)
  function renderCursor() {
    // Easing formula: position += (target - position) * coefficient
    cursorX += (mouseX - cursorX) * 0.25;
    cursorY += (mouseY - cursorY) * 0.25;
    
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;

    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    
    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;

    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Hover states on magnetic elements, buttons, and portfolio items
  const hoverables = document.querySelectorAll('a, button, .btn, .select-card, .color-dot, .finish-btn, .filter-chip, .portfolio-item, .service-card');
  
  hoverables.forEach(item => {
    item.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      follower.classList.add('hover');
    });
    
    item.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      follower.classList.remove('hover');
    });
  });

  // Special hover states for sliders
  const sliders = document.querySelectorAll('.slider-container, .slider-handle');
  sliders.forEach(slider => {
    slider.addEventListener('mouseenter', () => {
      cursor.classList.add('drag');
    });
    slider.addEventListener('mouseleave', () => {
      cursor.classList.remove('drag');
    });
  });
}

/* ==========================================================================
   2. SCROLL TRANSITIONS & DOCK REFLECTION
   ========================================================================== */
/**
 * Initializes standard scroll-triggered visual effects.
 * Includes a glassmorphic scrolled header backdrop and Intersection Observer
 * animations to smoothly fade sections in as they enter the viewport.
 */
function initScrollEffects() {
  const navbar = document.querySelector('.navbar');
  
  // Navbar glass backdrop change on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Intersection Observer for cinematic page reveal effects
  const fadeElements = document.querySelectorAll('.reveal-fade-up');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Trigger only once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeElements.forEach(el => revealObserver.observe(el));
}

/* ==========================================================================
   3. HERO SLIDESHOW AUTO-CYCLER
   ========================================================================== */
/**
 * Initializes the hero background auto-cycler.
 * Periodically transitions between luxury architectural room views by shuffling
 * the active slide class at predefined 6-second intervals.
 */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length === 0) return;

  let currentIdx = 0;
  const slideInterval = 6000; // 6 seconds

  function nextSlide() {
    slides[currentIdx].classList.remove('active');
    currentIdx = (currentIdx + 1) % slides.length;
    slides[currentIdx].classList.add('active');
  }

  setInterval(nextSlide, slideInterval);
}

/* ==========================================================================
   4. INTERACTIVE DRAGGABLE BEFORE/AFTER SLIDER
   ========================================================================== */
/**
 * Initializes the draggable Before & After layout slider.
 * Allows visitors to drag a divider panel or click the frame to reveal 
 * raw-to-refined residential layout transformations with smooth physics interpolation.
 */
function initBeforeAfterSlider() {
  const container = document.querySelector('.slider-container');
  const handle = document.querySelector('.slider-handle');
  const afterImg = document.querySelector('.slider-img-after');

  if (!container || !handle || !afterImg) return;

  let active = false;
  let targetPercentage = 50;
  let currentPercentage = 50;

  // Add click support on container
  container.addEventListener('click', (e) => {
    if (e.target.closest('.slider-handle')) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    targetPercentage = (x / rect.width) * 100;
  });

  // Mouse & Touch events
  handle.addEventListener('mousedown', () => { active = true; });
  window.addEventListener('mouseup', () => { active = false; });
  
  handle.addEventListener('touchstart', () => { active = true; }, { passive: true });
  window.addEventListener('touchend', () => { active = false; });

  const getPositionX = (e) => {
    if (e.type.startsWith('touch')) {
      return e.touches[0].clientX;
    }
    return e.clientX;
  };

  const handleMove = (e) => {
    if (!active) return;
    const rect = container.getBoundingClientRect();
    const x = getPositionX(e) - rect.left;
    
    // Bounds clamping
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    
    targetPercentage = percentage;
  };

  window.addEventListener('mousemove', handleMove);
  window.addEventListener('touchmove', handleMove, { passive: false });

  // Smooth rendering loop with linear interpolation (lerp)
  function renderSlider() {
    // Easing formula: current += (target - current) * easing_factor
    currentPercentage += (targetPercentage - currentPercentage) * 0.15;

    // Only write to the DOM if there is a visible delta to save CPU paint cycles
    if (Math.abs(targetPercentage - currentPercentage) > 0.01) {
      handle.style.left = `${currentPercentage}%`;
      afterImg.style.clipPath = `inset(0 0 0 ${currentPercentage}%)`;
    }

    requestAnimationFrame(renderSlider);
  }

  // Set initial position immediately on mount
  handle.style.left = '50%';
  afterImg.style.clipPath = 'inset(0 0 0 50%)';

  requestAnimationFrame(renderSlider);
}

/* ==========================================================================
   5. 3D WALL COLOR & FINISH VISUALIZER
   ========================================================================== */
/**
 * Initializes the live interactive Spatial Customizer (Visualizer).
 * Dynamically binds click event listeners to custom wall colors, smart lighting
 * controllers, and luxury timber finishes.
 */
function initRoomVisualizer() {
  const tintLayer = document.querySelector('.room-wall-tint');
  const colorDots = document.querySelectorAll('.color-dot');
  const finishBtns = document.querySelectorAll('.finish-btn');
  const furnitureLayer = document.querySelector('.room-furniture-overlay');
  const lightingToggle = document.getElementById('smart-lighting-switch');

  if (!tintLayer) return;

  // Handle color selection
  colorDots.forEach(dot => {
    dot.addEventListener('click', () => {
      // Remove active classes
      colorDots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');

      const selectedColor = dot.getAttribute('data-color');
      tintLayer.style.backgroundColor = selectedColor;
    });
  });

  // Handle furniture finish selection
  finishBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      finishBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const finishType = btn.getAttribute('data-finish');
      
      // Simulate furniture overlay change
      if (furnitureLayer) {
        furnitureLayer.style.opacity = '0';
        setTimeout(() => {
          if (finishType === 'stone') {
            furnitureLayer.style.backgroundImage = "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600')";
          } else if (finishType === 'charcoal') {
            furnitureLayer.style.backgroundImage = "url('https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=600')";
          } else {
            // Oak / Classic wood
            furnitureLayer.style.backgroundImage = "none";
          }
          furnitureLayer.style.opacity = '1';
        }, 300);
      }
    });
  });

  // Handle smart lighting overlay
  if (lightingToggle) {
    lightingToggle.addEventListener('change', () => {
      if (lightingToggle.checked) {
        // Active smart lighting warm ambient overlay
        tintLayer.style.filter = 'brightness(1.1) saturate(1.15)';
        document.querySelector('.room-shading-overlay').style.background = 
          'radial-gradient(circle at 80% 20%, rgba(255,160,122,0.25) 0%, rgba(139,69,19,0.15) 85%)';
      } else {
        // Reset natural daytime lighting
        tintLayer.style.filter = 'none';
        document.querySelector('.room-shading-overlay').style.background = 
          'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0) 80%)';
      }
    });
  }
}

/* ==========================================================================
   6. PRICING ESTIMATOR DESIGN STUDIO CALCULATOR
   ========================================================================== */
/**
 * Initializes the interactive pricing estimator configurator.
 * Dynamically updates calculated cost ranges and delivery timelines in real-time
 * as users toggle material tiers, room scales, style vibes, and smart home integrations.
 */
function initPricingEstimator() {
  const steps = document.querySelectorAll('.estimator-step');
  const prevBtn = document.getElementById('prev-step-btn');
  const nextBtn = document.getElementById('next-step-btn');
  const progressBar = document.querySelector('.estimator-progress-bar');
  const resultCard = document.querySelector('.estimator-result-card');

  if (steps.length === 0) return;

  let currentStepIdx = 0;
  
  // State Object to store selections
  const state = {
    projectType: 'residential',
    scale: 2,
    style: 'warm',
    material: 50,
    smartReady: false
  };

  // Base Costs
  const baseCosts = {
    'residential': 350000,
    'kitchen': 120000,
    'office': 500000,
    'sustainable': 400000
  };
  
  // Scale Add-on Multipliers
  function getScaleCost() {
    const scaleMap = {
      'residential': { 1: 0, 2: 150000, 3: 300000, 4: 500000, 5: 800000 },
      'kitchen': { 1: 0, 2: 50000, 3: 120000, 4: 250000 },
      'office': { 1: 0, 2: 200000, 3: 500000, 4: 800000 },
      'sustainable': { 1: 50000, 2: 150000, 3: 300000, 4: 600000 }
    };
    const projectMap = scaleMap[state.projectType] || scaleMap['residential'];
    return projectMap[state.scale] || 0;
  }
  
  function getStyleCost() {
    // Style Costs
    const styleMap = {
      'minimalist': 0, // Editorial Minimal
      'editorial': 80000, // Architectural/Editorial
      'warm': 150000, // Warm Minimalist
      'luxe': 350000 // Luxe Classic
    };
    return styleMap[state.style] || 0;
  }
  
  function getMaterialMultiplier() {
    // Material Quality (slider 0-100)
    if (state.material <= 33) return 1.0;
    if (state.material <= 66) return 1.25;
    return 1.5;
  }

  // Event Listeners for inputs (EVERY selection change recalculates)
  const propertyCards = document.querySelectorAll('.step-property .select-card');
  propertyCards.forEach(card => {
    card.addEventListener('click', () => {
      propertyCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      state.projectType = card.getAttribute('data-type');
      calculateEstimate();
    });
  });

  const roomCards = document.querySelectorAll('.step-rooms .select-card');
  roomCards.forEach(card => {
    card.addEventListener('click', () => {
      roomCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      state.scale = parseInt(card.getAttribute('data-rooms'));
      calculateEstimate();
    });
  });

  const styleCards = document.querySelectorAll('.step-style .select-card');
  styleCards.forEach(card => {
    card.addEventListener('click', () => {
      styleCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      state.style = card.getAttribute('data-style');
      calculateEstimate();
    });
  });

  const budgetSlider = document.getElementById('budget-range-slider');
  if (budgetSlider) {
    budgetSlider.addEventListener('input', (e) => {
      state.material = parseInt(e.target.value);
      calculateEstimate(); // Real-time update while dragging
    });
  }

  const smartCheckbox = document.getElementById('smart-ready-switch');
  if (smartCheckbox) {
    smartCheckbox.addEventListener('change', () => {
      state.smartReady = smartCheckbox.checked;
      calculateEstimate();
    });
  }

  // Navigation Logic
  function updateProgress() {
    const percentage = ((currentStepIdx + 1) / steps.length) * 100;
    if (progressBar) progressBar.style.width = `${percentage}%`;
  }

  function showStep(idx) {
    steps.forEach((step, sIdx) => {
      if (sIdx === idx) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });

    currentStepIdx = idx;
    updateProgress();

    if (currentStepIdx === 0) {
      if (prevBtn) prevBtn.style.visibility = 'hidden';
    } else {
      if (prevBtn) prevBtn.style.visibility = 'visible';
    }

    if (currentStepIdx === steps.length - 1) {
      if (nextBtn) {
        nextBtn.innerHTML = 'Reset <i class="fas fa-undo"></i>';
      }
    } else {
      if (nextBtn) {
        nextBtn.innerHTML = 'Next Step <i class="fas fa-arrow-right"></i>';
      }
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentStepIdx === steps.length - 1) {
        showStep(0);
      } else {
        showStep(currentStepIdx + 1);
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentStepIdx > 0) {
        showStep(currentStepIdx - 1);
      }
    });
  }

  // Master cost calculator formula
  function calculateEstimate() {
    const baseCost = baseCosts[state.projectType] || 350000;
    const scaleAddon = getScaleCost();
    const styleAddon = getStyleCost();
    const smartAddon = state.smartReady ? 80000 : 0;
    const materialMult = getMaterialMultiplier();

    // Final Cost = (Base Cost + Scale Add-on + Style Add-on) x Material Multiplier
    const finalCost = (baseCost + scaleAddon + styleAddon + smartAddon) * materialMult;
    const maxCost = finalCost * 1.2; // Show a range: lower = Final Cost, upper = Final Cost x 1.2

    // Timeline Logic
    let daysStr = "45–60 Days";
    if (baseCost < 200000) daysStr = "20–35 Days";
    else if (baseCost >= 200000 && baseCost <= 400000) daysStr = "45–60 Days";
    else if (baseCost > 400000) daysStr = "60–90 Days";

    // Feature tags based on selections
    const features = [];
    if (state.projectType === 'kitchen') features.push('Modular Cabinets', 'Premium Countertops', 'Ergonomics');
    else if (state.projectType === 'office') features.push('Workspace Planning', 'Ergonomic Setup', 'Productivity Design');
    else if (state.projectType === 'sustainable') features.push('Eco Materials', 'Energy Efficiency', 'Sustainable Design');
    else features.push('Spatial Planning', 'Lighting Design', 'Premium Finishes');
    
    if (state.smartReady) features.push('Smart Home Integration');

    // Dynamic formatting into INR Lakh notation
    const formattedMin = formatCurrency(finalCost);
    const formattedMax = formatCurrency(maxCost);

    // Update Result Card DOM Elements
    if (resultCard) {
      const priceEl = resultCard.querySelector('.result-price');
      const timelineEl = resultCard.querySelector('.result-timeline');
      const featuresEl = resultCard.querySelector('.result-features');

      if (priceEl) priceEl.innerText = `${formattedMin} – ${formattedMax}`;
      if (timelineEl) timelineEl.innerHTML = `Timeline: <strong>${daysStr}</strong>`;
      
      if (featuresEl) {
        featuresEl.innerHTML = '';
        features.slice(0, 3).forEach(feat => {
          const span = document.createElement('span');
          span.className = 'result-feature-tag';
          span.innerText = feat;
          featuresEl.appendChild(span);
        });
      }
    }
  }

  function formatCurrency(val) {
    if (val >= 100000) {
      let lakhs = (val / 100000).toFixed(2);
      lakhs = parseFloat(lakhs);
      return `₹${lakhs}L`;
    } else {
      let thousands = (val / 1000).toFixed(0);
      return `₹${thousands}K`;
    }
  }

  // Run initial loading values
  calculateEstimate();
  showStep(0);
}

/* ==========================================================================
   7. STATEFUL MULTI-STEP CONSULTATION BOOKING WIZARD
   ========================================================================== */
/**
 * Initializes the multi-step consultation scheduling wizard.
 * Handles form validation, interactive date and time slot configurations,
 * progress tracking, and final appointment confirmations.
 */
function initBookingWizard() {
  const wizardSections = document.querySelectorAll('.booking-section');
  const stepIndicators = document.querySelectorAll('.booking-step-indicator');
  const nextBtn = document.getElementById('booking-next-btn');
  const prevBtn = document.getElementById('booking-prev-btn');

  if (wizardSections.length === 0) return;

  let activeWizardStep = 0;
  
  // Selection states
  let selectedService = 'residential';
  let selectedDate = '';
  let selectedTime = '';

  // Step 1: Select Service cards
  const serviceCards = document.querySelectorAll('.booking-services-grid .select-card');
  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      serviceCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      selectedService = card.getAttribute('data-service');
    });
  });

  // Step 2: Time slot selection
  const timeSlots = document.querySelectorAll('.time-slots .time-slot');
  timeSlots.forEach(slot => {
    slot.addEventListener('click', () => {
      timeSlots.forEach(s => s.classList.remove('active'));
      slot.classList.add('active');
      selectedTime = slot.getAttribute('data-time');
    });
  });

  // Calendar date picker change
  const dateInput = document.getElementById('booking-date-input');
  if (dateInput) {
    // Prevent selection of past dates
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    
    dateInput.addEventListener('change', (e) => {
      selectedDate = e.target.value;
    });
  }

  function showWizardStep(idx) {
    wizardSections.forEach((section, sIdx) => {
      if (sIdx === idx) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });

    stepIndicators.forEach((indicator, iIdx) => {
      if (iIdx <= idx) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });

    activeWizardStep = idx;

    // Control buttons visibility
    if (activeWizardStep === 0) {
      if (prevBtn) prevBtn.style.visibility = 'hidden';
    } else {
      if (prevBtn) prevBtn.style.visibility = 'visible';
    }

    if (activeWizardStep === wizardSections.length - 2) {
      // Penultimate step: Name/Email Form. Next button says "Confirm Appointment"
      if (nextBtn) {
        nextBtn.innerHTML = 'Confirm Appointment <i class="fas fa-check"></i>';
      }
    } else if (activeWizardStep === wizardSections.length - 1) {
      // Final Success step: Hide both navigation buttons
      if (nextBtn) nextBtn.style.display = 'none';
      if (prevBtn) prevBtn.style.display = 'none';
    } else {
      if (nextBtn) {
        nextBtn.style.display = 'inline-flex';
        nextBtn.innerHTML = 'Select Time <i class="fas fa-arrow-right"></i>';
      }
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      // Form Validation checks per step
      if (activeWizardStep === 0) {
        // Step 1 check
        if (!selectedService) {
          alert('Please select a service type to proceed.');
          return;
        }
        showWizardStep(1);
      } else if (activeWizardStep === 1) {
        // Step 2 check
        if (!selectedDate) {
          alert('Please select a preferred date.');
          return;
        }
        if (!selectedTime) {
          alert('Please select an available time slot.');
          return;
        }
        showWizardStep(2);
      } else if (activeWizardStep === 2) {
        // Step 3 check - customer personal details validations
        const nameVal = document.getElementById('booking-name').value.trim();
        const emailVal = document.getElementById('booking-email').value.trim();
        const phoneVal = document.getElementById('booking-phone').value.trim();

        if (!nameVal || !emailVal || !phoneVal) {
          alert('Please fill out all contact information before confirming.');
          return;
        }

        // Email validation regex check
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailVal)) {
          alert('Please enter a valid email address.');
          return;
        }

        // Show successful completion card
        showWizardStep(3);
        
        // Dynamically update success appointment text details
        const summaryText = document.querySelector('.success-card p');
        if (summaryText) {
          summaryText.innerHTML = `Your consultation is scheduled on <strong>${selectedDate}</strong> at <strong>${selectedTime}</strong>.<br>We have sent a Zoom confirmation link to <strong>${emailVal}</strong>.`;
        }
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (activeWizardStep > 0 && activeWizardStep < wizardSections.length - 1) {
        showWizardStep(activeWizardStep - 1);
      }
    });
  }

  // Pre-load first step
  showWizardStep(0);
}

/* ==========================================================================
   8. PORTFOLIO EDITORIAL GALLERY FILTER MECHANISM
   ========================================================================== */
/**
 * Initializes the portfolio masonry gallery filter system.
 * Filters project cards based on categories with smooth CSS transition scaling
 * and timing configurations.
 */
function initPortfolioFilter() {
  const chips = document.querySelectorAll('.portfolio-filters .filter-chip');
  const items = document.querySelectorAll('.portfolio-masonry .portfolio-item');

  if (chips.length === 0 || items.length === 0) return;

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      // Toggle chips
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filterVal = chip.getAttribute('data-filter');

      items.forEach(item => {
        const categories = item.getAttribute('data-categories').split(' ');

        if (filterVal === 'all' || categories.includes(filterVal)) {
          item.style.display = 'block';
          // Smooth fade in
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.92)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* ==========================================================================
   9. DESIGN SERVICES LIGHTBOX MODAL
   ========================================================================== */
const modalData = {
  residential: {
    category: '01 / LIVING ROOM',
    title: 'Residential Design',
    desc: 'We transform houses into curated living experiences. From open-plan family homes to intimate apartments, our designers craft spaces that balance beauty, comfort, and function — tailored entirely around how you live.',
    hero: './living_space.png',
    keywords: ['./living_space.png', './bedroom.png', './kidsroom.png', './dinninghall_room.png', './ceeling_living.png']
  },
  kitchen: {
    category: '02 / CULINARY STUDIO',
    title: 'Modular Kitchens',
    desc: 'A kitchen is the heart of every home. We design modular kitchens that combine precision engineering with stunning aesthetics — from compact urban kitchens to sprawling island layouts with imported stone countertops and bespoke cabinetry.',
    hero: './modular_kitchen.png',
    keywords: ['./kicthen_ceelings.png', './stove.png', './storage_kitchen.png', './kitchen_island.png', './kitchen_dining.png']
  },
  office: {
    category: '03 / EXECUTIVE SUITE',
    title: 'Office Spaces',
    desc: 'We design workspaces that inspire performance. Whether it\'s a boutique studio, a growing startup, or a corporate headquarters, our office interiors are designed to reflect your brand identity while maximising focus, collaboration, and wellbeing.',
    hero: './modern_workspace.png',
    keywords: ['./reception.png', './modern_workspace.png', './conferencehall.png', './employee_desk.png', './ceelings_work.png']
  }
};

window.openServiceModal = function(type) {
  const data = modalData[type];
  if (!data) return;

  // Populate data
  document.getElementById('modal-category').innerText = data.category;
  document.getElementById('modal-title').innerText = data.title;
  document.getElementById('modal-desc').innerText = data.desc;
  document.getElementById('modal-hero-img').src = data.hero;

  // Populate Gallery
  const gallery = document.getElementById('modal-gallery');
  gallery.innerHTML = ''; // Clear existing
  
  const galleryItems = data.images || data.keywords || [];
  galleryItems.forEach((item, idx) => {
    // Check if the item is a direct image path (like ./photo.jpg or https://...)
    const isDirectPath = item.startsWith('./') || item.startsWith('/') || item.startsWith('http');
    
    // If it's a direct path, use it! Otherwise, treat it as an Unsplash keyword.
    const imgUrl = isDirectPath ? item : `https://source.unsplash.com/featured/600x400/?${item}&sig=${idx}`;
    
    const imgContainer = document.createElement('div');
    imgContainer.className = 'modal-gallery-item';
    const img = document.createElement('img');
    img.src = imgUrl;
    img.alt = isDirectPath ? 'Project Photo' : item.replace(',', ' ');
    imgContainer.appendChild(img);
    gallery.appendChild(imgContainer);
  });

  // Show Modal
  const overlay = document.getElementById('service-modal-overlay');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
};

window.closeServiceModal = function(e) {
  // If event is passed, ensure it's not bubbling from inner elements
  if (e && e.target !== e.currentTarget) return;

  const overlay = document.getElementById('service-modal-overlay');
  overlay.classList.remove('active');
  document.body.style.overflow = ''; // Restore scrolling
};

// Global ESC key listener
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const overlay = document.getElementById('service-modal-overlay');
    if (overlay && overlay.classList.contains('active')) {
      window.closeServiceModal();
    }
  }
});

/* ==========================================================================
   10. MOBILE SPECIFIC INTERACTIONS
   ========================================================================== */
/**
 * Configures mobile-only user experience patterns.
 * Handles full-screen toggle for the responsive primary navbar, collapsed
 * detail controls for estimator sidebar, and scroll-indicator dots for reviews.
 */
function initMobileInteractions() {
  if (window.innerWidth > 767) return; // Only execute on mobile

  // 1. Mobile Menu Toggle Logic
  const hamburger = document.querySelector('.mobile-hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('menu-open');
      if (navLinks.classList.contains('menu-open')) {
        hamburger.innerHTML = '<i class="fas fa-times"></i>';
        document.body.style.overflow = 'hidden';
      } else {
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = '';
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('menu-open');
        if (hamburger) hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = '';
      });
    });
  }

  // 2. Estimator Sticky Bottom Bar Collapse
  const estimatorSidebar = document.querySelector('.estimator-sidebar');
  if (estimatorSidebar && !document.querySelector('.estimator-mobile-toggle')) {
    estimatorSidebar.classList.add('collapsed');
    
    const toggleBtn = document.createElement('div');
    toggleBtn.className = 'estimator-mobile-toggle';
    toggleBtn.innerHTML = 'See Details <i class="fas fa-chevron-up"></i>';
    
    // Insert at top of sidebar
    estimatorSidebar.insertBefore(toggleBtn, estimatorSidebar.firstChild);

    toggleBtn.addEventListener('click', () => {
      estimatorSidebar.classList.toggle('collapsed');
      if (estimatorSidebar.classList.contains('collapsed')) {
        toggleBtn.innerHTML = 'See Details <i class="fas fa-chevron-up"></i>';
      } else {
        toggleBtn.innerHTML = 'Hide Details <i class="fas fa-chevron-down"></i>';
      }
    });
  }

  // 3. Testimonials Scroll Dots Synchronization
  const testimonialGrid = document.querySelector('.testimonials-grid');
  if (testimonialGrid && !document.querySelector('.testimonial-dots')) {
    const cards = testimonialGrid.querySelectorAll('.testimonial-card');
    if (cards.length > 0) {
      const dotsContainer = document.createElement('div');
      dotsContainer.className = 'testimonial-dots';
      
      cards.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (idx === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);
      });

      // Insert dots right after grid
      testimonialGrid.parentNode.insertBefore(dotsContainer, testimonialGrid.nextSibling);

      // Scroll event to sync dots
      testimonialGrid.addEventListener('scroll', () => {
        const scrollLeft = testimonialGrid.scrollLeft;
        const cardWidth = cards[0].offsetWidth;
        const activeIndex = Math.round(scrollLeft / cardWidth);
        
        const allDots = dotsContainer.querySelectorAll('.dot');
        allDots.forEach((dot, idx) => {
          if (idx === activeIndex) dot.classList.add('active');
          else dot.classList.remove('active');
        });
      }, { passive: true });
    }
  }
}

/* ==========================================================================
   11. MOBILE TIMELINE STICKY HORIZONTAL SCROLL
   ========================================================================== */
/**
 * Powers the interactive sticky vertical-to-horizontal timeline scroll section.
 * Tracks screen scroll offsets inside the container, maps vertical scrolling
 * into visual translateX horizontal shifts, and syncs progress indicator dots.
 */
function initMobileTimelineScroll() {
  const section = document.getElementById('execution-stages');
  if (!section) return;

  const scrollWrapper = section.querySelector('.timeline-scroll-wrapper');
  const cards = section.querySelectorAll('.timeline-step');
  const trackLine = section.querySelector('.timeline-track');
  const dots = section.querySelectorAll('.timeline-dot');

  if (!scrollWrapper || cards.length === 0) return;

  let isMobile = window.innerWidth <= 767;
  
  // Clean up inline styles when resizing to desktop
  window.addEventListener('resize', () => {
    isMobile = window.innerWidth <= 767;
    if (!isMobile) {
      scrollWrapper.style.transform = '';
      if (trackLine) trackLine.style.width = '';
      cards.forEach(card => card.classList.remove('mobile-active'));
    } else {
      updateTimeline();
    }
  });

  let activeIndex = -1;
  let ticking = false;

  function updateTimeline() {
    if (!isMobile) {
      ticking = false;
      return;
    }

    const sectionRect = section.getBoundingClientRect();
    const sectionTop = sectionRect.top;
    
    // Total scrollable height = section height - viewport height
    const totalScrollableHeight = sectionRect.height - window.innerHeight;
    
    // Calculate progress between 0 and 1
    let progress = 0;
    if (sectionTop <= 0) {
      progress = Math.min(1, Math.max(0, Math.abs(sectionTop) / totalScrollableHeight));
    }

    // Translation logic
    const totalWrapperWidth = scrollWrapper.scrollWidth;
    const maxTranslate = totalWrapperWidth - window.innerWidth;
    const targetTranslateX = -(maxTranslate * progress);
    
    scrollWrapper.style.transform = `translateX(${targetTranslateX}px)`;

    // Detect active card (closest to viewport center)
    const viewportCenter = window.innerWidth / 2;
    let closestIdx = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      // Calculate card's absolute screen position based on scroll wrapper translation
      const cardCenter = card.offsetLeft + (card.offsetWidth / 2) + targetTranslateX;
      const distanceToCenter = Math.abs(viewportCenter - cardCenter);

      if (distanceToCenter < minDistance) {
        minDistance = distanceToCenter;
        closestIdx = idx;
      }
    });

    if (closestIdx !== activeIndex) {
      if (activeIndex >= 0) {
        cards[activeIndex].classList.remove('mobile-active');
        if (dots[activeIndex]) dots[activeIndex].classList.remove('active');
      }
      
      activeIndex = closestIdx;
      
      cards[activeIndex].classList.add('mobile-active');
      if (dots[activeIndex]) dots[activeIndex].classList.add('active');

      // Update the progress line width
      if (trackLine) {
        const firstCardCenter = cards[0].offsetLeft + (cards[0].offsetWidth / 2);
        const lastCardCenter = cards[cards.length - 1].offsetLeft + (cards[cards.length - 1].offsetWidth / 2);
        const activeCardCenter = cards[activeIndex].offsetLeft + (cards[activeIndex].offsetWidth / 2);
        
        const totalLineWidth = lastCardCenter - firstCardCenter;
        const progressWidth = activeCardCenter - firstCardCenter;
        
        // Vertically center exactly on the icon (icon height is 56px)
        const iconVerticalCenter = cards[0].offsetTop + 28;
        
        trackLine.style.top = `${iconVerticalCenter}px`;
        trackLine.style.left = `${firstCardCenter}px`;
        trackLine.style.width = `${totalLineWidth}px`;
        trackLine.style.setProperty('--progress-width', `${Math.max(0, progressWidth)}px`);
      }
    }

    ticking = false;
  }

  // Bind passive scroll listener
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateTimeline);
      ticking = true;
    }
  }, { passive: true });
  
  // Initial check on load
  updateTimeline();
}

