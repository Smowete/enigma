const generate_key_url = 'php/generate_key.php';
const upload_url = 'php/upload.php';
const enigma_url = 'enigma.php';
const form = document.querySelector('form');


document.getElementById("encode").onclick = encode;
document.getElementById("decode").onclick = decode;




function encode() {
    // STEP 1: get a key
    var ajaxPostPromise = 
        AjaxPostPromise(generate_key_url, {

        });
    ajaxPostPromise
        .then(JSON.parse)
        .then(response => {
            document.getElementById("key_name").value = response["key_name"];
        })
        .then(encode2)  // go to step 2
        .catch(havingError);
}


function encode2() {
    var key_name = document.getElementById("key_name").value;

    // STEP 2: upload the file
    const files = document.querySelector('[type=file]').files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        console.log(i);
        formData.append('files[]', file);
    }

    fetch(upload_url, {
        method: 'POST',
        body: formData
    }).then(response => {
        console.log(response);
    });


    // STEP 3: encode and return file
    var download = enigma_url + "?mode=e&key_name=" + key_name + "&file_name=" + files[0].name;
    window.open(download);
}






function decode() {


    var key_name = document.getElementById("key_name").value;




    
    const files = document.querySelector('[type=file]').files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        console.log(i);
        formData.append('files[]', file);
    }

    fetch(upload_url, {
        method: 'POST',
        body: formData
    }).then(response => {
        console.log(response);
    });




    var download = enigma_url + "?mode=d&key_name=" + key_name + "&file_name=" + files[0].name;
    window.open(download);
}



function havingError(errorMessage) {
    alert("Ohhh... There is something wrong: " + errorMessage);
}
