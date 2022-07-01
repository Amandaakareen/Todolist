--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  description TEXT    NOT NULL,
  completed INTEGER NOT NULL
);

insert into tasks(description, completed) values('Apender GIT', 0);
insert into tasks(description, completed) values('Apender HTML', 1);
insert into tasks(description, completed) values('Apender CSS', 1);
insert into tasks(description, completed) values('Apender JavaScript', 1);
insert into tasks(description, completed) values('Apender React', 0);
insert into tasks(description, completed) values('Fazer integração com API', 0);

select * from tasks;

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE tasks;