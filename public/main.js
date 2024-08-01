document.addEventListener('DOMContentLoaded', function () {
    const loadingScreen = document.querySelector('.loading-screen');
    const form = document.getElementById('contact-form');
    const loadingMessage = document.querySelector('.loading-message');

    // 로딩 화면 초기화
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

    // 스크롤 애니메이션
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionID = this.getAttribute('href').substring(1);
            document.getElementById(sectionID).scrollIntoView({ behavior: 'smooth' });
        });
    });

    const navLinks = document.querySelectorAll('.nav ul li a');
    const sections = document.querySelectorAll('section');

    // 디바운스 함수
    function debounce(func, wait) {
        let timeout;
        return function() {
            clearTimeout(timeout);
            timeout = setTimeout(func, wait);
        };
    }

    // 현재 섹션 하이라이트
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

    // 섹션 애니메이션
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

    // 풋터 효과
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

    // 폼 제출
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        const formObject = Object.fromEntries(formData.entries());

        loadingMessage.textContent = 'Please wait...';
        loadingScreen.style.display = 'flex';

        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formObject)
        })
            .then(response => response.json())
            .then(data => {
                form.reset();
                loadingMessage.textContent = 'Submitted!';
            })
            .catch(error => {
                console.error('Error:', error);
                loadingMessage.textContent = 'Error occurred!';
            })
            .finally(() => {
                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 2000);
                }, 2000);
            });
    });
});
