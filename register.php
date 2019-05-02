<?php
include ('db_creds.php');
$post = json_decode($_POST['data']);
$name = $post[0]->name;
$username = $post[0]->username;
$password_hash = $post[0]->pwd_hash;
$email = $post[0]->email;

$conn = mysqli_connect("localhost",$user,$pwd,"guvi");

// Check connection
if (mysqli_connect_errno())
{
    die('{"code":"0","message":"Failed to connect to MySQL $mysqli_connect_error()"}');
}

else
{
    error_log("Connected to db");
    $stmt = $conn->prepare("INSERT INTO users (name,username,password_hash,email) values(?,?,?,?)");
    $stmt->bind_param('ssss', $name,$username,$password_hash,$email);
    $res = $stmt->execute();
    if ($res)
        echo '{"code":"1","message":"user registered successfully"}';
    else
        echo '{"code":"0","message":'.$stmt->error.'}';
    $stmt->close();
}
?>
