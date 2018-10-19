;(() => {
    document.addEventListener('DOMContentLoaded', () => {
        //get element coordinates functions
        let getCoordsBySelector = (target) => {
            let coords = document.querySelector(target).getBoundingClientRect();
            return coords;
        };

        let getCoordsByElement = (target) => {
            let coords = target.getBoundingClientRect();
            return coords;
        };

        //button-toTop click handler
        let buttonToTop = document.querySelector('.button-toTop');
        buttonToTop.addEventListener('click', () => {window.scrollTo({top:0, behavior: 'smooth'});});
        
        //links click handlers
        let links = document.querySelectorAll('a');
        links.forEach((item) => {
            item.addEventListener('click', () => {smoothScrollTo(event);});
        });
        
        //smooth scrolling functions
        let menuHeight = document.querySelector('.menu').clientHeight;
        let smoothScrollTo = (e) => {
            let source = e.target;
            let target = document.querySelector(source.hash);
            let targetTop = getCoordsByElement(target).top;
            if (source.hash[0] == '#') {
                e.preventDefault();
                if (source.hash == '#about' && targetTop <= 0) {
                    window.scrollBy({top: targetTop, behavior: "smooth"});
                } else {
                    window.scrollBy({top: targetTop-menuHeight, behavior: "smooth"});
                }
            }
        }
        
        //checking if animated element shows in browser window (if true -> add class 'active')
        let animatedElements = document.querySelectorAll('.animated');
        let windowBottom = document.documentElement.clientHeight;
        animatedElements.forEach((item) => {          
            let itemTop = getCoordsByElement(item).top;
            let itemBottom = getCoordsByElement(item).bottom;
            if (itemTop < windowBottom && itemBottom >= 0) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        //page scrolling handler
        window.onscroll = () => {
            //animation while scrolling
            animatedElements.forEach((item) => {          
                let itemTop = getCoordsByElement(item).top;
                let itemBottom = getCoordsByElement(item).bottom;   
                if (itemTop < windowBottom && itemBottom >= 0) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });

            //headlight menu links
            let menuLinks = document.querySelectorAll('.menu .menu-links a');
            menuLinks.forEach((item) => {
                if (item.hash[0] == '#'  && getCoordsBySelector(item.hash).top < windowBottom/2) {
                    menuLinks.forEach((item) => {
                        item.classList.remove('hovered');
                    });
                    item.classList.add('hovered');
                }
            });

            //fixing 'menu'
            let menuTop = getCoordsBySelector('.menu').top;
            let headerBottom = getCoordsBySelector('header').bottom;
            if (menuTop < 0) {
                document.querySelector('.menu').classList.add('fixed');
            } else if (headerBottom > 0) {
                document.querySelector('.menu').classList.remove('fixed');
            }

            //button-toTop appearance
            if (window.pageYOffset > 150) {
                buttonToTop.style.display = 'block';
            } else {
                buttonToTop.style.display = 'none';
            }
        };
      
        //slider
        let slider = document.querySelector('.slider');
        let sliderBox = document.querySelector('.slider-box');
        let slides = slider.querySelectorAll('.slide');
        let bulletSection = document.querySelector('.slider .bullet-section');
        let bullets = bulletSection.querySelectorAll('.bullet');
        
        bullets.forEach((item, i) => {
            item.addEventListener('click', () => {
                if (~item.className.indexOf('selected')) {
                    console.log('This bullet is already selected!');
                } else {
                    //change selected bullet
                    bullets.forEach((item) => {
                        item.classList.remove('selected');
                    });
                    item.classList.add('selected');

                    //change selected slide
                    slides.forEach((item) => {
                        item.classList.remove('selected');
                    });
                    slides[i].classList.add('selected');
                    slides.forEach((item, i) => {
                        if (~item.className.indexOf('selected')) {
                            sliderBox.style.left = -item.clientWidth * i + "px";
                        }
                    });
                }
            });
        });

        // TODO: touch event handler
        // slider.addEventListener('touchmove', function(event) {
        //     event.preventDefault();
        //     console.log(event.touches[0].screenX);
        // });
    });
})();