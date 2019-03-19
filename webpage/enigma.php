<?php 

    $mode = $_GET["mode"];
    $key_name = $_GET["key_name"];
    $file_name = $_GET["file_name"];

    $key_file_name = $key_name . ".key";

    $console;
    $command;
    $output_file = "result/result.txt";
    if ($mode == "e") {
        //$key_name = "1AC06F27";
        //$key_file_name = $key_name . ".key";
        exec("javac Enigma.java", $console);
        $command = "java Enigma -e " . $key_file_name . " " . $file_name . " " . $output_file;
        exec($command, $console);
    } else {
        exec("javac Enigma.java", $console);
        $command = "java Enigma -d " . $key_file_name . " " . $file_name . " " . $output_file;
        exec($command, $console);
    }

    
    
    
    if (file_exists($output_file)) {
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="'.basename($output_file).'"');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($output_file));
        readfile($output_file);
        unlink($file_name);
        unlink($output_file);
    }
    

    
?>

