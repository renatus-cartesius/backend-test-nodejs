drop database if exists backend_test;
-- Создаем или дропаем бд
create database backend_test;

-- Добавляем или заменям пользователя для бд
create or replace user 'dude'@'%' identified by 'pass';
grant all privileges on backend_test.* to 'dude'@'%';
flush privileges;

use backend_test;

drop table if exists Users;

set names utf8;
create table  Users(
	ID int not null auto_increment ,
	Name varchar(50),
	Surname varchar(50),
	Phone varchar(12),
	Email varchar(100),
    Pass varchar(20),
    Sex Enum("Муж", "Жен"),
    Photo varchar(500),
    Creation_time datetime default CURRENT_TIMESTAMP,

	primary key(ID)
) ENGINE=INNODB; 
