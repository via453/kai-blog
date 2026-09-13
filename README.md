# KAI 的个人blog

这是一个基于 Hugo + Blowfish + Cloudflare Pages 的个人博客项目，用来记录 KAI 的经验笔记、项目复盘、学习记录和生活思考。

## 写新文章

在 `content/posts/` 下新建 Markdown 文件，文件名建议使用英文或拼音，例如：

```text
content/posts/my-note.md
```

文章开头使用这个格式：

```markdown
---
title: "文章标题"
date: 2026-09-13
draft: false
description: "文章摘要"
categories: ["学习笔记"]
tags: ["博客", "写作"]
---

正文从这里开始。
```

`draft: true` 是草稿，不会上线；`draft: false` 才会发布。

## Cloudflare Pages 设置

- Framework preset: `Hugo`
- Build command: `hugo --gc --minify`
- Build output directory: `public`
- Environment variable: `HUGO_VERSION = 0.165.0`

## 常用目录

- `content/posts/`：文章
- `content/about.md`：关于页
- `content/archives.md`：归档页
- `assets/img/kai-avatar.svg`：头像占位图
- `assets/img/kai-logo.svg`：站点 Logo
- `static/`：favicon 和文章图片等静态文件
- `config/_default/`：站点和主题配置

## 免费发布地址

当前配置里的默认地址是：

```text
https://kai-blog.pages.dev/
```

如果 Cloudflare Pages 项目名称不是 `kai-blog`，上线后需要把 `config/_default/hugo.toml` 里的 `baseURL` 改成真实地址。
