---
title: "躺着也能卷：手机远程指挥 Claude Code 干活（全平台）"
source: "https://mp.weixin.qq.com/s/hoZ2ryJDSBNoiXfbrUKUdg"
author:
  - "[[Harry]]"
published:
created: 2026-04-12
description:
category: integration
tags: [tailscale, 远程控制, ssh, 跨平台]
keywords: [tailscale, 远程控制, ssh, 跨平台]
summary: 详细介绍如何通过Tailscale实现跨平台远程访问，包括Mac、Windows、Linux的SSH服务配置，Tailscale客户端部署，以及手机端通过Termius远程指挥Claude Code、OpenCode、Codex干活的完整流程。
---
原创 Harry *2026年4月11日 14:46*

**导读** ：本文详细介绍如何通过 Tailscale 实现跨平台远程访问，包括 Mac SSH 服务配置、Windows SSH 服务器安装、各平台 Tailscale 客户端部署，以及远程连接的完整流程。

---

## 一、开启 Mac SSH 服务

Mac 自带 SSH 服务，只需开启即可。

### 1\. 检查状态

sudo systemsetup -getremotelogin

输出 `Remote Login: On` 表示已开启。

### 2\. 开启 SSH

sudo systemsetup -setremotelogin on

或通过系统设置： **系统设置 → 通用 → 共享 → 远程登录** ，勾选开启。

### 3\. 验证端口

sudo lsof -i:22

看到 `launchd` 监听 `*:ssh` 即表示服务正常运行。

---

## 二、Mac FRP 客户端开机自启

使用 macOS 的 LaunchAgent 实现开机自启。

### 1\. 创建 plist 文件

vim ~/Library/LaunchAgents/com.frpc.plist

内容：

```plain
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.frpc</string>
    <key>ProgramArguments</key>
    <array>
        <string>/Users/你的用户名/.frp/frpc</string>
        <string>-c</string>
        <string>/Users/你的用户名/.frp/frpc.toml</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardOutPath</key>
    <string>/tmp/frpc.out.log</string>
    <key>StandardErrorPath</key>
    <string>/tmp/frpc.err.log</string>
</dict>
</plist>
```

### 2\. 加载服务

launchctl load ~/Library/LaunchAgents/com.frpc.plist

### 3\. 检查状态

launchctl list | grep frpc

---

## 三、Windows 上安装 SSH 服务器

本例以 Windows 10 系统为例。

### 1\. 安装 OpenSSH 服务器

Windows 系统默认没有安装 SSH 服务器，需要手动安装 OpenSSH 服务器组件。打开 Windows PowerShell，以管理员权限运行以下命令：

Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0

- 命令执行过程中，会需要等待一段时间
- 执行完毕后，Windows 将下载和安装 OpenSSH 服务器组件，Online 显示为 True 时即安装成功

### 2\. 启动 SSH 服务

OpenSSH 服务器安装完成后，默认不会自动启动。打开 Windows PowerShell，以管理员权限运行以下命令：

**正常启动：**

Start-Service sshd

**设置自动启动：**

如果需要每次启动 Windows 时自动启动 SSH 服务，运行以下命令：

Set-Service -Name sshd -StartupType 'Automatic'

### 3\. 验证 SSH 服务器

在 Windows PowerShell 中运行以下命令检查 SSH 服务器是否正常运行：

Get-Service sshd

如果 SSH 服务正在运行，OpenSSH SSH Server 将会显示 "Running" 的状态。

---

## 四、Tailscale 简介

Tailscale 是一种 **基于 WireGuard 协议** 的现代 VPN 解决方案，具有以下特点：

- **零配置** ：无需手动配置 IP、密钥、路由表
- **跨平台** ：支持 macOS、Windows、Linux、iOS、Android、BSD
- **安全性高** ：使用 WireGuard 协议，端到端加密
- **穿透性强** ：自动处理 NAT 穿透，无需公网 IP
- **免费使用** ：个人和小团队可免费使用

---

## 五、Tailscale macOS 安装

### 方法一：官网下载

访问 Tailscale 官网 下载 macOS 客户端。

### 方法二：Homebrew 安装

brew install --cask tailscale

安装完成后打开应用，登录 Tailscale 账号即可。

---

## 六、Tailscale Windows 安装

### 方法一：官网下载

访问 Tailscale 官网 下载 Windows 客户端安装包。

### 方法二：PowerShell 安装

winget install tailscale.tailscale

安装后启动应用，登录账号完成配置。

---

## 七、Tailscale Linux 安装

### Ubuntu/Debian

```plain
# 添加 Tailscale 仓库
curl -fsSL https://pkgs.tailscale.com/stable/ubuntu/jammy.noarmor.gpg | sudo tee /usr/share/keyrings/tailscale-archive-keyring.gpg >/dev/null

curl -fsSL https://pkgs.tailscale.com/stable/ubuntu/jammy.tailscale-keyring.list | sudo tee /etc/apt/sources.list.d/tailscale.list

# 安装 Tailscale
sudo apt update
sudo apt install tailscale

# 启动并连接
sudo tailscale up
```

### CentOS/RHEL/Fedora

```plain
# 添加 Tailscale 仓库
sudo dnf config-manager --add-repo https://pkgs.tailscale.com/stable/fedora/tailscale.repo

# 安装 Tailscale
sudo dnf install tailscale

# 启动并连接
sudo systemctl enable --now tailscaled
sudo tailscale up
```

---

## 八、Tailscale 其他平台安装

### iOS

在 App Store 搜索 "Tailscale" 下载安装。

### Android

在 Google Play 或 F-Droid 搜索 "Tailscale" 安装。

---

## 九、Tailscale Docker 部署

### 快速启动

```plain
docker run -d --name tailscale \
  --hostname=my-docker-node \
  --cap-add=NET_ADMIN \
  --cap-add=SYS_MODULE \
  -v /dev/net/tun:/dev/net/tun \
  -v /var/lib/tailscale:/var/lib/tailscale \
  tailscale/tailscale
```

### 连接网络

docker exec tailscale tailscale up

---

## 十、远程连接

### 1\. 查看设备状态

启动应用，使用同一账号登录，可以看到 VPN 连接的所有设备，绿色代表在线可以远程。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 2\. SSH 远程访问

手机端应用 Termius 配置 SSH 连接（没有的自己到应用市场下载或者同类型应用）：

- **IP** ：设置为 Tailscale 分配的 IP
- **Username** ：电脑的用户名
- **密码** ：登录密码
- **端口** ：默认 22
![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

保存后连接：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 3\. 其他系统远程连接

Windows和linux 同样操作：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 4\. 指挥 Claude 干活，不限与claude code，opencode和codex同样可以指挥

```nginx
# 在终端输入指令，前提是当前环境已经安装好了，没有的则需要先安装claude 或 opencode 或 codex
```

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

---

**参考资料** ：

- Tailscale 官方文档
- Tailscale GitHub
- WireGuard 协议介绍

继续滑动看下一个

HarryAiBot

向上滑动看下一个