<?php
include ('db_creds.php');
session_start();
if($_SESSION['logged_in'] === true)
{   
    $conn = mysqli_connect("localhost",$user,$pwd,"guvi");
    $username = $_SESSION['user'];
    // Check connection
    if (mysqli_connect_errno())
    {
        die('{"code":"0","message":"Failed to connect to MySQL $mysqli_connect_error()"}');
    }
    else
    {
        if($_SERVER['REQUEST_METHOD'] === 'POST')
        {   
            error_log(var_dump($_POST['data']));
            $post = json_decode($_POST['data']);
            error_log("Hi");
            error_log($_POST['data']);
            error_log(json_last_error());
            $username = $post[0]->username;
            $name = $post[0]->name;
            $dob = $post[0]->dob;
            $age = $post[0]->age;
            $email = $post[0]->email;
            $contact = $post[0]->contact;
            $query = 'UPDATE users SET name = ?, dob = ?, age = ?, email = ?, contact = ? WHERE username= ?';
            $stmt1 = $conn->prepare($query);
            $stmt1->bind_param('ssssss', $name,$dob,$age,$email,$contact,$username);
            $stmt1->execute();
            $res1 = $stmt1->get_result();
            $stmt1->close();
            echo var_dump($res1);
        }
        else
        {
            $stmt = $conn->prepare("SELECT * from users WHERE username=?");
            $stmt->bind_param('s', $username);
            $stmt->execute();
            $res = $stmt->get_result();
            if ($res->num_rows > 0)
            {
                $row = $res->fetch_assoc();
                $row['code'] =1;
                $msg = json_encode($row);
                echo $msg;
            } 
            else
                echo '{"code":"0","message":"No such user exists. Please register!"}';
            $stmt->close();
        }
    }
}   
else
echo "Not logged in";
?>