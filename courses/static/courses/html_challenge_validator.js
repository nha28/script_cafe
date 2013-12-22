function validate_html(answer, input) {
    input_array = input.split(/(<|>)/);
    answer_array = answer.split(/(<|>)/);

    console.log('answer_array:'+ answer_array);
    console.log('input_array:'+ input_array);

     // CHECK: DOCTYPE tag is present
    temp = input_array[2].replace(/\s\s+/gmi,'');
    console.log('temp:'+temp);
    if (!(/</.test(input_array[1])) || !(/!DOCTYPE html/.test(temp)) ||
            !(/>/.test(input_array[3]))) {
        return 'Have you gotten your "&lt;!DOCTYPE html&gt;"?';
    }
   
    // CHECK: no text before DOCTYPE tag
    if ('' != input_array[0].replace(/\s+/g,'')) {
        return 'Make sure there is no text before your ' + 
               '"&lt;!DOCTYPE html&gt;".';
    } else if ('' != input_array[4].replace(/\s+/g,'')) {
        return 'Make sure there is no text before your "&lt;html&gt;".';
    } else if ('' != input_array[input_array.length-1].replace(/\s+/g,'')) {
        return 'Make sure there is no text after your "&lt;html&gt;".';
    }

    // if user added more than necessary
    console.log('answer_array size:'+ answer_array.length);
    console.log('input_array size:'+ input_array.length);

    if (input_array.length > answer_array.length) {
        return 'You must have added extra tags or "&lt;", "&gt;", please ' +
               'remove them as they kind of screw up the validator.';
    }

    for (var i = 4; i < answer_array.length; i++) {

        if ((answer_array[i-1] == '<') && (answer_array[i+1] == '>')) {
            // check if tags are equal //
            if ((input_array[i-1] != '<') || (input_array[i+1] != '>')) {
                return 'You might have forgotten your "&lt;' + 
                        answer_array[i] + 'gt;" or your "&lt;", "&gt;".'; 
            }
            var temp = input_array[i].replace(/\s*\n*/gmi,'');

            if (temp != answer_array[i]) {
                return 'Looks like you might have gotten your "&lt;' + 
                       answer_array[i] + '&gt;" tag wrong';
            }

        }
    }

    return true;
}
