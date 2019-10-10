<template>
    <div>
        <hero-sec></hero-sec>
        <feature></feature>
        <lastest-product></lastest-product>
        <product-filter></product-filter>
        <banner></banner>
    </div>
</template>

<script>
    import FrontHeader from '../components/layouts/Header.vue'
    import HeroSec from '../components/layouts/Hero.vue'
    import Feature from '../components/layouts/Feature.vue'
    import LastestProduct from '../components/layouts/Lastest.vue'
    import ProductFilter from '../components/layouts/ProductFilter.vue'
    import Banner from '../components/layouts/Banner.vue'
    import FrontFooter from '../components/layouts/Footer.vue'

    export default {
        components: {
            FrontHeader,
            HeroSec,
            Feature,
            LastestProduct,
            ProductFilter,
            Banner,
            FrontFooter
        },
        mounted () {
            var hero_s = $(".hero-slider");
		    hero_s.owlCarousel({
			loop: true,
			margin: 0,
			nav: true,
			items: 1,
			dots: true,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			navText: ['<i class="flaticon-left-arrow-1"></i>', '<i class="flaticon-right-arrow-1"></i>'],
			smartSpeed: 1200,
			autoHeight: false,
			autoplay: true,
			onInitialized: function() {
				var a = this.items().length;
				$("#snh-1").html("<span>1</span><span>" + a + "</span>");
			}
            }).on("changed.owl.carousel", function(a) {
                var b = --a.item.index, a = a.item.count;
                $("#snh-1").html("<span> "+ (1 > b ? b + a : b > a ? b - a : b) + "</span><span>" + a + "</span>");

            });

            hero_s.append('<div class="slider-nav-warp"><div class="slider-nav"></div></div>');
            $(".hero-slider .owl-nav, .hero-slider .owl-dots").appendTo('.slider-nav');

            $('.main-menu').slicknav({
                prependTo:'.main-navbar .container',
                closedSymbol: '<i class="flaticon-right-arrow"></i>',
                openedSymbol: '<i class="flaticon-down-arrow"></i>'
            });


            /*------------------
                ScrollBar
            --------------------*/
            $(".cart-table-warp, .product-thumbs").niceScroll({
                cursorborder:"",
                cursorcolor:"#afafaf",
                boxzoom:false
            });


            /*------------------
                Category menu
            --------------------*/
            $('.category-menu > li').hover( function(e) {
                $(this).addClass('active');
                e.preventDefault();
            });
            $('.category-menu').mouseleave( function(e) {
                $('.category-menu li').removeClass('active');
                e.preventDefault();
            });


            /*------------------
                Background Set
            --------------------*/
            $('.set-bg').each(function() {
                var bg = $(this).data('setbg');
                $(this).css('background-image', 'url(' + bg + ')');
            });

            /*------------------
                Popular Services
            --------------------*/
            $('.popular-services-slider').owlCarousel({
                loop: true,
                dots: false,
                margin : 40,
                autoplay: true,
                nav:true,
                navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
                responsive : {
                    0 : {
                        items: 1,
                    },
                    768 : {
                        items: 2,
                    },
                    991: {
                        items: 3
                    }
                }
            });

            /*------------------
                Accordions
            --------------------*/
            $('.panel-link').on('click', function (e) {
                $('.panel-link').removeClass('active');
                var $this = $(this);
                if (!$this.hasClass('active')) {
                    $this.addClass('active');
                }
                e.preventDefault();
            });


            /*-------------------
                Range Slider
            --------------------- */
            var rangeSlider = $(".price-range"),
                minamount = $("#minamount"),
                maxamount = $("#maxamount"),
                minPrice = rangeSlider.data('min'),
                maxPrice = rangeSlider.data('max');
            rangeSlider.slider({
                range: true,
                min: minPrice,
                max: maxPrice,
                values: [minPrice, maxPrice],
                slide: function (event, ui) {
                    minamount.val('$' + ui.values[0]);
                    maxamount.val('$' + ui.values[1]);
                }
            });
            minamount.val('$' + rangeSlider.slider("values", 0));
            maxamount.val('$' + rangeSlider.slider("values", 1));
   
        }
    }
</script>