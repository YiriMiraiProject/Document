---
sidebar_position: 3.1
---

# 一：在 Linux 上部署

想要让机器人全天候运行，整天开着电脑肯定是不太行的。这时候我们可以把机器人部署到一些可以持续运行的地方，比如服务器上。

不过，服务器一般是 Linux 系统（我尝试过用 Windows 建服务器的痛苦），要在 Linux 上部署 mirai 和 YiriMirai，和 Windows 上还是有些区别的。

本节我们使用 Debian 11.0 作为演示。其他 Linux 发行版，除去软件包安装会有所不同外，流程基本相同。

本节将全程使用终端，不涉及任何图形界面。

## 安装 mirai-console

我们依然使用 mcl-installer 来安装 mirai-console。

在此之前，mirai-console 运行在 JVM 上，我们需要先安装 Java。虽然 mcl-installer 可以自动安装 Java，不过，在 Linux 系统上，还是用系统的软件包管理器更方便。

在终端输入：

```shell
sudo apt install openjdk-11-jre
```

然后验证一下 Java 版本：

```
$ java -version
openjdk version "11.0.12" 2021-07-20
OpenJDK Runtime Environment (build 11.0.12+7-post-Debian-2)
OpenJDK 64-Bit Server VM (build 11.0.12+7-post-Debian-2, mixed mode, sharing)
```

接下来下载 mcl-installer。

```shell
cd ~
mkdir mirai
cd mirai
wget https://github.com/iTXTech/mcl-installer/releases/download/v1.0.3/mcl-installer-1.0.3-linux-amd64
chmod +x mcl-installer-1.0.3-linux-amd64
```

运行 mcl-installer，会看到这样的输出：

```
$ ./mcl-installer-1.0.3-linux-amd64
iTXTech MCL Installer 1.0.3 [OS: linux]
Licensed under GNU AGPLv3.
https://github.com/iTXTech/mcl-installer

iTXTech MCL and Java will be downloaded to "/home/wybxc/mirai"

Checking existing Java installation.
openjdk version "11.0.12" 2021-07-20
OpenJDK Runtime Environment (build 11.0.12+7-post-Debian-2)
OpenJDK 64-Bit Server VM (build 11.0.12+7-post-Debian-2, mixed mode, sharing)

Would you like to install Java? (Y/N, default: Y)
```

因为我们已经安装了 Java，不需要重复安装，这里输入 N，回车继续。

```
Would you like to install Java? (Y/N, default: Y) N
Fetching iTXTech MCL Package Info from https://gitee.com/peratx/mirai-repo/raw/master/org/itxtech/mcl/package.json
Mirai Console Loader 公告栏

[mirai-console] 最近, 项目组发现了权限系统可能会被错误的提前加载导致的3rd权限系统无法正确加载

于是决定, 于 2.6 起, 超前访问权限系统将得到一个错误并中断插件加载, 请各开发者及时检查

影响范围: https://github.com/mamoe/mirai-console/pull/307


The latest stable version of iTXTech MCL is 1.2.2
Would you like to download it? (Y/N, default: Y)
```

这里直接回车，继续安装 mirai-console。

```
Would you like to download it? (Y/N, default: Y)
Start Downloading: https://github.com/iTXTech/mirai-console-loader/releases/download/v1.2.2/mcl-1.2.2.zip
Downloading: 1569577/1569577
Extracting [14/14] scripts/updater.jsjsjs
Use "./mcl" to start MCL.

Press Enter to exit.
```

回车，结束安装。

接下来，输入 `./mcl` 启动 mirai-console-loader，首次启动时会下载 mirai-core 和 mirai-console。

如果提示“权限不够”，先执行命令，赋予 `./mcl` 可执行权限：

```
chmod +x ./mcl
```

启动 mirai-console-loader，会看到这样的输出：

```
$ ./mcl
 10:35:42 [INFO] iTXTech Mirai Console Loader version 1.2.2-60c67fb
 10:35:42 [INFO] https://github.com/iTXTech/mirai-console-loader
 10:35:42 [INFO] This program is licensed under GNU AGPL v3
 10:35:43 [INFO] Verifying "net.mamoe:mirai-console" v2.7-RC
 10:35:43 [ERROR] "net.mamoe:mirai-console" is corrupted.
 Downloading mirai-console-2.7-RC.jar [==============================] 3.35 MB
(中间省略)
2021-08-24 10:36:19 I/MCL Addon: iTXTech MCL Version: 1.2.2-60c67fb
2021-08-24 10:36:20 I/main: 1 plugin(s) enabled.
2021-08-24 10:36:20 I/main: mirai-console started successfully.
```

输入 `exit` 回车退出 mirai-console。

这样，mirai-console 就安装完成了。

## 安装配置 mirai-api-http

和之前的教程一样，mirai-api-http 需要单独下载。

```shell
cd ~/mirai/plugins
wget https://github.com/project-mirai/mirai-api-http/releases/download/v2.2.0/mirai-api-http-v2.2.0.mirai.jar
```

重启 mirai-console。

```shell
cd ~/mirai
./mcl
```

可以看到控制台输出多了下面几行：

