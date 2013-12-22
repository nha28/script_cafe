$(document).ready(function() {
    start_tut();
//   alert($('#user_input_wrapper').data('new_user'));

    setTimeout(function() {
        $('.tutorial').fadeOut();
    }, 4000); 

    $(document).keypress(function(e){
        $('.tutorial').fadeOut();
    });
    
    myCodeMirror = CodeMirror.fromTextArea(id_snippet, {
        mode: 'xml',
                 htmlMode: true,
                 lineNumbers: true,
                 theme: 'mbo',
    });

$('#user_preview').draggable(); 

update_user_preview();
$('#user_input_wrapper').keyup(throttle(function() {
    update_user_preview();
}, 1000));


$('#hint_btn').click(function() {
    $('#hint_wrapper').toggle();
    $('#left_center_wrapper').animate({
        scrollTop: $('#left_center_wrapper').height()*2}, 150);
});

$('#save_submit_btn').click(function() {
    validate_challenge($('#user_input_wrapper').data('validating_info'), 
        $('#user_input_wrapper').data('url'));
});

$('#reset_btn').click(function() {
    myCodeMirror.setValue(
        $('#user_input_wrapper').data('original_snippet'));
});

$('#close_fail_btn').click(function() {
    $('#fail_result_container').hide();
});

$('#close_success_btn').click(function() {
    $('#success_result_container').hide();
});

$('#expand_btn').click(function() {
    $('#nav_wrapper').show();
});

$('#nav_wrapper').mouseleave(function() {
    $('#nav_wrapper').hide();
});

$('#minimize_btn').click(function() {
    $('#user_preview').animate({opacity: 0});
    $('#maximize_btn').animate({opacity: 1});
});

$('#maximize_btn').click(function() {
    $('#user_preview').animate({opacity: 1});
    $('#maximize_btn').animate({opacity: 0});
});
});

function update_user_preview() {
    var preview = myCodeMirror.getValue();
    $('#user_preview_content').html(preview);
};

function throttle(f, delay) {
    // throttle delay
    var timer = null;
    return function() {
        var context = this, args = arguments;

        clearTimeout(timer);
        timer = window.setTimeout(function() {
            f.apply(context, args);
        },
        delay || 500);
    };
};

function validate_challenge(validating_info, url) {
    var answer = $('#user_input_wrapper').data('answer_snippet');
    var user_input = myCodeMirror.getValue();
    result = (window['validate_'+validating_info](
                answer, user_input));

    if (result == true) {
        post(url, user_input);
    } else {
        $('#fail_result_message').html(result);
        $('#fail_result_container').fadeIn();
    }
};

function post(url, data_source) {
    this.url = url;
    var ajax_this = this;

    $.ajax({
        timeout: 3000,
           type: 'POST',
            url: ajax_this.url,
           data: data_source,
        context: ajax_this,
        success: function(response) {
            $('#success_result_message').html(response);
            $('#success_result_container').fadeIn();
        }
    });
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(
                        cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function csrfSafeMethod(method) {
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
    crossDomain: false, // obviates need for sameOrigin test
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type)) {
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        }
    }
});

function start_tut(){
    $('.tutorial').fadeIn();
}
