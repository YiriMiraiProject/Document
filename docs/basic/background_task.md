---
sidebar_position: 3.7
---

# 背景任务

在 0.2.6 版本之后，YiriMirai 新增了背景任务的功能。

背景任务是在 bot 启动时创建的一个异步 Task，并在 bot 关闭时自动结束。

Mirai 类提供了 `add_background_task` 方法来注册背景任务。

```python
from mirai import Mirai

bot = Mirai(...)

@bot.add_background_task
async def background_task():
    while True:
        await asyncio.sleep(1)
        print('background task')
```

利用这一功能，可以实现定时任务：

```python
@bot.add_background_task()
async def timer():
    today_finished = False # 设置变量标识今天是会否完成任务，防止重复发送
    while True:
        await asyncio.sleep(1)
        now = datetime.datetime.now()
        if now.hour == 7 and now.minute == 30 and not today_finished: # 每天早上 7:30 发送早安
            await bot.send_group_message(12345678, "早安")
            today_finished = True
        if now.hour == 7 and now.minute == 31:
            today_finished = False # 早上 7:31，重置今天是否完成任务的标识
```