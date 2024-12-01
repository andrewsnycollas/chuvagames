document.querySelectorAll('.avatar-gif').forEach(img => {
    const staticSrc = img.src; // Static image
    const gifSrc = img.dataset.gif; // Animated GIF

    img.addEventListener('mouseenter', () => {
        img.src = gifSrc; // Switch to GIF
    });

    img.addEventListener('mouseleave', () => {
        setTimeout(() => {
            img.src = staticSrc; // Revert to static image
        }, 1000); // Delay to ensure the animation completes
    });
});