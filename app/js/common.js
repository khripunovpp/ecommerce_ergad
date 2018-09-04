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
        maxCount = 11;

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

});