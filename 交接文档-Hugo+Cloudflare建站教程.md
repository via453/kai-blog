# 交接文档：用 Hugo + Cloudflare Pages 搭一个自己的博客

> 面向对象：想拥有个人博客、会一点命令行、但不想买服务器的人
> 参考实例：https://euinblog.pages.dev （本文所有配置都是从它身上抄的，可逐条对照）
> 预计耗时：路线 A 约 20 分钟；路线 B 约 1 小时
> 费用：0 元

---

## 零、先搞懂原理（30 秒）

Hugo 把你写的 Markdown 编译成纯静态 HTML → 你把仓库推到 GitHub → Cloudflare Pages 自动拉代码、自动跑构建、免费挂到全球 CDN。

所以整条链路里：

- **不需要** 服务器 / 数据库 / 后端 / 备案
- **不需要** 会前端
- **只需要** 两个免费账号：GitHub + Cloudflare

站点源文件（Markdown + 配置）在 GitHub 上，Cloudflare 负责"编译 + 发布"。

---

## 一、从零搭

1. **装 Hugo**（extended 版，只有本地预览才需要；不装也能部署）
   打开 https://github.com/gohugoio/hugo/releases ，下载 `hugo_extended_0.166.0_windows-amd64.zip`，解压出 `hugo.exe`，把所在目录加进系统环境变量 `PATH`。
   验证：命令行执行 `hugo version`，输出里应带 `+extended`。

2. **建站点骨架**

   ```bash
   hugo new site my-blog
   cd my-blog
   ```

3. **装主题**（Blowfish 要求 Hugo ≥ 0.162.0）
   去 https://github.com/nunocoracao/blowfish/releases 下载最新版压缩包，解压后把里面的主题文件夹**改名为 `blowfish`**，整个放进项目的 `themes/` 目录下。
   **不要用 `git submodule`**（Cloudflare 构建时常常拉不到，直接构建失败）；把主题文件提交进仓库才是最稳的。

4. **配置**
   把主题自带的起始配置 `themes/blowfish/config/_default/` 整个复制到项目根目录的 `config/_default/`，把 `languages.en.toml`、`menus.en.toml` 改名成 `languages.zh.toml`、`menus.zh.toml`，然后按 A-2 那张表改内容。
   本项目实测只需要 5 个文件：`hugo.toml` / `languages.zh.toml` / `markup.toml` / `menus.zh.toml` / `params.toml`（**照抄本仓库这个目录最稳**）。

5. **建几个必备页面**
   `content/_index.md`（首页）、`content/posts/_index.md`（文章列表）、`content/about.md`（关于）、`content/archives.md`（归档）、`content/tags/_index.md`、`content/categories/_index.md`。

6. **推 GitHub → 接 Cloudflare**：和 A-3 完全一样。
---

## 二、日常使用

### 写一篇新文章

在 `content/posts/` 下新建一个 `.md` 文件（**文件名用英文或拼音**），开头照抄这段：

```markdown
---
title: "文章标题"
date: 2026-09-11
draft: false
description: "列表页显示的摘要，一两句话"
categories: ["技术笔记"]
tags: ["Hugo", "教程"]
---

正文从这里开始。

正文里单独占一行的 <!--more--> 之前的内容，会作为列表页摘要。
```

写完保存 → `git add . && git commit -m "新文章" && git push` → Cloudflare 自动重新构建上线，大约 1 分钟。

### 本地预览（可选）

```bash
hugo server -D          # -D = 连草稿一起显示；浏览器打开 http://localhost:1313
hugo --gc --minify      # 正式构建，和 Cloudflare 上跑的命令一模一样
```

不装 Hugo 完全不影响线上部署，Cloudflare 会在云端帮你构建。

### 用分支预览新样式（很好用）

推一个分支上去，Cloudflare 会**自动**为它生成一个独立预览网址，形如：

```
https://<分支名>.<项目名>.pages.dev
```

这样改主题、改样式可以放心大胆试，正式站 `https://<项目名>.pages.dev` 完全不受影响；满意了再把分支合并回 `main`。

---

## 四、可选进阶

| 想做什么 | 怎么做 |
| --- | --- |
| 绑定自己的域名 | Cloudflare → 你的 Pages 项目 → **Custom domains** → 添加；域名也托管在 Cloudflare 的话会自动配好 DNS 和 HTTPS |
| 换头像 | 换掉 `assets/img/photo.jpg`，配置里的 `image` 指向新文件 |
| 换 favicon | 替换 `static/` 下的 `favicon.ico`、`favicon-16x16.png`、`favicon-32x32.png`、`apple-touch-icon.png`、`safari-pinned-tab.svg` |
| 改主题配色 / 首页布局 | `config/_default/params.toml` 里的 `colorScheme`、`defaultAppearance`、`[homepage]` 的 `layout` |
| 每页显示几篇 | `config/_default/hugo.toml` 里 `[pagination]` 的 `pagerSize` |
| 评论区 | ⚠️ 本仓库这版 Blowfish 里**没有**评论功能（主题文件里搜不到 giscus / disqus），要加得自己接第三方评论，属于进阶操作 |
| 网站统计 | Blowfish 支持 Umami / Fathom 等，同样在 `params.toml` 里填 |
| 主题文档 | https://blowfish.page/zh-cn/docs/ （有中文） |
---

