## TestWebServer
2018.4.3更新。

架构：Nginx + Gunicorn + Django（MySQL），前端使用React + Axios，在Nanopi-Neo上测试。

以后会使用Nanopi2 fire做单独的Nginx 负载均衡服务器

## 进度安排：
- [X] 搭建环境，完成MySQL、Nginx配置
- [X] Django 后端简单搭建
- [X] 完全的前后端分离
- [X] 实现前端发送用户名与密码到后端（axios post）
- [ ] 实现多个页面跳转
- [ ] 实现较复杂后端逻辑


- 已知问题：
  1. 实验服务器Nginx 用户为 root（不为默认的www-data），MySQL的django用户权限过大（update这个权限应该进一步限制在固定的表内，而不为全部的库权限）。
  2. SecretKey没有特别好的解决方法。
  3. Nginx上实现了静态资源的缓存，但Django没有合适的方法来动态更新这东西。
  4. Django只使用了普通的HttpResponse，并没使用静态网页生成器之类的技术。
  5. Django数据处理之类的仍然不太清楚
