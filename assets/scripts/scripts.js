/**
 * CHUVA Games - Main JavaScript
 * Handles navigation, animations, and interactive elements
 */

// Utility function to safely get DOM elements
function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

// Execute when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  initNavbar();
  initDropdowns();
  initSocialIconsHover();
  initCopyEmail();
  initGameModals();
  initImageZoom();
});

// Navbar: hide on scroll down, show on scroll up
function initNavbar() {
  const header = $('.header');
  if (!header) return;
  
  let prevScrollpos = window.pageYOffset;
  let scrollTimer;
  
  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimer);
    
    const currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      header.classList.remove('hide');
    } else if (currentScrollPos > 100) { // Only hide after scrolling down a bit
      header.classList.add('hide');
    }
    prevScrollpos = currentScrollPos;
    
    // Add a small delay to prevent the header from flickering
    scrollTimer = setTimeout(() => {
      if (currentScrollPos < 50) {
        header.classList.remove('hide');
      }
    }, 150);
  });
}

// Mobile menu and dropdown functionality
function initDropdowns() {
  // Mobile menu toggle
  const mobileMenuToggle = $('.mobile-menu-toggle');
  const navMenu = $('.nav-menu');
  
  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      
      // Toggle icon between hamburger and X
      const icon = mobileMenuToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });
  }
  
  // Dropdown menus
  const dropdowns = $$('.dropdown');
  
  dropdowns.forEach(dropdown => {
    const toggleBtn = dropdown.querySelector('.dropdown-toggle');
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
    
    if (toggleBtn && dropdownMenu) {
      toggleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Close other dropdowns
        dropdowns.forEach(d => {
          if (d !== dropdown && d.classList.contains('active')) {
            d.classList.remove('active');
          }
        });
        
        // Toggle current dropdown
        dropdown.classList.toggle('active');
      });
    }
  });
  
  // Close dropdowns and mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    // Close dropdowns
    if (!e.target.closest('.dropdown')) {
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
    
    // Close mobile menu
    if (navMenu && navMenu.classList.contains('active') && 
        !e.target.closest('.nav-menu') && 
        !e.target.closest('.mobile-menu-toggle')) {
      navMenu.classList.remove('active');
      
      // Reset hamburger icon
      if (mobileMenuToggle) {
        const icon = mobileMenuToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    }
  });
  
  // Close on ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      // Close dropdowns
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
      });
      
      // Close mobile menu
      if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        
        // Reset hamburger icon
        if (mobileMenuToggle) {
          const icon = mobileMenuToggle.querySelector('i');
          if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
          }
        }
      }
    }
  });
}

// Social icons hover effect
function initSocialIconsHover() {
  const icons = $$('.social-icon-hover');
  
  icons.forEach(icon => {
    const originalSrc = icon.getAttribute('data-original-src');
    const hoverSrc = icon.getAttribute('data-hover-src');
    
    if (!originalSrc || !hoverSrc) return;
    
    // Mouse events
    icon.addEventListener('mouseover', () => {
      icon.src = hoverSrc;
      icon.style.transform = 'scale(1.15)';
    });
    
    icon.addEventListener('mouseout', () => {
      icon.src = originalSrc;
      icon.style.transform = '';
    });
    
    // Touch events for mobile
    icon.addEventListener('touchstart', () => {
      icon.src = hoverSrc;
      icon.style.transform = 'scale(1.15)';
    });
    
    icon.addEventListener('touchend', () => {
      icon.src = originalSrc;
      icon.style.transform = '';
    });
  });
}

