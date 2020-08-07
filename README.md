## 使用的sql

```sql
create table `user` (
  `id` int(11) not null auto_increment primary key,
  `name` varchar(255) not null unique key,
  `password` varchar(255) not null
)

create table `post` (
  `id` int(11) not null auto_increment primary key,
  `title` varchar(255) not null,
  `content` longtext
)default charset=utf8mb4 collate=utf8mb4_unicode_ci;

insert into `post` (`title`,`content`) values
  ('关山月','明月出天山'),
  ('望岳','会当凌绝顶');

insert into `user` (`name`,`password`) values
  ('shine','123'),
  ('shine2','123'),
  ('shine3','123'),
  ('shine4','123'),
  ('shine5','123');

alter table `post`
  add `userId` int(11) default null;


alter table `post`
  add foreign key(`userId`)
  references `user`(`id`);

ALTER TABLE `post`
  ADD FOREIGN KEY(`userId`)
    REFERENCES `user`(`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;

select * from `post`
  left join `user`
    on `user`.`id` = `post`.`userId`;

select `post`.`id`,`post`.`title`,`user`.`name` from `post`
  left join `user`
    on `user`.`id` = `post`.`userId`
  where `user`.`id` = 1;
```