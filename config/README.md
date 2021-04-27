### 创建数据库

```mysql
CREATE DATABASE react_blog;
```

### 选择数据库

```mysql
USE react_blog;
```

### 管理员表

```mysql
CREATE TABLE `admin_info` (
 `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '主键id',
 `name` VARCHAR(100) NOT NULL COMMENT '管理员名称',
  `personal_profile` VARCHAR(500) COMMENT '个人简介',
  `avatarUrl` VARCHAR(800) NOT NULL COMMENT '头像地址',
  `bgUrl` VARCHAR(800) NOT NULL COMMENT '背景图片'
);

```

#### 	管理员表新增信息

​	

```mysql
INSERT INTO admin_info VALUES
(
 1,
 '小卡车',
 '个人简介',
 'https://xkc-oss-bucket.oss-cn-guangzhou.aliyuncs.com/images/author3.jpg?versionId=CAEQCRiBgMC08Iz_uxciIDJiNjdlNWNmMzAwYjQ1ODFiNjRkZjI3YWMxYzAwMjJk',
 'https://xkc-oss-bucket.oss-cn-guangzhou.aliyuncs.com/images/bg.jpg?versionId=CAEQCRiBgICwj5b_uxciIDExMzVmZDJiODlhYzQ1MjZhMWVhNDIzOWNkZTBlZmMy'
);
```

### 标签表

```mysql
CREATE TABLE `tags_info` (
 `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '主键',
 `name` VARCHAR(100) NOT NULL COMMENT '标签名称',
 `color` VARCHAR(100) NOT NULL COMMENT '标签颜色'
);
```

新增标签表信息

```mysql
INSERT INTO tags_info (name, color) VALUES ('JavaScript', '#00ffff');
```

删除标签表信息

```mysql
DELETE FROM tags_info WHERE NAME = 'asdasd';
```

### 博客信息表

```mysql
CREATE TABLE `blog_info` (
 `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '主键',
 `visits` BIGINT COMMENT '访问量',
 `title` VARCHAR(100) NOT NULL COMMENT '标题',
 `name` VARCHAR(100) NOT NULL COMMENT '姓名',
 `time` DATETIME NOT NULL COMMENT '发表时间',
 `description_info` VARCHAR(500) NOT NULL COMMENT '描述信息',
 `picture` VARCHAR(800) COMMENT '图片',
 `tag` VARCHAR(600) COMMENT '标签',
 `content` LONGTEXT NOT NULL COMMENT '内容',
 `htmlContent` LONGTEXT NOT NULL COMMENT 'html内容'
);
```

博客信息插入信息

```mysql
INSERT INTO blog_info (title, NAME, TIME, description_info, picture, tag, content, htmlContent) VALUES ('标题', '小卡车', '2021-02-10 02:09:46', '描述信息' , 'picture.png', 'JavaScript', '内容', '<p>内容</p>'); 
```

### 创建关于表

```mysql
CREATE TABLE `about_info` (
 `id` INT PRIMARY KEY COMMENT '主键',
 `content` LONGTEXT NOT NULL COMMENT '内容',
 `htmlContent` LONGTEXT NOT NULL COMMENT 'html内容'
);
```

插入第一条表信息

```mysql
INSERT INTO about_info VALUES (1, 'hhh', '<p>hhh</p>');
```

### 创建友链表

```mysql
CREATE TABLE `links_info` (
 `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '主键',
 `name` VARCHAR(100) COMMENT '名称',
 `website` VARCHAR(800) COMMENT '网址',
 `logoUrl` VARCHAR(800) COMMENT 'logo 网址',
 `description` VARCHAR(800) COMMENT '描述',
 `is_pass` BOOLEAN COMMENT '是否通过'
);
```

### 服务器数据库修改字符

```mysql
alter table 表名 change 列名 名 varchar(100) character set utf8;
alter table links_info change description description VARCHAR(800) character set utf8;
```

### 创建生活区表

```mysql
CREATE TABLE `life` (
 `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'id',
 `time` DATETIME NOT NULL COMMENT '发布时间',
 `title` VARCHAR(100) NOT NULL COMMENT '标题',
 `visits` BIGINT COMMENT '访问量',
 `isTop` BOOLEAN NOT NULL COMMENT '是否置顶',
 `description_img` VARCHAR(800) COMMENT '描述图片',
 `description_info` VARCHAR(800) NOT NULL COMMENT '描述信息',
 `content` LONGTEXT NOT NULL COMMENT '内容',
 `htmlContent` LONGTEXT NOT NULL COMMENT 'html 内容'
);

CREATE TABLE `life` (
 `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'id',
 `time` DATETIME NOT NULL COMMENT '发布时间',
 `title` VARCHAR(100) NOT NULL COMMENT '标题',
 `visits` BIGINT COMMENT '访问量',
 `isTop` BOOLEAN NOT NULL COMMENT '是否置顶',
 `description_img` VARCHAR(800) COMMENT '描述图片',
 `description_info` VARCHAR(800) NOT NULL COMMENT '描述信息',
 `content` LONGTEXT NOT NULL COMMENT '内容',
 `htmlContent` LONGTEXT NOT NULL COMMENT 'html 内容'
) DEFAULT CHARSET=utf8;
```

### 插入生活区数据

```mysql
INSERT INTO life VALUES (1, '2021-04-26 00:00:00', '我是标题', 100, FALSE, 'http://xkc-oss-bucket.oss-cn-guangzhou.aliyuncs.com/avatar/1612786683218_author1.jpg', '生活乐趣多', '这生活', '<p>这生活</p>' );
```

