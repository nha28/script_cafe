$(document).ready(function() {
    $('#expand_btn').click(function() {
        $('#nav_wrapper').show();
    });

    $('#nav_wrapper').mouseleave(function() {
        $('#nav_wrapper').hide();
    });
});
