---
sidebar_position: 6
---

# 更新日志

## 0.2.7

发布日期：2022年6月18日

更新内容：

- 适配 mah 2.5.0 的商店表情
- 适配 mah 2.5 的同步消息
- 适配 mah 2.5 的非好友账号信息接口
- 优化弃用提醒和pyi
- 修复 UploadImage 返回值错误的问题

不兼容的变更：
- `MessageEvent` 现在不再有 sender 字段
- （内部变更）`parse_obj` 分为 `parse_obj` 和 `parse_subtype` 两个方法

0.2.7 将是 0.2 最后一个主要版本，下一步将释出 0.3 正式版，遗留的 bug 将在 0.3 修复

## 0.2.6.2

发布日期：2021年10月15日

新增内容：
1. 新的背景事件接口 `add_background_task`。
2. **不兼容的变更**：修改了 `MessageCommpoent` 在 `__str__` 中的行为，现在会返回更加人类可读的文本（类似于手机QQ的通知栏消息的格式）。原本序列化为 mirai code 的功能移动到 `as_mirai_code` 方法中。
3. 更新了一批依赖包的版本，以保证在 Python 3.10 上的正常运行。

## 0.2.5

发布日期：2021年9月20日

新增功能：

修复 [#26](https://github.com/YiriMiraiProject/YiriMirai/issues/26) 和 [#27](https://github.com/YiriMiraiProject/YiriMirai/issues/27)。

修复 WebSocket 连接断开时，程序卡住不退出的问题。

适配 mirai-api-http 2.3.0：
1. 新增修改群员管理员权限接口。
2. 支持好友语音。
3. 语音追加 `length` 返回语音时间长度，单位为秒。
4. `BotJoinGroupEvent` `MemberJoinEvent` 两个入群时间追加邀请人 `invitor` 参数。
5. `BotLeaveEvent` Bot 离群事件，在 Bot 被踢出时可通过 `operator` 获取执行操作的管理员信息。
6. 群文件相关接口全增加 `path` 参数用于模糊定位（群文件相同目录可重名），优先级高于 `id`，精准定位请使用 `id`。
7. 丰富群文件信息的 `download_info` 参数的内容，包括修改时间、上传时间、上传者、下载次数。

~~其实上面这一大段是从 mirai-api-http 的更新日志里粘贴过来的~~

## 0.2.4

发布日期：2021年8月22日

新增功能：

1. 新的辅助函数 `bot.allow` `bot.decline` `bot.ignore`，快速处理加好友、加群事件。
2. 消息链新增大量操作，包括连接、切片等。
3. 为适配器启用 LazyLoad，减少引入不必要的库的时间。

不兼容的变更：

1. 获取消息链中指定数量的某类型元素，不再支持 slice，而是改为 tuple。

修复问题：

1. WebSocket 适配器连接失败退出时可能的报错。
2. WebHook 适配器的快速响应可能失效。

## 0.2.3.1

发布日期：2021年8月16日

紧急修复：[#23](https://github.com/YiriMiraiProject/YiriMirai/issues/23)。

## 0.2.3

发布日期：2021年8月14日

新增内容：

1. 修复了 WebSocket 适配的诸多问题，并增加了心跳机制，防止连接断开。
2. 重写 `bot.pyi`。

## v0.2.2.1

发布日期：2021年8月9日

本次更新适配了 mirai-api-http 2.2.0。

新增功能：

1. 新增 MiraiCode 消息组件。
2. 新增 `Mirai.file_info` 的 `with_download_info` 参数。

## v0.2.1

发布日期：2021年8月8日

新增内容：

1. 修复了 `bot.pyi` 文件中 type hint 的错误。
2. 重新设计添加了事件总线的优先级功能。

## v0.2.0

发布日期：2021年8月7日

YiriMirai 正式迈入 0.2.0 时代！（虽然离 1.0.0 还有一段路要走）

新增功能：

1. 修改了 `Image` `Voice` 消息组件中 `path` 参数的含义，现在 `path` 参数对相对路径将以 YiriMirai 的当前目录为基础计算。
2. 优化了 type hint 在代码补全中的表现，并支持 mypy 静态类型检查。

## v0.1.6

发布日期：2021年8月1日

新增内容：

1. 支持头像双击事件。
2. 修复了若干问题。

## v0.1.5

发布日期：2021年7月19日

新增功能：

1. 图片发送和接收。
2. 语音发送和接收。

## v0.1.4

发布日期：2021年7月18日

新增功能：

1. 支持在关闭 verify 的情况下运行。
2. 支持 single mode。
3. 支持机器人多例运行。
4. 支持内嵌 ASGI 服务器。

## v0.1.3

发布日期：2021年7月13日

新增功能：

1. 新增 WebHook 适配器和组合适配器。
2. 支持以 ASGI 应用的方式运行。
3. 移除事件总线的 priority 功能。

~~目前，YiriMirai 的基础功能已经基本全部实现。~~

我错了，还有好多 To Do 没做……

## v0.1.2

发布日期：2021年7月11日

新增功能：

1. API 调用全面优化，支持参数使用下划线命名的别名。
2. 新增正向 WebSocket 适配器。

## v0.1.1

发布日期：2021年7月9日

第一个发布版本 v0.1.1。

支持最基本的功能。
