(function() {
    document.addEventListener('DOMContentLoaded', function() {
        //get element coordinates functions
        var getCoordsBySelector = function(target) {
            var coords = document.querySelector(target).getBoundingClientRect();
            return coords;
        };

        var getCoordsByElement = function(target) {
            var coords = target.getBoundingClientRect();
            return coords;
        };



        //button-toTop click handler
        var buttonToTop = document.querySelector('.button-toTop');
        buttonToTop.addEventListener('click', function() {window.scrollTo({top:0, behavior: 'smooth'});});
        


        //links click handlers
        var links = document.querySelectorAll('a');
        links.forEach(function(item, i, arr) {
            item.addEventListener('click', function() {smoothScrollTo(event);});
        });
        


        //smooth scrolling functions
        var menuHeight = document.querySelector('.menu').clientHeight;
        function smoothScrollTo(e) {
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
        var animatedElements = document.querySelectorAll('.animated');
        var windowBottom = document.documentElement.clientHeight;
        animatedElements.forEach(function(item, i , arr) {          
            let itemTop = getCoordsByElement(item).top;
            let itemBottom = getCoordsByElement(item).bottom;
            if (itemTop < windowBottom && itemBottom >= 0) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        


        //page scrolling handler
        window.onscroll = function() {
            //animation while scrolling
            animatedElements.forEach(function(item, i , arr) {          
                var itemTop = getCoordsByElement(item).top;
                var itemBottom = getCoordsByElement(item).bottom;   
                if (itemTop < windowBottom && itemBottom >= 0) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });

            //headlight menu links
            var menuLinks = document.querySelectorAll('.menu .menu-links a');
            menuLinks.forEach(function(item, i, arr) {
                if (item.hash[0] == '#'  && getCoordsBySelector(item.hash).top < windowBottom/2) {
                    menuLinks.forEach(function(item, i, arr) {
                        item.classList.remove('hovered');
                    });
                    item.classList.add('hovered');
                }
            });

            //fixing 'menu'
            var menuTop = getCoordsBySelector('.menu').top;
            var headerBottom = getCoordsBySelector('header').bottom;
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
        var slider = document.querySelector('.slider');
        var sliderBox = document.querySelector('.slider-box');
        var slides = slider.querySelectorAll('.slide');
        var bulletSection = document.querySelector('.slider .bullet-section');
        var bullets = bulletSection.querySelectorAll('.bullet');
        
        bullets.forEach(function(item, i, arr) {
            item.addEventListener('click', function() {
                if (~item.className.indexOf('selected')) {
                    console.log('This bullet is already selected!');
                } else {
                    //change selected bullet
                    bullets.forEach(function(item, i, arr) {
                        item.classList.remove('selected');
                    });
                    item.classList.add('selected');

                    //change selected slide
                    slides.forEach(function(item, i, arr) {
                        item.classList.remove('selected');
                    });
                    slides[i].classList.add('selected');
                    slides.forEach(function(item, i, arr) {
                        if (~item.className.indexOf('selected')) {
                            sliderBox.style.left = -item.clientWidth * i + "px";
                        }
                    });
                }
            });
        });

        //touch event handler
        slider.addEventListener('touchmove', function(event) {
            event.preventDefault();
            console.log(event.touches[0].screenX);
        });



        //
    });
})();