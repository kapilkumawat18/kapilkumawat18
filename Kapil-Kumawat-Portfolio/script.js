/* =========================================================
   KAPIL KUMAWAT PORTFOLIO — FINAL STABLE JAVASCRIPT
========================================================= */

(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const toast = (message) => {
    const target = $('#toast');
    if (!target) return;
    target.textContent = message;
    target.classList.add('show');
    clearTimeout(window.__kapilToastTimer);
    window.__kapilToastTimer = setTimeout(() => target.classList.remove('show'), 2200);
  };

  const projectData = {
    'e-learning': {
      type: 'WEB / SOFTWARE',
      title: 'E-Learning Platform',
      description: 'An online learning platform designed to provide users with an organized digital learning experience.',
      tech: ['HTML', 'CSS', 'Java', 'MySQL'],
      features: ['Learning content organization', 'User learning experience', 'Structured course flow', 'Additional features to be documented'],
      learning: '[ADD WHAT YOU LEARNED]'
    },
    voting: {
      type: 'WEB APPLICATION',
      title: 'Online Voting System',
      description: 'A web-based platform designed to enable online voting with structured data management.',
      tech: ['HTML', 'CSS', 'Python', 'MySQL'],
      features: ['Voting workflow', 'Database-backed data management', 'User interface', 'Voting records'],
      learning: 'Working with a Python backend, structured data storage and a web interface.'
    },
    bike: {
      type: 'SOFTWARE / MANAGEMENT',
      title: 'Bike Management System',
      description: 'A management system for product information, sales, billing and sales statistics.',
      tech: ['HTML', 'CSS', 'C', 'Supabase / MySQL'],
      features: ['Product information management', 'Billing', 'Sales management', 'Sales statistics', 'Database integration'],
      learning: 'Connecting application logic, data management and practical business workflows.'
    },
    music: {
      type: 'SOFTWARE / APPLICATION',
      title: 'Music Player',
      description: 'A music player application designed around a clean interface for playing and managing music.',
      tech: ['HTML', 'CSS', 'Java', 'MySQL'],
      features: ['Music playback interface', 'Music management', 'Additional features to be documented'],
      learning: '[ADD WHAT YOU LEARNED]'
    }
  };

  /* =========================================================
     NAVBAR + MOBILE DRAWER
  ========================================================= */
  (() => {
    const menu = $('#menuBtn');
    const nav = $('#navLinks');
    const navbar = $('#navbar');
    if (!menu || !nav) return;

    menu.innerHTML = '<span class="hamburger-lines" aria-hidden="true"><span></span><span></span><span></span></span>';
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open navigation menu');

    let hideTimer = null;
    let lastScrollY = window.scrollY;

    const isMobile = () => window.matchMedia('(max-width: 1000px)').matches;

    const clearHide = () => {
      if (hideTimer) {
        clearTimeout(hideTimer);
        hideTimer = null;
      }
    };

    const closeMenu = () => {
      clearHide();
      nav.classList.remove('open');
      menu.classList.remove('is-open');
      menu.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-label', 'Open navigation menu');
      document.body.classList.remove('menu-open');
    };

    const scheduleHide = () => {
      clearHide();
      if (!isMobile() || !nav.classList.contains('open')) return;
      hideTimer = setTimeout(closeMenu, 4500);
    };

    const openMenu = () => {
      nav.classList.add('open');
      menu.classList.add('is-open');
      menu.setAttribute('aria-expanded', 'true');
      menu.setAttribute('aria-label', 'Close navigation menu');
      document.body.classList.add('menu-open');
      scheduleHide();
    };

    menu.addEventListener('click', (event) => {
      event.stopPropagation();
      nav.classList.contains('open') ? closeMenu() : openMenu();
    });

    $$('a', nav).forEach((link) => link.addEventListener('click', closeMenu));
    nav.addEventListener('pointerenter', clearHide);
    nav.addEventListener('pointerleave', scheduleHide);
    nav.addEventListener('pointerdown', clearHide);

    document.addEventListener('pointerdown', (event) => {
      if (!isMobile() || !nav.classList.contains('open')) return;
      if (!nav.contains(event.target) && !menu.contains(event.target)) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });

    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (isMobile() && nav.classList.contains('open') && Math.abs(y - lastScrollY) > 8) closeMenu();
      lastScrollY = y;
      if (navbar) navbar.classList.toggle('scrolled', y > 20);
    }, { passive: true });

    window.addEventListener('resize', () => {
      if (!isMobile()) closeMenu();
    }, { passive: true });
  })();

  /* =========================================================
     BACK TO TOP
  ========================================================= */
  (() => {
    const button = $('#backTop');
    if (!button) return;

    const update = () => button.classList.toggle('show', window.scrollY > 500);
    window.addEventListener('scroll', update, { passive: true });
    update();

    button.addEventListener('click', (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  })();

  /* =========================================================
     THEME SWITCHER
  ========================================================= */
  (() => {
    const themeButton = $('#themeBtn');

    try {
      if (localStorage.getItem('kapil-theme') === 'light') {
        document.documentElement.classList.add('light');
      }
    } catch (_) {}

    if (!themeButton) return;

    themeButton.addEventListener('click', () => {
      const light = document.documentElement.classList.toggle('light');
      try {
        localStorage.setItem('kapil-theme', light ? 'light' : 'dark');
      } catch (_) {}
    });
  })();

  /* =========================================================
     ACTIVE NAV SECTION OBSERVER
  ========================================================= */
  (() => {
    const sections = $$('main section[id]');
    const anchors = $$('#navLinks a');
    if (!sections.length || !anchors.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        anchors.forEach((anchor) => {
          anchor.classList.toggle('active', anchor.getAttribute('href') === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: '-25% 0px -65% 0px' });

    sections.forEach((section) => observer.observe(section));
  })();

  /* =========================================================
     REVEAL ON SCROLL
  ========================================================= */
  (() => {
    const elements = $$('.reveal');
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });

    elements.forEach((el) => observer.observe(el));
  })();

  /* =========================================================
     PROJECT FILTERS
  ========================================================= */
  (() => {
    $$('.filter').forEach((button) => {
      button.addEventListener('click', () => {
        $$('.filter').forEach((item) => item.classList.remove('active'));
        button.classList.add('active');

        const filter = button.dataset.filter || 'all';

        $$('.project-card').forEach((card) => {
          card.style.display = filter === 'all' || card.dataset.category === filter ? '' : 'none';
        });
      });
    });
  })();

  /* =========================================================
     PROJECT DETAILS MODAL
  ========================================================= */
  (() => {
    const modal = $('#projectModal');
    if (!modal) return;

    const modalType = $('#modalType');
    const modalTitle = $('#modalTitle');
    const modalDescription = $('#modalDescription');
    const modalTech = $('#modalTech');
    const modalFeatures = $('#modalFeatures');
    const modalLearning = $('#modalLearning');
    const modalClose = $('#modalClose');

    const openProject = (id) => {
      const project = projectData[id];

      if (!project) {
        console.error(`Project data not found: ${id}`);
        return;
      }

      if (modalType) modalType.textContent = project.type;
      if (modalTitle) modalTitle.textContent = project.title;
      if (modalDescription) modalDescription.textContent = project.description;

      if (modalTech) {
        modalTech.innerHTML = project.tech.map((tech) => `<span>${tech}</span>`).join('');
      }

      if (modalFeatures) {
        modalFeatures.innerHTML = project.features.map((feature) => `<li>${feature}</li>`).join('');
      }

      if (modalLearning) modalLearning.textContent = project.learning;

      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
    };

    const closeProject = () => {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
    };

    document.addEventListener('click', (event) => {
      const button = event.target.closest('.details-btn');
      if (!button) return;

      event.preventDefault();
      event.stopPropagation();

      const card = button.closest('.project-card');
      const id = card?.dataset.project;
      if (id) openProject(id);
    });

    modalClose?.addEventListener('click', closeProject);

    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeProject();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && modal.classList.contains('show')) closeProject();
    });

    window.openProject = openProject;
    window.closeProjectModal = closeProject;
  })();

  /* =========================================================
     PLACEHOLDER LINKS
     IMPORTANT: This block does NOT intercept #contactForm.
  ========================================================= */
  (() => {
    $$('[data-placeholder]').forEach((element) => {
      if (element.hasAttribute('download') || element.id === 'resumeDownload') return;

      element.addEventListener('click', (event) => {
        event.preventDefault();
        toast(`Add your ${element.dataset.placeholder} link in index.html`);
      });
    });
  })();

  /* =========================================================
     CONTACT FORM — FORMSPREE
  ========================================================= */
  (() => {
    const form = $('#contactForm');
    if (!form) return;

    const button = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      if (!button) return;

      const originalText = button.textContent.trim();

      const nameField = form.elements.namedItem('name');
      const emailField = form.elements.namedItem('email');
      const messageField = form.elements.namedItem('message');

      const name = nameField?.value.trim() || '';
      const email = emailField?.value.trim() || '';
      const message = messageField?.value.trim() || '';

      if (!name || !email || !message) {
        button.disabled = false;
        button.textContent = 'Fill All Fields';

        setTimeout(() => {
          button.textContent = originalText;
        }, 2000);

        return;
      }

      if (emailField && !emailField.checkValidity()) {
        button.disabled = false;
        button.textContent = 'Enter Valid Email';

        setTimeout(() => {
          button.textContent = originalText;
        }, 2000);

        emailField.focus();
        return;
      }

      button.disabled = true;
      button.textContent = 'Sending...';

      try {
        const formData = new FormData(form);

        // Explicitly guarantee that Formspree receives the fields.
        formData.set('name', name);
        formData.set('email', email);
        formData.set('message', message);

        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json'
          }
        });

        let data = {};

        try {
          data = await response.json();
        } catch (_) {}

        console.log('Formspree response:', data);

        if (response.ok) {
          button.textContent = 'Message Sent ✓';
          form.reset();

          setTimeout(() => {
            button.disabled = false;
            button.textContent = originalText;
          }, 2500);

          return;
        }

        console.error('Formspree error:', data);

        button.disabled = false;
        button.textContent = 'Try Again ↗';

        if (data?.errors?.length) {
          console.error('Formspree validation errors:', data.errors);
        }
      } catch (error) {
        console.error('Network error:', error);

        button.disabled = false;
        button.textContent = 'Try Again ↗';
      }
    });
  })();

  /* =========================================================
     LIVE BACKGROUND
  ========================================================= */
  (() => {
    const canvas = $('#liveBackground');
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let points = [];
    let raf = 0;
    let last = 0;

    const pointer = { x: -9999, y: -9999, active: false };

    const colors = {
      dot: 'rgba(115,230,174,.62)',
      glow: 'rgba(123,167,255,.08)'
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = reduce
        ? 0
        : Math.min(54, Math.max(22, Math.floor((width * height) / 26000)));

      points = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.5 + 0.55,
        phase: Math.random() * Math.PI * 2
      }));
    };

    const draw = (time) => {
      const dt = Math.min(32, time - last || 16);
      last = time;

      ctx.clearRect(0, 0, width, height);

      if (!reduce) {
        const glow = ctx.createRadialGradient(
          width * 0.5,
          height * 0.25,
          0,
          width * 0.5,
          height * 0.25,
          Math.max(width, height) * 0.75
        );

        glow.addColorStop(0, colors.glow);
        glow.addColorStop(0.55, 'rgba(7,9,13,.015)');
        glow.addColorStop(1, 'rgba(7,9,13,.20)');

        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);

        points.forEach((point) => {
          point.x += point.vx * dt;
          point.y += point.vy * dt;

          if (point.x < -20) point.x = width + 20;
          if (point.x > width + 20) point.x = -20;
          if (point.y < -20) point.y = height + 20;
          if (point.y > height + 20) point.y = -20;

          if (pointer.active) {
            const dx = pointer.x - point.x;
            const dy = pointer.y - point.y;
            const distance = Math.hypot(dx, dy);

            if (distance < 130) {
              const force = (1 - distance / 130) * 0.018;
              point.x -= dx * force;
              point.y -= dy * force;
            }
          }
        });

        ctx.lineWidth = 0.7;

        for (let i = 0; i < points.length; i++) {
          const a = points[i];

          for (let j = i + 1; j < points.length; j++) {
            const b = points[j];
            const distance = Math.hypot(a.x - b.x, a.y - b.y);

            if (distance < 105) {
              ctx.strokeStyle = `rgba(115,230,174,${0.11 * (1 - distance / 105)})`;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }

        points.forEach((point) => {
          const pulse = 0.72 + Math.sin(time * 0.0012 + point.phase) * 0.22;

          ctx.beginPath();
          ctx.arc(point.x, point.y, point.r * pulse, 0, Math.PI * 2);
          ctx.fillStyle = colors.dot;
          ctx.fill();
        });
      }

      raf = requestAnimationFrame(draw);
    };

    resize();

    window.addEventListener('resize', resize, { passive: true });

    window.addEventListener('pointermove', (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    }, { passive: true });

    window.addEventListener('pointerleave', () => {
      pointer.active = false;
    }, { passive: true });

    raf = requestAnimationFrame(draw);

    document.addEventListener('visibilitychange', () => {
      cancelAnimationFrame(raf);

      if (!document.hidden) {
        last = performance.now();
        raf = requestAnimationFrame(draw);
      }
    });
  })();

  /* =========================================================
     HERO SUBTITLE TYPEWRITER
  ========================================================= */
  (() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const element = $('.hero-copy h2');
    if (!element || element.dataset.typewriterDone) return;

    const original = element.textContent.trim();

    element.dataset.typewriterDone = 'true';
    element.classList.add('typewriter-live');
    element.textContent = '';

    const caret = document.createElement('span');
    caret.className = 'typewriter-caret';
    caret.setAttribute('aria-hidden', 'true');
    element.appendChild(caret);

    let index = 0;

    const write = () => {
      if (index < original.length) {
        caret.before(document.createTextNode(original[index++]));
        setTimeout(write, 34 + Math.random() * 16);
      }
    };

    setTimeout(write, 650);
  })();

  /* =========================================================
     KAPIL KUMAWAT — LOOPING TYPEWRITER
  ========================================================= */
  (() => {
    const name = document.querySelector('.typewriter-name');
    const text = document.querySelector('.typewriter-text');
    const placeholder = document.querySelector('.typewriter-placeholder');

    if (!name || !text) return;

    const TYPE_SPEED = 100;
    const DELETE_SPEED = 65;
    const HOLD_TIME = 5000;
    const RESTART_DELAY = 700;

    const firstName = 'Kapil';
    const lastName = 'Kumawat';

    if (placeholder) {
      placeholder.style.visibility = 'hidden';
      placeholder.style.position = 'absolute';
      placeholder.style.pointerEvents = 'none';
    }

    name.style.position = 'relative';
    text.style.display = 'inline-block';
    text.style.minWidth = '100%';

    let running = true;

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    async function typeNormal(value) {
      for (const char of value) {
        if (!running) return;
        text.appendChild(document.createTextNode(char));
        await sleep(TYPE_SPEED);
      }
    }

    async function typeGreen(value) {
      const green = document.createElement('em');
      green.className = 'typewriter-green';
      text.appendChild(green);

      for (const char of value) {
        if (!running) return;
        green.textContent += char;
        await sleep(TYPE_SPEED);
      }

      return green;
    }

    async function deleteGreen(green) {
      while (green && green.textContent.length > 0) {
        green.textContent = green.textContent.slice(0, -1);
        await sleep(DELETE_SPEED);
      }

      green?.remove();
    }

    async function deleteNormal() {
      while (text.firstChild) {
        const node = text.lastChild;

        if (node.nodeType === Node.TEXT_NODE) {
          node.textContent = node.textContent.slice(0, -1);
          if (!node.textContent) node.remove();
        } else {
          node.remove();
        }

        await sleep(DELETE_SPEED);
      }
    }

    async function loop() {
      await sleep(RESTART_DELAY);

      while (running) {
        text.innerHTML = '';

        await typeNormal(firstName + ' ');

        const green = await typeGreen(lastName);

        await sleep(HOLD_TIME);
        await deleteGreen(green);
        await deleteNormal();
        await sleep(RESTART_DELAY);
      }
    }

    loop();
  })();

  /* =========================================================
     TERMINAL TYPEWRITER
  ========================================================= */
  (() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const terminalOutput = $('.terminal-output:not(.green)');
    if (!terminalOutput || terminalOutput.dataset.typewriterDone) return;

    terminalOutput.dataset.typewriterDone = 'true';

    const originalHTML = terminalOutput.innerHTML;

    const lines = originalHTML
      .split(/<br\s*\/?>/i)
      .map((line) => line.replace(/<[^>]+>/g, '').trim())
      .filter(Boolean);

    if (!lines.length) return;

    terminalOutput.innerHTML = '';
    terminalOutput.classList.add('typewriter-live');

    let lineIndex = 0;

    const writeLine = () => {
      if (lineIndex >= lines.length) return;

      const holder = document.createElement('span');
      holder.style.display = 'block';

      const caret = document.createElement('span');
      caret.className = 'typewriter-caret';

      holder.appendChild(caret);
      terminalOutput.appendChild(holder);

      const line = lines[lineIndex++];
      let index = 0;

      const tick = () => {
        if (index < line.length) {
          caret.before(document.createTextNode(line[index++]));
          setTimeout(tick, 30);
        } else {
          caret.remove();
          setTimeout(writeLine, 180);
        }
      };

      tick();
    };

    setTimeout(writeLine, 1100);
  })();

  /* =========================================================
     DEVICON SKILLS
  ========================================================= */
  (() => {
    const iconMap = {
      Java: 'devicon-java-plain',
      Python: 'devicon-python-plain',
      C: 'devicon-c-plain',
      HTML: 'devicon-html5-plain',
      CSS: 'devicon-css3-plain',
      Bootstrap: 'devicon-bootstrap-plain',
      'Tailwind CSS': 'devicon-tailwindcss-original',
      Flask: 'devicon-flask-original',
      MySQL: 'devicon-mysql-plain',
      Supabase: 'devicon-supabase-plain',
      Git: 'devicon-git-plain',
      GitHub: 'devicon-github-original',
      'VS Code': 'devicon-vscode-plain'
    };

    $$('.tech-item[data-tech]').forEach((item) => {
      const iconBox = $('.tech-icon', item);
      const iconClass = iconMap[item.dataset.tech];

      if (!iconBox || !iconClass) return;

      iconBox.innerHTML = `<i class="${iconClass} devicon" aria-hidden="true"></i>`;
      iconBox.classList.add('devicon-small');
    });
  })();

  /* =========================================================
     POINTER / 3D INTERACTIONS
  ========================================================= */
  (() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer:fine)').matches && !reduce;

    $$('.project-card,.cert-card,.learning-card,.panel,.stat,.tech-item').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();

        card.style.setProperty('--card-x', `${event.clientX - rect.left}px`);
        card.style.setProperty('--card-y', `${event.clientY - rect.top}px`);
      }, { passive: true });
    });

    if (!fine) return;

    $$('.tech-item').forEach((item) => {
      item.addEventListener('pointermove', (event) => {
        const rect = item.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        item.style.transform =
          `perspective(650px) rotateX(${(-y * 7).toFixed(2)}deg) ` +
          `rotateY(${(x * 8).toFixed(2)}deg) translateY(-5px) scale(1.02)`;
      });

      item.addEventListener('pointerleave', () => {
        item.style.transform = '';
      });
    });

    const hero = $('.hero');
    const heroFx = $('.hero-fx');

    if (hero && heroFx) {
      hero.addEventListener('pointermove', (event) => {
        const rect = hero.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        heroFx.style.transform = `translate3d(${x * 10}px,${y * 8}px,0)`;
      }, { passive: true });

      hero.addEventListener('pointerleave', () => {
        heroFx.style.transform = '';
      });
    }

    const terminal = $('.terminal');
    const terminalWrap = $('.terminal-wrap');

    if (terminal && terminalWrap) {
      terminalWrap.addEventListener('pointermove', (event) => {
        const rect = terminalWrap.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        terminal.style.transform =
          `rotateX(${(-y * 3.5).toFixed(2)}deg) ` +
          `rotateY(${(x * 5).toFixed(2)}deg) translateZ(4px)`;
      }, { passive: true });

      terminalWrap.addEventListener('pointerleave', () => {
        terminal.style.transform = '';
      });
    }

    $$('.btn,.nav-resume').forEach((button) => {
      button.addEventListener('pointermove', (event) => {
        const rect = button.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        button.style.transform =
          `translate(${(x * 4).toFixed(1)}px,${(y * 3).toFixed(1)}px)`;
      }, { passive: true });

      button.addEventListener('pointerleave', () => {
        button.style.transform = '';
      });
    });

    const cursorDot = $('.cursor-dot');
    const cursorRing = $('.cursor-ring');

    if (cursorDot && cursorRing) {
      let ringX = 0;
      let ringY = 0;
      let targetX = 0;
      let targetY = 0;

      document.addEventListener('pointermove', (event) => {
        targetX = event.clientX;
        targetY = event.clientY;

        cursorDot.style.opacity = '1';
        cursorRing.style.opacity = '1';

        document.documentElement.style.setProperty('--mx', `${targetX}px`);
        document.documentElement.style.setProperty('--my', `${targetY}px`);
      }, { passive: true });

      const cursorLoop = () => {
        ringX += (targetX - ringX) * 0.18;
        ringY += (targetY - ringY) * 0.18;

        cursorRing.style.left = `${ringX}px`;
        cursorRing.style.top = `${ringY}px`;
        cursorDot.style.left = `${targetX}px`;
        cursorDot.style.top = `${targetY}px`;

        requestAnimationFrame(cursorLoop);
      };

      cursorLoop();

      $$('a,button,.tech-item,.project-card,.stat').forEach((element) => {
        element.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
        element.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
      });
    }
  })();

  /* =========================================================
     NEURAL CORE
  ========================================================= */
  (() => {
    const core = $('.neural-core');
    const hero = $('.hero');

    if (
      !core ||
      !hero ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return;

    const fine = window.matchMedia('(pointer:fine)').matches;

    if (fine) {
      hero.addEventListener('pointermove', (event) => {
        const rect = hero.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        core.style.marginLeft = `${(x * 18).toFixed(1)}px`;
        core.style.marginTop = `${(y * 12).toFixed(1)}px`;

        core.style.filter =
          `drop-shadow(${(-x * 10).toFixed(1)}px ${(y * 8).toFixed(1)}px 38px rgba(115,230,174,.13))`;
      }, { passive: true });

      hero.addEventListener('pointerleave', () => {
        core.style.marginLeft = '';
        core.style.marginTop = '';
        core.style.filter = '';
      });
    } else {
      let phase = 0;

      const tick = () => {
        phase += 0.008;

        core.style.marginLeft = `${(Math.sin(phase) * 4).toFixed(1)}px`;
        core.style.marginTop = `${(Math.cos(phase * 0.8) * 3).toFixed(1)}px`;

        requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    }
  })();

  /* =========================================================
     SCROLL PROGRESS
  ========================================================= */
  (() => {
    const progress = $('.scroll-progress span');
    if (!progress) return;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const value = max > 0 ? (window.scrollY / max) * 100 : 0;

      progress.style.width = `${Math.max(0, Math.min(100, value))}%`;
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  })();

  /* =========================================================
     3-SECOND VISUAL LOADER
  ========================================================= */
  (() => {
    const loader = $('.page-loader');
    if (!loader) return;

    const progress = $('#loaderProgress');
    const percent = $('#loaderPercent');
    const status = $('#loaderStatus');

    const duration = 3000;
    const start = performance.now();

    const stages = [
      [0, 'INITIALIZING SYSTEM...'],
      [15, 'LOADING NEURAL CORE...'],
      [30, 'INITIALIZING AI MODULES...'],
      [50, 'LOADING TECH STACK...'],
      [70, 'CONNECTING PROJECTS...'],
      [88, 'OPTIMIZING INTERFACE...'],
      [96, 'SYSTEM READY...'],
      [100, 'ENTERING PORTFOLIO...']
    ];

    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;

      loader.classList.add('hide');
      document.body.classList.add('page-ready');
    };

    const update = (now) => {
      const ratio = Math.min((now - start) / duration, 1);
      const value = Math.floor(ratio * 100);

      if (progress) progress.style.width = `${value}%`;
      if (percent) percent.textContent = `${value}%`;

      let currentStatus = stages[0][1];

      stages.forEach(([threshold, label]) => {
        if (value >= threshold) currentStatus = label;
      });

      if (status) status.textContent = currentStatus;

      if (ratio < 1) {
        requestAnimationFrame(update);
      } else {
        requestAnimationFrame(finish);
      }
    };

    requestAnimationFrame(update);
  })();

})();
