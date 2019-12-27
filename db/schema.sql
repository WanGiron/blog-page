CREATE DATABASE blog;
USE blog;


CREATE TABLE blog_body(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  blog_image VARCHAR(300),
  blog_image2 VARCHAR(300),
  blog_title VARCHAR(100),
  my_blogs VARCHAR(2000),
  blog_date VARCHAR(100),
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

SELECT  *from blog_body;