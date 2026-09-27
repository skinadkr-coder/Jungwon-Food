/**
 * 주식회사 정원푸드 웹사이트 JavaScript
 * Clean White Header + Horizontal Pill Tab Design
 */

(function() {
    console.log('=== JavaScript Start ===');
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        console.log('=== Initializing ===');
        setupPillTabMenu();
        setupSmoothScroll();
        setupHeaderScroll();
        setupContactForm();
        setupActiveTabHighlight();
    }
    
    // === Pill Tab Menu ===
    function setupPillTabMenu() {
        const tabChips = document.querySelectorAll('.tab-chip');
        
        console.log('Tab chips found:', tabChips.length);
        
        tabChips.forEach(function(chip) {
            chip.addEventListener('click', function(e) {
                e.preventDefault();
                
                // 모든 칩에서 active 제거
                tabChips.forEach(function(c) {
                    c.classList.remove('active');
                });
                
                // 클릭한 칩에 active 추가
                chip.classList.add('active');
                
                // 해당 섹션으로 스크롤
                const href = chip.getAttribute('href');
                const targetId = href.replace('#', '');
                const target = document.getElementById(targetId);
                
                if (target) {
                    const headerHeight = 110; // header + tab nav height
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // === Smooth Scroll ===
    function setupSmoothScroll() {
        const ctaBtn = document.querySelector('.header-cta-btn');
        const redPillBtn = document.querySelector('.hero-red-pill-btn');
        
        if (ctaBtn) {
            ctaBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                const href = ctaBtn.getAttribute('href');
                const targetId = href.replace('#', '');
                const target = document.getElementById(targetId);
                
                if (target) {
                    const headerHeight = 110;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
        
        if (redPillBtn) {
            redPillBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                const href = redPillBtn.getAttribute('href');
                const targetId = href.replace('#', '');
                const target = document.getElementById(targetId);
                
                if (target) {
                    const headerHeight = 110;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    }
    
    // === Active Tab Highlight on Scroll ===
    function setupActiveTabHighlight() {
        const sections = document.querySelectorAll('section[id]');
        const tabChips = document.querySelectorAll('.tab-chip');
        
        function highlightActiveTab() {
            const scrollY = window.pageYOffset;
            
            sections.forEach(function(section) {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 150;
                const sectionId = section.getAttribute('id');
                
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    tabChips.forEach(function(chip) {
                        chip.classList.remove('active');
                        
                        const chipHref = chip.getAttribute('href');
                        if (chipHref === '#' + sectionId) {
                            chip.classList.add('active');
                        }
                    });
                }
            });
        }
        
        window.addEventListener('scroll', highlightActiveTab);
        highlightActiveTab();
    }
    
    // === Header Scroll Effect ===
    function setupHeaderScroll() {
        const header = document.querySelector('.header');
        if (!header) return;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 10) {
                header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
            } else {
                header.style.boxShadow = '0 1px 0 rgba(0, 0, 0, 0.05)';
            }
        });
    }
    
    // === Contact Form ===
    function setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = {};
            
            for (let pair of formData.entries()) {
                data[pair[0]] = pair[1];
            }
            
            if (!data.company || !data.name || !data.email || !data.phone || !data.message) {
                alert('필수 항목을 모두 입력해주세요.');
                return;
            }
            
            alert('견적 문의가 성공적으로 접수되었습니다.\n\n담당자: ' + data.name + '님\n회사명: ' + data.company + '\n\n빠른 시일 내에 연락드리겠습니다.');
            
            contactForm.reset();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    console.log('=== JavaScript Complete ===');
})();
