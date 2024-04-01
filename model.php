<?php

class Database {
    private $host = "mysql:dbname=crud_facture";
    private $user = "sideproject";
    private $pwrd = "motdepasse";

    /**
     * Methode de connexion a la base de donnees.
     */
    public function getconnexion(): PDO {
        try {
            return new PDO($this->host, $this->user, $this->pwrd);
        } catch(PDOException $e) {
            die("Connection Error: ".$e->getMessage());
        }
    }

    public function create(string $customer,
                           string $cashier,
                           string $amount,
                           string $received,
                           string $returned,
                           string $state) {
        $con = $this->getconnexion();
        $query = $con->prepare(
            "INSERT INTO factures (customer, cashier, amount, received,"
            ."returned, state)"
            ."VALUES(:customer, :cashier, :amount, :received, :returned,"
            .":state)");
        return $query->execute([
            "customer"  => $customer,
            "cashier"   => $cashier,
            "amount"    => $amount,
            "received"  => $received,
            "returned"  => $returned,
            "state"     => $state,
        ]);
    }
}
