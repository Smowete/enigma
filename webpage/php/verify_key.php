<?php

    $key_name = $_POST["key_name"];

	
    
    $keys = fopen('../data/keys.txt', 'r');
    $result = false;
    while (($line = fgets($keys)) !== false) {
        if (substr($line, 0, 8) == $key_name) {
            $result = true;
            break;
        }
    }
    fclose($keys);
    

    $result = ($result == true) ? 1 : 0;

    print(json_encode(["result" => $result, "key_name" => $key_name]));
        
    
?>



