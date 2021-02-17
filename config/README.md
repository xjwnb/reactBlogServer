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
INSERT INTO blog_info (title, NAME, TIME, description_info, picture, tag, content) VALUES ('标题', '小卡车', '2021-02-10 02:09:46', '描述信息' , 'picture.png', 'JavaScript', '内容'); 
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

