<?php
require_once('model.php');


$db = new Database();

/** Creation des factures */
if (isset($_POST['action']) && $_POST['action'] === 'create') {
    extract($_POST);
    $returned = (int)$received - (int)$amount;
    $res = $db->create($customer,
                        $cashier,
                        $amount,
                        $received,
                        $returned,
                        $state);
    echo json_encode(["res" => $res]);
}
