## TestWebServer
2018.4.29更新。

架构：Nginx + Gunicorn + Django（MySQL），前端使用React + Axios，在Nanopi-Neo上测试。

以后会使用Nanopi2 fire做单独的Nginx 负载均衡服务器

## 进度安排：
- [X] 搭建环境，完成MySQL、Nginx配置
- [X] Django 后端简单搭建
- [X] 完全的前后端分离
- [X] 实现前端发送用户名与密码到后端（axios post）
- [X] 实现后端将用户验证数据返回到前端
- [ ] 考虑传输的安全问题(CSRF Not Solved)
- [ ] 实现登陆后的跳转
- [ ] 实现多页面跳转（React-Router 或者 Native-Router方式）
- [ ] 实现较复杂后端逻辑
- [ ] Nginx未发现静态资源，向后端Django发起请求获得资源


- 已知问题：
  1. 实验服务器Nginx 用户为 root（不为默认的www-data），MySQL的django用户权限过大（update这个权限应该进一步限制在固定的表内，而不为全部的库权限）。
  2. SecretKey没有特别好的解决方法。
  3. CSRF
  4. 前后端分离，React无法获取Cookies（Nginx直接路由,而非Django生成）
  5. Toast 实在太丑，代码不优雅
  6. **浏览器打开这个网页CPU占用高**，下一步将取消图标旋转那个功能，看看能不能减少CPU占用。
