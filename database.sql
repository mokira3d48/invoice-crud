START TRANSACTION;

CREATE DATABASE IF NOT EXISTS crud_facture CHARACTER SET 'utf8';
CREATE USER IF NOT EXISTS sideproject IDENTIFIED BY 'motdepasse';
GRANT ALL PRIVILEGES ON crud_facture.* TO sideproject;

USE crud_facture;

CREATE TABLE IF NOT EXISTS factures (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer VARCHAR(45),
    cashier VARCHAR(45),
    amount DECIMAL(12, 2),
    received DECIMAL(12, 2),
    returned DECIMAL(12, 2) DEFAULT '0.00',
    `state` VARCHAR(16),
    CONSTRAINT CK_FAC_STA CHECK (`state` IN ('Facturé', 'Payée', 'Annulée')),
    CONSTRAINT CK_FAC_AMO CHECK (`amount` >= 0.0)
)ENGINE=InnoDB;

COMMIT;
