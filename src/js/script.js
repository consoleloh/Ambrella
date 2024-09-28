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
            problem.addEventListener('click', e => {
                problem.classList.toggle('problems__item--open');
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

    checkWEBP();
    toggleMenu();
    scrollMenu();
    scrollTo();
    popupsInit();
    collapseProblem();
    carouselBlog();
})();