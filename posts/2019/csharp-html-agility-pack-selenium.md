---
title: C# HtmlAgilityPack+Selenium爬取需要拉动滚动条的页面内容
date: 2019/09/05 12:02:37
pubDate: 2019/09/05 12:02:37
tags: [CSharp,Web Crawler,笔记]
category: 技术
description: 现在大多数网站都是随着滚动条的滑动加载页面内容的，因此单纯获得静态页面的Html是无法获得全部的页面内容的。使用Selenium就可以模拟浏览器拉动滑动条来加载所有页面内容...

---

现在大多数网站都是随着滚动条的滑动加载页面内容的，因此单纯获得静态页面的Html是无法获得全部的页面内容的。使用Selenium就可以模拟浏览器拉动滑动条来加载所有页面内容。

## 前情提要
- [C#HtmlAgilityPack爬取静态页面](/2019/csharp-html-agility-pack)

## Selenium简介
Selenium是一个WEB自动化测试工具。Selenium测试直接运行在浏览器中，就像真正的用户在操作一样。支持的浏览器包括IE（7, 8, 9, 10, 11），Mozilla Firefox，Safari，Google Chrome，Opera等。主要功能包括：测试与浏览器的兼容性——测试你的应用程序看是否能够很好得工作在不同浏览器和操作系统之上。测试系统功能——创建回归测试检验软件功能和用户需求。支持自动录制动作和自动生成 .Net、Java、Perl等不同语言的测试脚本。Selenium也是一款同样使用Apache License 2.0协议发布的开源框架。

## C#安装Selenium
本文仅仅是使用Selenium实现拉动滚动条的功能，所以不对Selenium进行过多的介绍。
通过Nuget包管理器搜索"Selenium"，分别安装:
- Selenium.WebDriver
- Selenium.Chrome.WebDriver

## 实例(获取某网站主页所有图片)
### 普通获取网页Html
```csharp
ChromeDriver driver = new ChromeDriver();
driver.Navigate().GoToUrl(url);
string title = driver.Title;//页面title
string html = driver.PageSource;//页面Html
```
### 不启动Chrome窗口及关闭Chrome控制台获取网页
程序执行时会自动打开Chrome窗口和输出控制台中一些信息，我们不需要这些东西。
```csharp
//不启动chrome窗口
ChromeOptions options = new ChromeOptions();
options.AddArgument("headless");

//关闭ChromeDriver控制台
ChromeDriverService driverService = ChromeDriverService.CreateDefaultService();
driverService.HideCommandPromptWindow = true;

ChromeDriver driver = new ChromeDriver(driverService, options);
driver.Navigate().GoToUrl(url);
```

### 将页面滚动到底部
如果使用`scrollTo(0, document.body.scrollHeight)`，直接让将页面滚动到底部会导致页面中间部分读取失败，所以需要分几次滑动并且给页面足够的时间加载
```csharp
for (int i = 1; i <= 10; i++)
{
    string jsCode = "window.scrollTo({top: document.body.scrollHeight / 10 * " + i + ", behavior: \"smooth\"});";
    //使用IJavaScriptExecutor接口运行js代码
    IJavaScriptExecutor js = (IJavaScriptExecutor)driver;
    js.ExecuteScript(jsCode);
    //暂停滚动
    Thread.Sleep(1000);
}
```

### 使用HtmlAgilityPack解析读取到的Html
以下内容与上一篇文章基本相同
```csharp
string title = driver.Title;//页面title
string html = driver.PageSource;//页面Html

HtmlDocument doc = new HtmlDocument();
doc.LoadHtml(html);//解析Html字符串
string imgPath = "//img";//选择img
//获取img标签中的图片
foreach (HtmlNode node in doc.DocumentNode.SelectNodes(imgPath))
{
    ······
}
```

### 完整代码

<details>

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using System.IO;
using HtmlAgilityPack;
using System.Text.RegularExpressions;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System.Threading;

namespace WebCrawlerDemo
{
    class Program
    {
        static void Main(string[] args)
        {
            WebClient wc = new WebClient();

            int imgNum = 0;//图片编号
            string url = "https://www.bilibili.com";


            string html = FinalHtml.GetFinalHtml(url, 10);

            HtmlDocument doc = new HtmlDocument();
            doc.LoadHtml(html);

            string imgPath = "//img";//选择img

            //HtmlNode nodes = hd.DocumentNode.SelectSingleNode(path);

            //获取img标签中的图片
            foreach (HtmlNode node in doc.DocumentNode.SelectNodes(imgPath))
            {
                if (node.Attributes["src"] != null)
                {
                    string imgUrl = node.Attributes["src"].Value.ToString();
                    if (imgUrl != "" && imgUrl != " ")
                    {
                        imgNum++;

                        //生成文件名，自动获取后缀
                        string fileName = GetImgName(imgUrl, imgNum);

                        //Console.WriteLine(fileName);
                        //Console.WriteLine(imgUrl);
                        ImgDownloader.DownloadImg(wc, imgUrl, "images/", fileName);
                    }
                }
            }
            //获取背景图
            string bgImgPath = "//*[@style]";//选择具有style属性的节点
            foreach (HtmlNode node in doc.DocumentNode.SelectNodes(bgImgPath))
            {
                if (node.Attributes["style"].Value.Contains("background-image:url"))
                {
                    imgNum++;
                    string bgImgUrl = node.Attributes["style"].Value;
                    bgImgUrl = Regex.Match(bgImgUrl, @"(?<=\().+?(?=\))").Value;//读取url()的内容
                    //Console.WriteLine(bgImgUrl);
                    //生成文件名，自动获取后缀
                    string fileName = GetImgName(bgImgUrl, imgNum);

                    ImgDownloader.DownloadImg(wc, bgImgUrl, "images/bgcImg/", fileName);
                }
            }
            Console.WriteLine("----------END----------");
            Console.WriteLine($"一共获得: {imgNum}张图");
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
        /// <summary>
        /// 生成图片名称
        /// </summary>
        /// <param name="imageUrl">图片地址</param>
        /// <param name="imageNum">图片编号</param>
        /// <returns></returns>
        public static string GetImgName(string imageUrl, int imageNum)
        {
            string imgExtension;
            if (imageUrl.LastIndexOf(".") != -1)
            {
                imgExtension = imageUrl.Substring(imageUrl.LastIndexOf("."));
            }
            else
            {
                imgExtension = ".jpg";
            }
            return imageNum + imgExtension;
        }
    }
    /// <summary>
    /// 获得执行过js的网址
    /// </summary>
    public class FinalHtml
    {
        /// <summary>
        /// 获得拉动滚动条后的页面
        /// </summary>
        /// <param name="url">网址</param>
        /// <param name="sectionNum">滚动几次</param>
        /// <returns>html字符串</returns>
        public static string GetFinalHtml(string url, int sectionNum)
        {
            //不启动chrome窗口
            ChromeOptions options = new ChromeOptions();
            options.AddArgument("headless");

            //关闭ChromeDriver控制台
            ChromeDriverService driverService = ChromeDriverService.CreateDefaultService();
            driverService.HideCommandPromptWindow = true;


            ChromeDriver driver = new ChromeDriver(driverService, options);

            driver.Navigate().GoToUrl(url);

            string title = driver.Title;
            Console.WriteLine($"Title: {title}");
            //将页面滚动到底部
            Console.Write("页面滚动中，请稍后");

            for (int i = 1; i <= sectionNum; i++)
            {
                string jsCode = "window.scrollTo({top: document.body.scrollHeight / " + sectionNum + " * " + i + ", behavior: \"smooth\"});";
                IJavaScriptExecutor js = (IJavaScriptExecutor)driver;
                js.ExecuteScript(jsCode);
                Console.Write(".");
                Thread.Sleep(1000);
            }
            Console.WriteLine();

            string html = driver.PageSource;
            driver.Quit();

            return html;
        }
    }
}
```

</details>

## 参考文章
- [Selenium爬取网页实战](http://finisky.azurewebsites.net/2019/07/20/selenium/)
