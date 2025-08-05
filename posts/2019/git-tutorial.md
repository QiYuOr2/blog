---
title: Git学习记录
date: 2019/11/17 15:18:05
pubDate: 2019/11/17 15:18:05
tags: [Git,笔记]
category: 工具
description: 本篇文章介绍Git的本地使用

---

## Git 是什么？

Git 是世界上最先进的分布式版本控制系统。

### 那么什么是版本控制系统？

我们来举个例子，假设我创建了一个项目 Project.1，里面写了一个 README.txt 文档、一个 code1.cs 和一个 code2.cs，第二天我突然想改进一下版本，但是我们不能直接在这个项目里改，因为如果直接在这里面改，我们要是想要退回去的话就会很麻烦，因为我们可能记不住上一个版本里面的代码是什么样子的，而且改代码这个东西经常是改一个地方就要将许多地方一同改掉。所以，我就想了一个办法，就是将这个项目拷贝一份，然后将他重命名为 Project.2。这就是我们最朴素的一个版本管理的方法。

但是随着代码量的增加，这种方法无疑是不太靠谱的，如果你的程序是多人合作开发的，那问题会更大，因为如果一联网，大家的版本互相覆盖，到底哪个版本是谁的，该用哪个版本就会出问题了。

Linus 在开发 Linux 系统的时候就遇到了这个问题，而为了解决这个问题，Linus 最终花费两周的时间用 C 语言写出了 Git。

### 分布式又是什么？

先说说集中式版本控制系统，集中式版本控制系统的版本库是集中存放在中央服务器的，但是我们干活的时候都是用的自己的电脑，所以要先从中央服务器中取得最新的版本，然后开始干活，再把自己干好的活推送到中央服务器。这个集中式版本控制系统最大的毛病就是联网才能干活，单纯是在局域网内的话还好，但是如果是在互联网上，遇到网速慢的时候可能提交和下载文件就要浪费很多时间。

那么分布式版本控制系统呢？首先，分布式版本控制系统根本没有中央服务器，每个人的电脑上都是一个完整的版本库，这样工作的时候就不需要联网了，因为版本库就在自己的电脑上。那么该如何多人协作呢？比方说，你在你的电脑上修改了文件 A，你的同事也在他的电脑上修改了文件 A，这时你俩只需要把各自修改的部分推送给对方，就可以互相看到对方的修改了。

和集中式版本控制系统相比，分布式版本控制系统的安全性要高很多，因为每个人的电脑中都有一个完整的版本库，某个人的电脑坏了不要紧，只需要去别人哪里拷贝一下就可以了。但是集中式版本控制系统的中央服务器要是出问题了，所有人就都没法干活了。

在实际使用分布式版本控制系统时，其实很少在两人之间的电脑上互相推送版本库的修改，因为你们不在同一个局域网内的话电脑是没法互相访问的。所以，分布式版本控制系统也有一台充当中央服务器的电脑，不过这个服务器仅仅是用来方便大家交换修改的，就算挂掉了也没啥大事。

### Git 是如何进行版本控制的？

其他的版本控制系统例如 SVN，他们是将每一次版本的变动记录下来，这样就像写小说一样，每次就只增加一个章节，这种存储方式叫做增量文件系统。而 Git 是将每个版本独立保存起来，也就是说如果某个版本中文件发生了变动，Git 就会将整个文件复制并保存起来，这样就像是写小说的，每次写新章节就会将以前的章节再写一遍。这种设计看似会消耗更多的空间，但在后续的分支管理上带来了很多的好处和便利。

## 安装 Git

1. 下载 Git --> https://git-scm.com/download/win

2. 安装，一路 Next 即可

3. 配置用户信息，安装完成后我们要在 Git Bash 中输入以下两行命令

   ```shell
   git config --global user.name "your name"

   git config --global user.email "email@example.com"
   ```

4. 可以使用`git config --list`查看配置信息

## Git 也逃不开增删改查

众所周知，一切项目的基础是增删改查，Git 也是如此，接下来我们来看看 Git 中的增删改查。

首先我们先在本地使用 Git。

我们在本地创建的仓库是由三个区域组成，这是 Git 的核心架构。即：工作区域、暂存区域和 Git 仓库（版本库）。

### 创建版本库

首先，选择一个合适的地方，创建一个空目录。

