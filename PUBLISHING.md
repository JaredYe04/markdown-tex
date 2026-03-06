# 打包与发布 / Build & Publish

## 关于 403 Forbidden（为什么 NPM_TOKEN 没问题却报错？）

工作流和你们另一个项目一样：**都是直接用仓库里的 NPM_TOKEN 发布**，没有多任何逻辑。

403 的原因是：**包名在 npm 上已被别人占用**。  
npm 会先验证你的 token（通过），再检查「谁有权发布到这个名字」：只有该包名的**当前拥有者**可以发布，所以会返回 403，和 NPM_TOKEN 是否正确无关。

**解决办法（二选一）：**

1. **换一个未被占用的包名**（推荐）  
   例如在 `package.json` 里把 `"name"` 改成未被占用的名字（如 `mdtex`、`texdown-converter` 等，先在 [npmjs.com](https://www.npmjs.com) 搜一下是否已被占用）。  
   **工作流不用改**，继续用同一个 NPM_TOKEN 即可；MetaDoc 里依赖和 import 改成新包名即可。

2. **继续用原包名**  
   需要联系当前占用该包名的用户，请求 transfer 给你，或由 npm 支持处理（一般较慢）。

---

## 本地打包

```bash
cd /path/to/mdtex
npm ci
npm run build
npm test
```

产物在 `dist/`，`package.json` 的 `main`、`module`、`types` 已指向 `dist/`。

## 发布到 npm

### 方式一：GitHub Actions 手动发布（推荐）

1. 仓库 Settings → Secrets and variables → Actions 中配置 **NPM_TOKEN**（npm 账号的 Automation token）。
2. Actions → 选择 “Publish to npm” → Run workflow。
3. 选择版本类型：patch / minor / major，运行。
4. 工作流会：拉取最新 main、与 npm 当前版本比较、bump package.json、构建、发布到 npm、提交并打 tag、创建 GitHub Release。

### 方式二：先创建 GitHub Release 再发布

1. 在 GitHub 仓库中创建 Release，选择或新建 tag（如 `v1.0.1`）。
2. 发布该 Release 后，“Publish to npm” 会被触发，将用该 tag 版本更新 package.json 并执行 `npm publish`。

### 方式三：本地发布

```bash
npm version patch   # 或 minor / major
npm run build
npm publish --access public
git push origin main --tags
```

需在本地先 `npm login`，且确保 package 名 `mdtex` 在 npm 上可用（未占则首次发布即创建）。

---

## MetaDoc 引用方式

发布后，MetaDoc 应通过 npm 安装：

```bash
cd /path/to/meta-doc
npm install mdtex@^1.0.0
# 或保持 package.json 中 "mdtex": "^1.0.0" 后执行
npm install
```

- **代码**：MetaDoc 从 `'mdtex'` 包 import（`markdownToLatex`、`latexToMarkdown`、`escapeLatex`）。
- 联调本地 mdtex 时，可临时使用 `"mdtex": "file:../../../repos/mdtex"`（路径按你本机 MetaDoc 与 mdtex 仓库的相对位置调整），发布后改回 `"mdtex": "^x.x.x"`。
