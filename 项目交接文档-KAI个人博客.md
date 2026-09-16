# KAI 的个人博客项目交接文档

更新时间：2026-09-14  
项目目录：`W:\Blog_KAI_IP`  
线上地址：`https://kai-s-blog.pages.dev/`

## 1. 项目概览

这是一个面向长期内容输出的个人博客，主要用于记录：

- 技术经验
- 学习笔记
- 项目复盘
- 生活记录
- 阶段性思考与碎碎念

项目目标不是提供复杂的动态交互，而是让作者能够以较低成本持续发布文章，让读者获得稳定、清晰、适合阅读的内容体验。

当前采用静态网站架构。作者编写 Markdown 文件，GitHub 保存源文件，Cloudflare Pages 自动构建并发布网站。

## 2. 参考来源与关键决策

### 2.1 朋友经验文档提供的信息

朋友提供的《交接文档-Hugo+Cloudflare建站教程.md》是本项目的主要技术参考。文档给出的核心链路是：

```text
Markdown 文章
    ↓
Hugo 生成静态 HTML
    ↓
GitHub 保存项目源文件
    ↓
Cloudflare Pages 自动构建
    ↓
Cloudflare 全球 CDN 发布
```

文档强调了以下经验：

1. 不需要购买服务器、数据库或后端。
2. GitHub 和 Cloudflare 可以提供免费的博客托管链路。
3. Hugo 负责把 Markdown 编译成静态网页。
4. Blowfish 主题适合个人博客，并且支持中文、搜索、RSS、暗色模式和响应式布局。
5. 主题文件应该直接放进仓库，不建议使用 Git submodule，避免 Cloudflare 构建时拉取子模块失败。
6. Cloudflare Pages 的构建命令使用：

   ```text
   hugo --gc --minify
   ```

7. 构建输出目录使用：

   ```text
   public
   ```

8. 必须固定 Hugo 版本，避免 Cloudflare 使用过旧版本。
9. `baseURL` 必须和实际线上地址一致，否则页面可能能打开，但 CSS、JS 和图片路径会失效。
10. 文章使用 `draft: true` 时不会上线，未来日期文章默认也不会构建。
11. 文章文件名应使用英文或拼音，避免中文 URL 过长。
12. 搜索需要首页输出 `HTML`、`RSS` 和 `JSON`。

### 2.2 本项目采用的决策

基于上述经验，本项目采用：

| 项目 | 当前选择 |
|---|---|
| 静态生成器 | Hugo Extended |
| 主题 | Blowfish |
| 语言 | 简体中文 |
| 代码托管 | GitHub |
| 网站托管 | Cloudflare Pages |
| 线上域名 | Cloudflare 免费 `pages.dev` 地址 |
| 构建命令 | `hugo --gc --minify` |
| 输出目录 | `public` |
| Hugo 版本 | `0.165.0 Extended` |
| 站点主题配色 | KAI 自定义配色 |
| 默认首页 | Blowfish Profile 布局 |

## 3. 创建过程

### 3.1 初始环境检查

项目初始目录只有朋友的经验文档，不是现成 Git 仓库，也没有博客源文件。

检查结果：

- Git 可用
- 初始没有 Hugo 命令
- 通过下载 Hugo Extended 可执行文件完成本地构建验证
- 项目随后初始化为 Git 仓库

### 3.2 安装主题

Blowfish 主题从官方仓库下载到：

```text
themes/blowfish/
```

主题文件直接包含在博客项目中，符合朋友文档中“不使用 submodule”的建议。

主题自身声明的 Hugo 兼容范围是：

```text
min = 0.162.0
max = 0.165.0
extended = true
```

因此项目部署版本最终采用 Hugo `0.165.0 Extended`。此前使用 Hugo `0.166.0` 构建也可以生成页面，但主题会发出兼容版本范围警告。

### 3.3 站点基本配置

站点配置位于：

```text
config/_default/hugo.toml
config/_default/languages.zh.toml
config/_default/menus.zh.toml
config/_default/markup.toml
config/_default/params.toml
```

主要配置包括：

- `defaultContentLanguage = "zh"`
- `locale = "zh-CN"`
- 中文站点标题和作者信息
- 首页输出 `HTML`、`RSS`、`JSON`
- 标签、分类、作者和系列 taxonomy
- 分页大小为 10
- 开启搜索
- 开启代码复制
- 开启无障碍设置
- 开启阅读进度
- 开启文章目录
- 开启文章标签和分类显示
- 开启暗色模式切换

当前 `baseURL` 是：

```toml
baseURL = "https://kai-s-blog.pages.dev/"
```