```shell
$ mkdir learngit
$ cd learngit
$ pwd
```

`pwd`命令用于显示当前目录的路径

第二步，通过`git init`命令将这个目录变成 Git 可以管理的仓库

```shell
$ git init
```

这样 Git 瞬间就将仓库建好了，目录下会多出一个`.git`隐藏目录，这个目录就是 Git 的版本库，使用`ls -ah`就可以看见。

### 将文件添加到版本库

手动添加至刚刚创建的目录下即可，但是要注意千万不要使用 windows 自带的记事本编辑任何文本文件，因为它会给所有 UTF-8 编码的文件开头添加一个 0xefbbf 的字符。

我们我们进入刚刚创建的`learngit`目录，在做项目的时候我们通常都会有一个`README.md`来介绍自己的项目，所以在这里我们先编写一个`README.md`文件，内容如下

```shell
This is a project to learn git
```

保存后这个文件就存放在了 Git 的工作区域中，工作区域就是平时我们存放项目代码的地方。

然后，我们执行`git add`命令

```shell
$ git add README.md
```

执行完该命令后，是没有任何显示的，这时我们就将文件放入 Git 的暂存区了，暂存区实际上只是一个文件，保存我们即将提交的文件列表信息。

接下来使用`git commit`将文件提交至仓库

```shell
$ git commit -m "wrote a readme file"
```

在这个命令中，`-m`后面输入的是本次提交的说明，可以输入任何内容，当然最好是有意义的，这样你可以从历史记录中方便的找到改动记录。

`git commit`执行成功后会告诉你`1 file changed`一个文件被改动（README.md）`1 insertions(+)`插入了一行内容（README.md 中有一行内容）。

我们除了可以使用一条 add 跟一条 commit 来提交一个文件，还可以用一条 commit 提交很多个文件，比如：

```shell
$ git add code1.cs
$ git add code2.cs code3.cs
$ git commit -m "add 3 cs files"
```

至此，我们完成了一次完整的 Git 工作流程，就是先在工作目录中添加、修改文件，将需要进行版本管理的文件放入暂存区，将暂存区的文件提交到 Git 仓库。

### 查看工作状态

我们应该都清楚，在平时写代码做项目的时候必然会创建许多文件，文件一多，我们就有可能记不住哪些文件添加到暂存区了，哪些文件提交了。这时我们需要用到另一个命令来查看文件的状态`git status`。首先，我们先来执行一遍

```shell
$ git status
On branch master
nothing to commit, working tree clean
```

Git 告诉我们当前没有需要提交的修改，工作目录是干净的，这就说明 commit 提交后的文件用`git status`是不会显示的。

接下来我们在工作目录中添加一个新的文件`LICENSE`，然后再次执行`git status`

```shell
$ git status
On branch master
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        LICENSE

nothing added to commit but untracked files present (use "git add" to track)
```

这时我们发现`LICENSE`文件的状态是`Untracked`，这就表示这个文件没有添加到暂存区，不参与版本控制。在输出中有一行被圆括号包裹着，这一行是 Git 给我们的操作建议，我们不妨按照这个建议走下去，执行完`git add`后再次执行`git status`

```shell
$ git add LICENSE
$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   LICENSE
```

这时我们会发现，Git 的建议操作变成了`use "git restore --staged <file>..." to unstage`这个建议的意思是使用这个命令来让文件离开暂存区。

我们执行这个命令后再次查看状态

```shell
$ git restore --staged LICENSE
$ git status
On branch master
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        LICENSE

nothing added to commit but untracked files present (use "git add" to track)
```

这样`LICENSE`的状态就变回`Untracked`了。

接下来我们对`README.md`文件进行修改，改成如下内容

```shell
This is a big project to learn git
I love git
```

然后再次运行`git status`命令查看结果

```shell
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   README.md

no changes added to commit (use "git add" and/or "git commit -a")
```

我们会发现，在输出中有`modified: README.md`以及`no changes added to commit `这个意思就是 README.md 这个文件被修改过了，但还没有准备提交的修改。`modified`就是`README.md`当前的状态。

这个命令虽然告诉我们`README.md`文件被修改了，但有时候我们可能想看看具体修改了什么内容，这时候我们就需要`git diff`命令

