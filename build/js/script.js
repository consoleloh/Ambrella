'use strict'
;(function(){
    const checkWEBPInit = () => {
        const isSupportWebp = () => {
            const elem = document.createElement('canvas');
        
            if (!!(elem.getContext && elem.getContext('2d'))) {
                return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
            } else {
                return false;
            }
        }
        
        document.documentElement.classList.add(isSupportWebp() ? 'webp' : 'no-webp');
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

    checkWEBPInit();
    collapseProblem();
    carouselBlog();
})();