### 3.4 页面结构

已经创建的主要页面：

```text
content/_index.md             首页
content/posts/_index.md       文章列表页
content/about.md              关于页
content/archives.md           归档页
content/tags/_index.md        标签页
content/categories/_index.md  分类页
```

已创建示例文章：

```text
content/posts/hello-kai-blog.md
```

示例文章展示了完整 front matter、摘要分隔符、标题、列表、代码块和图片引用说明。

### 3.5 视觉设计

项目没有使用朋友网站的具体内容或个人资料，而是参考其技术架构和博客形态，重新制作了 KAI 的基础视觉资产：

```text
assets/img/kai-avatar.svg  KAI 占位头像
assets/img/kai-logo.svg    KAI Logo
static/favicon.svg         网站图标
```

视觉方向：

- 简约
- 适合长时间阅读
- 保留轻微的暖色和绿色点缀
- 不使用复杂背景和过重装饰
- 支持桌面端和移动端

## 4. 核心功能说明

### 4.1 首页

首页使用 Blowfish 的 Profile 布局，包含：

- KAI 占位头像
- KAI 名称
- 博客简介
- 首页介绍文字
- 最近文章
- 文章列表入口

### 4.2 文章系统

文章使用 Markdown 编写，推荐模板如下：

```markdown
---
title: "文章标题"
date: 2026-09-14
draft: false
description: "文章摘要"
categories: ["学习笔记"]
tags: ["经验", "复盘"]
---

正文从这里开始。
```

摘要可以用下面的标记分隔：

```markdown
<!--more-->
```

标记之前的内容可作为文章列表摘要。

### 4.3 搜索

搜索依赖：

```toml
[outputs]
  home = ["HTML", "RSS", "JSON"]
```

其中 `JSON` 是搜索索引。不要删除，否则搜索功能可能失效。

### 4.4 分类、标签与归档

文章通过 front matter 配置分类和标签：

```yaml
categories: ["项目复盘"]
tags: ["Hugo", "部署"]
```

分类、标签和归档页面由 Hugo 和 Blowfish 自动生成。

### 4.5 图片

文章图片建议放在：

```text
static/images/
```

Markdown 中使用绝对站点路径引用：

```markdown
![图片说明](/images/example.png)
```

这样最不容易受到文章路径影响。

### 4.6 无障碍设置与字体大小

Blowfish 已自带无障碍设置按钮，其中包含：

- 禁用模糊效果
- 显示链接下划线
- 阅读模式
- 字体大小下拉框

最终需求已经确定为：

> 不使用额外的悬浮 `A− / A / A+` 工具条，只保留主题右上角设置中的字体大小下拉框。

开发过程中曾尝试增加自定义字体调节工具条，但用户反馈工具条突兀，且无障碍弹层遮挡导致按钮无法点击，因此该方案应当废弃。

接手者必须优先确认以下自定义残留是否仍存在：

```text
layouts/partials/extend-footer.html
layouts/partials/extend-head-uncached.html
layouts/_default/single.html
assets/js/font-size.js
```

如果这些文件仍存在，应删除或改回不产生额外字号工具条的版本。最终只保留主题原生的 `a11y.html` 和 `a11y.js` 字体下拉逻辑。

## 5. 部署流程

### 5.1 GitHub

建议仓库名：

```text
kai-blog
```

仓库可以设置为 Public，方便 Cloudflare Pages 使用 Git 集成。

本地提交命令：

```powershell
cd W:\Blog_KAI_IP
git add .
git commit -m "初始化 KAI 个人博客"
git branch -M main
git remote add origin https://github.com/你的用户名/kai-blog.git
git push -u origin main
```

不要把密码、验证码、恢复码或个人访问令牌写进文档或发送给协作者。

### 5.2 Cloudflare Pages

在 Cloudflare Dashboard 中进入 Workers & Pages，创建或导入 Git 仓库。

部署配置：

```text
Framework preset: Hugo
Build command: hugo --gc --minify
Build output directory: public
Environment variable: HUGO_VERSION = 0.165.0
```

每次向 `main` 分支推送后，Cloudflare 会自动重新构建。

### 5.3 部署后检查

部署完成后至少检查：

1. 首页是否能打开。
2. 文章列表是否显示。
3. 文章详情页是否显示正常。
4. 页面样式是否加载。
5. 图片和 favicon 是否加载。
6. 搜索是否能找到示例文章。
7. 右上角无障碍设置是否能打开。
8. 设置中的字体大小下拉框是否有效。
9. 手机端菜单是否正常。
10. RSS 和 sitemap 是否存在。