## 五、踩坑记录（都是我们真踩过的，照做能省几个小时）

1. **Cloudflare 的 Workers & Pages 页面偶尔白屏**：刷新一下、换个浏览器，或者直接打开 `https://dash.cloudflare.com/<你的账号ID>/workers-and-pages`。新版把 Pages 合并进了 Workers，左侧菜单名字可能和老教程不一样（**Create** 也可能叫 **Create application**），别被吓到。
2. **点 GitHub 授权后会跳到 GitHub**，那是正常的，装完 App 会自动跳回来，不用手动回。
3. **首次打开 `xxx.pages.dev` 可能报 522**：那是 Cloudflare 边缘还在生效，等 1～2 分钟自己就好了，不是建坏了。
4. **不加 `HUGO_VERSION` 环境变量**：Cloudflare 用的是很老的 Hugo，会构建失败或者页面错乱。必须加，值填 `0.166.0`。
5. **`baseURL` 和真实域名不一致 → 线上样式全丢**（页面能打开，但白底黑字没排版）。这是最常见的翻车点，改完配置一定重新 push。
6. **主题不要用 `git submodule`**：Cloudflare 构建时可能拉不到子模块，直接构建失败。把主题文件提交进仓库最稳。
7. **Hugo 0.158+ 用 `locale`，不再用 `languageCode`**：写旧字段会一直报警告，新项目直接写 `locale = "zh-CN"`。
8. **PaperMod 的 `v8.0` release 不能用**（2024-11 发布，和新版 Hugo 不兼容，会报 `partial "partials/..." not found`），要取它官方 `master` 分支。本仓库已经换成了 Blowfish，不受影响。
9. **文章的 `draft: true` 不会上线**；**日期写成未来时间也不会构建**（Hugo 默认跳过未来文章）。
10. **文件名别用中文**：网址会变成一长串 `%E6%8A%80%E6%9C%AF`，不好看也不好分享。用英文或拼音。
11. **构建日志里两条 `deprecated: .Language.LanguageDirection / LanguageCode` 警告是正常的**，不影响功能，不用管。
12. **文章图片放 `static/images/`**，正文里用 `/images/xxx.png` 引用，最不容易出错。

---

## 六、常见问题 FAQ

**Q：改了文章，线上没变化？**
A：去 Pages 项目 → **Deployments** 看最新一次构建是成功还是失败。再确认文章的 `draft` 不是 `true`、日期不是未来。

**Q：线上样式全乱了？**
A：99% 是 `baseURL` 和真实网址不一致，见第 5 条。

**Q：站内搜索搜不出东西？**
A：检查 `config/_default/hugo.toml` 里 `[outputs]` 的 `home` 是不是 `["HTML", "RSS", "JSON"]`，那个 `JSON` 就是搜索索引。

**Q：构建失败，说找不到 hugo / 版本太低？**
A：检查环境变量 `HUGO_VERSION` 是否等于 `0.166.0`。

**Q：怎么改主页显示的文章数量？**
A：`config/_default/params.toml` 里 `[homepage]` 的 `showRecentItems`。

**Q：每次 push 都会重新构建吗？会不会收费？**
A：是自动构建。免费额度每月 500 次构建、无限带宽，个人博客用不完。

---

## 七、参考项目的真实现状（对照用）

| 项 | 值 |
| --- | --- |
| 线上地址 | https://euinblog.pages.dev |
| 仓库 | https://github.com/euinharry/my-blog （public） |
| 部署 | Cloudflare Pages + Git 集成，推 `main` 自动构建 |
| Cloudflare 项目名 | `euin`（网址由它决定） |
| Framework preset | `Hugo` |
| Build command | `hugo --gc --minify` |
| Build output directory | `public` |
| 环境变量 | `HUGO_VERSION = 0.166.0` |
| 生成器 | Hugo extended `0.166.0` |
| 主题 | Blowfish `v3.6.0`（MIT，已内置在 `themes/blowfish/`，不入 submodule） |

**关键文件对照**

```text
config/_default/hugo.toml         站点核心：baseURL、语言、分页、分类/标签
config/_default/languages.zh.toml 站点标题、作者、简介、头像
config/_default/menus.zh.toml     顶部导航 + 页脚导航
config/_default/params.toml       主题外观：配色、首页布局、文章页开关
config/_default/markup.toml       Markdown / 代码高亮设置（别乱改）
content/posts/                    你的文章
content/about.md                  关于页
static/                           favicon 等静态文件
assets/img/                       头像
themes/blowfish/                  主题本体
```

---

有任何一步卡住，把 **Cloudflare 的构建日志** 或 **报错截图** 发出来，基本都能一眼定位。