document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        document.querySelector('.loading-screen').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.loading-screen').style.display = 'none';
        }, 500);
    }, 1500);

    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        navToggle.innerHTML = navMenu.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    const tabButtons = document.querySelectorAll('.tab-btn');
    const pricingGrids = document.querySelectorAll('.pricing-grid');
    
    tabButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            pricingGrids.forEach(grid => grid.classList.remove('active'));
            
            button.classList.add('active');
            
            if (index === 0) {
                document.getElementById('landing-pages').classList.add('active');
            } else {
                document.getElementById('websites-completos').classList.add('active');
            }
        });
    });

    function initTypewriter() {
        const lines = document.querySelectorAll('.typewriter-line');
        let delay = 0;
        
        lines.forEach((line, index) => {
            const text = line.textContent;
            line.textContent = '';
            line.style.width = '0';
            line.style.display = 'inline-block';
            
            setTimeout(() => {
                line.style.animation = `typing ${text.length * 0.05}s steps(${text.length}, end) forwards`;
                line.style.whiteSpace = 'nowrap';
                
                let i = 0;
                const timer = setInterval(() => {
                    if (i < text.length) {
                        line.textContent += text.charAt(i);
                        i++;
                    } else {
                        clearInterval(timer);
                        if (index === lines.length - 1) {
                            setTimeout(() => {
                                line.style.setProperty('--after-content', 'none');
                            }, 1000);
                        }
                    }
                }, 50);
            }, delay);
            
            delay += text.length * 50 + 500; 
        });
    }

    if (document.querySelector('.typewriter-line')) {
        initTypewriter();
    }

    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.card-animate, .slide-in, .fade-in');
        
        elements.forEach((element, index) => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.setProperty('--order', index);
                element.style.animationPlayState = 'running';
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
        } else {
            nav.style.background = 'rgba(10, 10, 10, 0.9)';
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', showTooltip);
        tooltip.addEventListener('mouseleave', hideTooltip);
    });

    function showTooltip(e) {
        const tooltipText = this.getAttribute('data-tooltip');
        const tooltipEl = document.createElement('div');
        tooltipEl.className = 'tooltip';
        tooltipEl.textContent = tooltipText;
        document.body.appendChild(tooltipEl);
        
        const rect = this.getBoundingClientRect();
        tooltipEl.style.left = `${rect.left + rect.width / 2 - tooltipEl.offsetWidth / 2}px`;
        tooltipEl.style.top = `${rect.top - tooltipEl.offsetHeight - 10}px`;
    }

    function hideTooltip() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }
});