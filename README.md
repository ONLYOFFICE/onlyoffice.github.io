# PictureFloatView
加入了一款OnlyOffice的浮动窗口放大查看图片插件（类似WPSoffice的图片查看功能）

效果演示

https://github.com/user-attachments/assets/eb6e1277-1766-436e-bde9-c555a193e5f3

## 功能说明

<img width="322" height="413" alt="image" src="https://github.com/user-attachments/assets/5539ce69-043a-4966-9900-0c56c5b328cf" />

1、支持触控板双指、鼠标滚轮放大和缩小图片

2、支持鼠标和解控板对放大的图片进行上下左右拖拽

3、点击全屏查看按钮可以全屏查看图片（恢复窗口模式可以按esc键或者再次点击全屏按钮）点击1:1还原可以快速将放大后的图片恢复为原始大小。

## 安装方法
### 在OnlyOffice自带的插件管理器中切换到“可用的插件”页再点击“手动安装插件”找到下载好的“PictureFloatView.plugin”插件文件进行安装（推荐）

<img width="315" height="153" alt="image" src="https://github.com/user-attachments/assets/a6d1a8e8-87d7-454c-ac13-eb2ea96c2b21" />
<img width="305" height="377" alt="image" src="https://github.com/user-attachments/assets/0c86ffe5-6fba-4f1b-8e86-b296798c74d3" />

### 手动复制安装
1、'～/Library/Application Support/asc.onlyoffice.ONLYOFFICE/data/sdkjs-plugins' 是软件的插件目录

2、在以上目录里新建一个名为“{eb6471e0-7981-4235-9856-42d48f101188}”的目录（名称不要包含引号）

3、将“PictureFloatView.plugin”改名zip后解压到新的目录也可以

### 最后
##### 我不是一个专职的开发人员，只是兴趣爱好让OnlyOffice有一个类似WPSoffice的浮窗查看图片的功能方便使用，插件借助了Gmini的协助
##### 比较遗憾没办法完全做到WPSoffice浮窗查看图片的全部功能，比如选中图片后图片旁边能够出现一个快捷按钮来触发浮窗，而不用去到插件菜单栏去点击插件。甚至想过有没有办法双击图片后解发浮窗口都没办法实现。
##### 希望OnlyOffice开发人员能够开发这样的功能让OnlyOffice软件更好用！
#### 最后还是要感谢OnlyOffice开发人员写出了这样的软件！让大家可以免费使用！





[![License](https://img.shields.io/badge/License-GNU_AGPL_v3-green.svg)](https://www.gnu.org/licenses/agpl-3.0)

## Overview

Welcome to the onlyoffice.github.io repository! This repository contains the necessary files and resources to set up and manage plugins for ONLYOFFICE.

## Repository Structure

* [**sdkjs-plugins**](sdkjs-plugins): This directory contains the stylesheets and CSS files used for plugin customization and styling. Also it contains the code and resourses of all plugins in store.
* [**store**](store): This directory contains the code and resources for the Plugins Manager. It includes the necessary scripts and configurations to manage plugins within ONLYOFFICE.

## Contributing

If you would like to contribute to the ONLYOFFICE Plugin Marketplace, we welcome your contributions. To contribute, please follow these [guidelines](https://github.com/ONLYOFFICE/onlyoffice.github.io/tree/master/store#how-to-build-and-add-your-own-plugin). We appreciate your contributions and will review them as soon as possible.

## License

onlyoffice.github.io is licensed under the GNU Affero General Public License v3.0. See [LICENSE.txt](LICENSE.txt) for more information.

## User Feedback and Support

If you have any problems with or questions about ONLYOFFICE Plugins and Plugin Marketplace, please visit our official forum to find answers to your questions: [forum.onlyoffice.com](https://forum.onlyoffice.com) or you can ask and answer ONLYOFFICE development questions on [Stack Overflow](https://stackoverflow.com/questions/tagged/onlyoffice).
If you encounter any issues or have any questions regarding the ONLYOFFICE Plugins and Plugin Marketplace, please open an issue in the repository. We'll be glad to assist you.

## Acknowledgments

We would like to thank all the contributors and developers who have worked on the ONLYOFFICE Plugin Marketplace.
