-- DROP DATABASE burgers_db;
-- CREATE DATABASE burgers_db;
-- USE burgers_db;
USE ncm25w3t5c9wapzq;

CREATE TABLE burgers (
  id INT NOT NULL AUTO_INCREMENT,
  burger_name VARCHAR(30) NOT NULL,
  devoured BOOLEAN DEFAULT false,
  createdAt TIMESTAMP NOT NULL,
  PRIMARY KEY (id)
)

-- SELECT * FROM burgers;
