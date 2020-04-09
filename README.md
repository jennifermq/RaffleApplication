# 第一步：导入抽奖名单
备注：该步骤的目的是导入抽奖名单到js文件，使抽奖程序可以直接读取。可根据需求开发新的脚本，或直接使用ajax处理。

1. 整理出一份所有参与抽奖人员的excel名单。确保名单中包含以下字段：姓名，是否在职，邮箱。将名单文件重命名为 ”名单.xlsx”
2. 运行代码目录下的python脚本/src/import_namelist.py，在/src目录下生成文件 ”抽奖名单.js”


# 第二步：配置参数
备注：所有参数均为必填项。由于兼容性问题，请尽量使用Chrome浏览器。

1. 打开控制台页面：使用chrome浏览器打开代码目录下的 /view/config.html
2. 设置奖品数量，以防抽取的人数大于奖品数量。输入后点击“保存奖品数量”
3. 设置抽奖页面标题，输入后点击“保存抽奖标题”。空白字符需使用空格表示，请不要使用tab等
4. 使第一步中导入的抽奖名单生效，点击“重置抽奖名单”。每次生成新的”抽奖名单.js”时，建议先刷新控制台页面，再点击重置名单按钮。


# 第三步：运行抽奖程序
备注：抽奖算法为随机抽取人员名单的数组下标，并将被抽取到的项pop出来。由于兼容性问题，请尽量使用Chrome浏览器。

1. 打开抽奖首页：使用chrome浏览器打开代码目录下的 /view/index.html
2. 抽取一等奖：一等奖为单抽，点击抽奖按钮后，按钮变为动态效果，左侧奖区开始滚动。再次点击抽奖按钮，奖区停止滚动，产生一个中奖人员，并添加到右侧中间名单中
3. 抽取二等奖：过程同一等奖
4. 抽取三等奖：三等奖为20连抽，点击抽奖按钮后，按钮变为动态效果，奖区开始滚动。再次点击抽奖按钮，奖区停止滚动，产生20个中奖人员。点击“查看中奖名单”可查看三等奖完整中奖名单。名单有分页功能，如人数过多一页展示不下，可点击标题右侧的页码
5. 三等奖补抽：如果因为三等奖数量不为20的整倍数、有的中奖人员丧失中奖资格等原因需要额外抽取少量人员，可点击进入补抽页面。三等奖补抽为单抽，补抽的中奖者在中奖名单中会以特殊颜色展示
6. 抽取特别奖：特别奖为单抽，抽取方式同一、二等奖。由于常有多种特别奖项，因此特别奖加入了分组功能。在抽取完一种特别奖后，点击下一组，可进行下一种特别奖项的抽取，中奖名单区域被清空。在中奖名单中，不同组的结果将分开展示，便于区分和整理数据
7. 如需重新抽奖，请在控制台页面点击“重新抽奖”。


# 第四步：导出中奖名单
备注：该步骤的目的是以特定格式导出中奖名单到指定文件，便于活动后的公示和奖品领取。可根据需求开发新的导出流程。由于兼容性问题，请尽量使用Chrome浏览器。

1.	打开控制台页面/view/config.html，快捷键Ctrl+Shift+i打开浏览器开发者工具，选择“Console”选项卡打开浏览器控制台
2.	点击“查看中奖名单”，console中会打印出当前的中奖结果列表
3.	将打印出的内容复制，并粘贴到代码目录下的/src/导出名单.txt，保存文件
4.	运行代码目录下的python脚本/src/export_prizelist.py，在/src目录下生成文件 ”中奖名单.txt”，内容为格式化的中奖结果。

# 第五步：界面优化
备注：非专业前端，代码有些凌乱，请见谅。

1. 更换抽奖背景：将目标文件复制到代码目录下的/src/目录，修改/css/style.css第二行的背景图片名称
2. 更换抽奖按钮：将目标文件复制到代码目录下的/src/目录，代码中全局搜索”btn-up.png”或”btn-down.png”，替换为新文件的名称
3. 修改三等奖连抽数：打开/js/draw.js，修改loadPage()初始化三等奖中奖数字的循环条件。修改startDraw()中level==3情况下的max变量的值。修改stopDraw()中level==3情况下winListDisplay的分割方式
4. 其他样式调整请修改/css/style.css

# 第六步：会议现场使用小贴士
1. 会议控制的电脑上最好外接一台扩展显示器，打开两个chrome窗口，主屏上放控制台页面，扩展屏上放抽奖页面并按F11全屏展示，便于实现PPT、视频等其他会议材料和抽奖页面之间的无缝切换，并随时监控程序运行情况、调整参数。
2. 可使用手持的PPT遥控器来抽奖，“上一页”（pageup）和“下一页”（pagedown）按键均支持。如需添加其他按键，可在/js/draw.js中的$(window).keydown()设置。
3. 程序内的配置信息均使用LocalStorage进行存储，关闭程序后上一次的配置和抽奖列表仍会保留。如需清除缓存，请在控制台页面/view/config.html点击“清除缓存”

