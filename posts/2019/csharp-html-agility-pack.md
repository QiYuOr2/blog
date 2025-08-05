---
title: C# HtmlAgilityPack爬取静态页面
date: 2019/09/04 22:10:24
pubDate: 2019/09/04 22:10:24
tags: [CSharp, Web Crawler,笔记]
category: 技术
description: 最近对爬虫很感兴趣，稍微研究了一下，利用HtmlAgilityPack制作了一个十分简单的爬虫，这个简易爬虫只能获取静态页面的Html...

---

最近对爬虫很感兴趣，稍微研究了一下，利用 HtmlAgilityPack 制作了一个十分简单的爬虫，这个简易爬虫只能获取静态页面的 Html

## HtmlAgilityPack 简介

HtmlAgilityPack 是一个解析速度十分快，并且开源的 Html 解析工具。HtmlAgilityPack 支持使用 Xpath 解析 Html，能够帮助我们解析 Html 文档就像解析 Xml 文档一样轻松、方便。

- [HtmlAgilityPack 官网](https://html-agility-pack.net)
- [HtmlAgilityPack 的 Github 地址](https://github.com/zzzprojects/html-agility-pack)

## C#安装 HtmlAgilityPack

1. 如果 VS 安装有 Nuget，在 Nuget 直接搜索安装即可。
2. 下载后解压缩后有 3 个文件，这里只需要将其中的 HtmlAgilityPack.dll、HtmlAgilityPack.xml 引入解决方案中即可使用

## 实例(获取某页面图片)

### 加载 HTML 页面

```csharp
//从网页中加载
string url = "https://www.bilibili.com";
HtmlWeb web = new HtmlWeb();
HtmlDocument hd = web.Load(url);
```

### 利用 WebClient 写一个图片下载器

需要`using System.Net`和`using System.IO`

```csharp
/// <summary>
/// 图片下载器
/// </summary>
public class ImgDownloader
{
    /// <summary>
    /// 下载图片
    /// </summary>
    /// <param name="webClient"></param>
    /// <param name="url">图片url</param>
    /// <param name="folderPath">文件夹路径</param>
    /// <param name="fileName">图片名</param>
    public static void DownloadImg(WebClient webClient, string url, string folderPath, string fileName)
    {
        //如果文件夹不存在，则创建一个
        if (!Directory.Exists(folderPath))
        {
            Directory.CreateDirectory(folderPath);
        }
        //判断路径是否完整，补全不完整的路径
        if (url.IndexOf("https:") == -1 && url.IndexOf("http:") == -1)
        {
            url = "https:" + url;
        }
        //下载图片
        try
        {
            webClient.DownloadFile(url, folderPath + fileName);
            Console.WriteLine(fileName + "下载成功");
        }
        catch (Exception ex)
        {
            Console.Write(ex.Message);
            Console.WriteLine(url);
        }
    }
}
```

### 通过 Xpath 获取 img 标签中的图片

```csharp
string imgPath = "//img";//选择img
int imgNum = 0;//图片编号
//获取img标签中的图片
foreach (HtmlNode node in hd.DocumentNode.SelectNodes(imgPath))
{
    if (node.Attributes["src"] != null)
    {
        string imgUrl = node.Attributes["src"].Value.ToString();
        if (imgUrl != "" && imgUrl != " ")
        {
            imgNum++;
            //生成文件名，自动获取后缀
            string fileName = imgNum + imgUrl.Substring(imgUrl.LastIndexOf("."));
            ImgDownloader.DownloadImg(wc, imgUrl, "images/", fileName);
        }
    }
}
```

### 通过 Xpath 获取背景图

```csharp
//获取背景图
string bgImgPath = "//*[@style]";//选择具有style属性的节点
foreach (HtmlNode node in hd.DocumentNode.SelectNodes(bgImgPath))
{
    if (node.Attributes["style"].Value.Contains("background-image:url"))
    {
        imgNum++;
        string bgImgUrl = node.Attributes["style"].Value;
        bgImgUrl = Regex.Match(bgImgUrl, @"(?<=\().+?(?=\))").Value;//读取url()的内容
        //Console.WriteLine(bgImgUrl);
        //生成文件名，自动获取后缀
        string fileName = imgNum + bgImgUrl.Substring(bgImgUrl.LastIndexOf("."));

        ImgDownloader.DownloadImg(wc, bgImgUrl, "images/bgcImg/", fileName);
    }
}
```

### 完整代码

<details>

```csharp
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using System.IO;
using HtmlAgilityPack;
using System.Text.RegularExpressions;

namespace WebCrawlerDemo
{
    class Program
    {
        static void Main(string[] args)
        {
            WebClient wc = new WebClient();


            string url = "https://www.bilibili.com";
            HtmlWeb web = new HtmlWeb();
            HtmlDocument hd = web.Load(url);//下载html页面

            string imgPath = "//img";//选择img

            int imgNum = 0;//图片编号

            //获取img标签中的图片
            foreach (HtmlNode node in hd.DocumentNode.SelectNodes(imgPath))
            {
                if (node.Attributes["src"] != null)
                {
                    string imgUrl = node.Attributes["src"].Value.ToString();
                    if (imgUrl != "" && imgUrl != " ")
                    {
                        imgNum++;
                        //生成文件名，自动获取后缀
                        string fileName = imgNum + imgUrl.Substring(imgUrl.LastIndexOf("."));

                        ImgDownloader.DownloadImg(wc, imgUrl, "images/", fileName);
                    }
                }
            }
            //获取背景图
            string bgImgPath = "//*[@style]";//选择具有style属性的节点
            foreach (HtmlNode node in hd.DocumentNode.SelectNodes(bgImgPath))
            {
                if (node.Attributes["style"].Value.Contains("background-image:url"))
                {
                    imgNum++;
                    string bgImgUrl = node.Attributes["style"].Value;
                    bgImgUrl = Regex.Match(bgImgUrl, @"(?<=\().+?(?=\))").Value;//读取url()的内容
                    //生成文件名，自动获取后缀
                    string fileName = imgNum + bgImgUrl.Substring(bgImgUrl.LastIndexOf("."));

                    ImgDownloader.DownloadImg(wc, bgImgUrl, "images/bgcImg/", fileName);
                }
            }

            Console.WriteLine("----------END----------");
            Console.ReadKey();
        }
    }
    /// <summary>
    /// 图片下载器
    /// </summary>
    public class ImgDownloader
    {
        /// <summary>
        /// 下载图片
        /// </summary>
        /// <param name="webClient"></param>
        /// <param name="url">图片url</param>
        /// <param name="folderPath">文件夹路径</param>
        /// <param name="fileName">图片名</param>
        public static void DownloadImg(WebClient webClient, string url, string folderPath, string fileName)
        {
            //如果文件夹不存在，则创建一个
            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }
            //判断路径是否完整，补全不完整的路径
            if (url.IndexOf("https:") == -1 && url.IndexOf("http:") == -1)
            {
                url = "https:" + url;
            }
            //下载图片
            try
            {
                webClient.DownloadFile(url, folderPath + fileName);
                Console.WriteLine(fileName + "下载成功");
            }
            catch (Exception ex)
            {
                Console.Write(ex.Message);
                Console.WriteLine(url);
            }
        }
    }
}
```

</details>

## 参考文章

- [C#网络爬虫利器之 HtmlAgilityPack 如何快速实现解析 Html](https://www.cnblogs.com/xuliangxing/p/8004403.html)
- [.Net 解析 html 文档使用类库 HtmlAgilityPack](https://blog.csdn.net/Ylcacsdn/article/details/78314297)
