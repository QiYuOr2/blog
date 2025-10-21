---
title: 'T-SQL学习笔记'
date: 2019/09/09 20:47:19
pubDate: 2019/09/09 20:47:19
tags: [T-SQL, SQL Server,笔记]
category: 技术
description: 学习T-SQL时记录的笔记，记得并不全也不详细

---

学习 T-SQL 时记录的笔记，记得并不全也不详细

## if 和 while 语句

```sql
declare @age int
select @age = DATEDIFF(year,stuAge,getdate()) from TbStudent where stuName = '孙悟空'

if(@age>=18)
begin --必须有begin..end
	print N'已成年'
end
else
begin
	print N'未成年'
end
```

```sql
declare @sum int
set @sum = 0
declare @i int
set @i = 1
while(@i <= 100)
begin
	if(@i % 2 <> 0)
	begin
		set @sum = @sum + @i
	end
	set @i = @i + 1
end
print @sum
```

## 自定义函数

分为标量函数、表值函数（内联表值函数和多语句表值函数）

### 标量函数：只返回一个基础类型数据的值

```sql
-- 语法
create function 函数名
([参数列表])  可以不写参数,先写变量名再写类型
returns 返回值类型
as
begin
--	······函数体语句
	return 返回值
end
```

### 表值函数：返回一个 table 类型的结果集

#### 内联表值函数

```sql
-- 语法
create function 函数名
([参数名])
returns table
as
return (一条select语句)
```

#### 多语句表值函数

多语句表值函数可以看作是标量函数和内联表值函数的结合体

```sql
-- 语法
create function 函数名([参数列表])
returns 表变量名 table
(表变量的字段定义)
as
begin
	SQL
	return 这里啥都不写
end
```

### 注意

- SQL 自定义函数必须有返回值
- 在自定义函数中不允许修改基表内容（即，不能用 insert,update,delete）
- 如果有多个参数，每个参数一之间用逗号隔开
- 调用函数时，函数名前要加 dbo.

## 存储过程

存储过程时存储在服务器上的一组 T-SQL 语句的集合，用来完成一个特定功能。
分为系统存储过程(系统自带)和自定义存储过程

### 自定义存储过程

```sql
-- 语法
create procedure(或proc) 存储过程名(up_)
[参数列表] --这里的参数列表不能使用圆括号
begin
	存储过程代码
end
```

### 注意:

- 存储过程可以没有返回值
- 存储过程不适用 return 语句带回返回值，如果有返回值，直接使用 select 语句返回

## 索引

- 索引：创建在表上
- 作用: 加快检索速度
- 全表扫面
- 索引分为聚集索引和非聚集索引
- 聚集索引: 在一个数据表中，只能创建一个聚集索引
- 主键会默认创建一个聚集索引
- 在你经常使用 where 的字段上添加非聚集索引
- 缺点：占用额外的存储空间，有可能降低 insert、update、delete 的速度

## 事务

事务时并发控制的单位，他是用户定义的一个操作，这些操作要么都做要么都不做，不可分割。
分为：SQL Server 事务和 ADO.NET 事务

```sql
-- 语法
begin tran  --开始一个事务操作
commit tran --提交
rollback    --回滚
```

C#中使用时，通常把事务的操作封装到存储过程中

## 触发器

- 触发器是一种特殊的存储过程
- 只不过这个存储过程是不允许显示调用的
- 他只能在做了特定事件后，自动触发做出响应的
- 两张临时数据表：inserted、deleted
- 只能在触发器中访问
- 触发器是附着在一张表上的

```sql
-- 语法
create trigger 触发器名字
on 表名
after(或for) 之后触发 / instead of 之前触发 [insert/delete/update]
as
begin
-- ······
end
```

触发器的触发条件：insert，delete，update

```sql
create trigger tr_Bank_insert
on Bank
after insert
as
begin
	print '往Bank表中插入了记录'
end

create trigger tr_Bank_Delete
on Bank
after delete
as
begin
	declare @id int
	declare @userName nvarchar(8)
	declare @userMoney int
	select @id = id, @userMoney = userMoney, @userName = userName from deleted
	insert into BankBak values(@id, @userName, @userMoney)
end

select * from Bank
select * from BankBak

delete from Bank where id = 3
```

SQL Server 的触发器是表级触发器，表上一次性的多次操作只触发一次
