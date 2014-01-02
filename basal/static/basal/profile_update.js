$(document).ready(function() {
});

function post_profile_update_form() {
    this.url = $('#form').attr('action');
    var ajax_this = this;
    $.ajax({
        timeout: 3000,
           type: 'POST',
            url: ajax_this.url,
           data: $('#form').serialize(),
        context: ajax_this,
        success: function(response) {
            $("#popup_form").html(response).slideDown();
        }
    });
}
