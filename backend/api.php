<?php
session_start();

header('Content-Type: application/json; charset=utf-8');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = ['http://localhost', 'http://127.0.0.1', 'http://localhost:80', 'http://localhost:8080'];
if ($origin && in_array($origin, $allowedOrigins, true)) {
  header('Access-Control-Allow-Origin: ' . $origin);
  header('Access-Control-Allow-Credentials: true');
} else {
  header('Access-Control-Allow-Origin: http://localhost');
}
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

$input=json_decode(file_get_contents('php://input'),true) ?: $_POST;

$action=$input['action'] ?? '';

function requireAdmin(): array {
  $user=$_SESSION['user']??null;
  if(!$user||($user['role']??'')!=='administrador'){
    http_response_code(403);
    echo json_encode(['ok'=>false,'message'=>'Acceso reservado al administrador.']);
    exit;
  }
  return $user;
}

$host='localhost';
 $db='trims_house';
 $dbUser='root';
 $dbPass='';

try{
  $pdo=new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4",$dbUser,$dbPass,[PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION]);

}
catch(PDOException $e){
  http_response_code(503);
echo json_encode(['ok'=>false,'message'=>'Base de datos no disponible. Importa database.sql en XAMPP.']);
exit;

}

try{
  
 if($action==='register'){
  $name=trim($input['name']??'');
$email=strtolower(trim($input['email']??''));
$password=$input['password']??'';
$role='cliente';
if(!$name||!filter_var($email,FILTER_VALIDATE_EMAIL)||strlen($password)<6)throw new Exception('Completa los datos. La contraseña debe tener al menos 6 caracteres.');
$stmt=$pdo->prepare('INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)');
$stmt->execute([$name,$email,password_hash($password,PASSWORD_DEFAULT),$role]);
$user=['id'=>$pdo->lastInsertId(),'name'=>$name,'email'=>$email,'role'=>$role];
$_SESSION['user']=$user;
echo json_encode(['ok'=>true,'user'=>$user]);
exit;

}

 if($action==='admin_dashboard'){
  requireAdmin();
  $stats=$pdo->query("SELECT (SELECT COUNT(*) FROM users) AS users,(SELECT COUNT(*) FROM appointments) AS appointments,(SELECT COUNT(*) FROM appointments WHERE status='pendiente') AS pending")->fetch(PDO::FETCH_ASSOC);
  $appointments=$pdo->query('SELECT a.id,u.name AS customer,u.email,b.name AS barber,a.service,a.appointment_date,a.appointment_time,a.status FROM appointments a JOIN users u ON u.id=a.user_id LEFT JOIN barbers b ON b.id=a.barber_id ORDER BY a.appointment_date DESC,a.appointment_time DESC')->fetchAll(PDO::FETCH_ASSOC);
  $users=$pdo->query('SELECT id,name,email,role,created_at FROM users ORDER BY created_at DESC')->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode(['ok'=>true,'stats'=>$stats,'appointments'=>$appointments,'users'=>$users]);
  exit;
 }

 if($action==='admin_update_appointment'){
  requireAdmin();
  $appointmentId=filter_var($input['appointment_id']??null,FILTER_VALIDATE_INT);
  $status=$input['status']??'';
  if(!$appointmentId||!in_array($status,['pendiente','confirmada','cancelada'],true))throw new Exception('Cita o estado no valido.');
  $stmt=$pdo->prepare('UPDATE appointments SET status=? WHERE id=?');
  $stmt->execute([$status,$appointmentId]);
  if(!$stmt->rowCount()){
    $check=$pdo->prepare('SELECT id FROM appointments WHERE id=?');
    $check->execute([$appointmentId]);
    if(!$check->fetch())throw new Exception('No se encontro la cita.');
  }
  echo json_encode(['ok'=>true]);
  exit;
 }

 if($action==='login'){
  $stmt=$pdo->prepare('SELECT id,name,email,password,role FROM users WHERE email=?');
$stmt->execute([strtolower(trim($input['email']??''))]);
$row=$stmt->fetch(PDO::FETCH_ASSOC);
if(!$row||!password_verify($input['password']??'',$row['password']))throw new Exception('Correo o contraseña incorrectos.');
unset($row['password']);
session_regenerate_id(true);
$_SESSION['user']=$row;
echo json_encode(['ok'=>true,'user'=>$row]);
exit;

}

 if($action==='book'){
  $user=$_SESSION['user']??null;
if(!$user)throw new Exception('Debes iniciar sesion.');
$stmt=$pdo->prepare('INSERT INTO appointments(user_id,barber_id,service,appointment_date,appointment_time,status) VALUES(?,?,?,?,?,?)');
$stmt->execute([$user['id'],$input['barber_id'],$input['service'],$input['date'],$input['time'],'pendiente']);
echo json_encode(['ok'=>true]);
exit;

}

 if($action==='logout'){
  session_destroy();
echo json_encode(['ok'=>true]);
exit;

}

 echo json_encode(['ok'=>false,'message'=>'Accion no reconocida.']);


}
catch(Exception $e){
  http_response_code(400);
echo json_encode(['ok'=>false,'message'=>$e->getMessage()]);

}

