/**
 * 주식회사 정원푸드 웹사이트 JavaScript
 * Mobile First Multi-Page Design with Premium Side Drawer
 */

document.addEventListener('DOMContentLoaded', function() {
    // ===========================
    // 햄버거 메뉴 & 드로어 네비게이션
    // ===========================
    const menuToggle = document.getElementById('menuToggle');
    const navDrawer = document.getElementById('navDrawer');
    const navOverlay = document.getElementById('navOverlay');
    const drawerClose = document.getElementById('drawerClose');
    const body = document.body;
    
    // 드로어 열기
    function openDrawer() {
        navDrawer.classList.add('active');
        navOverlay.classList.add('active');
        body.classList.add('drawer-open');
    }
    
    // 드로어 닫기
    function closeDrawer() {
        navDrawer.classList.remove('active');
        navOverlay.classList.remove('active');
        body.classList.remove('drawer-open');
    }
    
    // 햄버거 버튼 클릭
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            openDrawer();
        });
    }
    
    // 닫기 버튼 클릭
    if (drawerClose) {
        drawerClose.addEventListener('click', closeDrawer);
    }
    
    // 오버레이 클릭
    if (navOverlay) {
        navOverlay.addEventListener('click', closeDrawer);
    }
    
    // 드로어 링크 클릭 시 닫기
    const drawerLinks = document.querySelectorAll('.drawer-link');
    drawerLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });
    
    // ESC 키로 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navDrawer.classList.contains('active')) {
            closeDrawer();
        }
    });
    
    // ===========================
    // Premium Mobile Side Drawer (Legacy - 제거됨)
    // ===========================
    const hamburger = document.getElementById('hamburger');
    const drawerOverlay = document.querySelector('.drawer-overlay');
    const mobileDrawer = document.querySelector('.mobile-drawer');
    const drawerCloseBtn = document.querySelector('.drawer-close-btn');
    const body = document.body;
    
    // Open Drawer
    function openDrawer() {
        if (drawerOverlay && mobileDrawer) {
            drawerOverlay.classList.add('is-active');
            mobileDrawer.classList.add('is-active');
            hamburger.classList.add('active');
            body.classList.add('drawer-open');
        }
    }
    
    // Close Drawer
    function closeDrawer() {
        if (drawerOverlay && mobileDrawer) {
            drawerOverlay.classList.remove('is-active');
            mobileDrawer.classList.remove('is-active');
            hamburger.classList.remove('active');
            body.classList.remove('drawer-open');
        }
    }
    
    // Hamburger Click - Open
    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            if (mobileDrawer && mobileDrawer.classList.contains('is-active')) {
                closeDrawer();
            } else {
                openDrawer();
            }
        });
    }
    
    // Close Button Click
    if (drawerCloseBtn) {
        drawerCloseBtn.addEventListener('click', closeDrawer);
    }
    
    // Overlay Click - Close
    if (drawerOverlay) {
        drawerOverlay.addEventListener('click', closeDrawer);
    }
    
    // Prevent drawer panel click from closing
    if (mobileDrawer) {
        mobileDrawer.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Close drawer when navigation link is clicked
    const drawerNavLinks = document.querySelectorAll('.drawer-nav-link');
    drawerNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeDrawer();
        });
    });
    
    // Close drawer on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('is-active')) {
            closeDrawer();
        }
    });
    
    // ===========================
    // Legacy Mobile Menu Toggle (Fallback)
    // ===========================
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenu) {
        // Close menu when clicking on a link
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (hamburger) hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.style.overflow = '';
            });
        });
    }
    
    // ===========================
    // Smooth Scrolling for In-Page Anchors
    // ===========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href.length <= 1) return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===========================
    // Header Scroll Effect
    // ===========================
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow on scroll
        if (scrollTop > 10) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12)';
        }
    });
    
    // ===========================
    // Active Page Highlighting
    // ===========================
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const allNavLinks = document.querySelectorAll('.mobile-menu a, .drawer-nav-link');
    
    allNavLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Remove active class from all
        link.classList.remove('active');
        
        // Add active class to current page
        if (linkPath === currentPath || 
            (currentPath === '' && linkPath === 'index.html') ||
            (currentPath === 'index.html' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // ===========================
    // Intersection Observer for Animations
    // ===========================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeInElements = document.querySelectorAll('.feature-card, .product-card, .tech-card, .value-card, .dist-card, .channel-card, .contact-card');
    
    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeInElements.forEach(element => {
        fadeInObserver.observe(element);
    });
    
    // ===========================
    // Contact Form Handling
    // ===========================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {};
            
            // Convert FormData to object
            for (let [key, value] of formData.entries()) {
                if (key === 'products') {
                    if (!data.products) {
                        data.products = [];
                    }
                    data.products.push(value);
                } else {
                    data[key] = value;
                }
            }
            
            // Validate required fields
            if (!data.company || !data.name || !data.email || !data.phone || !data.message) {
                alert('필수 항목을 모두 입력해주세요.');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('올바른 이메일 주소를 입력해주세요.');
                return;
            }
            
            // Validate phone format
            const phoneRegex = /^[0-9-+()]*$/;
            if (!phoneRegex.test(data.phone)) {
                alert('올바른 전화번호를 입력해주세요.');
                return;
            }
            
            // Check privacy agreement
            if (!data.privacy) {
                alert('개인정보 수집 및 이용에 동의해주세요.');
                return;
            }
            
            // Check if at least one product is selected (if products field exists)
            const productCheckboxes = document.querySelectorAll('input[name="products"]');
            if (productCheckboxes.length > 0 && (!data.products || data.products.length === 0)) {
                alert('관심 제품을 하나 이상 선택해주세요.');
                return;
            }
            
            // Show success message
            alert(`견적 문의가 성공적으로 접수되었습니다.\n\n담당자: ${data.name}님\n회사명: ${data.company}\n\n빠른 시일 내에 연락드리겠습니다.\n감사합니다.`);
            
            // Log form data (실제 구현 시 서버로 전송)
            console.log('Form Data:', data);
            
            // Reset form
            contactForm.reset();
            
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Real-time validation
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (this.value && !emailRegex.test(this.value)) {
                    this.style.borderColor = '#dc3545';
                } else {
                    this.style.borderColor = '';
                }
            });
        }
        
        if (phoneInput) {
            // Auto-format phone number
            phoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/[^0-9]/g, '');
                
                if (value.length <= 3) {
                    e.target.value = value;
                } else if (value.length <= 7) {
                    e.target.value = value.slice(0, 3) + '-' + value.slice(3);
                } else if (value.length <= 11) {
                    e.target.value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7);
                } else {
                    e.target.value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7, 11);
                }
            });
        }
    }
    
    // ===========================
    // Product Card Hover Effect
    // ===========================
    const productCards = document.querySelectorAll('.product-card, .product-detail-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '';
        });
    });
    
    // ===========================
    // Lazy Loading Images
    // ===========================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ===========================
    // Print Page Info
    // ===========================
    console.log('%c주식회사 정원푸드', 'color: #7d1d3f; font-size: 24px; font-weight: bold;');
    console.log('%cJungwon Food Co., Ltd.', 'color: #1b4332; font-size: 14px;');
    console.log('대표전화: 1877-5923');
    console.log('Website: Premium Mobile Side Drawer Design');
});

// ===========================
// Utility Functions
// ===========================

/**
 * Debounce function to limit function calls
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Get current viewport size
 */
function getViewportSize() {
    return {
        width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
        height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    };
}

// ===========================
// Performance Monitoring
// ===========================
window.addEventListener('load', function() {
    // Log page load time
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - 
                        window.performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    }
});

// ===========================
// Error Handling
// ===========================
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.message);
    // In production, send errors to logging service
});

// ===========================
// Resize Handler
// ===========================
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        const viewport = getViewportSize();
        console.log(`Viewport resized to: ${viewport.width}x${viewport.height}`);
        
        // Close mobile menu on resize to desktop
        if (viewport.width >= 1024) {
            const hamburger = document.getElementById('hamburger');
            const mobileMenu = document.getElementById('mobileMenu');
            
            if (hamburger && mobileMenu) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    }, 250);
});