```shell
$ git diff README.md
diff --git a/README.md b/README.md
index ec489ee..3e420a2 100644
--- a/README.md
+++ b/README.md
@@ -1 +1,2 @@
-This is a project to learn git
\ No newline at end of file
+This is a big project to learn git
+I love git
\ No newline at end of file
```

diff 就是 difference 的意思，在上面的输出中我们可以看到第一行增加了一个 big 单词，以及新增了一行 I love git。在知道了具体修改内容后，我们就可以放心的完成`add`和`commit`命令了。我们拐回头去看看上次执行`git status`时 Git 给的建议`use "git add <file>..." to update what will be committed`和`use "git restore <file>..." to discard changes in working directory`，第一个我们已经十分熟悉了，第二个建议是我们可以使用`git restore`来放弃更改，我们来执行一下这个命令试试。

```shell
$ git restore README.md
```

没有任何输出，但是这时我们再查看`README.md`文件会发现我们的更改都消失了，所以在使用这个命令的时候一定要慎重。

### 版本回退

下面我们再修改一次`README.md`文件

```shell
This is a big project to learn git
I love git
这是一个学习Git的项目
```

然后提交

```shell
$ git add README.md
$ git commit -m "add chinese translation"
[master 310d469] add chinese translation
 1 file changed, 2 insertions(+), 1 deletion(-)
```

像我们这样不断对文件进行修改，然后不断提交修改到版本库中，就像我们玩游戏的时候每打到一定程度就存档，这样如果在后面的某一个地方失败了，我们还可以读档从最近的进度开始而不用从头开始。前面我们所做的`commit`操作就像是存档操作，读档操作我们可以使用`git log`和`git reset`命令完成。

首先我们查看一下我们一共有多少“存档”（<u>上面操作的顺序我改了改，所以这里我的版本顺序有些不对</u>）

```shell
$ git log
commit 310d469f13a7f6d4add1edf323ad8ef194e7a70d (HEAD -> master)
Author: qiyuor2 <1176281967@qq.com>
Date:   Sun Nov 17 10:02:19 2019 +0800

    add chinese translation

commit 3e6ef04eaab69eaf4ece551c5cd76f65b9ab31b2
Author: qiyuor2 <1176281967@qq.com>
Date:   Sat Nov 16 22:23:48 2019 +0800

    add a LICENSE file

commit 4572a22c5f04abe587fa24a41da651cea02a2b55
Author: qiyuor2 <1176281967@qq.com>
Date:   Sat Nov 16 21:47:47 2019 +0800

    add a newline

commit 01c756183d30c82fd54e600e11a36733cf794fd6
Author: qiyuor2 <1176281967@qq.com>
Date:   Sat Nov 16 21:38:13 2019 +0800

    change readme

commit 45b6484663bf370880d470427a1e388a006452e0
Author: qiyuor2 <1176281967@qq.com>
Date:   Sat Nov 16 21:36:44 2019 +0800

    add a readme file
```

`git log`命令会显示从最近到最远的提交日志，如果觉得输出的信息太多可以尝试加上`--pretty=oneline`参数

```shell
$ git log --pretty=oneline
310d469f13a7f6d4add1edf323ad8ef194e7a70d (HEAD -> master) add chinese translation
3e6ef04eaab69eaf4ece551c5cd76f65b9ab31b2 add a LICENSE file
4572a22c5f04abe587fa24a41da651cea02a2b55 add a newline
01c756183d30c82fd54e600e11a36733cf794fd6 change readme
45b6484663bf370880d470427a1e388a006452e0 add a readme file
```

这前面的一大串像乱码一样的东西是`commit id`，就是版本号，为了防止多人协作的时候产生冲突，Git 没有采用简单的 1、2、3……作为版本号。

接下来我们读取存档，我们讲`README.md`退回到上一个版本

```shell
$ git reset --hard HEAD^
HEAD is now at 3e6ef04 add a LICENSE file

$ cat README.md
This is a big project to learn git
I love git
```

在 Git 中`HEAD`表示当前版本，`HEAD^`表示上一个版本，上上一个版本就是`HEAD^^`，如果是网上 100 个版本就没必要写 100 个`^`，可以写成`HEAD~100`。我们可以看到`README.md`文件被成功还原了，这时我们再查看版本库的状态