## 6. 本地开发与验证

### 6.1 版本检查

如果 Hugo 已加入 PATH：

```powershell
hugo version
```

如果 Hugo 仅下载到临时目录：

```powershell
& "$env:TEMP\hugo-0.165.0\hugo.exe" version
```

应该看到 `extended`。

### 6.2 正式构建验证

```powershell
cd W:\Blog_KAI_IP
& "$env:TEMP\hugo-0.165.0\hugo.exe" --gc --minify
```

成功时会生成：

```text
public/
```

此前已经使用 Hugo `0.165.0 Extended` 成功构建，结果为：

```text
Pages: 27
Static files: 8
Total: less than 1 second
```

但在字号功能多次修改后，最后一次构建验证受本地执行环境故障影响，接手者必须重新运行构建命令。

### 6.3 本地预览

```powershell
& "$env:TEMP\hugo-0.165.0\hugo.exe" server -D
```

浏览器打开：

```text
http://localhost:1313
```

停止服务器：按 `Ctrl + C`。

## 7. 开发过程中的问题与 Bug

### 7.1 Hugo 未安装

问题描述：初始环境中执行 `hugo version` 提示找不到命令。

解决方案：下载 Hugo Extended 二进制压缩包，并使用 Hugo `0.165.0` 进行项目构建。

后续建议：将 Hugo 加入系统 PATH，避免每次使用完整路径调用。

### 7.2 Hugo 版本兼容警告

问题描述：使用 Hugo `0.166.0` 构建时，Blowfish 提示主题声明的最大兼容版本为 `0.165.0`。

解决方案：改用 Hugo `0.165.0 Extended`，构建成功且不再出现该兼容警告。

### 7.3 `baseURL` 不一致风险

问题描述：README 曾写着 `https://kai-blog.pages.dev/`，而实际配置已经改为 `https://kai-s-blog.pages.dev/`。

影响：如果 README 被照抄，可能导致维护者把 `baseURL` 改回错误地址，最终造成 CSS、JS、图片路径异常。

解决方案：以后每次更换 Cloudflare 项目名，都要同步修改：

```text
config/_default/hugo.toml
README.md
本交接文档
```

### 7.4 文章字体偏小

问题描述：用户反馈正文默认字体偏小，希望读者和作者可以调整字号。

第一次方案：新增文章页 `A− / A / A+` 控制条，并使用 `localStorage` 保存读者选择。

结果：该方案不符合用户对界面的审美要求，工具条显得突兀，因此不采用。

### 7.5 自定义字号按钮点击无效

问题描述：点击 `A− / A / A+` 后，正文没有明显变化。

原因：Blowfish 正文内部的段落、列表等元素存在自己的字号规则，只修改外层变量不能可靠覆盖所有正文元素。

后续尝试：通过自定义文章模板给段落、列表、引用和表格添加字号变量。

### 7.6 字号按钮无法点击

问题描述：截图显示无障碍设置弹层打开后，字号控件被遮挡，无法点击。

原因：自定义工具条位于页面底部，而主题无障碍弹层带有全屏遮罩层，遮罩层拦截了鼠标事件。

临时修复尝试：提高工具条的 `z-index` 并改为固定定位。

最终决定：废弃自定义工具条，不再维护这套逻辑，只使用主题原生无障碍设置里的字体大小下拉框。

### 7.7 文件删除操作受本地环境影响

问题描述：开发过程中多次尝试删除自定义扩展文件时，本地文件操作服务报 `helper_unknown_error`，删除没有得到可靠确认。

风险：部分自定义文件可能仍然存在，导致：

- 文章页被自定义 `single.html` 覆盖
- 页面底部仍出现字号工具条
- 额外脚本继续加载
- 主题原生字号功能与自定义功能发生冲突

解决方案：接手后第一步检查并清理第 4.6 节列出的四个文件，然后重新构建。

## 8. 当前项目状态评估

### 8.1 做得较好的部分

1. **架构简单可靠**  
   使用 Hugo 静态生成，不需要服务器、数据库或后端，维护成本低。

2. **部署成本低**  
   GitHub + Cloudflare Pages 可以满足个人博客的免费托管需求。

3. **主题能力完整**  
   Blowfish 已提供响应式布局、搜索、RSS、暗色模式、无障碍设置、目录和代码展示等能力。

4. **中文内容链路已建立**  
   语言、菜单、页面标题、日期格式和文章内容均以中文为主。

5. **内容发布方式清晰**  
   只需在 `content/posts/` 中创建 Markdown 文件，然后提交并推送即可发布。

