// I just queried Copilot for this one
document.addEventListener('DOMContentLoaded', function() {
    const sideHeader = document.getElementById('side-header');
    const container = document.querySelector('.container');
    const mainContent = document.getElementById('main-content');

    function moveSideHeader() {
        if (window.innerWidth <= 600) {
            // Move side-header outside of container
            document.body.insertBefore(sideHeader, container);
        } else {
            // Move side-header back inside container
            container.insertBefore(sideHeader, mainContent);
        }
    }

    // Initial check
    moveSideHeader();

    // Check on window resize
    window.addEventListener('resize', moveSideHeader);
});