<?php
include ('db_creds.php');
$post = json_decode($_POST['data']);
$username = $post[0]->user;
$password_hash = $post[0]->pwd_hash;

$conn = mysqli_connect("localhost",$user,$pwd,"guvi");

// Check connection
if (mysqli_connect_errno())
  {
  die('{"code":"0","message":"Failed to connect to MySQL $mysqli_connect_error()"}');
  }
else{
    error_log("Connected to db");
    $stmt = $conn->prepare("SELECT password_hash from users WHERE username=?");
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $res = $stmt->get_result();
    if ($res->num_rows > 0)
    {
        $row = $res->fetch_assoc();
        $db_password_hash = $row["password_hash"];
        
        if( $db_password_hash === $password_hash)
            {
                session_start();
                $_SESSION['logged_in'] = true;
                $_SESSION['user'] = $username;
                echo '{"code":"1","message":"Login Successfull"}';
            }
        else
            echo '{"code":"0","message":"Password is incorrect"}';
    } 
    else
        echo '{"code":"0","message":"No such user exists. Please register!"}';
    $stmt->close();
}
?>
