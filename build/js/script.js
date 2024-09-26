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

    checkWEBPInit();
    collapseProblem();
})();