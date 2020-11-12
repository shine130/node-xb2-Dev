##生成密钥与公钥

```
cd config
openssl
genrsa -out private.key 4096
rsa -in private.key -pubout -out public.key
exit
```



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


CREATE TABLE `file` (
	 `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
   `originalname` VARCHAR(255) NOT NULL,
   `mimetype` VARCHAR(255) NOT NULL,
   `filename` VARCHAR(255) NOT NULL,
   `size` INT(11) NOT NULL,
   `postId` INT(11) NOT NULL,
   `userId` INT(11) NOT NULL,

   FOREIGN KEY (`postId`) REFERENCES `post`(`id`)
    ON DELETE NO ACTION ON UPDATE NO ACTION,
  
   FOREIGN KEY (`userId`) REFERENCES `user`(`id`)
    ON DELETE NO ACTION ON UPDATE NO ACTION
    
) DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;


ALTER TABLE `file` ADD COLUMN (
  `width` SMALLINT(6) NOT NULL,
  `height` SMALLINT(6) NOT NULL,
  `metadata` JSON DEFAULT NULL
);



CREATE TABLE `tag` (
  `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL UNIQUE KEY
) DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `post_tag` (
  `postId` INT(11) NOT NULL,
  `tagId` INT(11) NOT NULL,
  PRIMARY KEY(`postId`,`tagId`),
  FOREIGN KEY (`postId`) REFERENCES `post`(`id`)
    ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY (`tagId`) REFERENCES `tag`(`id`)
    ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `comment` (
  `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `content` LONGTEXT,
  `postId` INT(11) NOT NULL,
  `userId` INT(11) NOT NULL,
  `parentId` INT(11) DEFAULT NULL,

  FOREIGN KEY(`postId`) REFERENCES `post`(`id`)
    ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY(`userId`) REFERENCES `user`(`id`)
    ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY(`parentId`) REFERENCES `comment`(`id`)
    ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

```