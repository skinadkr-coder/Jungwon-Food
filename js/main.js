/**
 * 주식회사 정원푸드 — 멀티 페이지 공통 스크립트
 * 메뉴 <a> 클릭은 가로채지 않는다. 브라우저가 href HTML 파일로 바로 이동한다.
 */

(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        setupActiveNav();
        setupMobileMenuToggle();
        setupHeaderScroll();
        setupDesktopTabAlign();
        setupContactForm();
    }

    function currentPageFile() {
        var path = window.location.pathname.split('/').pop() || 'index.html';
        if (!path || path.indexOf('.') === -1) {
            return 'index.html';
        }
        return path.toLowerCase();
    }

    function setupActiveNav() {
        var file = currentPageFile();
        var links = document.querySelectorAll('.tab-chip, .site-menu-link');

        links.forEach(function(link) {
            var href = (link.getAttribute('href') || '').split('?')[0].split('#')[0].toLowerCase();
            if (href === file) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    function setupMobileMenuToggle() {
        var hamburger = document.getElementById('hamburger');
        var panel = document.getElementById('mobileMenuPanel');
        var overlay = document.getElementById('menuOverlay');
        if (!hamburger || !panel || !overlay) return;

        function isOpen() {
            return panel.classList.contains('is-open');
        }

        function openMenu() {
            hamburger.classList.add('active');
            hamburger.setAttribute('aria-expanded', 'true');
            panel.classList.add('is-open');
            overlay.classList.add('is-open');
            document.body.classList.add('menu-open');
        }

        function closeMenu() {
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            panel.classList.remove('is-open');
            overlay.classList.remove('is-open');
            document.body.classList.remove('menu-open');
        }

        hamburger.addEventListener('click', function() {
            if (isOpen()) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        overlay.addEventListener('click', closeMenu);
    }

    function setupDesktopTabAlign() {
        var mark = document.querySelector('.logo-sa-mark');
        var nav = document.querySelector('.sub-tab-nav');
        if (!mark || !nav) return;

        function alignNav() {
            if (window.innerWidth < 1024) {
                nav.style.paddingLeft = '';
                return;
            }

            var left = Math.round(mark.getBoundingClientRect().left);
            nav.style.paddingLeft = left + 'px';
            nav.style.justifyContent = 'flex-start';
        }

        alignNav();
        window.addEventListener('resize', alignNav);

        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(alignNav);
        }
    }

    function setupHeaderScroll() {
        var header = document.querySelector('.header');
        if (!header) return;

        window.addEventListener('scroll', function() {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            header.style.boxShadow = scrollTop > 10
                ? '0 2px 8px rgba(0, 0, 0, 0.08)'
                : '0 1px 0 rgba(0, 0, 0, 0.05)';
        });
    }

    function setupContactForm() {
        var contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        var SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwXbzpjqjoQghUYkYaFO0f0GbhX0qC1fKXUV558JI6unSsLKB2xFtgDb9MZrwl-0etkwA/exec';

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            var formData = new FormData(contactForm);
            var data = {};

            for (var pair of formData.entries()) {
                data[pair[0]] = pair[1];
            }

            if (!data.company || !data.name || !data.email || !data.phone || !data.message) {
                alert('필수 항목을 모두 입력해주세요.');
                return;
            }

            var submitBtn = contactForm.querySelector('button[type="submit"]');
            var originalText = submitBtn ? submitBtn.textContent : '';

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = '전송 중...';
            }

            fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    company: data.company,
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    message: data.message
                })
            })
            .then(function() {
                alert('견적 문의가 성공적으로 접수되었습니다.\n\n담당자: ' + data.name + '님\n회사명: ' + data.company + '\n\n빠른 시일 내에 연락드리겠습니다.');
                contactForm.reset();
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText || '견적 문의 접수하기';
                }
            })
            .catch(function() {
                alert('전송 중 오류가 발생했습니다.\n다시 시도해주세요.');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText || '견적 문의 접수하기';
                }
            });
        });
    }
})();
