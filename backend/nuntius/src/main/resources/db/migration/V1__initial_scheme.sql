CREATE TABLE chat (
  id bigint NOT NULL AUTO_INCREMENT,
  groupal bit(1) DEFAULT NULL,
  title varchar(255) DEFAULT NULL,
  last_modified_time datetime(6) DEFAULT NULL,
  PRIMARY KEY (id)
) ;

CREATE TABLE user (
  id bigint NOT NULL AUTO_INCREMENT,
  biography varchar(128) DEFAULT NULL,
  email varchar(255) DEFAULT NULL UNIQUE,
  name varchar(255) DEFAULT NULL,
  password varchar(255) DEFAULT NULL,
  username varchar(255) DEFAULT NULL UNIQUE,
  PRIMARY KEY (id)
) ;


CREATE TABLE chat_membership (
  id bigint NOT NULL AUTO_INCREMENT,
  joined_time datetime(6) DEFAULT NULL,
  last_fetch_time datetime(6) DEFAULT NULL,
  chat_id bigint NOT NULL REFERENCES chat(id),
  user_id bigint NOT NULL REFERENCES user(id),
  PRIMARY KEY (id)
) ;

CREATE TABLE contact (
  id bigint NOT NULL AUTO_INCREMENT,
  alias varchar(128) DEFAULT NULL,
  owner_id bigint NOT NULL REFERENCES user(id),
  user_id bigint NOT NULL REFERENCES user(id),
  PRIMARY KEY (id)
) ;

CREATE TABLE message (
  id bigint NOT NULL AUTO_INCREMENT,
  received_time datetime(6) DEFAULT NULL,
  sent_time datetime(6) DEFAULT NULL,
  text varchar(255) DEFAULT NULL,
  chat_id bigint NOT NULL REFERENCES chat(id),
  sender_id bigint NOT NULL REFERENCES user(id),
  PRIMARY KEY (id)
) ; 

CREATE TABLE message_reception (
  id bigint NOT NULL AUTO_INCREMENT,
  received_time datetime(6) DEFAULT NULL,
  seen_time datetime(6) DEFAULT NULL,
  message_id bigint NOT NULL REFERENCES message(id),
  user_id bigint DEFAULT NULL REFERENCES user(id),
  PRIMARY KEY (id)
) ;


