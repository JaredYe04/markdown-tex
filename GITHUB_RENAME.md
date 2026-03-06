# GitHub 仓库改名步骤

若需要把本仓库在 GitHub 上的名字改成 `mdtex`，按下面做即可。

## 1. 在 GitHub 上改名

1. 打开当前仓库的 **Settings**（仓库设置）
2. 在 **General** 区域最上方找到 **Repository name**
3. 改成 **`mdtex`**
4. 点 **Rename**，在弹窗里再确认一次

改完后，原地址会**自动跳转**到新地址，旧链接短期内仍可用。

## 2. 本机远程地址（如需要）

若本机已 clone 过，可更新远程 URL：

```bash
cd /path/to/your/mdtex-repo
git remote set-url origin https://github.com/JaredYe04/mdtex.git
# 或 SSH：git remote set-url origin git@github.com:JaredYe04/mdtex.git
git remote -v
```

之后 `git push` / `git pull` 都会用新地址。

## 3. 可选：本地文件夹名

仓库名改的是 GitHub 上的名字，**本地文件夹叫什么不影响**。  
若希望本地目录也叫 `mdtex`，在上级目录执行：

```bash
mv <当前文件夹名> mdtex
cd mdtex
```

（Windows 下用资源管理器重命名文件夹即可。）

## 4. 改完后建议检查

- **GitHub Actions**：工作流会自动用当前仓库，无需改。
- **README / 文档**：本仓库已统一为 `JaredYe04/mdtex` 和包名 `mdtex`。
- **MetaDoc 的依赖**：若用 `file:` 指向本地路径，请用 `file:../../mdtex`（与本地文件夹名一致）。
