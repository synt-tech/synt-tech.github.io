// Cookie Banner Logic
const banner = document.getElementById('cookieBanner');
const edgeTooltip = document.getElementById('edgeTooltip');
const sentinel = document.getElementById('scrollSentinel');

let lastMouseY = 0;
let isScrolledToBottom = false;
// Detect touch devices to bypass mouse check on mobile
const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

// Use IntersectionObserver for reliable scroll-to-bottom detection
const observer = new IntersectionObserver((entries) => {
    // Update state
    isScrolledToBottom = entries[0].isIntersecting;
    updateBanner();
}, {
    root: null,
    rootMargin: '200px', // Generous buffer: trigger when within 200px of bottom
    threshold: 0
});

if (sentinel) {
    observer.observe(sentinel);
}

function updateBanner() {
    // On touch devices, only check scroll. On desktop, check scroll + mouse position.
    // For mouse: Check if near bottom (within 150px) OR if mouse hasn't moved yet (0) but we are scrolled to bottom (edge case)
    
    const isMouseConditionMet = isTouchDevice || (lastMouseY > (window.innerHeight - 150));

    if (isScrolledToBottom && isMouseConditionMet) {
        banner.classList.add('show');
    } else {
        banner.classList.remove('show');
    }
}

// Still track mouse for desktop users
window.addEventListener('mousemove', (e) => {
    lastMouseY = e.clientY;
    updateBanner();

    // Edge Tooltip Logic
    const threshold = 25; // 15px border + 10px buffer
    const isNearLeft = e.clientX < threshold;
    const isNearRight = e.clientX > window.innerWidth - threshold;

    if (edgeTooltip) {
        if (isNearLeft || isNearRight) {
            edgeTooltip.style.display = 'block';
            edgeTooltip.style.top = `${e.clientY + 10}px`; // Slightly below cursor
            
            if (isNearLeft) {
                edgeTooltip.style.left = `${e.clientX + 15}px`;
                edgeTooltip.style.right = 'auto';
            } else {
                edgeTooltip.style.left = 'auto';
                edgeTooltip.style.right = `${window.innerWidth - e.clientX + 15}px`;
            }
        } else {
            edgeTooltip.style.display = 'none';
        }
    }
});

// Existing Background Text Logic
class TextPosition {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    // Check if this position overlaps with another
    overlaps(other) {
        // Add padding around boxes for better spacing
        const padding = 50;
        return !(this.x + this.width + padding < other.x ||
                this.x > other.x + other.width + padding ||
                this.y + this.height + padding < other.y ||
                this.y > other.y + other.height + padding);
    }
}

function createBackgroundTexts() {
    const container = document.getElementById('backgroundTextContainer');
    if (!container) return;

    container.innerHTML = ''; // Clear existing texts
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const textWidth = 300; // Width of text element
    const textHeight = 50; // Height of text element
    
    // Generate random rotation between -45 and 45 degrees
    const rotation = Math.random() * 90 - 45;
    
    const positions = [];
    let attempts = 0;
    const maxAttempts = 100; // Prevent infinite loops
    const numBackgroundText = 7
    
    // Create text elements
    while (positions.length < numBackgroundText && attempts < maxAttempts) {
        const randomX = Math.random() * (viewportWidth - textWidth);
        const randomY = Math.random() * (viewportHeight - textHeight);
        
        const newPosition = new TextPosition(randomX, randomY, textWidth, textHeight);
        
        // Check if this position overlaps with any existing positions
        let overlaps = false;
        for (const position of positions) {
            if (newPosition.overlaps(position)) {
                overlaps = true;
                break;
            }
        }
        
        if (!overlaps) {
            positions.push(newPosition);
            
            const textElement = document.createElement('div');
            textElement.className = 'background-text';
            textElement.textContent = '🚀6.32% yield!🚀';
            textElement.style.left = `${randomX}px`;
            textElement.style.top = `${randomY}px`;
            textElement.style.transform = `rotate(${rotation}deg)`;
            
            container.appendChild(textElement);
        }
        
        attempts++;
    }
}

// Initial creation
createBackgroundTexts();

// Recreate on window resize
window.addEventListener('resize', createBackgroundTexts);
window.addEventListener('load', createBackgroundTexts);
