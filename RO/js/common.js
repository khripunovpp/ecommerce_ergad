var randomInteger = function(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

var onResize = function(params) {
    var _defautParams = {
        before: function() {},
        after: function() {},
        breakPoint: 992
    }
    params = $.extend(_defautParams, params);

    var a = 1,
        b = 0,
        flag = false,
        stop = true;

    $(window).on('resize', function() {
        $(this).width() < params.breakPoint ?
            b = 1 :
            b = 0
        a == b ?
            flag = true :
            flag = false
    });

    $(window).on('resize', function() {
        if (flag && !stop) {
            stop = true;
            params.before();
        }

        if (!flag && stop) {
            stop = false;
            params.after();
        }
    })
}

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
        mainEl = '.b-content__part--main .b-content__main';

    $(tabItemEl).on('click', function(event) {
        event.preventDefault();

        var that = this,
            index = +$(that).index() + 1;

        content = $(contentPartEl).eq(index).find(contentMainEl).html();

        $(that).addClass(activeTabClass).siblings(tabItemEl).removeClass(activeTabClass);

        $(mainEl).html(content)
    });

    init()

    function init() {
        var content = $(contentPartEl).eq(1).find(contentMainEl).html()

        $(tabItemEl).eq(0).addClass(activeTabClass).siblings(tabItemEl).removeClass(activeTabClass);

        $(mainEl).html(content)
    }

    onResize({
        before: init
    })
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

    var filesNames = [],
        overlayEl = '#overlay',
        popupEl = '.b-popup',
        ststus = 0;

    $('.b-formReview__fileField').on('change', function() {

        var hasUploads = $('.b-formReview__fileName').length;

        if (hasUploads == 0) {
            getFilesNames(this)
            showFilesNames('.b-formReview__upload', filesNames)
        } else {
            getFilesNames(this)
            showFilesNames('.b-formReview__upload', filesNames, true)
        }
    });

    function getFilesNames(input) {
        for (var i = 0; i < $(input).get(0).files.length; ++i) {
            filesNames.push($(input).get(0).files[i].name);
        }
    }

    function showFilesNames(wrap, files, clean) {
        if (clean) {
            $('.b-formReview__fileName').each(function() {
                $(this).remove()
            })
        }
        files.forEach(function(item) {
            $(wrap).prepend('<p class="b-formReview__fileName">' + item + '</p>')
        })
    }

    function deleteFile() {
        var elIndex = $(this).index(),
            reverseArr = filesNames.reverse();

        $(this).remove();

        reverseArr.splice(elIndex, 1);

        filesNames = reverseArr.reverse();
    }

    function getData(event) {

        event.preventDefault()

        function toJSONString(formT) {
            var obj = {};
            var elements = $("input[type='text'], input[type='radio']:checked", formT);

            $(elements).each(function() {
                var name = $(this).prop('name');
                var value = $(this).val();
                if (name) {
                    obj[name] = value;
                }
            })


            return JSON.stringify(obj);
        }

        var json = JSON.parse(toJSONString(form));

        json.files = filesNames;
        makeComment(json)
    }

    function makeComment(data) {
        ststus = 1;
        hidePopup();

        form.reset()
        var commentTemplate = $('.js-comment-template .b-feedback').get(),
            title = data.title,
            overall = data.overall,
            price = data.price,
            quality = data.quality,
            appearance = data.appearance,
            userName = 'User'+randomInteger(55000,99999);

        function setStars(count) {
            var starsString = "";
            for (var i = 1; i <= 5; i++) {
                if (i <= count) {
                    starsString = starsString + "<span class='b-metrics__star selected'></span>";
                } else {
                    starsString = starsString + "<span class='b-metrics__star'></span>";
                }
            }

            return starsString;
        }

        $(commentTemplate).find('.b-feedback__lead').append(title)
        $(commentTemplate).find('.b-feedback__name').append(userName)
        $(commentTemplate).find('.b-metrics__item--overall .b-metrics__stars').html(setStars(overall))
        $(commentTemplate).find('.b-metrics__item--price .b-metrics__stars').html(setStars(price))
        $(commentTemplate).find('.b-metrics__item--quality .b-metrics__stars').html(setStars(quality))
        $(commentTemplate).find('.b-metrics__item--appearance .b-metrics__stars').html(setStars(appearance))

        function sendComment() {
            $('.b-comments__list').append(commentTemplate)
        }

        setTimeout(function() {
            sendComment()
        }, 400)
    }

    function hidePopup() {
        $(popupEl).fadeOut(200, function() {
            $(overlayEl).fadeOut(200, function() {
                form.reset()
            })
        })
    }

    function showPopup() {
        $(popupEl).removeAttr('style')
        $(overlayEl).fadeIn(400, function() {
            $(popupEl).addClass('showed')
        })
    }

    $('body').on('click', '.b-comments__btn', showPopup);

    $('.b-formReview__btn').on('click', getData);

    $('.b-popup__close').on('click', hidePopup);

    $('body').on('click', '.b-formReview__fileName', deleteFile);
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