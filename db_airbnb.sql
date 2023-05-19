create database air_bnb;
use air_bnb;

create table user (
	user_id int primary key auto_increment,
    full_name varchar(100) not null,
    email varchar(100) not null,
    password varchar(20) not null,
    phone varchar(15) not null,
    birthday Date,
    gender enum('male', 'female', 'other') not null,
    role int not null,
    created timestamp default current_timestamp,
    updated timestamp
);

create table location (
	location_id int primary key auto_increment,
    location_name varchar(100),
    city varchar(100),
    country varchar(100),
    image varchar(100)
);

create table real_estate (
	re_id int primary key auto_increment,
    name varchar(200) not null,
    type enum('rooms', 'castles', 'beachfront', 'iconiccities', 'desert', 'omg', 'adapted', 'hanoks', 'amazingpools', 'lakefront', 'amazingviews') not null,
    images json not null,
    location_id int not null,
    capacity int not null,
    room_amount int not null,
    bed_amount int not null,
    bathroom_amount int not null,
    description varchar(2000) not null,
    price int not null,
    washingmachine boolean not null,
    iron boolean not null,
    television boolean not null,
    airconditioner boolean not null,
    wifi boolean not null,
    kitchen boolean not null,
    parkinglot boolean not null,
    pool boolean not null,
    created timestamp default current_timestamp,
    updated timestamp
);

create table book_room(
	br_id int primary key auto_increment,
    re_id int not null,
    user_id int not null,
    book_date Date not null,
    checkout_date Date not null,
    capacity int not null,
    created timestamp default current_timestamp,
    foreign key (re_id) references real_estate(re_id),
    foreign key (user_id) references user(user_id)
);

create table comment(
	cmt_id int primary key auto_increment,
    re_id int not null,
    user_id int not null,
    content varchar(500),
    created timestamp default current_timestamp,
    updated timestamp
);
