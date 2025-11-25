# 浏览器开发工具单步调试指南

本指南将帮助你在浏览器中进行Next.js项目的JavaScript/TypeScript代码单步调试。

## 1. 启用浏览器开发者工具

### Chrome浏览器
- 在网页上右键点击，选择「检查」(Inspect)
- 或者使用快捷键: `Cmd+Option+I` (Mac) 或 `Ctrl+Shift+I` (Windows)
- 或者点击Chrome菜单 > 更多工具 > 开发者工具

### Firefox浏览器
- 使用快捷键: `Cmd+Option+I` (Mac) 或 `Ctrl+Shift+I` (Windows)
- 或者点击Firefox菜单 > 更多工具 > Web开发者工具

## 2. 打开Sources面板进行单步调试

1. 在开发者工具中选择「Sources」(源代码)面板
2. 在左侧导航中找到你的JavaScript/TypeScript文件
   - Next.js项目中，文件通常在以下位置：
     - `/app` 目录下的组件
     - `/components` 目录下的组件
     - `/lib` 目录下的工具函数

## 3. 设置断点

### 行断点
- 点击代码行号旁边的空白区域，会出现一个蓝色圆点，表示断点已设置
- 在条件满足的位置设置断点（如函数调用、事件处理程序等）

### 条件断点
1. 右键点击已设置的断点
2. 选择「Edit breakpoint」
3. 输入JavaScript表达式作为条件
4. 只有当表达式求值为true时，断点才会触发

### 事件监听断点
- 在右侧的「Event Listener Breakpoints」面板中展开类别
- 勾选你想监听的事件类型（如click、fetch、setTimeout等）

## 4. 单步调试控制

在代码执行到断点处暂停时，使用调试控制按钮：

- **继续执行** (Continue): 继续执行代码直到下一个断点
- **单步执行** (Step over): 执行当前行，然后在下一行暂停（不进入函数内部）
- **单步进入** (Step into): 进入当前函数调用内部继续调试
- **单步退出** (Step out): 执行当前函数剩余部分，然后在函数调用后的行暂停
- **重启** (Restart): 重新启动调试会话

## 5. 检查变量和作用域

- **局部变量** (Local): 显示当前函数中的变量值
- **全局变量** (Global): 显示全局作用域中的变量
- **监视表达式** (Watch): 添加你想要持续监视的表达式
  1. 点击「+」按钮
  2. 输入要监视的变量名或表达式
- **控制台** (Console): 在调试过程中执行临时命令，检查变量值

## 6. 调试React/Next.js组件

### 组件检查
- 在Elements面板中选择一个React元素
- 在Console中使用 `$0` 引用选中的元素
- 使用 `ReactDOM.findDOMNode($0)` 获取DOM节点

### Hooks调试
- 在函数组件中为useState、useEffect等hooks添加断点
- 在调试过程中观察状态变化

## 7. 网络请求调试

- 切换到「Network」面板
- 启用「Preserve log」选项保留请求历史
- 筛选特定类型的请求（如XHR、Fetch）
- 查看请求详情、响应和计时信息

## 8. Source Maps配置

确保浏览器能够正确映射编译后的代码到原始源文件：

- 在Sources面板中，确保启用了「Enable JavaScript source maps」选项
- Next.js默认配置了source maps，但如果遇到问题，检查Next.js配置

## 9. 常见问题排查

### 断点未命中
- 确保代码已正确加载
- 尝试刷新页面
- 检查是否在正确的文件中设置了断点
- 验证是否启用了source maps

### 变量值不可见
- 确保在变量初始化后再设置断点
- 检查变量的作用域是否正确

### 调试性能问题
- 避免设置过多断点
- 使用性能面板分析长时间运行的操作
- 考虑使用console.time()和console.timeEnd()进行性能测量

## 10. 结合VSCode调试

可以同时使用VSCode和浏览器调试工具：

1. 在VSCode中启动「Next.js: debug server-side」配置
2. 同时在浏览器中打开开发者工具
3. 在服务器端代码和客户端代码中分别设置断点

---

通过这些工具和技巧，你可以有效地进行Next.js项目的单步调试，快速定位和解决问题。