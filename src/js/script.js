'use strict'
;(function(){
    const checkWEBP = () => {
        const isSupportWebp = () => {
            const elem = document.createElement('canvas');
        
            if (!!(elem.getContext && elem.getContext('2d'))) {
                return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
            } else {
                return false;
            }
        }
        
        document.documentElement.classList.add(!isSupportWebp() ? 'no-webp' : 'webp');
    };

    const toggleMenu = () => {
        const header = document.querySelector('.page__header');
        const control = document.querySelector('.js-toggle-menu');

        control.addEventListener('click', () => {
            header.classList.toggle('page__header--opened');
        });
    };

    const scrollMenu = () => {
        window.addEventListener("scroll", () => {
            const h = document.querySelector('.page__header');
            const b = document.body;
            let d = document.documentElement;
            d = (d.clientHeight) ? d : b;
        
            if (d.scrollTop > 1){
                if (!h.classList.contains('page__header--offset')){
                    h.classList.add('page__header--offset');
                }
            } else {
                h.classList.remove('page__header--offset')
            }
        });
    };

    const scrollTo = () => {
        const headerHeight = document.querySelector('.page__header').offsetHeight;

        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                const section = document.querySelector(link.hash);
                let top = window.scrollY + section.getBoundingClientRect().top - headerHeight;

                if (top > 0) {
                    top -= 20;
                }

                window.scrollTo({
                    top: top,
                    left: 0,
                    behavior: "smooth"
                });

                document.querySelector('.page__header').classList.remove('page__header--opened');
            });
        });
    };
    
    const popupsInit = () => {
        Fancybox.bind('[data-fancybox]', {
            closeButton: false
        });
    };

    const collapseProblem = () => {
        document.querySelectorAll('.js-problem-collapse').forEach(problem => {
            const control = problem.querySelector('.problem__title');

            control.addEventListener('click', e => {
                const text = problem.querySelector('.problem__text');

                problem.classList.toggle('problems__item--open');
                slideToggle(text, 300);
            });
        });
    }

    const carouselBlog = () => {
        const mql = window.matchMedia('(max-width: 1229px)');
        const postSlides = document.querySelectorAll('.js-post-slide');

        const slider = () => {
            let swiper;

            if (mql.matches) {
                postSlides.forEach(post => {
                    post.classList.add('swiper-slide');
                });

                swiper = new Swiper('.swiper', {
                    loop: false,
                    spaceBetween: 20,
                    slidesPerView: 1,
                    navigation: {
                      nextEl: '.posts__control--next',
                      prevEl: '.posts__control--prev',
                    },
                    breakpoints: {
                        768: {
                            slidesPerView: 2
                        }
                    }
                });
            } else {
                if (swiper) swiper.destroy();
                
                postSlides.forEach(post => {
                    post.classList.remove('swiper-slide');
                    post.attributeStyleMap.clear();
                });
            }
        }

        window.addEventListener('load', slider);
        window.addEventListener('resize', slider);
    };
    
    const slideUp = (target, duration = 500) => {
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.boxSizing = 'border-box';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.style.display = 'none';
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
        }, duration);
    };
     
    const slideDown = (target, duration = 500) => {
        target.style.removeProperty('display');

        let display = window.getComputedStyle(target).display;
     
        if (display === 'none') display = 'block';
        
        target.style.display = display;

        const height = target.offsetHeight;

        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.boxSizing = 'border-box';
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
        }, duration);
    };

    const slideToggle = (target, duration = 500) => {
        return window.getComputedStyle(target).display === 'none' ? slideDown(target, duration) : slideUp(target, duration);
    };

    checkWEBP();
    toggleMenu();
    scrollMenu();
    scrollTo();
    popupsInit();
    collapseProblem();
    carouselBlog();
})();