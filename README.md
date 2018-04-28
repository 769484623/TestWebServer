# TestWebServer
2018.4.3更新。


架构：Nginx + Gunicorn + Django（MySQL）

在Nanopi-Neo上测试用网站。
以后会使用Nanopi2 fire做单独的Nginx 负载均衡服务器
已知问题：
1.实验服务器Nginx 用户为 root（不为默认的www-data），MySQL的django用户权限过大（update这个权限应该进一步限制在固定的表内，而不为全部的库权限）。
2.SecretKey没有特别好的解决方法。
3.Nginx上实现了静态资源的缓存，但Django没有合适的方法来动态更新这东西。
4.Django只使用了普通的HttpResponse，并没使用静态网页生成器之类的技术。
5.静态缓存中也没有什么js css html文件。
6.Django数据处理之类的仍然不太清楚，明天继续
