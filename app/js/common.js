var _countDown = function(elem) {

    var timerTime = 5000;
    var minutes = 15;

    var counter = $('.counter__num');

    var value = counter.text();

    var date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000));

    if ($.cookie('counter') == undefined) {
        $.cookie('counter', (value), {
            expires: date
        });
    }

    num = $.cookie('counter');

    if ($.cookie('counter') == null) {
        num = value;
    }

    counter.text(num);

    if (num < 8) {
        counter.text(7);
    }

    var count = counter.text();
    var setTimer = setInterval(function() {

        if (num > 7) {
            var rand = random(0, 1);
            num = num - rand;
            counter.text(num);

        }
        $.cookie('counter', (num), {
            expires: date
        });
        if (num < 8) {
            clearInterval(setTimer);
            $.cookie('counter', (7), {
                expires: date
            });
        }

    }, timerTime);
}

var timer = function(timer) {
    var _currentDate = new Date();
    var count = 15;
    var _toDate = new Date(_currentDate.getFullYear(),
        _currentDate.getMonth(),
        _currentDate.getDate(),
        _currentDate.getHours(),
        _currentDate.getMinutes() + count,
        1);

    timer.countdown(_toDate, function(e) {

        var $this = $(this);
        var hours = $this.find('.b-timer__num--hours');
        var min = $this.find('.b-timer__num--mins');
        var sec = $this.find('.b-timer__num--sec');

        hours.text('' + e.strftime('%H'));
        min.text('' + e.strftime('%M'));
        sec.text('' + e.strftime('%S'));

    });
}

var colorChoiser = function() {
    var colorEl = '.b-colors__item',
        activeClaass = 'active';

    $(colorEl).on('click', function(event) {
        event.preventDefault();

        $(this).addClass(activeClaass).siblings(colorEl).removeClass(activeClaass);

    });
}

var quantityChoiser = function() {
    var minusBtnEl = '.b-counter__minus',
        plusBtnEl = '.b-counter__plus',
        countEl = '.b-counter__count',
        maxCount = $('.b-counter').data('max');

    $(minusBtnEl).on('click', function(event) {
        event.preventDefault();

        var currentCount = $(countEl).text();

        if (currentCount > 0) $(countEl).text(+currentCount - 1);

    });

    $(plusBtnEl).on('click', function(event) {
        event.preventDefault();

        var currentCount = $(countEl).text();

        if (currentCount < maxCount) $(countEl).text(+currentCount + 1);
    });
}

var fixedTop = function(scroll) {
    var el = '.b-top',
        fixedClasss = 'showed',
        triggerEl = '.b-info__buttons',
        triggerOffset = $(triggerEl).offset(),
        triggerOffsetTop = triggerOffset.top;

    if (scroll > triggerOffsetTop) {
        $(el).addClass(fixedClasss)
    } else {
        $(el).removeClass(fixedClasss)
    }
}

var tabs = function() {
    var tabsWrapEl = '.b-tabs',
        tabItemEl = '.b-tabs__item',
        activeTabClass = 'active',
        contentPartEl = '.b-content__part',
        contentMainEl = '.b-content__main',
        mainEl = '.b-content__part--main .b-content__main',
        content = $(contentPartEl).eq(1).find(contentMainEl).html();;

    $(tabItemEl).on('click', function(event) {
        event.preventDefault();

        var that = this,
            index = +$(that).index() + 1;

        content = $(contentPartEl).eq(index).find(contentMainEl).html();

        $(that).addClass(activeTabClass).siblings(tabItemEl).removeClass(activeTabClass);

        $(mainEl).html(content)
    });

    $(tabItemEl).eq(0).addClass(activeTabClass).siblings(tabItemEl).removeClass(activeTabClass);

    $(mainEl).html(content)
}

var setDates = function(classEl) {
    var now = new Date();

    $(classEl).each(function() {
        var daysFromToday = $(this).data('days-from-today');

        now.setDate(now.getDate() + daysFromToday + 1);

        var dayNum = '';
        if (now.getDate() < 10) {
            dayNum = '0';
        }
        dayNum += now.getDate();

        var monthNum = '';
        if (now.getMonth() + 1 < 10) {
            monthNum = '0';
        }
        monthNum += now.getMonth() + 1;

        $(this).prepend(dayNum + "." + monthNum + "." + now.getFullYear())

    });
}

var addReview = function(form) {

    var filesNames = [];

    $('.b-formReview__fileField').on('change', function() {
        for (var i = 0; i < $(this).get(0).files.length; ++i) {
            filesNames.push($(this).get(0).files[i].name);
        }
        showFilesName('.b-formReview__upload', filesNames)
    });

    function showFilesName(wrap, files) {
        files.forEach(function(item) {
            $(wrap).append('<p class="b-formReview__fileName">' + item + '</p>')
        })
    }

    function getData(event) {
        event.preventDefault()

        function toJSONString(formT) {
            var obj = {};
            var elements = formT.querySelectorAll("input:not([type='file']), select, textarea");
            for (var i = 0; i < elements.length; ++i) {
                var element = elements[i];
                var name = element.name;
                var value = element.value;

                if (name) {
                    obj[name] = value;
                }
            }

            return JSON.stringify(obj);
        }

     var json = toJSONString(form);

        console.log(json)
    }

    function sendReview(data) {

    }

    $('.b-formReview__btn').on('click', getData);
}


$(function() {

    $(".b-gallery__list").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.b-thumbs'
    });

    $('.b-thumbs').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        asNavFor: '.b-gallery__list',
        dots: false,
        focusOnSelect: true,
        nextArrow: '.b-gallery__next',
        prevArrow: '',
        variableWidth: true
    });


    timer($('.b-timer__nums'))

    colorChoiser()

    quantityChoiser()

    $(window).on('scroll resize', function(event) {
        fixedTop($(this).scrollTop());
    });

    tabs()

    setDates('.js-date')

    addReview($('.b-formReview').get(0))

});