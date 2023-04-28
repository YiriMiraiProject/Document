---
sidebar: 2
---

# 黑魔法

Yiri Mirai的接口不是开发者一行一行代码的敲出来的，而是通过一些黑魔法实现的。

Python中的类可以定义一个叫做`__getattr__`的函数，这个函数是Yiri Mirai实现的基础之一，具体由什么用我们待会讲到。

```python
class Test(object):
    def __init__(self) -> None:
        self.test = 'test'

    def __getattr__(self, api: str):
        return 'called __getattr__'


a = Test()
print(
    a.test,
    a.test123456
)
# 输出
test called __getattr__
```

很明显，只有`test`这个属性被定义，但是我们依然可以访问`a.test123456`，并且得到一个字符串，我们用`objprint`来看一下返回的数据。

```python
a = Test()
op(a.test, a.testsda, a)
# 输出
'test'
'called __getattr__'
<Test 0x7f2877d3fb80
  .test = 'test'
>
```

当 Python 查找一个类的属性时，他会先调用这个类的`__getattribute__`方法，如果这个方法找不到属性它就会去调用`__getattr__`这个方法。

由于 `__getattribute__` 已由Python帮我们实现，所以我们不需要自己再去实现一遍 `__getattribute__`。

```python
def api(self, api: str) -> ApiModel.Proxy:
    """获取 API Proxy 对象。

    API Proxy 提供更加简便的调用 API 的写法，详见 `mirai.models.api`。

    `Mirai` 的 `__getattr__` 与此方法完全相同，可支持直接在对象上调用 API。

    Args:
        api: API 名称。

    Returns:
        ApiModel.Proxy: API Proxy 对象。
    """
    api_type = ApiModel.get_subtype(api)
    return api_type.Proxy(self, api_type)

def __getattr__(self, api: str) -> ApiModel.Proxy:
    return self.api(api)
```

这是Mirai类关于Api调用部分的代码，可以看到当我们访问这个类当中的一个属性的时候，如果一个属性没有在类中被定义的话那么就会调用`__getattr__`。

剩下的就是对一些方法再封装，这样方便我们在开发当中直接调用，例如`send()`。

![](https://pic2.imgdb.cn/item/644ba6110d2dde5777459a2a.jpg)
