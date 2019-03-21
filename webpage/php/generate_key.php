<?php

    $key_name = "";

    $key_names = array();



    $keys = fopen('../data/keys.txt', 'r');
    while (($line = fgets($keys)) !== false) {
        array_push($key_names, substr($line, 0, 8));
    }
    fclose($keys);

    $key_name = $key_names[rand(0, count($key_names) - 1)];

    
    $return = array("key_name" => $key_name);
    print(json_encode($return));
    
        
    
?>



