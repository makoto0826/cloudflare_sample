CREATE TABLE customers(
  customer_id int auth_increment NOT NULL,
  customer_name varchar(255) NOT NULL,
  PRIMARY KEY (customer_id)
)