6. **基础页面齐全**  
   首页、文章、归档、标签、分类和关于页面均已创建。

7. **有示例文章可参考**  
   新维护者可以直接复制示例文章的 front matter。

8. **已进行过构建验证**  
   Hugo `0.165.0 Extended` 曾经成功生成网站。

### 8.2 有待优化的部分

1. **字号功能状态需要重新确认**  
   用户最终只需要主题原生下拉框，但自定义文件是否完全清除尚未得到可靠验证。

2. **README 与真实地址不一致**  
   README 仍可能保留旧的 `kai-blog.pages.dev`，应改为当前的 `kai-s-blog.pages.dev`。

3. **主题目录可能偏大**  
   Blowfish 下载内容包含示例站和文档资源。示例站不影响运行，但会增加仓库体积。清理前必须先确认目标路径，不能误删主题核心文件。

4. **缺少自动化测试**  
   当前主要依靠 Hugo 构建和人工浏览器检查，没有 Playwright 或其他端到端测试。

5. **缺少真实头像和内容素材**  
   当前使用 SVG 占位头像和 Logo，正式发布前可以替换为个人头像或品牌图形。

6. **缺少版本升级策略**  
   Hugo 和 Blowfish 版本目前是手动固定的，后续升级需要先建立预览分支，再验证主题兼容性。

7. **缺少评论和统计**  
   这些功能不是博客上线的必要条件，但若后续需要，应分别评估 Giscus、Umami 等第三方服务。

8. **仓库提交状态需要确认**  
   由于此前本地执行服务多次异常，接手者需要确认 Git 是否已经提交、远程仓库是否配置正确、线上部署是否使用最新提交。

## 9. 后续维护建议

### 9.1 接手后的第一优先级

按以下顺序处理：

1. 检查 Git 状态和远程地址。
2. 清理自定义字号相关残留文件。
3. 用 Hugo `0.165.0 Extended` 重新构建。
4. 本地预览文章页，确认只存在主题原生字号下拉框。
5. 修正 README 中的线上地址。
6. 提交并推送。
7. 检查 Cloudflare Pages 部署日志。
8. 在线验证桌面端和移动端。

### 9.2 日常发布文章

1. 在 `content/posts/` 创建英文或拼音文件名。
2. 添加 front matter。
3. 编写正文。
4. 本地预览。
5. 确认 `draft = false`。
6. 确认日期不是未来日期。
7. 提交并推送：

   ```powershell
   git add .
   git commit -m "发布新文章"
   git push
   ```

8. 到 Cloudflare Pages 的 Deployments 页面确认构建状态。

### 9.3 修改网站信息

常用位置：

| 内容 | 文件 |
|---|---|
| 网站标题、作者、简介 | `config/_default/languages.zh.toml` |
| 导航菜单 | `config/_default/menus.zh.toml` |
| 首页、文章页和主题功能 | `config/_default/params.toml` |
| 站点地址、分页、输出格式 | `config/_default/hugo.toml` |
| Markdown 和代码高亮 | `config/_default/markup.toml` |
| 头像和 Logo | `assets/img/` |
| favicon | `static/` |
| 文章 | `content/posts/` |

### 9.4 版本升级

不要直接在 `main` 分支升级 Hugo 或主题。建议流程：

1. 创建测试分支。
2. 升级 Hugo 或替换主题。
3. 执行正式构建。
4. 检查首页、文章、搜索、RSS、目录、无障碍设置和移动端。
5. 使用 Cloudflare 分支预览地址验证。
6. 确认无问题后再合并到 `main`。

### 9.5 安全建议

- 不要在项目中保存 GitHub、Cloudflare 密码。
- 不要提交 API Token、验证码、恢复码。
- 不要把 `.env` 或个人密钥上传到公开仓库。
- Cloudflare 和 GitHub 的授权由账号所有者本人完成。
- 任何需要登录的步骤，都应在官方页面输入凭据。

## 10. 结论

项目已经完成个人博客的核心搭建，静态架构、主题、中文内容体系、基础页面、搜索、RSS、文章发布流程和 Cloudflare 部署方案均已建立。

当前最重要的不是继续增加功能，而是先完成一次收尾清理：

1. 清除自定义字号工具条残留。
2. 确认只保留 Blowfish 原生字体大小下拉框。
3. 修正 README 地址。
4. 重新完成 Hugo 构建验证。
5. 确认 GitHub 和 Cloudflare 使用最新提交。

完成以上事项后，项目就具备稳定维护和持续内容发布的基础。后续功能应围绕内容质量、阅读体验和低维护成本展开，避免为了增加功能而引入复杂后端或不必要的前端代码。

