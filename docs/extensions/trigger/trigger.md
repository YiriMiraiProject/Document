---
sidebar_position: 5.14
---

# 过滤器与触发器

## 过滤器

事件过滤器定义在 [`mirai_extensions.trigger.filter`](https://yirimiraiproject.github.io/Trigger/filter.html) 模块，提供对事件进行选择性过滤和解析的功能。

### 捕获函数

事件过滤器允许用户传入自定义的捕获函数。

捕获函数可以在创建过滤器时设置，或者通过装饰器的方式设置。

```python
# 方式一
def filter_one_func(event: FriendMessage):
    if event.sender.id == 12345678:
        return event.sender.nickname or ''
filter_one = Filter(FriendMessage, func=filter_one_func)

# 方式二
@Filter(FriendMessage)
def filter_two(event: FriendMessage):
    if event.sender.id == 12345678:
        return event.sender.nickname or ''
```

当使用类装饰器的方式创建过滤器时，被装饰函数的名称将失效。比如上例中，`filter_two` 将不再是函数， 而是成为 Filter 实例。

上例中的过滤器将检测好友消息的发送对象，只有来自 12345678 的消息会被捕获。其他情况下，过滤器返回默认值 None， 不会被捕获。

:::tip 副作用与阻塞
**请尽量不要在过滤器中执行有副作用（影响到外部）的代码，以及导致阻塞或长时间挂起的代码（包括异步等待）**。

这是由事件触发器的原理决定的。收到新事件时，事件触发器是否被调用是不确定的（如果事件已经被某一个触发器拦截，那么就不会传递给其他触发器），而且，当一个事件触发器的过滤器被阻塞或挂起后，其他事件触发器也不会被调用，直到过滤器完成并返回一个值。

我们推荐**在过滤器中只进行简单的判断**。
:::

### 混入

事件过滤器提供了混入（mixin）机制，允许混入其他过滤器。

过滤器会先检查混入的过滤器，若任何一个未捕获，直接停止捕获，返回“未捕获”状态。

在创建过滤器时，可以通过 `mixin` 参数指定混入的过滤器。

```python
@Filter(FriendMessage, mixin=[filter_one])
def filter_three(event: FriendMessage):
    return event.message_chain.get_first(At)
```

这样，过滤器 `filter_three` 将会先检查 `filter_one`，若没有捕获，则直接返回“未捕获”状态。

被混入的过滤器的返回值将丢失。过滤器混入仅用于检查事件是否被捕获，事件的解析仍有当前过滤器完成。

### 自定义过滤器

可以通过继承 `Filter` 类，创建自定义的过滤器。

过滤器的捕获过程发生在 `_catch` 方法中，重写这个方法，可以实现自定义的捕获过程。

```python
class MyFilter(Filter[FriendMessage]):
    def __init__(self):
        super().__init__(FriendMessage)

    def _catch(self, event: FriendMessage) -> Optional[str]:
        if event.sender.id == 12345678:
            return event.sender.nickname or ''
```

:::note 类型标注
`Filter` 类是一个泛型类，可以通过类型标注，指定接收事件的类型。

不过，因为 Python 的泛型并不做运行时检查，只被静态类型检查器使用，所以不做标注也是可以的。
:::

### BaseFilter

如果一个过滤器并不能用来实际的捕获，而只是用作其他过滤器的混入，可以从 `BaseFilter` 类继承。

```python
class MyBaseFilter(BaseFilter[FriendMessage]):
    def __init__(self, qq: int):
        self.qq = qq

    def _catch(self, event: FriendMessage) -> Optional[FriendMessage]:
        if event.sender.id == self.qq:
            return event

@Filter(FriendMessage, mixin=[MyBaseFilter(12345678)])
def filter_four(event: FriendMessage):
    return event.sender.nickname or ''
```

### 预定义的过滤器

在 [`mirai_extensions.trigger.message`](https://yirimiraiproject.github.io/Trigger/message.html) 模块中，有一些预定义的过滤器。

`FriendFilter` `GroupFilter` `GroupMemberFilter` `QuoteFilter` 继承自 `BaseFilter`，分别检查是否是对应的好友、群、群成员，是否回复指定消息。这四个过滤器用于作为其他过滤器的混入。

`FriendMessageFilter` `GroupMessageFilter` `TempMessageFilter` 继承自 `Filter`，分别检查是否是对应的好友、群中的某个群成员、某个群成员的临时会话的消息。这三个过滤器可以自定义捕获函数。实际上，它们就是预先提供了混入上面四个过滤器的 `Filter`。

## 触发器

触发器定义在 [`mirai_extensions.trigger.trigger`](https://yirimiraiproject.github.io/Trigger/trigger.html) 模块中。

目前，触发器仅在中断控制器中使用。

触发器抽象了“等待符合条件的事件触发”的逻辑。为触发器指定过滤器后，可以根据过滤器的返回值来决定是否触发事件。

### 创建触发器

在创建触发器时，指定使用的过滤器，以及触发器的优先级（可选）。

```python
@Filter(FriendMessage)
def filter_one(event: FriendMessage):
    ...

trigger = Trigger(filter_one, priority=1)
```

### 在中断控制器中使用

中断控制器的 `inc.wait` 方法可以传入触发器。

`inc.wait` 也可传入过滤器，这时候，中断控制器会基于传入的过滤器，自动创建触发器。

### 主动使用触发器

触发器在设计上类似于 `asyncio.Future`，有已完成和未完成两种状态。

触发器创建后，默认为未完成状态。通过 `catch` 方法尝试捕获事件，捕获成功后将进入已完成状态。使用 `wait` 方法等待一个触发器完成。

触发器的状态可以通过 `done` 方法来查询，触发器已完成时，`done` 方法将返回 `True`。

:::note 题外话
大家可以看到，这个库的名字叫 `trigger`（触发器），但是翻一下文档，会发现除了这里，全部都是讲的“过滤器”。

这可以算作设计上的失误吧。在早期版本 0.1.0 和 0.2.0 中，这个库的确是以触发器为主体，当时的过滤器只是触发器内部的一个函数。

然后我在给 0.2.0 写文档的时候，突然发现触发器的设计实际上非常不自然。于是，我决定把过滤器从触发器中分离出来，并且赋予过滤器更多的功能。所以，这个库虽然名字还叫 `trigger`，但是实际上已经以过滤器为主了。
:::