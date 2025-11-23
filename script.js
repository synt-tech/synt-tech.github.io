document.addEventListener('DOMContentLoaded', () => {
    // Edge Tooltip (handles both Radioactive warning and Cookie message)
    const edgeTooltip = document.getElementById('edgeTooltip');
    
    // Messages
    const radioactiveText = '☢️ WARNING: Radioactive! ☢️ <br> Keeping this website open <br> might fry your device!';
    const cookieText = '<div style="display: flex; align-items: center; text-align: right;"><div>Me no spy with cookies...<br>Me eat them!</div><img src="cookie3-gold-128.png" alt="Cookie" class="cookie-img"></div>';

    // Detect touch devices
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    function updateMouseDrivenVisibility(clientX, clientY) {
        const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

        // Thresholds
        const sideThreshold = 25; 
        const bottomThreshold = 50;

        // Detection
        const isNearLeft = clientX < sideThreshold;
        const isNearRight = clientX > viewportWidth - sideThreshold;
        const isNearBottom = clientY > viewportHeight - bottomThreshold;

        if (edgeTooltip) {
            if (isNearBottom) {
                // Bottom Mode: Cookie Message
                edgeTooltip.innerHTML = cookieText;
                edgeTooltip.style.display = 'block';
                
                // Position: Fixed at bottom center
                edgeTooltip.style.top = 'auto';
                edgeTooltip.style.bottom = '20px';
                edgeTooltip.style.left = '50%';
                edgeTooltip.style.right = 'auto';
                edgeTooltip.style.transform = 'translateX(-50%)'; // Center it
                
            } else if (isNearLeft || isNearRight) {
                // Side Mode: Radioactive Warning
                edgeTooltip.innerHTML = radioactiveText;
                edgeTooltip.style.display = 'block';
                edgeTooltip.style.bottom = 'auto';
                edgeTooltip.style.top = `${clientY + 10}px`;
                edgeTooltip.style.transform = 'none'; // Remove centering transform
                
                if (isNearLeft) {
                    edgeTooltip.style.left = `${clientX + 15}px`;
                    edgeTooltip.style.right = 'auto';
                } else {
                    edgeTooltip.style.left = 'auto';
                    edgeTooltip.style.right = `${viewportWidth - clientX + 15}px`;
                }
            } else {
                edgeTooltip.style.display = 'none';
            }
        }
    }

    // Track mouse movement
    window.addEventListener('mousemove', (e) => {
        if (!isTouchDevice) {
            updateMouseDrivenVisibility(e.clientX, e.clientY);
        }
    });

    // For touch devices, show cookie message fixed at bottom
    if (isTouchDevice && edgeTooltip) {
        edgeTooltip.innerHTML = cookieText;
        edgeTooltip.style.display = 'block';
        edgeTooltip.style.top = 'auto';
        edgeTooltip.style.bottom = '20px';
        edgeTooltip.style.left = '50%';
        edgeTooltip.style.right = 'auto';
        edgeTooltip.style.transform = 'translateX(-50%)';
    }
});

// Existing Background Text Logic (remains outside DOMContentLoaded as it handles its own init)
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

// Initial creation (wait for load to ensure styles/dimensions are ready)
window.addEventListener('load', createBackgroundTexts);
window.addEventListener('resize', createBackgroundTexts);
