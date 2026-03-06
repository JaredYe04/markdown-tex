# GitHub 仓库改名步骤

把仓库从 `JaredYe04/texdown` 改成 `JaredYe04/mdtex` 按下面做即可。

## 1. 在 GitHub 上改名

1. 打开仓库：**https://github.com/JaredYe04/texdown**
2. 点 **Settings**（仓库设置）
3. 在 **General** 区域最上方找到 **Repository name**
4. 把 `texdown` 改成 **`mdtex`**
5. 点 **Rename**，在弹窗里再确认一次

改完后，原地址会**自动跳转**到新地址（例如访问 `github.com/JaredYe04/texdown` 会跳到 `github.com/JaredYe04/mdtex`），所以旧链接短期内仍可用。

## 2. 本机远程地址（如需要）

若你本机已经 clone 过，用的是旧地址，可以更新远程 URL：

```bash
cd /path/to/your/mdtex-repo
git remote set-url origin https://github.com/JaredYe04/mdtex.git
# 或 SSH：
# git remote set-url origin git@github.com:JaredYe04/mdtex.git
git remote -v
```

之后 `git push` / `git pull` 都会用新仓库地址。

## 3. 可选：本地文件夹名

仓库名改的是 GitHub 上的名字，**本地文件夹叫什么不影响**。  
如果你希望本地目录也叫 `mdtex`，可以自己重命名：

```bash
# 在上级目录执行
mv texdown mdtex
cd mdtex
```

（Windows 资源管理器里直接重命名文件夹也一样。）

## 4. 改完后建议检查

- **GitHub Actions**：工作流里的 `actions/checkout` 会自动用当前仓库，不需要改。
- **README / 文档里的链接**：本仓库里已统一为 `JaredYe04/mdtex` 和 `mdtex` 包名，无需再改。
- **MetaDoc 的依赖**：若用 `file:` 指向本地路径，路径按你实际文件夹名来（例如 `file:../../texdown` 或 `file:../../mdtex`）。