```
2021-08-03 22:02:08 W/net.mamoe.mirai-api-http: USING INITIAL KEY, please edit the key
2021-08-03 22:02:08 I/Mirai HTTP API: ********************************************************
2021-08-03 22:02:08 I/http adapter: >>> [http adapter] is listening at http://localhost:8080
2021-08-03 22:02:08 I/Mirai HTTP API: Http api server is running with verifyKey: INITKEYn7ussdck
2021-08-03 22:02:08 I/Mirai HTTP API: adaptors: [http]
2021-08-03 22:02:08 I/Mirai HTTP API: ********************************************************
```

这说明 mirai-api-http 安装成功了。

退出 mirai-console，在 `config/net.mamoe.mirai-api-http` 文件夹中找到 `setting.yml`，这是 mirai-api-http 的配置文件。

编辑这个文件：

```shell
cd ~/mirai/config/net.mamoe.mirai-api-http
vim setting.yml
```

将内容修改为：

```yaml title='setting.yml'
adapters:
  - ws
debug: true
enableVerify: true
verifyKey: yirimirai
singleMode: false
cacheSize: 4096
adapterSettings:
  ws:
    host: localhost
    port: 8080
    reservedSyncId: -1
```

重启 mirai-console。

```shell
cd ~/mirai
./mcl
```

看到这样的输出：

```
2021-08-03 22:46:18 I/Mirai HTTP API: ********************************************************
2021-08-03 22:46:18 I/ws adapter: >>> [ws adapter] is listening at ws://localhost:8000
2021-08-03 22:46:18 I/Mirai HTTP API: Http api server is running with verifyKey: yirimirai
2021-08-03 22:46:18 I/Mirai HTTP API: adaptors: [ws]
2021-08-03 22:46:18 I/Mirai HTTP API: ********************************************************
```

恭喜你，mirai-api-http 安装成功了。

## 登录 QQ

运行 mirai-console，在终端输入 `login QQ号 密码`，登录 QQ。

:::tip 备份设备文件
如果你在其他地方的 mirai 已经成功通过设备锁验证，那么在 `bots/QQ号` 文件夹中可以找到 `device.json` 文件，这个文件保存了登录的虚拟设备信息。

你可以把这个 `device.json` 复制到 `~/mirai` 文件夹中，这样相当于两次使用同一个设备登录，可以避免再次进行设备锁验证。
:::

:::note 设备锁
如果你的账号开启了设备锁，在图形界面下会弹出这样的弹框：

![device-verify](/img/tutorials/configuration/device-verify-linux.png)

复制下面的 URL 框中的内容，在手机 QQ 中打开，然后使用另一台已登录此 QQ 号的手机扫码验证。

如果没有图形界面，会在终端输出这样的内容：

```
2021-08-25 10:43:22 I/Bot.748753384: [UnsafeLogin] 当前登录环境不安全，服务器要求账户认证。请在 QQ 浏览器打开 https://ti.qq.com/safe/verify?_wv=2&_wwv=128&envfrom=###### 并完成验证后输入任意字符。
2021-08-25 10:43:22 I/Bot.748753384: [UnsafeLogin] Account verification required by the server. Please open https://ti.qq.com/safe/verify?_wv=2&_wwv=128&envfrom=###### in QQ browser and complete challenge, then type anything here to submit.
```

同样，将这里的链接复制到手机 QQ 中打开，完成验证后，在终端输入任意字符，回车继续。

:::

:::note 滑动验证码
有时候登陆账号还需要滑动验证码。这种情况可以使用 [TxCaptchaHelper](https://github.com/mzdluo123/TxCaptchaHelper) 处理。

在手机上安装 TxCaptchaHelper，打开后输入 mirai 给出的请求码，完成滑动验证即可。
:::

## 使用 screen

用 Windows 时，我们可以开几个命令窗口，一个运行 mirai，一个运行 Python；但是在 Linux 上，尤其是连接到远程服务器时，断开与服务器的连接，当前的终端会被关闭，里面运行的任务不能继续运行。

有什么办法，让一个终端可以“后台运行”呢？一个简单的办法是使用 screen 命令。

如果你的 Linux 发行版没有安装 screen，可以使用以下命令安装：

```shell
sudo apt install screen
```

使用 `screen -S <名字>` 命令启动一个 screen。

```shell
screen -S mirai
```

每一个 screen 都是一个新的终端，这些终端由 screen 管理，可以随时放到后台。

在新的终端中，输入 `./mcl` 运行 mirai-console，登录 QQ 账号。

mirai-console 运行成功后，按下 `Ctrl+A` `Ctrl+D`，将终端放到后台。

用 `screen -r <名字>` 命令重新连接到一个后台的终端。

```shell
screen -r mirai
```

同样，按下 `Ctrl+A` `Ctrl+D` 可以将终端再次放到后台。

:::note 使用 UTF-8 编码
如果 screen 导致了中文乱码，指定 screen 使用 UTF-8 编码（`-U` 参数）可能会解决问题：

```shell
screen -U -S mirai
```

使用 UTF-8 编码之后，每一条 screen 命令都要加上 `-U` 参数。

```shell
screen -U -r mirai
```
:::

按照同样的方法，再建立用于运行 Python 的 screen。

```shell
screen -S python
```

这样，需要的时候就连接到不同的 screen，从服务器断开连接的时候，就可以把 screen 放到后台运行。
