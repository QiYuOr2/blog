---
title: C#中使用XML存储数据
date: 2019/07/29 10:05:13
pubDate: 2019/07/29 10:05:13
tags: [CSharp,笔记]
category: 技术
description: C#对于XML的一些增删改查的操作

---

## 创建 XML 文档

**首先引用`System.Xml`命名空间**

### 1.初始化一个实例

```csharp
XmlDocument xd = new XmlDocument();
```

### 2.创建 XML 头文件声明

```csharp
XmlDeclaration xdt = xd.CreateXmlDeclaration("1.0", "utf-8", null);
xd.AppendChild(xdt);
```

### 3.创建唯一根节点

```csharp
XmlElement Students = xd.CreateElement("Students");
```

### 4.给根节点添加属性(也可以不添加)

```csharp
Students.SetAttribute("name", "学生信息");
```

### 5.将根节点加入到 XML 文件中

```csharp
xd.AppendChild(Students);
```

### 6.创建二级节点

```csharp
XmlElement student = xd.CreateElement("student");
student.SetAttribute("stuNum", "100100100");
Students.AppendChild(student);
```

### 7.给二级节点填充值

```csharp
XmlElement name = xd.CreateElement("name");
name.InnerText = "小明";
XmlElement sex = xd.CreateElement("sex");
sex.InnerText = "男";
student.AppendChild(name);
student.AppendChild(sex);
```

### 8.保存

```csharp
xd.Save("StuMS.xml");
```

### 9.结果

```xml
<?xml version="1.0" encoding="utf-8"?>
<Students name="学生信息">
  <student stuNum="100100100">
    <name>小明</name>
    <sex>男</sex>
  </student>
</Students>
```

## 读取 XML 文档里的信息

**首先要先加载 XML 文档**

```csharp
XmlDocument xd = new XmlDocument();
xd.Load("StuMS.xml");
```

### 1.利用索引器读取

```csharp
//查找标签值
string Name = stuNode.ChildNodes[0].InnerText;
//查找标签属性
string StuNum = stuNode.Attributes[0].Value;
```

### 2.利用 Xpath 查询

```csharp
// 常用查询方式
//1. "根节点/父节点/子节点"
//2. "//节点"
//3. "根节点/父节点[@父节点属性 = 'value' ]"
//4. "根节点/父节点[子节点 = 'value' ]"

XmlNode stuNode = xd.SelectSingleNode("Students/student[@stuNum =" + stuNum + "]");//可以获得指定stuNum的一个节点
XmlNodeList stuNodeList = xd.SelectNodes("Students/student[sex = '男' ]");//可以获得指定性别的集合
```

## 修改 XML 文档里的信息

找到->修改->**保存**

```csharp
//节点信息修改
stuNode.SelectSingleNode("name").InnerText = value;
stuNode.SelectSingleNode("name").InnerXml = value;
//属性信息修改
student.Attributes["stuNum"].Value = value;
```

InnerText 只显示内容`小明 男`\
InnerXml 将标签一同显示出来` <name>小明</name><sex>男</sex>`

## 删除 XML 文档里的信息

```csharp
//从当前节点获取父节点，从父节点删除当前节点
stuNode.ParentNode.RemoveChild(studentNode);
//从父节点直接删除子节点
stuNode.RemoveChild(studentNode)
```
