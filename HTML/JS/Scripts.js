document.addEventListener('DOMContentLoaded', function() {
    console.log('Professional website loaded successfully.');
    
    document.querySelectorAll('.dropdown').forEach(function (dropdown) {
        const link = dropdown.querySelector('a');
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        link.setAttribute('aria-haspopup', 'true');
        link.setAttribute('aria-expanded', 'false');

        link.addEventListener('click', function (e) {
            if (dropdownContent) {
                e.preventDefault();
                const isOpen = link.getAttribute('aria-expanded') === 'true';
                document.querySelectorAll('.dropdown').forEach(function (otherDropdown) {
                    const otherLink = otherDropdown.querySelector('a');
                    const otherContent = otherDropdown.querySelector('.dropdown-content');
                    if (otherDropdown !== dropdown && otherContent) {
                        otherContent.style.display = 'none';
                        otherLink.setAttribute('aria-expanded', 'false');
                    }
                });
                dropdownContent.style.display = isOpen ? 'none' : 'block';
                link.setAttribute('aria-expanded', String(!isOpen));
            }
        });

        document.addEventListener('click', function (e) {
            if (!dropdown.contains(e.target)) {
                if (dropdownContent) {
                    dropdownContent.style.display = 'none';
                    link.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    const themeBtn = document.getElementById('themeDropdownBtn');
    const themeDropdown = document.getElementById('themeDropdown');
    if (themeBtn && themeDropdown) {
        const themeOptions = ['office-blue', 'office-orange', 'office-green'];

        function applyTheme(theme, persist) {
            document.body.classList.remove('office-blue', 'office-orange', 'office-green');
            if (theme !== 'office-blue') {
                document.body.classList.add(theme);
            }
            if (persist) {
                try {
                    if (theme === 'office-blue') {
                        localStorage.removeItem('portfolio-theme');
                    } else {
                        localStorage.setItem('portfolio-theme', theme);
                    }
                } catch (error) {
                    console.warn('Theme preference could not be saved.');
                }
            }
        }

        try {
            const savedTheme = localStorage.getItem('portfolio-theme');
            if (themeOptions.includes(savedTheme)) {
                applyTheme(savedTheme, false);
            }
        } catch (error) {
            console.warn('Theme preference could not be loaded.');
        }

        themeBtn.setAttribute('aria-expanded', 'false');
        themeBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            const isOpen = themeBtn.getAttribute('aria-expanded') === 'true';
            themeDropdown.style.display = isOpen ? 'none' : 'flex';
            themeBtn.setAttribute('aria-expanded', String(!isOpen));
        });
        document.addEventListener('click', function (e) {
            if (!themeDropdown.parentElement.contains(e.target)) {
                themeDropdown.style.display = 'none';
                themeBtn.setAttribute('aria-expanded', 'false');
            }
        });
        themeDropdown.querySelectorAll('button[data-theme]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                applyTheme(btn.dataset.theme, true);
                themeDropdown.style.display = 'none';
                themeBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }
});
