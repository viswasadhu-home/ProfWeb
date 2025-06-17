document.addEventListener('DOMContentLoaded', function() {
    console.log('Professional website loaded successfully.');
    
    // Enable dynamic dropdowns for both header and side navigation
    document.querySelectorAll('.dropdown').forEach(function (dropdown) {
        // For accessibility: open on click for mobile, hover for desktop
        const link = dropdown.querySelector('a');
        const dropdownContent = dropdown.querySelector('.dropdown-content');

        // Toggle dropdown on click (for mobile/touch)
        link.addEventListener('click', function (e) {
            // Prevent navigation if dropdown exists
            if (dropdownContent) {
                e.preventDefault();
                // Close other open dropdowns
                document.querySelectorAll('.dropdown-content').forEach(function (el) {
                    if (el !== dropdownContent) el.style.display = 'none';
                });
                // Toggle current dropdown
                dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
            }
        });

        // Hide dropdown when clicking outside
        document.addEventListener('click', function (e) {
            if (!dropdown.contains(e.target)) {
                if (dropdownContent) dropdownContent.style.display = 'none';
            }
        });

        // Show/hide on hover for desktop
        dropdown.addEventListener('mouseenter', function () {
            if (window.innerWidth > 900 && dropdownContent) {
                dropdownContent.style.display = 'block';
            }
        });
        dropdown.addEventListener('mouseleave', function () {
            if (window.innerWidth > 900 && dropdownContent) {
                dropdownContent.style.display = 'none';
            }
        });
    });

    // Theme Switcher Dropdown Logic
    // Dropdown for theme switcher
    const themeBtn = document.getElementById('themeDropdownBtn');
    const themeDropdown = document.getElementById('themeDropdown');
    themeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        themeDropdown.style.display = themeDropdown.style.display === 'flex' ? 'none' : 'flex';
    });
    // Hide dropdown when clicking outside
    document.addEventListener('click', function (e) {
        if (!themeDropdown.contains(e.target) && e.target !== themeBtn) {
            themeDropdown.style.display = 'none';
        }
    });
    // Theme switching
    themeDropdown.querySelectorAll('button[data-theme]').forEach(function(btn) {
        btn.addEventListener('click', function() {
            document.body.classList.remove('office-blue', 'office-orange', 'office-green');
            if (btn.dataset.theme !== 'office-blue') {
                document.body.classList.add(btn.dataset.theme);
            }
            themeDropdown.style.display = 'none';
        });
    });
});
