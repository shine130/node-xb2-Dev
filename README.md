## 生成密钥与公钥

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


## 资源关系 查询内容-用户：在查询结果中组织JSON数据(JSON_OBJECT)
```
SELECT post.id,post.title,JSON_OBJECT('id',user.id,'name',user.name) as user FROM post LEFT JOIN user on post.userId = user.id WHERE user.id = 1
```

## 资源关系 查询内容-文件-用户：解决重复出现的内容项目（GROUP BY,JSON_ARRAYAGG）

```
SELECT
  post.id,
  post.title,
  JSON_ARRAYAGG(
  JSON_OBJECT(
  'id',file.id,
  'originalname',file.originalname
   ) 
  ) as files
FROM
  post
LEFT JOIN
  file ON file.postId = post.id
GROUP BY
 post.id
```

## 资源关系 查询内容-文件-用户：在查询中判断条件,如果没有图片显示null字段

```
SELECT
  post.id,
  post.title,
  JSON_ARRAYAGG(
  IF(
  file.id,
  JSON_OBJECT(
  'id',file.id,
  'originalname',file.originalname
   ),
   NULL
   )
  ) as files
FROM
  post
LEFT JOIN
  file ON file.postId = post.id
GROUP BY
 post.id
```

## 资源关系 查询内容-文件-用户：在内容列表里包含内容作者还有相关文件

```
SELECT
  post.id,
  post.title,
  JSON_OBJECT(
  'id',user.id,
  'name',user.name
  ) as user,
  JSON_ARRAYAGG(
  IF(
  file.id,
  JSON_OBJECT(
  'id',file.id,
  'originalname',file.originalname
   ),
   NULL
   )
  ) as files
FROM
  post
LEFT JOIN
  file ON file.postId = post.id
LEFT JOIN
 user ON post.userId = user.id
GROUP BY
 post.id
```

## 资源关系 查询内容-评论-用户：找出某个内容的评论列表

```
SELECT
 comment.id,
 comment.content,
 post.id as postId,
 post.title as postTitle,
 user.id as userId,
 user.name as userName
FROM
 comment
LEFT JOIN
 user ON comment.userId = user.id
LEFT JOIN
 post ON comment.postId = post.id
WHERE
 post.id = 2
```

## 资源关系 查询内容-评论-用户：找出某个用户的评论列表

```
SELECT
 comment.id,
 comment.content,
 post.id as postId,
 post.title as postTitle,
 user.id as userId,
 user.name as userName
FROM
 comment
LEFT JOIN
 user ON comment.userId = user.id
LEFT JOIN
 post ON comment.postId = post.id
WHERE
 user.id = 1
```

## 资源关系 查询内容-标签：找出包含某个标签的内容列表

```
SELECT
 post.id,
 post.title,
 tag.name as tagName
FROM
 post
LEFT JOIN
 post_tag ON post.id = post_tag.postId
LEFT JOIN
 tag ON post_tag.tagId = tag.id
WHERE
 tag.name = '秋天'
```

## 资源关系 查询内容-标签：找出某个内容与这个内容的标签

```
SELECT
 post.id,
 post.title,
 JSON_ARRAYAGG(
  IF(
   tag.id,
   JSON_OBJECT(
    'id',tag.id,
    'name',tag.name
   ),
    NULL
   )
 ) as tags
FROM
 post
LEFT JOIN
 post_tag ON post.id = post_tag.postId
LEFT JOIN
 tag ON post_tag.tagId = tag.id
WHERE
 post.id = 3
GROUP BY
post.id
```

SQL：拼接评论数据表后统计评论总数

```
SELECT 
 post.id,
 post.title,
 COUNT(comment.id) as totalComments
FROM 
 post 
LEFT JOIN comment
 ON comment.postId = post.id
GROUP BY
 post.id
```

SQL：直接用子查询统计内容评论总数

```
SELECT 
 post.id,
 post.title,
(
 SELECT
  COUNT(comment.id)
 FROM
  comment
 WHERE
  comment.postId = post.id
) as totalComments
FROM
 post
```

SQL：拼接文件数据表获取内容相关文件列表

```
SELECT
 post.id,
 post.title,
 JSON_ARRAYAGG(file.id) AS files
FROM
 post
LEFT JOIN file
 ON file.postId = post.id
GROUP BY
 post.id

```

SQL：解决多表拼接时出现的重复问题

```
SELECT
 post.id,
 post.title,
 GROUP_CONCAT(DISTINCT file.id) AS files
FROM
 post
LEFT JOIN file
 ON file.postId = post.id
LEFT JOIN comment
 ON comment.postId = post.id
GROUP BY
 post.id

```

SQL：拼接文件数据表时限制内容相关文件的数量

```
SELECT
 post.id,
 post.title,
 GROUP_CONCAT(DISTINCT file.id) AS files
FROM
 post
LEFT JOIN LATERAL(
 SELECT *
 FROM file 
 WHERE file.postId = post.id
 ORDER BY file.id DESC
 LIMIT 1
) AS file
 ON file.postId = post.id
LEFT JOIN comment
 ON comment.postId = post.id
GROUP BY
 post.id
```

注意：LATERAL这个关键词只能在 8.x 以上版本的 MySQL 里面使用

SQL：用 CAST 转换数据的类型

```
SELECT
 post.id,
 post.title,
 CAST(
  IF(
   COUNT(file.id),
   GROUP_CONCAT(
    DISTINCT JSON_OBJECT(
      'id',file.id,
       'width',file.width,
       'height',file.height
     )
   ),
   NULL   
   ) AS JSON
 ) AS file
FROM
 post
LEFT JOIN LATERAL(
 SELECT *
 FROM file 
 WHERE file.postId = post.id
 ORDER BY file.id DESC
 LIMIT 1
) AS file
 ON file.postId = post.id
LEFT JOIN comment
 ON comment.postId = post.id
GROUP BY
 post.id

```
SQL：用 CONCAT 组织一个数组

```
SELECT
 post.id,
 post.title,
 CAST(
  IF(
   COUNT(file.id),
   CONCAT(
    '[',
      GROUP_CONCAT(
    DISTINCT JSON_OBJECT(
      'id',file.id,
       'width',file.width,
       'height',file.height
     )
   ),  
     ']'
   )
   ,
   NULL   
   ) AS JSON
 ) AS file
FROM
 post
LEFT JOIN LATERAL(
 SELECT *
 FROM file 
 WHERE file.postId = post.id
 ORDER BY file.id DESC
 LIMIT 2
) AS file
 ON file.postId = post.id
LEFT JOIN comment
 ON comment.postId = post.id
GROUP BY
 post.id

```

SQL：设置内容列表的排序方式

```
SELECT
 post.id,
 post.title,
 (
 	SELECT COUNT(comment.id)
     FROM comment
   WHERE comment.postId = post.id
 ) AS totalComments
 
FROM
  post
ORDER BY
 totalComments DESC
```

SQL：按用户过滤内容列表

```
SELECT
 post.id,
 post.title,
 user.name
FROM
 post
LEFT JOIN user
 ON post.userId = user.id
WHERE user.id = 1
```

SQL：按标签名过滤内容列表

```
SELECT
 post.id,
 post.title,
 JSON_ARRAYAGG(tag.name) AS tags
FROM post
LEFT JOIN post_tag
 ON post_tag.postId = post.id
LEFT JOIN tag
 ON post_tag.tagId = tag.id
WHERE tag.name = '秋天'
GROUP BY post.id

```