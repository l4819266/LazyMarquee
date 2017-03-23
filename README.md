# LazyMarquee
简单实现跑马灯效果
## Initialize
```javascript
$(mydom).lazymarquee(option);
```
### option
`data`:`array`,设置需要滚动的数据<br/>
`delay`:`number`,设置滚动间隔默认为10<br/>
`loop`:`bool`,设置是否需要循环滚动<br/>
`startup`:`bool`,设置是否立即启动<br/>
### method
```javascript
var marquee = $(mydom).lazymarquee(option);
```
#### startup
```javascript
marquee.startup();
```
立即启动<br/>
#### stop
```javascript
marquee.stop();
```
停止滚动<br/>
#### append(data)
```javascript
var datas = ["add1","add2",3,"addend"];
marquee.append(datas);
```
添加数据到滚动的末尾<br/>
data:需要添加的数据
#### insertAt(data,index)
```javascript
var datas = ["insert1","insert2"];
marquee.insertAt(datas,10);
```
添加数据到指定的顺序<br/>
data:需要添加的数据<br/>
index:指定的索引位置
#### removeAt(index,num)
```javascript
marquee.removeAt(0,4);
```
删除指定顺序的数据<br/>
index:指定的索引位置<br/>
num:设置需要删除的数量