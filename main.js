document.addEventListener('DOMContentLoaded', function () {
    // 로딩 스크린 및 스크롤 잠금 제어
    const loadingScreen = document.querySelector('.loading-screen');

    // 로딩 스크린 보이기 및 스크롤 잠금
    document.body.classList.add('body-loading'); // 스크롤 잠금

    // 1.5초 후에 로딩 스크린을 서서히 사라지게 함
    setTimeout(function() {
        loadingScreen.classList.add('hidden'); // `hidden` 클래스를 추가하여 서서히 사라지도록 설정
        setTimeout(function() {
            loadingScreen.style.display = 'none'; // 로딩 스크린을 완전히 숨김
            document.body.classList.remove('body-loading'); // 스크롤 잠금 해제
        }, 1000); // 1초 후에 완전히 숨김
    }, 1500); // 1.5초 후에 로딩 스크린 서서히 사라지기 시작

    // Smooth scrolling to sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionID = this.getAttribute('href').substring(1);
            document.getElementById(sectionID).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Toggle active class in navigation menu based on scroll position
    const navLinks = document.querySelectorAll('.nav ul li a');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
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
    });

    // Intersection Observer for section animations
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            } else {
                entry.target.classList.remove('animate');
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // JavaScript for footer opacity and hover effect
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
});