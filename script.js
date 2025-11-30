// JAVASCRIPT: Matrix Rain for Header Background
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('rain-canvas');
    const container = document.getElementById('matrix-rain-container');
    
    // Check if elements exist before proceeding
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    
    let width, height;
    let columns;
    let drops;
    const font_size = 14; 
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()_+=-';
    
    // UPDATED COLOR: Higher contrast blue for better visibility
    const rain_color = '#aeceef39'; 

    // --- Core Setup (Sizes to the container, not the window) ---
    function setCanvasSize() {
        // Get dimensions from the parent container
        width = canvas.width = container.offsetWidth;
        height = canvas.height = container.offsetHeight;

        columns = Math.floor(width / font_size);
        drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = 1; 
        }
    }

    // --- Main Animation Loop ---
    function draw() {
        // Semi-transparent near-black to fade the old characters (matches body background)
        ctx.fillStyle = 'rgba(26, 26, 26, 0.1)'; 
        ctx.fillRect(0, 0, width, height);

        // Set the drawing color to the higher contrast blue
        ctx.fillStyle = rain_color; 
        ctx.font = font_size + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            const x = i * font_size;
            const y = drops[i] * font_size;

            ctx.fillText(text, x, y);

            // Send the drop back to the top randomly
            if (y * font_size > height && Math.random() > 0.975) {
                drops[i] = 0; 
            }

            drops[i]++;
        }
    }

    // --- Initialization and Event Handlers ---
    
    // Initial setup on load
    setCanvasSize();
    // Start the drawing loop. Interval of 33ms is roughly 30 frames per second.
    setInterval(draw, 33); 
    
    // Handle resizing (we only need to check the size if the window changes)
    window.addEventListener('resize', setCanvasSize);
});