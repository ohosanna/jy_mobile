# webpack构建一个vue脚手架

webpac3.0+vue全家桶 构建一个spa版脚手架
需要安装node.js

```
使用说明：
1、克隆 https://git.dev.tencent.com/Coding_K/smart-community-h5.git
2、安装模块 npm install
3、开发运行 npm run dev
4、打包项目 npm run build

come on ,lets go to try it!
```
关于3，开发运行是把项目打包到内存中进行跑的，会自动起一个服务，自动弹出浏览器打开，并支持热更新，就是你改了代码保存后不用刷新页面自动更新

关于4，第一次打包需要手动在跟目录建一个static文件夹，默认克隆是没有这个文件夹的，打包好的项目都在根目录public上，把public上打包好的项目全部拷贝，启动一个web服务器，npm也有web服务（自行百度），也可以用tomcat，或者其他

