/**
 * AIoT 2026 - Huan Chen (陳煥) Personal Page
 * Logic: Real-time clock, greeting system, interactive particle canvas, profile manager
 */

(function () {
  'use strict';

  // --- Constants & Defaults ---
  const DEFAULT_PROFILE = {
    name: 'Huan Chen (陳煥)',
    role: 'AIoT Engineer & Developer • 物聯網與智慧系統探索者'
  };

  const STORAGE_KEYS = {
    PROFILE: 'aiot_hc_profile',
    TIME_FORMAT: 'aiot_hc_time_format' // '12' or '24'
  };

  // --- State ---
  let is24HourFormat = localStorage.getItem(STORAGE_KEYS.TIME_FORMAT) === '24';
  let userProfile = loadUserProfile();

  // --- DOM Elements ---
  const elHours = document.getElementById('clock-hours');
  const elMinutes = document.getElementById('clock-minutes');
  const elSeconds = document.getElementById('clock-seconds');
  const elPeriod = document.getElementById('clock-period');
  const elPeriodContainer = document.getElementById('period-container');
  const elDate = document.getElementById('clock-date');
  const elTimezone = document.getElementById('clock-timezone');
  const elDayProgressVal = document.getElementById('day-progress-val');
  const elDayProgressFill = document.getElementById('day-progress-fill');

  const elGreetingPill = document.getElementById('dynamic-greeting-pill');
  const elGreetingIcon = document.getElementById('greeting-icon');
  const elGreetingText = document.getElementById('greeting-text');

  const elUserName = document.getElementById('user-name');
  const elUserRole = document.getElementById('user-role');

  const btnFormatToggle = document.getElementById('format-toggle-btn');
  const lblFormat = document.getElementById('format-label');
  const btnCopyTime = document.getElementById('copy-time-btn');
  const btnQuickEdit = document.getElementById('quick-edit-btn');
  const btnInlineRename = document.getElementById('inline-rename-btn');
  const btnResetProfile = document.getElementById('reset-profile-btn');

  const modalOverlay = document.getElementById('edit-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalCancelBtn = document.getElementById('modal-cancel-btn');
  const editForm = document.getElementById('edit-profile-form');
  const inputName = document.getElementById('input-name');
  const inputRole = document.getElementById('input-role');

  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer = null;

  const telemetryLatency = document.getElementById('telemetry-latency');

  // --- Initialize Profile ---
  function loadUserProfile() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed reading profile from storage:', e);
    }
    return { ...DEFAULT_PROFILE };
  }

  function saveUserProfile(name, role) {
    userProfile = { name: name.trim(), role: role.trim() };
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(userProfile));
    } catch (e) {
      console.warn('Failed saving profile:', e);
    }
    applyProfile();
  }

  function applyProfile() {
    if (elUserName) elUserName.textContent = userProfile.name || DEFAULT_PROFILE.name;
    if (elUserRole) elUserRole.textContent = userProfile.role || DEFAULT_PROFILE.role;
    updateGreeting();
  }

  // --- Real-time Clock Engine ---
  function updateClock() {
    const now = new Date();

    const rawHours = now.getHours();
    const rawMinutes = now.getMinutes();
    const rawSeconds = now.getSeconds();

    // Determine 12h vs 24h
    let displayHours = rawHours;
    let period = 'AM';

    if (!is24HourFormat) {
      period = rawHours >= 12 ? 'PM' : 'AM';
      displayHours = rawHours % 12;
      if (displayHours === 0) displayHours = 12;
      if (elPeriodContainer) elPeriodContainer.style.display = 'flex';
      if (elPeriod) elPeriod.textContent = period;
    } else {
      if (elPeriodContainer) elPeriodContainer.style.display = 'none';
    }

    // Format with leading zeroes
    if (elHours) elHours.textContent = String(displayHours).padStart(2, '0');
    if (elMinutes) elMinutes.textContent = String(rawMinutes).padStart(2, '0');
    if (elSeconds) elSeconds.textContent = String(rawSeconds).padStart(2, '0');

    // Update Date
    if (elDate) {
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      elDate.textContent = now.toLocaleDateString(undefined, options);
    }

    // Update Day Progress
    const totalSecondsInDay = 86400;
    const currentSeconds = rawHours * 3600 + rawMinutes * 60 + rawSeconds;
    const progressPercent = ((currentSeconds / totalSecondsInDay) * 100).toFixed(1);

    if (elDayProgressVal) elDayProgressVal.textContent = `${progressPercent}%`;
    if (elDayProgressFill) elDayProgressFill.style.width = `${progressPercent}%`;
  }

  // --- Dynamic Greeting Engine ---
  function updateGreeting() {
    const now = new Date();
    const hour = now.getHours();
    let greeting = '';
    let icon = '⚡';

    // Extract first name for friendly greeting
    const firstName = userProfile.name.split(' ')[0] || 'Huan';

    if (hour >= 5 && hour < 12) {
      greeting = `GOOD MORNING, ${firstName.toUpperCase()}`;
      icon = '🌅';
    } else if (hour >= 12 && hour < 18) {
      greeting = `GOOD AFTERNOON, ${firstName.toUpperCase()}`;
      icon = '☀️';
    } else if (hour >= 18 && hour < 22) {
      greeting = `GOOD EVENING, ${firstName.toUpperCase()}`;
      icon = '🌆';
    } else {
      greeting = `NIGHT MODE ACTIVE, ${firstName.toUpperCase()}`;
      icon = '🌙';
    }

    if (elGreetingIcon) elGreetingIcon.textContent = icon;
    if (elGreetingText) elGreetingText.textContent = greeting;
  }

  // --- Timezone Detection ---
  function initTimezone() {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Taipei';
      const offset = -new Date().getTimezoneOffset() / 60;
      const offsetSign = offset >= 0 ? '+' : '';
      if (elTimezone) {
        elTimezone.textContent = `${tz} (UTC${offsetSign}${offset})`;
      }
    } catch (e) {
      if (elTimezone) elTimezone.textContent = 'Asia/Taipei (UTC+8)';
    }
  }

  // --- Time Format Toggle ---
  function initFormatToggle() {
    if (lblFormat) {
      lblFormat.textContent = is24HourFormat ? '24H' : '12H';
    }

    btnFormatToggle?.addEventListener('click', () => {
      is24HourFormat = !is24HourFormat;
      localStorage.setItem(STORAGE_KEYS.TIME_FORMAT, is24HourFormat ? '24' : '12');
      if (lblFormat) lblFormat.textContent = is24HourFormat ? '24H' : '12H';
      updateClock();
      showToast(is24HourFormat ? 'Switched to 24-Hour Military Format' : 'Switched to 12-Hour AM/PM Format');
    });
  }

  // --- Copy Timestamp Feature ---
  function initCopyTime() {
    btnCopyTime?.addEventListener('click', () => {
      const now = new Date();
      const isoTime = now.toISOString();
      const localTimeStr = `${now.toLocaleDateString()} ${now.toLocaleTimeString()} (${elTimezone ? elTimezone.textContent : 'Local'})`;

      const textToCopy = `Current Time: ${localTimeStr}\nISO Timestamp: ${isoTime}`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast('✓ Timestamp copied to clipboard!');
        }).catch(() => {
          fallbackCopy(textToCopy);
        });
      } else {
        fallbackCopy(textToCopy);
      }
    });
  }

  function fallbackCopy(text) {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    tempInput.style.position = 'fixed';
    tempInput.style.opacity = '0';
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      showToast('✓ Timestamp copied to clipboard!');
    } catch (e) {
      showToast('Could not copy automatically');
    }
    document.body.removeChild(tempInput);
  }

  // --- Toast Notification ---
  function showToast(message) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // --- Profile Edit Modal Management ---
  function openEditModal() {
    if (!modalOverlay) return;
    inputName.value = userProfile.name;
    inputRole.value = userProfile.role;
    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    inputName.focus();
  }

  function closeEditModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
  }

  function initProfileControls() {
    btnQuickEdit?.addEventListener('click', openEditModal);
    btnInlineRename?.addEventListener('click', openEditModal);
    modalCloseBtn?.addEventListener('click', closeEditModal);
    modalCancelBtn?.addEventListener('click', closeEditModal);

    modalOverlay?.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeEditModal();
    });

    editForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const newName = inputName.value;
      const newRole = inputRole.value;
      if (newName) {
        saveUserProfile(newName, newRole);
        closeEditModal();
        showToast('✓ Profile updated successfully!');
      }
    });

    btnResetProfile?.addEventListener('click', () => {
      if (confirm('Reset profile details to default?')) {
        localStorage.removeItem(STORAGE_KEYS.PROFILE);
        userProfile = { ...DEFAULT_PROFILE };
        applyProfile();
        showToast('Profile reset to default.');
      }
    });
  }

  // --- Simulated Diagnostic Telemetry Pulse ---
  function initTelemetrySimulation() {
    setInterval(() => {
      if (!telemetryLatency) return;
      // random ping between 11ms and 19ms
      const ping = Math.floor(Math.random() * 9) + 11;
      telemetryLatency.textContent = `${ping} ms`;
    }, 3500);
  }

  // --- Interactive Ambient Particle Canvas ---
  function initParticleCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    });

    const particles = [];
    const PARTICLE_COUNT = Math.min(Math.floor((width * height) / 18000), 75);

    const mouse = {
      x: null,
      y: null,
      radius: 120
    };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 1.8 + 0.8;
        this.color = Math.random() > 0.4 ? 'rgba(0, 240, 255,' : 'rgba(168, 85, 247,';
        this.alpha = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 2.5;
            this.y -= (dy / dist) * force * 2.5;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color} ${this.alpha})`;
        ctx.fill();
      }
    }

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Connect close particles with cyber mesh lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    }

    initParticles();
    animate();
  }

  // --- Startup Execution ---
  function init() {
    applyProfile();
    initTimezone();
    initFormatToggle();
    initCopyTime();
    initProfileControls();
    initTelemetrySimulation();
    initParticleCanvas();

    // Start clock tick immediately and then every second
    updateClock();
    updateGreeting();
    setInterval(() => {
      updateClock();
    }, 1000);

    // Refresh greeting periodically
    setInterval(updateGreeting, 60000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