```shell
$ git log --pretty=oneline
3e6ef04eaab69eaf4ece551c5cd76f65b9ab31b2 (HEAD -> master) add a LICENSE file
4572a22c5f04abe587fa24a41da651cea02a2b55 add a newline
01c756183d30c82fd54e600e11a36733cf794fd6 change readme
45b6484663bf370880d470427a1e388a006452e0 add a readme file
```

会发现最新的`add chinese translation`版本已经找不到了，这个时候如果我们想要重新回到这个版本就需要用到这个版本的`commit id`了

```shell
$ git reset --hard 310d46
HEAD is now at 310d469 add chinese translation

$ cat README.md
This is a big project to learn git
I love git
这是一个学习Git的项目
```

版本号没必要写全，只需要写前几位 Git 就会自动去找。Git 的版本回退是非常快的，因为在 Git 内部有一个指向当前版本的`HEAD`指针，当你回退版本的时候，Git 仅仅是把`HEAD`指针指向你要回退的版本，然后将该版本回退到暂存区并将暂存区还原到工作目录，让你看到回退后的文件。

现在，如果我们回退到某个版本后想要回去，但是忘记了`commit id`，命令行还清理了找不到最新版本的`commit id`，这时我们可以使用`git reflog`，这个命令会记录我们每一次对版本的操作

```shell
$ git reflog
310d469 (HEAD -> master) HEAD@{0}: reset: moving to 310d46
3e6ef04 HEAD@{1}: reset: moving to HEAD^
310d469 (HEAD -> master) HEAD@{2}: commit: add chinese translation
3e6ef04 HEAD@{3}: commit: add a LICENSE file
4572a22 HEAD@{4}: commit: add a newline
01c7561 HEAD@{5}: commit: change readme
45b6484 HEAD@{6}: commit (initial): add a readme file
```

### 管理修改

下面我们继续修改`README.md`文件

```shell
This is a big project to learn git
I love git
这是一个学习Git的项目
C# is a good programming language
```

然后添加

```shell
$ git add README.md
$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   README.md
```

然后再次修改 README.md

```shell
This is a big project to learn git
I love git
这是一个学习Git的项目
C# is a good programming language
Java is also a good programming language
```

提交，然后查看状态

```shell
$ git commit -m "C# is good"
[master 61c5ed5] C# is good
 1 file changed, 2 insertions(+), 1 deletion(-)

$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   README.md

no changes added to commit (use "git add" and/or "git commit -a")
```

这时我们会发现，`README.md`仍然显示为修改后未提交。

我们使用`git diff HEAD -- README.md`命令查看一下当前仓库中的文件和工作区的文件有什么区别（中文可能会有乱码）

```shell
$ git diff HEAD -- README.md
diff --git a/README.md b/README.md
index a8963da..08874e0 100644
--- a/README.md
+++ b/README.md
@@ -1,4 +1,5 @@
 This is a big project to learn git
 I love git
 <E8><BF><99><E6><98><AF><E4><B8><80><E4><B8><AA><E5><AD><A6><E4><B9><A0>Git<E7><9A><84><E9><A1><B9><E7>AE>
-C# is a good programming language
\ No newline at end of file
+C# is a good programming language
+Java is also a good programming language
\ No newline at end of file
```

我们回顾一下刚才的操作：

第一次修改 -> `git add` -> 第二次修改 -> `git commit`

这时我们会发现，第二次的修改并没有被提交成功，因为`git commit`只会提交被`git add`添加至暂存区的**修改**，并非是文件。如果我们想要提交第二次修改，只需要再执行一次`git add`和`git commit`

有些时候我们可能会遇到`commit`后发现自己提交的说明不够详细，想要更改说明，这时就要用到`git commit --amend`

```shell
$ git commit --amend
java is good

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# Date:      Sun Nov 17 12:12:57 2019 +0800
#
# On branch master
# Changes to be committed:
#       modified:   README.md
#
~
~
```

这时会显示一个这样的界面，第一行就是我们添加的说明，按下“I”键，就可以更改。更改完成后，按下“ESC”，然后输入“:” + “wq” + 回车，就可以完成修改，如果不想修改使用“:” + “q!” + 回车即可。或者我们可以直接使用`git commit --amend -m "新的说明"`即可完成更改。

### 删除文件

