$(document).ready(function() {
    $('.course_wrapper').click(function() {
        window.location.href = $(this).data('url');
    });

    $('.course_wrapper').hover(function() {
        $(this).animate({ 
            padding: '0.5em 1em 0.5em 1em',
            backgroundColor: '#dddce9',
            color: '#555'
        }, 200);
    }, function() {
        $(this).animate({ 
            padding: '0.5em',
            backgroundColor: '#fff',
            color: '#555'
        }, 200);
    });

});

