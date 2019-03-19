const url = 'upload.php';
const form = document.querySelector('form');


document.getElementById("encode").onclick = encode;
document.getElementById("decode").onclick = decode;








function encode() {
    
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


    window.open("http://students.washington.edu/lyuh/php_tmp/enigma.php?mode=e&key_name=random01&file_name=uploads/enigma.txt");
}


function decode() {
    
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
}
