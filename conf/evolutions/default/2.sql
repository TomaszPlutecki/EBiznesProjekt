# --- !Ups

create table "basket" (
  "id" integer not null primary key autoincrement,
  "user_id" integer not null
);

create table "BasketProduct" (
  "id" integer not null primary key autoincrement,
  "basket_id" integer not null,
  "product_id" integer not null,
  "quantity" integer not null
);

create table "types" (
  "id" integer not null primary key autoincrement,
  "product_id" integer not null,
  "type" varchar(255),
  FOREIGN KEY(product_id) REFERENCES product(id)
);

create table "review" (
  "id" integer not null primary key autoincrement,
  "product_id" integer not null,
  "review_text" varchar(255),
  FOREIGN KEY(product_id) REFERENCES product(id)
);

create table "payment" (
  "id" integer not null primary key autoincrement,
  "status" varchar(255)
);

create table "order" (
  "id" integer not null primary key autoincrement,
  "user_id" integer not null,
  "basket_id" integer not null,
  "payment_id" integer not null,
  FOREIGN KEY(payment_id) REFERENCES payment(id)
);

CREATE TABLE "user" (
  "id" integer not null primary key autoincrement,
  "firstName" varchar not null,
  "lastName" varchar not null,
  "fullName" varchar not null,
  "email" varchar not null,
  "token" varchar not null
);

# --- !Downs
drop table "basket" if exists;
drop table "types" if exists;
drop table "review" if exists;
drop table "payment" if exists;
drop table "order" if exists;
drop table "user" if exists;
