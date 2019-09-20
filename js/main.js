let countSec = 0;
let countMin = 0;

function updateText() {
    $('.minutes').val(('0' + String(countMin)).slice(-2));
    $('.seconds').val(('0' + String(countSec)).slice(-2));
}
updateText();

function countDown() {
    let tot = countSec + countMin * 60;
    const interval = setTimeout(countDown, 1000);
    if (countSec > 0) countSec--;
    else if (countMin > 0) {
        countSec = 59;
        countMin--;
    } else {
        clearInterval(interval);
        $('.countdown').hide();
        $('.stop').hide();
        $('.restart').show();
        $('.c-t').css('color','white');
        $('.message').html("<p>Time is over</p>")
    }
    updateText();

    $('.stop').click(() => {
        clearInterval(interval);
        $('.stop').hide();
        $('.num-controls').show();
        $('.c-t').css('color','white');
        $('.start').show()
    });
}

$('.plus').click(() => {
    if (countSec < 59) countSec++;
    else {
        countSec = 0;
        countMin++;
    }
    updateText()
});

$('.minus').click(() => {
    if (countSec > 0) countSec--;
    else if (countMin > 0) {
        countSec = 59;
        countMin--
    }
    updateText()
});

$('.start').click(() => {
    $('.start').hide();
    $('.num-controls').hide();
    $('.stop').show();
    $('.c-t').css('color','#7ffaff');
    countDown()
});

$('.restart').click(() => {
    $('.restart').hide();
    $('.countdown').show();
    $('.num-controls').show();
    $('.message').html("");
    $('.start').show()
})

$(`.c-t`).keydown((e) => {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode === 65 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

$(".c-t").on('input', function() {
    const numStr = $(this).val();
    if (numStr.length > 2) {
        updateText();
        alert('Too many symbols (type not more than 2)')
    } else if (parseInt(numStr) > 59) {
        updateText();
        alert('Number must be smaller than 60')
    } else if (!numStr) {
        //pass
    } else {
        countSec = parseInt($('.seconds').val());
        countMin = parseInt($('.minutes').val());
        setTimeout(updateText, 1000)
    }
});