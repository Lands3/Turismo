// Inicialización de AOS
AOS.init({
  offset: 120,
  delay: 0,
  duration: 900,
  easing: 'ease',
  once: false,
  mirror: false,
  anchorPlacement: 'top-bottom',
});

document.addEventListener('DOMContentLoaded', function () {
    const counters = document.querySelectorAll('#counter .display-4');
    
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const callback = function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const increment = target / 100;
                
                let count = 0;

                const updateCount = () => {
                    count += increment;
                    if (count < target) {
                        counter.textContent = Math.ceil(count) + (counter.dataset.suffix || '');
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.textContent = target + (counter.dataset.suffix || '');
                    }
                };

                requestAnimationFrame(updateCount);
                observer.unobserve(counter);
            }
        });
    };

    const observer = new IntersectionObserver(callback, options);

    counters.forEach(counter => {
        counter.dataset.target = parseInt(counter.textContent);
        counter.dataset.suffix = counter.textContent.replace(/^\d+/, '');
        counter.textContent = '0';
        observer.observe(counter);
    });
});