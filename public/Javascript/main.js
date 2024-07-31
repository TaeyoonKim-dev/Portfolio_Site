document.addEventListener('DOMContentLoaded', function () {
    const loadingScreen = document.querySelector('.loading-screen');
    const form = document.getElementById('contact-form');
    const loadingMessage = document.querySelector('.loading-message');

    if (loadingScreen) {
        document.body.classList.add('body-loading');

        setTimeout(function() {
            loadingScreen.classList.add('hidden');

            setTimeout(function() {
                loadingScreen.style.display = 'none';
                document.body.classList.remove('body-loading');
            }, 1000);
        }, 500);
    } else {
        console.error('로딩 화면 요소를 찾을 수 없습니다.');
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionID = this.getAttribute('href').substring(1);
            document.getElementById(sectionID).scrollIntoView({ behavior: 'smooth' });
        });
    });

    const navLinks = document.querySelectorAll('.nav ul li a');
    const sections = document.querySelectorAll('section');

    function debounce(func, wait) {
        let timeout;
        return function() {
            clearTimeout(timeout);
            timeout = setTimeout(func, wait);
        };
    }

    const handleScroll = debounce(() => {
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === section.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, 100);

    window.addEventListener('scroll', handleScroll);

    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            } else {
                entry.target.classList.remove('animate');
            }
        });
    }, { threshold: [0.25, 0.5, 0.75] });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    const footer = document.querySelector('.footer');

    if (footer) {
        footer.style.opacity = '0.2';

        footer.addEventListener('mouseenter', function() {
            footer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            footer.style.opacity = '1';
        });

        footer.addEventListener('mouseleave', function() {
            footer.style.backgroundColor = 'transparent';
            footer.style.opacity = '0.2';
        });
    } else {
        console.error('Footer 요소를 찾을 수 없습니다.');
    }

    const highlightCurrentSection = () => {
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                section.classList.add('current');
            } else {
                section.classList.remove('current');
            }
        });
    };

    window.addEventListener('scroll', highlightCurrentSection);
    highlightCurrentSection();

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        loadingMessage.textContent = 'Please wait...';
        loadingScreen.style.display = 'flex';

        setTimeout(() => {
            form.reset();
            loadingMessage.textContent = 'Submitted!';

            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 2000);
            }, 2000);
        }, 2000);
    });
});