接下来我们在文件管理器中删掉`LICENSE`文件，或者使用`rm`命令也可以

```shell
rm LICENSE
```

这个时候，工作区的文件不在了，但是版本库中还存在这个文件，这时我们查看状态：

```shell
$ git status
On branch master
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        deleted:    LICENSE

no changes added to commit (use "git add" and/or "git commit -a")
```

`git status`会告诉我们这个文件被删除了，这时我们有两个选择，一是从版本库中删除这个文件，使用`git rm`并执行`git commit`。

```shell
$ git rm LICENSE
rm 'LICENSE'
$ git commit -m "remove LICENSE"
[master d78ec29] remove LICENSE
 1 file changed, 0 insertions(+), 0 deletions(-)
 delete mode 100644 LICENSE
```

二是使用`git restore`恢复该文件

```shell
$ git restore LICENSE
$ ls
LICENSE  README.md
```

## 分支管理

分支可以说是 Git 中最强大的功能，接下来我们就来学习一下 Git 中的分支。

分支到底有啥用呢？假设我们有一个项目已经上线了，但是要开发一个新的功能，这个功能要写好几天才能完成，如果我们在代码没有写完就提交的话很有可能会影响项目的正常运行，但是如果我们一次性写完再提交，又面临着丢失进度的巨大风险。

如果我们使用分支的话，就可以避免这个问题。我们可以创建一个自己的分支，别人还在原来的分支上工作，而我们在自己的分支上工作可以随意提交也不会影响整个项目，直到功能开发完毕后一次性将分支合并到原来的分支上，这样安全又不会影响别人工作。

事实上，其他的版本控制系统都支持分支管理，但是这些版本控制系统的分支管理的速度非常慢，而在 Git 中，无论是创建、切换还是删除分支，无论在你的版本库中有多少文件，它都能在 1 分钟内完成（因为 Git 每一个节点都是一个完整的项目副本）。

### 创建、切换、合并与删除分支

首先我们来创建一个分支，并且切换到这个分支

```shell
$ git branch dev
$ git checkout dev
Switched to branch 'dev'
```

这两行命令可以用`git checkout -b dev`来代替。接下来我们用`git branch`来查看分支。

```shell
$ git branch
* dev
  master
```

`git branch`命令会列出所有分支，并且会在当前分支前加一个`*`，在这个分支列表中我们会发现，这里除了我们刚刚创建的`dev`分支，还有一个`master`分支，这个分支是 Git 为我们创建的一个默认分支。

接下来我们在当前分支上提交修改。修改`README.md`文件

```shell
This is a big project to learn git
I love git
这是一个学习Git的项目
C# is a good programming language
Java is also a good programming language
Create a new branch
```

然后提交

```shell
$ git add README.md
$ git commit -m "new branch test"
[dev 571df6d] new branch test
 1 file changed, 2 insertions(+), 1 deletion(-)
```

接下来我们切换回`master`分支，然后查看文件

```shell
$ git checkout master
Switched to branch 'master'

$ cat README.md
This is a big project to learn git
I love git
这是一个学习Git的项目
C# is a good programming language
Java is also a good programming language
```

这时我们会发现，刚才添加的内容不见了，这是因为刚才添加的内容在`dev`分支上，`master`分支还没有改变。

接下来我们把`dev`分支的工作成果合并到`master`分支上

```shell
$ git merge dev
Updating d78ec29..571df6d
Fast-forward
 README.md | 3 ++-
 1 file changed, 2 insertions(+), 1 deletion(-)
```

然后再查看`README.md`

```shell
$ cat README.md
This is a big project to learn git
I love git
这是一个学习Git的项目
C# is a good programming language
Java is also a good programming language
Create a new branch
```

这样`master`分支就和`dev`分支完全一样了，在合并分支的输出中有一句`Fast-forward`，这就表示这次分支模式是“快进模式”，也就是直接将`master`指向`dev`的当前提交，所以合并速度非常快。

合并完成后，我们就可以删除分支了

```shell
$ git branch -d dev
Deleted branch dev (was 571df6d).

$ git branch
* master
```

现在就只剩下`master`分支了

### 解决合并冲突

有时候我们合并分支并不会这么轻松，分支间经常会出现各种各样的冲突。接下来我们就要解决这些冲突。

先准备一个新的分支，并在这个分支上提交新的修改