// Copy email to clipboard
function initCopyEmail() {
  const copyBtn = $('#copy-email');
  
  if (!copyBtn) return;
  
  copyBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    const email = 'andrewsnycollas@chuvagames.co';
    
    navigator.clipboard.writeText(email)
      .then(() => {
        // Create and show a temporary tooltip
        const tooltip = document.createElement('div');
        tooltip.textContent = 'Email copied: ' + email;
        tooltip.style.position = 'fixed';
        tooltip.style.bottom = '20px';
        tooltip.style.left = '50%';
        tooltip.style.transform = 'translateX(-50%)';
        tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        tooltip.style.color = '#fff';
        tooltip.style.padding = '10px 15px';
        tooltip.style.borderRadius = '5px';
        tooltip.style.zIndex = '9999';
        
        document.body.appendChild(tooltip);
        
        // Remove tooltip after 3 seconds
        setTimeout(() => {
          tooltip.style.opacity = '0';
          tooltip.style.transition = 'opacity 0.5s ease';
          
          setTimeout(() => {
            document.body.removeChild(tooltip);
          }, 500);
        }, 3000);
      })
      .catch(err => {
        console.error('Failed to copy email: ', err);
        alert('Failed to copy email. Please try again.');
      });
  });
}

// Game modals
function initGameModals() {
  // Game data
  const games = {
    amazon: {
      title: "The Amazon Grove",
      img: "/assets/images/games/amazongrove.jpg",
      desc: "Coming soon. An adventure through the mystical Amazon rainforest, where ancient spirits and modern threats collide in a story of preservation and discovery."
    },
    arcane: {
      title: "Trials of the Arcane Grove",
      img: "/assets/images/games/arcanegrove.jpg",
      desc: "Coming soon. Embark on a magical journey through the Arcane Grove, solving puzzles and uncovering secrets in this enchanting adventure."
    },
    magicless: {
      title: "Magicless Mage",
      img: "/assets/images/games/magicless.jpg",
      desc: "Coming soon. Follow the story of a mage who lost their magical abilities and must find new ways to navigate a world that expects the impossible."
    },
    silent: {
      title: "The Legend of the Silent Knight",
      img: "/assets/images/games/silentknight.jpg",
      desc: "Coming soon. A tale of courage and sacrifice, where a knight who took a vow of silence must save a kingdom from darkness without uttering a single word."
    }
  };
  
  const modalBg = $('#gameModalBg');
  const modal = $('#gameModal');
  const modalImg = $('#modalImg');
  const modalTitle = $('#modalTitle');
  const modalDesc = $('#modalDesc');
  const modalClose = $('#modalClose');
  
  if (!modalBg || !modal || !modalImg || !modalTitle || !modalDesc || !modalClose) return;
  
  // Open modal when clicking on a game card
  $$('.game-cloud-card').forEach(card => {
    card.addEventListener('click', () => {
      const key = card.getAttribute('data-game');
      const game = games[key];
      
      if (!game) return;
      
      modalImg.src = game.img;
      modalImg.alt = game.title;
      modalTitle.textContent = game.title;
      modalDesc.textContent = game.desc;
      
      modalBg.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Close modal functions
  function closeModal() {
    modalBg.classList.remove('active');
    document.body.style.overflow = '';
    
    // Reset zoom
    if (modalImg.classList.contains('zoom')) {
      modalImg.classList.remove('zoom');
      modalImg.style.transform = '';
    }
  }
  
  modalClose.addEventListener('click', closeModal);
  
  modalBg.addEventListener('click', (e) => {
    if (e.target === modalBg) closeModal();
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// Image zoom functionality
function initImageZoom() {
  const modalImg = $('#modalImg');
  
  if (!modalImg) return;
  
  let isDragging = false;
  let startX, startY, imgX = 0, imgY = 0;
  
  // Toggle zoom on click
  modalImg.addEventListener('click', function(e) {
    e.stopPropagation();
    
    if (modalImg.classList.contains('zoom')) {
      modalImg.classList.remove('zoom');
      modalImg.style.transform = '';
      imgX = 0;
      imgY = 0;
    } else {
      modalImg.classList.add('zoom');
      modalImg.style.transform = 'scale(1.5)';
    }
  });
  
  // Drag functionality for zoomed images
  modalImg.addEventListener('mousedown', (e) => {
    if (!modalImg.classList.contains('zoom')) return;
    
    e.preventDefault();
    isDragging = true;
    startX = e.clientX - imgX;
    startY = e.clientY - imgY;
    modalImg.style.cursor = 'grabbing';
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    imgX = e.clientX - startX;
    imgY = e.clientY - startY;
    modalImg.style.transform = `translate(${imgX}px, ${imgY}px) scale(1.5)`;
  });
  
  document.addEventListener('mouseup', () => {
    isDragging = false;
    if (modalImg.classList.contains('zoom')) {
      modalImg.style.cursor = 'grab';
    }
  });
  
  // Touch events for mobile
  modalImg.addEventListener('touchstart', (e) => {
    if (!modalImg.classList.contains('zoom')) return;
    
    isDragging = true;
    const touch = e.touches[0];
    startX = touch.clientX - imgX;
    startY = touch.clientY - imgY;
  });
  
  document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    imgX = touch.clientX - startX;
    imgY = touch.clientY - startY;
    modalImg.style.transform = `translate(${imgX}px, ${imgY}px) scale(1.5)`;
  });
  
  document.addEventListener('touchend', () => {
    isDragging = false;
  });
}

// Utility function to safely get DOM elements
function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Execute when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  initTeamCards();
  initTeamModal();
  initSocialIconsHover();
  initCopyEmail();
  initNavbarScroll();
});

// Render team cards
function initTeamCards() {
  const grid = $('#teamCardsGridEn');
  if (!grid) return;
  
  // Shuffle and save the order for use in the modal
  window._shuffledTeamEn = shuffleArray(teamMembersEn);
  
  grid.innerHTML = window._shuffledTeamEn.map((member, idx) => `
    <div class="team-card" data-idx="${idx}">
      <img 
        src="${member.thumb}" 
        data-original-src="${member.thumb}" 
        data-hover-src="${member.gif}" 
        class="team-thumb" 
        alt="${member.name}"
        loading="lazy"
      >
      <div class="team-card-name">${member.name}</div>
      <div class="team-card-role">${member.role}</div>
    </div>
  `).join('');
  
  // Add hover effect for team cards
  $$('.team-thumb').forEach(thumb => {
    thumb.addEventListener('mouseover', function() {
      this.src = this.getAttribute('data-hover-src');
      this.classList.add('hovered');
    });
    
    thumb.addEventListener('mouseout', function() {
      this.src = this.getAttribute('data-original-src');
      this.classList.remove('hovered');
    });
  });
}

// Initialize team member modal
function initTeamModal() {
  const grid = $('#teamCardsGridEn');
  const modalBg = $('#teamModalBgEn');
  const modal = $('#teamModalEn');
  const modalImg = $('#teamModalImgEn');
  const modalTitle = $('#teamModalTitleEn');
  const modalRole = $('#teamModalRoleEn');
  const modalDesc = $('#teamModalDescEn');
  const modalSkills = $('#teamModalSkillsEn');
  const modalSocial = $('#teamModalSocialEn');
  const modalClose = $('#teamModalCloseEn');
  
  if (!grid || !modalBg || !modal || !modalImg || !modalTitle || 
      !modalRole || !modalDesc || !modalSkills || !modalSocial || !modalClose) return;
  
  // Open modal when clicking on a team card
  grid.addEventListener('click', function(e) {
    const card = e.target.closest('.team-card');
    if (!card) return;
    
    const idx = card.getAttribute('data-idx');
    const member = window._shuffledTeamEn[idx];
    
    if (!member) return;
    
    // Fill modal with member data
    modalImg.src = member.thumb;
    modalImg.setAttribute('data-original-src', member.thumb);
    modalImg.setAttribute('data-hover-src', member.gif);
    modalImg.alt = member.name;
    
    modalTitle.textContent = member.name;
    modalRole.textContent = member.role;
    modalDesc.textContent = member.desc;
    
    // Render skills
    modalSkills.innerHTML = member.skills.map(skill => `
      <div class="progress-bar-container">
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${skill.value}%"></div>
          <span class="progress-text">${skill.name}</span>
        </div>
      </div>
    `).join('');
    
    // Render social links
    modalSocial.innerHTML = member.social.map(s => `
      <a href="${s.href}" target="_blank" rel="noopener noreferrer" aria-label="${s.alt}">
        <img 
          src="/assets/images/icons/default/${s.icon}" 
          data-original-src="/assets/images/icons/default/${s.icon}" 
          data-hover-src="/assets/images/icons/hover/${s.hover}" 
          alt="${s.alt}"
          class="social-icon-hover"
          loading="lazy"
        >
      </a>
    `).join('');
    
    // Show modal
    modalBg.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add hover effect for modal image
    modalImg.addEventListener('mouseover', function() {
      this.src = this.getAttribute('data-hover-src');
      this.classList.add('hovered');
    });
    
    modalImg.addEventListener('mouseout', function() {
      this.src = this.getAttribute('data-original-src');
      this.classList.remove('hovered');
    });
  });
  
  // Close modal functions
  function closeModal() {
    modalBg.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  modalClose.addEventListener('click', closeModal);
  
  modalBg.addEventListener('click', (e) => {
    if (e.target === modalBg) closeModal();
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// Social icons hover effect
function initSocialIconsHover() {
  document.addEventListener('mouseover', function(e) {
    if (e.target.classList.contains('social-icon-hover')) {
      const hoverSrc = e.target.getAttribute('data-hover-src');
      if (hoverSrc) e.target.src = hoverSrc;
      e.target.style.transform = 'scale(1.15)';
    }
  });
  
  document.addEventListener('mouseout', function(e) {
    if (e.target.classList.contains('social-icon-hover')) {
      const originalSrc = e.target.getAttribute('data-original-src');
      if (originalSrc) e.target.src = originalSrc;
      e.target.style.transform = '';
    }
  });
}

// Copy email to clipboard
function initCopyEmail() {
  const copyBtn = $('#copy-email');
  
  if (!copyBtn) return;
  
  copyBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    const email = 'andrewsnycollas@chuvagames.co';
    
    navigator.clipboard.writeText(email)
      .then(() => {
        // Create and show a temporary tooltip
        const tooltip = document.createElement('div');
        tooltip.textContent = 'Email copied: ' + email;
        tooltip.style.position = 'fixed';
        tooltip.style.bottom = '20px';
        tooltip.style.left = '50%';
        tooltip.style.transform = 'translateX(-50%)';
        tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        tooltip.style.color = '#fff';
        tooltip.style.padding = '10px 15px';
        tooltip.style.borderRadius = '5px';
        tooltip.style.zIndex = '9999';
        
        document.body.appendChild(tooltip);
        
        // Remove tooltip after 3 seconds
        setTimeout(() => {
          tooltip.style.opacity = '0';
          tooltip.style.transition = 'opacity 0.5s ease';
          
          setTimeout(() => {
            document.body.removeChild(tooltip);
          }, 500);
        }, 3000);
      })
      .catch(err => {
        console.error('Failed to copy email: ', err);
        alert('Failed to copy email. Please try again.');
      });
  });
}

// Navbar scroll behavior
function initNavbarScroll() {
  const header = $('.header');
  if (!header) return;
  
  let prevScrollpos = window.pageYOffset;
  
  window.addEventListener('scroll', function() {
    const currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      header.classList.remove('hide');
    } else {
      header.classList.add('hide');
    }
    prevScrollpos = currentScrollPos;
  });
}


// Dados dos membros da equipe
const teamMembers = [
  {
    name: "Andrews Nycollas",
    role: "Diretor Criativo / Designer de Jogos",
    thumb: "/assets/images/team/andrews.png",
    gif: "/assets/images/team/andrews.gif",
    desc: `Andrews Nycollas é apaixonado por desenvolvimento de jogos desde a pré-adolescência, quando começou a criar e vender jogos de luta arcade personalizados na escola, aos 12 anos. Ele tem uma formação diversificada em teatro, música, cinema e artes visuais, o que enriquece sua abordagem criativa ao design de jogos. Freelancer profissional na indústria de jogos desde 2012, Andrews tem trabalhado extensivamente com o mercado de jogos asiático desde 2019. "Vendi tudo o que tinha e vim para as Filipinas para encontrar uma garota, nos casamos, temos um menino. Agora estou pronto para me tornar um desenvolvedor de jogos independente"`,
    skills: [
      { name: "Narrativa", value: 100 },
      { name: "Música e Áudio", value: 100 },
      { name: "Pixel Art", value: 40 },
      { name: "Programação", value: 60 },
      { name: "Gerenciamento", value: 80 },
      { name: "Marketing", value: 80 }
    ],
    social: [
      { href: "https://www.linkedin.com/in/andrews-nycollas-a80271251/", icon: "default_linkedin.png", hover: "hover_linkedin.png", alt: "LinkedIn" },
      { href: "https://www.youtube.com/@andrewsnycollas3651", icon: "default_youtube.png", hover: "hover_youtube.png", alt: "YouTube" },
      { href: "https://www.twitch.tv/andrewsnycollas", icon: "default_twitch.png", hover: "hover_twitch.png", alt: "Twitch" },
      { href: "https://www.instagram.com/andrewsnycollas_/", icon: "default_insta.png", hover: "hover_insta.png", alt: "Instagram" },
      { href: "https://discordapp.com/users/512014156161875968", icon: "default_discord.png", hover: "hover_discord.png", alt: "Discord" },
      { href: "https://steamcommunity.com/id/gmandrewsnycollas", icon: "default_steam.png", hover: "hover_steam.png", alt: "Steam" },
      { href: "https://x.com/andrewsnycollas", icon: "default_x.png", hover: "hover_x.png", alt: "X" },
      { href: "https://bsky.app/profile/andrewsnycollas.bsky.social", icon: "default_bsky.png", hover: "hover_bsky.png", alt: "Bluesky" },
      { href: "https://open.spotify.com/artist/5d1B5VZbcDhWjzuXWlL1Ui?si=HU5aU9RbQsGbHnoaKKKMfQ", icon: "default_spotify.png", hover: "hover_spotify.png", alt: "Spotify" }
    ]
  },
  {
    name: "Marcos Genú",
    role: "Dirtor de Arte",
    thumb: "/assets/images/team/marcos.png",
    gif: "/assets/images/team/marcos.gif",
    desc: `Marcos Genú trabalha desde 2012 com arte conceitual, animação 2D e criação de assets para jogos. Ele contribuiu para diversos projetos, incluindo Tap Tap Beer e jogos desenvolvidos para grandes empresas como VALE e o Governo do Pará. Seu trabalho também inclui jogos premiados internacionalmente, como Ghostein, que foi reconhecido na Game Jam+, e um projeto que garantiu o sexto lugar no BGJam global. "Oi, eu sou o Marcos."`,
    skills: [
      { name: "Pixel Art", value: 100 },
      { name: "Ilustração", value: 100 },
      { name: "Animação", value: 60 },
      { name: "3D", value: 20 }
    ],
    social: [
      { href: "https://www.linkedin.com/in/markcg/", icon: "default_linkedin.png", hover: "hover_linkedin.png", alt: "LinkedIn" },
      { href: "https://www.instagram.com/its_mark_cg/", icon: "default_insta.png", hover: "hover_insta.png", alt: "Instagram" },
      { href: "https://discordapp.com/users/532567066109149186", icon: "default_discord.png", hover: "hover_discord.png", alt: "Discord" }
    ]
  },
  {
    name: "Mohamed Capistrano",
    role: "Produtor / Designer de Comportamento",
    thumb: "/assets/images/team/mohamed.png",
    gif: "/assets/images/team/mohamed.gif",
    desc: `Concluí minha graduação em Desenvolvimento de Jogos em 2015, mas só agora, com o convite do Andrews (um amigo de longa data), estou tendo a oportunidade de trabalhar na área. 'Sinto-me empolgado, pois a essência do jogo remete a uma memória nostálgica. "É autêntico."`,
    skills: [
      { name: "Desenvolvedor de Jogos", value: 50 },
      { name: "Designer de Comportamento", value: 80 },
      { name: "Designer de Níveis", value: 80 },
      { name: "Testador", value: 80 },
      { name: "Programador", value: 40 }
    ],
    social: [
      { href: "https://www.linkedin.com/in/mohamed-capistrano-0a475279/", icon: "default_linkedin.png", hover: "hover_linkedin.png", alt: "LinkedIn" },
      { href: "https://www.twitch.tv/mokaap", icon: "default_twitch.png", hover: "hover_twitch.png", alt: "Twitch" },
      { href: "https://www.instagram.com/brightersheep", icon: "default_insta.png", hover: "hover_insta.png", alt: "Instagram" },
      { href: "https://discordapp.com/users/335489284197056522", icon: "default_discord.png", hover: "hover_discord.png", alt: "Discord" }
    ]
  },
  {
    name: "Rick Galasio",
    role: "Especialista em Linux / Ator de Voz",
    thumb: "/assets/images/team/rick.png",
    gif: "/assets/images/team/rick.gif",
    desc: `Rick Galasio, um homem autista com mais de meio século de vida. Após anos dedicados à família e ao trabalho, ele finalmente pode honrar a criança autista que ainda vive dentro dele e realizar seu sonho de se tornar um desenvolvedor de jogos independente. "Eu sou só um velhinho autista."`,
    skills: [
      { name: "Linux", value: 100 },
      { name: "Atuação", value: 200 }
    ],
    social: [
      { href: "https://www.linkedin.com/in/ricardo-leite-a5467a38/", icon: "default_linkedin.png", hover: "hover_linkedin.png", alt: "LinkedIn" },
      { href: "https://www.youtube.com/@ricleitetube", icon: "default_youtube.png", hover: "hover_youtube.png", alt: "YouTube" },
      { href: "https://www.instagram.com/rickgalasio", icon: "default_insta.png", hover: "hover_insta.png", alt: "Instagram" },
      { href: "https://discordapp.com/users/612803183764307968", icon: "default_discord.png", hover: "hover_discord.png", alt: "Discord" }
    ]
  },
  {
    name: "André Borba",
    role: "Produtor / Gerente de Comunidade / Designer de Som",
    thumb: "/assets/images/team/tuta.png",
    gif: "/assets/images/team/tuta.gif",
    desc: `André, conhecido como Tutankhamal, é apaixonado por tecnologia e música. Neurodivergente (autista e TDAH), ele tem experiência em desenvolvimento Front-end, gerenciamento de comunidade e suporte ao cliente. Um autodidata, ele transforma sua paixão por videogames e computadores em conhecimento técnico.`,
    skills: [
      { name: "Gerente de Comunidade", value: 100 },
      { name: "Desenvolvimento Front-End", value: 80 },
      { name: "Designer de Som", value: 50 }
    ],
    social: [
      { href: "https://www.linkedin.com/in/tutankhamal/", icon: "default_linkedin.png", hover: "hover_linkedin.png", alt: "LinkedIn" },
      { href: "https://www.youtube.com/@tutankhamal", icon: "default_youtube.png", hover: "hover_youtube.png", alt: "YouTube" },
      { href: "https://www.twitch.tv/tutankhamal", icon: "default_twitch.png", hover: "hover_twitch.png", alt: "Twitch" },
      { href: "https://www.instagram.com/tutankhamal", icon: "default_insta.png", hover: "hover_insta.png", alt: "Instagram" },
      { href: "https://www.tiktok.com/@tutankhamal", icon: "default_tiktok.png", hover: "hover_tiktok.png", alt: "TikTok" },
      { href: "https://discordapp.com/users/820522746622246963", icon: "default_discord.png", hover: "hover_discord.png", alt: "Discord" },
      { href: "https://steamcommunity.com/id/Tutankhamal/", icon: "default_steam.png", hover: "hover_steam.png", alt: "Steam" },
      { href: "https://x.com/Tutankhamal", icon: "default_x.png", hover: "hover_x.png", alt: "X" },
      { href: "https://bsky.app/profile/tutankhamal.bsky.social", icon: "default_bsky.png", hover: "hover_bsky.png", alt: "Bluesky" },
      { href: "https://soundcloud.com/tutankhamal", icon: "default_soundcloud.png", hover: "hover_soundcloud.png", alt: "Soundcloud" }
    ]
  },
  {
    name: "Camila Sales",
    role: "Artista 2D",
    thumb: "/assets/images/team/camila.png",
    gif: "/assets/images/team/camila.gif",
    desc: `Formada em Desenvolvimento de Jogos desde 2017 e atualmente cursando pós-graduação em Animação Digital. Descobri o mundo do desenho na infância, como muitos artistas, começando com esboços de Dragon Ball. Cresci e me dediquei a várias formas de desenho e pintura, do lápis e papel à pintura em tela. Em 2020, comprei minha primeira mesa digitalizadora e comecei a explorar a Pintura Digital, logo após começar a estudar Animação Digital 2D. A arte, em geral, sempre foi minha fuga, e retornar à indústria de jogos será desafiador, mas emocionante.`,
    skills: [
      { name: "Ilustração 2D", value: 100 },
      { name: "Conceito de Personagem", value: 100 },
      { name: "Animação 2D", value: 60 },
      { name: "Storyboard", value: 60 }
    ],
    social: [
      { href: "https://www.linkedin.com/in/camila-sales-4b135a231", icon: "default_linkedin.png", hover: "hover_linkedin.png", alt: "LinkedIn" },
      { href: "https://discordapp.com/users/1064628941970755735", icon: "default_discord.png", hover: "hover_discord.png", alt: "Discord" }
    ]
  },
  {
    name: "Richard de Leon",
    role: "Gerente de Marketing",
    thumb: "/assets/images/team/richard.png",
    gif: "/assets/images/team/richard.gif",
    desc: `Ele trabalhou em marketing por sete anos, iniciando sua carreira em grandes agências de publicidade em São Paulo. Há alguns anos, mudou-se para a Ásia, onde tem atuado no mercado de jogos asiático, com foco em publicidade digital. Apaixonado por leitura e jogos, ele se inspira nesses interesses para alimentar sua criatividade e empreendimentos profissionais.`,
    skills: [
      { name: "Gerente de Redes Sociais", value: 100 },
      { name: "Marketing Digital", value: 100 },
      { name: "Engenheiro de Prompt", value: 80 },
      { name: "Editor de Video", value: 70 },
      { name: "SEO/SEM", value: 60 }
    ],
    social: [
      { href: "https://www.linkedin.com/in/richard-de-leon-534123144", icon: "default_linkedin.png", hover: "hover_linkedin.png", alt: "LinkedIn" },
      { href: "https://www.instagram.com/_richarddeleon/", icon: "default_insta.png", hover: "hover_insta.png", alt: "Instagram" },
      { href: "https://discordapp.com/users/1312938936120643670", icon: "default_discord.png", hover: "hover_discord.png", alt: "Discord" }
    ]
  },
  {
    name: "Sara Amorim",
    role: "Relações Públicas",
    thumb: "/assets/images/team/sara.png",
    gif: "/assets/images/team/sara.gif",
    desc: `Sara Amorim é uma comunicadora habilidosa, apaixonada por criar pontes entre desenvolvedores e jogadores. Com uma forte capacidade de ouvir e articular, ela será a voz da CHUVA, conectando a equipe de desenvolvimento com seu público.`,
    skills: [
      { name: "Comunicação", value: 100 }
    ],
    social: [
      { href: "https://www.linkedin.com", icon: "default_linkedin.png", hover: "hover_linkedin.png", alt: "LinkedIn" },
      { href: "https://www.instagram.com/saramorimmm/", icon: "default_insta.png", hover: "hover_insta.png", alt: "Instagram" },
      { href: "https://discordapp.com/users/1324819249184637086", icon: "default_discord.png", hover: "hover_discord.png", alt: "Discord" }
    ]
  }
];

// Função para embaralhar array (Fisher-Yates)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Renderização dos cards da equipe
function initTeamCards() {
  const grid = document.getElementById('teamCardsGrid');
  if (!grid) return;
  // Embaralhe e salve a ordem para uso no modal
  window._shuffledTeam = [...teamMembers];
  shuffleArray(window._shuffledTeam);
  grid.innerHTML = window._shuffledTeam.map((m, idx) => `
    <div class="team-card" data-idx="${idx}">
      <img src="${m.thumb}" data-original-src="${m.thumb}" data-hover-src="${m.gif}" class="team-thumb" alt="${m.name}" loading="lazy">
      <div class="team-card-name">${m.name}</div>
      <div class="team-card-role">${m.role}</div>
    </div>
  `).join('');

  // Hover para trocar PNG/GIF nos cards
  document.addEventListener('mouseover', function(e) {
    if (e.target.classList.contains('team-thumb')) {
      e.target.src = e.target.getAttribute('data-hover-src');
      e.target.classList.add('hovered');
    }
  });
  document.addEventListener('mouseout', function(e) {
    if (e.target.classList.contains('team-thumb')) {
      e.target.src = e.target.getAttribute('data-original-src');
      e.target.classList.remove('hovered');
    }
  });

  // Modal interativo dos membros
  const modalBg = document.getElementById('teamModalBg');
  const modal = document.getElementById('teamModal');
  const modalImg = document.getElementById('teamModalImg');
  const modalTitle = document.getElementById('teamModalTitle');
  const modalRole = document.getElementById('teamModalRole');
  const modalDesc = document.getElementById('teamModalDesc');
  const modalSkills = document.getElementById('teamModalSkills');
  const modalSocial = document.getElementById('teamModalSocial');
  const modalClose = document.getElementById('teamModalClose');

  if (!modalBg || !modal || !modalImg || !modalTitle || !modalRole || !modalDesc || !modalSkills || !modalSocial || !modalClose) return;

  grid.addEventListener('click', function(e) {
    const card = e.target.closest('.team-card');
    if (!card) return;
    const idx = card.getAttribute('data-idx');
    // Use o array embaralhado salvo no window
    const m = window._shuffledTeam[idx];

    // Preenche modal
    modalImg.src = m.thumb;
    modalImg.setAttribute('data-original-src', m.thumb);
    modalImg.setAttribute('data-hover-src', m.gif);
    modalImg.alt = m.name;
    modalTitle.textContent = m.name;
    modalRole.textContent = m.role;
    modalDesc.textContent = m.desc;
    modalSkills.innerHTML = m.skills.map(skill => `
      <div class="progress-bar-container">
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${skill.value}%"></div>
          <span class="progress-text">${skill.name}</span>
        </div>
      </div>
    `).join('');
    modalSocial.innerHTML = m.social.map(s => `
      <a href="${s.href}" target="_blank" rel="noopener noreferrer">
        <img 
          src="/assets/images/icons/default/${s.icon}" 
          data-original-src="/assets/images/icons/default/${s.icon}" 
          data-hover-src="/assets/images/icons/hover/${s.hover}" 
          alt="${s.alt}"
          class="social-icon-hover"
          loading="lazy"
        >
      </a>
    `).join('');
    modalBg.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  // Hover para trocar PNG/GIF no modal
  if (modalImg) {
    modalImg.addEventListener('mouseover', function() {
      modalImg.src = modalImg.getAttribute('data-hover-src');
      modalImg.classList.add('hovered');
    });
    modalImg.addEventListener('mouseout', function() {
      modalImg.src = modalImg.getAttribute('data-original-src');
      modalImg.classList.remove('hovered');
    });
  }

  if (modalClose && modalBg) {
    function closeModal() {
      modalBg.classList.remove('active');
      document.body.style.overflow = '';
    }
    modalClose.addEventListener('click', closeModal);
    modalBg.addEventListener('click', (e) => {
      if (e.target === modalBg) closeModal();
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === "Escape") closeModal();
    });
  }
}

document.addEventListener('mouseover', function(e) {
  if (e.target.classList.contains('social-icon-hover')) {
    const hoverSrc = e.target.getAttribute('data-hover-src');
    if (hoverSrc) e.target.src = hoverSrc;
    e.target.style.transform = 'scale(1.15)';
  }
});

document.addEventListener('mouseout', function(e) {
  if (e.target.classList.contains('social-icon-hover')) {
    const originalSrc = e.target.getAttribute('data-original-src');
    if (originalSrc) e.target.src = originalSrc;
    e.target.style.transform = '';
  }
});