<?php 
    // this file has to be in the root directory!!! not in the php folder, since execution of java program
    $mode = $_GET["mode"];
    $key_name = $_GET["key_name"];
    $file_name = $_GET["file_name"];


    $console;
    $command;

    $key_file_name = $key_name . ".key";
    $input_file = "uploads/" . $file_name;
    $file_name_split = explode(".", $file_name);

    if ($mode == "e") {
        $output_file = "result/" . $file_name_split[0] . "_encoded." . $file_name_split[1];
        exec("javac Enigma.java", $console);
        $command = "java Enigma -e " . $key_file_name . " " . $input_file . " " . $output_file;
        exec($command, $console);
    } else {
        $output_file = "result/" . $file_name_split[0] . "_decoded." . $file_name_split[1];
        exec("javac Enigma.java", $console);
        $command = "java Enigma -d " . $key_file_name . " " . $input_file . " " . $output_file;
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
        // unlink($input_file);
        unlink($output_file);
    }
    
?>