```shell
$ git checkout -b feature
Switched to a new branch 'feature'
```

```shell
This is a big project to learn git
I love git
这是一个学习Git的项目
C# is a good programming language
Java is also a good programming language
Create a new branch
Create a new feature branch
```

```shell
$ git add README.md
$ git commit -m "new feature branch"
[feature e5c49d4] new feature branch
 1 file changed, 2 insertions(+), 1 deletion(-)
```

然后切换回`master`分支，并将修改文件

```shell
$ git checkout master
Switched to branch 'master'
```

```shell
This is a big project to learn git
I love git
这是一个学习Git的项目
C# is a good programming language
Java is also a good programming language
Create a new branch
Create a new feature branch is easy
```

提交

```shell
$ git add README.md
$ git commit -m "is easy"
[master f730807] is easy
 1 file changed, 2 insertions(+), 1 deletion(-)
```

现在，两个分支都有了各自的新提交，我们可以使用`git log --decorate --graph --oneline --all`将提交历史和所属分支以图形化显示出来

```shell
$ git log --decorate --graph --oneline --all
* f730807 (HEAD -> master) is easy
| * e5c49d4 (feature) new feature branch
|/
* 571df6d new branch test
* d78ec29 remove LICENSE
* 959d046 java is good
* 61c5ed5 C# is good
* 310d469 add chinese translation
* 3e6ef04 add a LICENSE file
* 4572a22 add a newline
* 01c7561 change readme
* 45b6484 add a readme file
```

在这种情况下，两个分支是无法快速合并的，只能试图把各自的修改合并起来，但这种合并就可能会出现冲突。

```shell
$ git merge feature
Auto-merging README.md
CONFLICT (content): Merge conflict in README.md
Automatic merge failed; fix conflicts and then commit the result.
```

这个时候 Git 就告诉我们`README.md`文件出现了冲突，必须手动解决冲突后再提交。

`git status`也会告诉我们冲突文件

```shell
$ git status
On branch master
You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)
        both modified:   README.md

no changes added to commit (use "git add" and/or "git commit -a")
```

我们可以直接查看`README.md`的内容

```shell
This is a big project to learn git
I love git
这是一个学习Git的项目
C# is a good programming language
Java is also a good programming language
Create a new branch
<<<<<<< HEAD
Create a new feature branch is easy
=======
Create a new feature branch
>>>>>>> feature
```

Git 用`<<<<<<<`，`=======`，`>>>>>>>`标记出不同分支的内容，我们修改后保存再次提交

```shell
Create a new feature branch is simple
```

```shell
$ git add README.md
$ git commit -m "is simple"
[master 1ecaa98] is simple
```

然后我们再次查看分支情况

```shell
$ git log --decorate --graph --oneline --all
*   1ecaa98 (HEAD -> master) is simple
|\
| * e5c49d4 (feature) new feature branch
* | f730807 is easy
|/
* 571df6d new branch test
* d78ec29 remove LICENSE
* 959d046 java is good
* 61c5ed5 C# is good
* 310d469 add chinese translation
* 3e6ef04 add a LICENSE file
* 4572a22 add a newline
* 01c7561 change readme
* 45b6484 add a readme file
```

这时分支就合并成功了，最后删除`feature`分支

```shell
$ git branch -d feature
Deleted branch feature (was e5c49d4).
```

### 分支管理策略

在实际开发中，我们应该按照几个基本原则来进行分支管理：

首先，`master`分支应该是非常稳定的，仅用来发布新的版本，平时不能在上面干活。`dev`分支(develop)是我们平时干活的地方，开发到一定程度的时候把`dev`分支合并到`master`分支上，再`master`分支上发布 1.0 版本。一般来说我们每个人都有自己的`dev`分支，时不时的往云端的`dev`分支合并就行了。

`hotfix`通常用来修复 bug，`release`分支通常用来测试要合并到`master`分支上的版本，`feature`分支用来开发新功能

![分支管理策略](https://gcore.jsdelivr.net/gh/qiyuor2/blog-image/img/branch.png)

## 参考文章

- [廖雪峰 Git 教程](https://www.liaoxuefeng.com/wiki/896043488029600)
- [极客 Python 之 Git 实用教程](https://fishc.com.cn/forum-334-1.html)
