### 删除某个文件（文件夹）

```
git rm --cached -r 路径
```

### 查看修改

```
<!--查看还未commit的文件改动-->
git diff 文件名.后缀
<!--查看还未commit的文件改动内容，在git 1.6之前的版本中，使用'--cached-->
git diff --stage
<!--查看在最后一次提交之后的所有变更-->
git diff HEAD
<!--从一个特定点开始文件的修改情况-->
git diff 版本号(如v1.0.6) -- 文件名
<!--两次提交的差异比对，后街两个版本号，要看统计数据后加上-stat，要看某文件的具体修改加上-- sha1_file.c-->
git diff v1.0 v1.1 
<!--查看将要合并的某个分枝会有什么样的变化，此时你在master上-->
git diff ...(branch名)

```

### 查看历史记录
> git log

> git log --pretty=oneline可使历史信息展示内容精简
### 版本回退

```
<!--提交了某个文件，返回到commit前-->
git checkout 文件.后缀（当前命令执行路径下则为文件名，反之为路径）
<!--n即你回到上n次提交，HEAD表示当前版本-->
git reset HEAD~n  
<!--回退版本较少可以用‘^’代替，一个代表回退一个版本-->
git reset HEAD^
<!--回退后后悔了，找到回退过的commit id，前几位就行-->
git reset --hard 3628164
<!--回退所有内容到上一个版本 -->
git reset HEAD^ 
<!--回退a.py这个文件的版本到上一个版本--> 
git reset HEAD^ a.py 
<!--将本地的状态回退到和远程的一样-->
git reset –hard origin/master 
<!--回退到某个版本-->
git reset 057d 
<!--回退到上一次提交的状态，按照某一次的commit完全反向的进行一次commit--> 
git revert HEAD 
```
### 查看命令记录

```
git reflog
```
### 新开分支并拉取代码

```
<!--B不是从A上切出来的-->
git checkout B
git merge A
```
### 删除本地分支

```
<!--先切换到其他分支-->
Git branch -d xxxxx
```







