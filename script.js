 const brailleSymbols = [
    '⠁', '⠃', '⠉', '⠙', '⠑', '⠋', '⠛', '⠓', '⠊', '⠚',
    '⠅', '⠇', '⠍', '⠝', '⠕', '⠏', '⠟', '⠗', '⠎', '⠞',
    '⠥', '⠧', '⠺', '⠭', '⠽', '⠵', '⠯', '⠿', '⠷', '⠮',
    '⠡', '⠣', '⠩', '⠹', '⠱', '⠫', '⠻', '⠳', '⠪', '⠺'
];

function createBrailleSymbol() {
    const symbol = document.createElement('div');
    symbol.className = 'braille-symbol';
    symbol.textContent = brailleSymbols[Math.floor(Math.random() * brailleSymbols.length)];
    
    symbol.style.left = Math.random() * 100 + '%';
    
    const duration = 10 + Math.random() * 6;
    const delay = Math.random() * 3;
    
    symbol.style.animationDuration = duration + 's';
    symbol.style.animationDelay = delay + 's';
    
    // ELIMINAR después del tiempo real de la animación
    const totalTime = (duration + delay) * 1000 + 100; // +100ms de margen
    
    setTimeout(() => {
        if (symbol.parentNode) {
            symbol.parentNode.removeChild(symbol);
        }
    }, totalTime);
    
    return symbol;
}

function initBrailleAnimation() {
    const background = document.getElementById('brailleBackground');
    
    // Crear MÁS símbolos iniciales para llenar todo el hero
    for (let i = 0; i < 15; i++) {
        const symbol = createBrailleSymbol();
        background.appendChild(symbol);
        
        // Eliminar el símbolo después de la animación
        
    }
    
    // Crear nuevos símbolos continuamente MÁS FRECUENTE
    setInterval(() => {
        const symbol = createBrailleSymbol();
        background.appendChild(symbol);
        
    }, 500); // MÁS FRECUENTE
}

// Smooth scrolling para los enlaces
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Modal functionality
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore background scrolling
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});

// Braille demo animation
const braillePatterns = {
    'A': [1, 0, 0, 0, 0, 0],
    'B': [1, 1, 0, 0, 0, 0],
    'C': [1, 0, 0, 1, 0, 0],
    'D': [1, 0, 0, 1, 1, 0],
    'E': [1, 0, 0, 0, 1, 0]
};

let currentLetter = 0;
const letters = ['A', 'B', 'C', 'D', 'E'];

function demoAnimation() {
    const dots = document.querySelectorAll('.dot');
    const letter = letters[currentLetter];
    const pattern = braillePatterns[letter];
    
    // Clear all dots first
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Activate dots based on pattern with animation delay
    pattern.forEach((active, index) => {
        setTimeout(() => {
            if (active) {
                dots[index].classList.add('active');
            }
        }, index * 100);
    });
    
    // Update letter display
    setTimeout(() => {
        const title = document.querySelector('.demo-screen h3');
        if (title) {
            title.textContent = `Simulador Braille - Letra "${letter}"`;
        }
    }, 600);
    
    currentLetter = (currentLetter + 1) % letters.length;
}

// Auto-run demo every 3 seconds
setInterval(demoAnimation, 3000);

// Add scroll animation for feature cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    observer.observe(card);
});

// Add smooth animation to action buttons on page load
window.addEventListener('load', function() {
    initBrailleAnimation();
    
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach((button, index) => {
        setTimeout(() => {
            button.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }, index * 200);
    });
});

