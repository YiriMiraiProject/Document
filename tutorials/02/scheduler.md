---
sidebar_position: 3.2
---

# 二：定时任务

有的时候我们需要在某个时间点执行一个任务，比如每天早晨发送早安，这就需要定时任务的方式来实现。

## 基于 `asyncio.sleep` 的定时任务

最简单的定时任务方式在无限循环中不断检测时间，到达某个时间点就执行操作。

为了不让无限循环打断程序流程，我们使用异步的 `asyncio.sleep`，并把循环放到单独的部分。

```python
import asyncio
import datetime
from mirai import Startup, Shutdown

_task = None

@bot.on(Startup)
async def start_scheduler(_):
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

    global _task
    _task = asyncio.create_task(timer())

@bot.on(Shutdown)
async def stop_scheduler(_):
    # 退出时停止定时任务
    if _task and not task.done():
        _task.cancel()
```

:::info
如你所见，这个方式十分繁琐。我不推荐在生产环境中使用这样的代码。至于最好的方式，请看后文的“使用 `APScheduler` 实现定时任务”。
:::

上面的操作中，我们在 bot 启动时创建了一个 Task，在 Task 中，我们不断检测时间，到达某个时间点就执行操作。最后，退出时停止定时任务。

在 v0.2.6 之后，我们提供了简化的初始化与停止操作，使用 `bot.add_background_task`。

```python
import asyncio
import datetime

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

:::info
同样地，这里仅为介绍 `bot.add_background_task` 的作用而写。对于定时任务这一专门的操作，请参考后文的实现方式。
:::

当然，这种方式实现的定时任务是十分简陋的。下面，我们将介绍使用 `APScheduler` 库，实现拓展性更强的定时任务。

## 使用 `APScheduler` 实现定时任务

`APScheduler` 全称 `Advanced Python Scheduler`，是一个高级的 Python 定时任务库。

首先，我们使用 pip 安装 `APScheduler`。

```shell
pip install apscheduler
```

APScheduler 提供了 `AsyncIOScheduler`，用于在 YiriMirai 这样的异步架构下使用。

```python
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger

scheduler = AsyncIOScheduler()

@bot.on(Startup)
def start_scheduler(_):
    scheduler.start() # 启动定时器

@bot.on(Shutdown)
def stop_scheduler(_):
    scheduler.shutdown(True) # 结束定时器

@scheduler.scheduled_job(CronTrigger(hour=7, minute=30))
async def timer():
    await bot.send_group_message(12345678, "早安")
```

APScheduler 的 CronTrigger 是一个提供了类似于 linux 的 crontab 表达式的 Trigger，我们可以通过 `hour` 和 `minute` 属性来设置定时任务的时间。

CronTrigger 的参数不止可以是 int，还可以是字符串，这样可以实现在多个时间执行任务，比如：

```python
import datetime

@scheduler.scheduled_job(CronTrigger(hour='*', minute=0))
async def timer():
    await bot.send_group_message(12345678, f"为您报时: {datetime.datetime.now().hour}:00")
```

更多用法，请参考 `APScheduler` 的文档，以及 `crontab` 命令的语法。

## 总结

这一节我们介绍了如何设置定时任务。

本节的示例代码在[这里](./examples/02.md)。