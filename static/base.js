$(document).ready(function() {
    $('#close_btn').click(hide_popup);

    $(document).keyup(function(e) {
        if (e.keyCode == 27) { hide_popup(); }
    });

    $('#sign_in_button').click(function() {
        get_login_form($('#sign_in_button').data('url'));
    });

    $('#create_an_account_button').click(function() {
        get_registration_form($('#create_an_account_button').data('url'));
    });
});

function display_popup(content) {
    $('#popup_content').html(content);
    $('#popup_container').css({'display': 'block'});
    $('#popup_screen').css({'display': 'block'});
}

function hide_popup() {
    $('#popup_content').empty();
    $('#popup_container').css({'display': 'none'});
    $('#popup_screen').css({'display': 'none'});
}



function get_login_form(url) {
    this.url = url;
    var ajax_this = this;
    $.ajax({
        timeout: 3000,
        type: 'GET',
        url: ajax_this.url,
        context: ajax_this,
        success: function(response) {
            display_popup(response);
            $('#id_username').focus();
        }
    });
}

function get_registration_form(url) {
    this.url = url;
    var ajax_this = this;
    $.ajax({
        timeout: 3000,
        type: 'GET',
        url: ajax_this.url,
        context: ajax_this,
        success: function(response) {
            display_popup(response);
            $('#id_username').focus();
        }
    });
}
