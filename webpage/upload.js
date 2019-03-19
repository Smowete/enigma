const url = 'upload.php';
const form = document.querySelector('form');


document.getElementById("encode").onclick = encode;
document.getElementById("decode").onclick = decode;







function encode() {
    var ajaxPostPromise = 
        AjaxPostPromise("php/get_key.php", {

        });
    ajaxPostPromise
        .then(JSON.parse)
        .then(response => {
            document.getElementById("key_name").innerText = response["key_name"];
        })
        .then(encode2)
        .catch(havingError);
}



function encode2() {

    var key_name = document.getElementById("key_name").innerText;


    
    const files = document.querySelector('[type=file]').files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        console.log(i);
        formData.append('files[]', file);
    }

    fetch(url, {
        method: 'POST',
        body: formData
    }).then(response => {
        console.log(response);
    });





    
    var download = "enigma.php?mode=e&key_name=" + key_name + "&file_name=uploads/" + files[0].name;
    window.open(download);
}






function decode() {


    var key_name = document.getElementById("key_name").innerText;




    
    const files = document.querySelector('[type=file]').files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        console.log(i);
        formData.append('files[]', file);
    }

    fetch(url, {
        method: 'POST',
        body: formData
    }).then(response => {
        console.log(response);
    });






    var download = "enigma.php?mode=d&key_name=" + key_name + "&file_name=uploads/" + files[0].name;
    window.open(download);
}

function havingError(errorMessage) {
    alert("Ohhh... There is something wrong: " + errorMessage);
}
