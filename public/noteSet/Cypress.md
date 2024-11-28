# 安装Cypress

## 在vue中安装Cypress

**1. 安装 Cypress**

首先，确保你已经安装了 Cypress。在你的 Vue 项目根目录下运行以下命令：

```bash
npm install cypress --save-dev
```

**2. 打开 Cypress**

安装完 Cypress 后，可以通过以下命令打开 Cypress 测试界面：

```bash
npx cypress open
```

## 在TS中安装Cypress

### 1. 安装 Cypress 和 TypeScript 相关依赖

首先，在你的项目中安装 Cypress 和 TypeScript 相关的类型定义。你可以通过以下命令进行安装：

```bash
npm install cypress --save-dev
npm install --save-dev @types/node @types/cypress
```

**这将安装：**

- cypress：用于 E2E 测试。
- @types/node 和 @types/cypress：提供 Cypress 和 Node 的类型支持，以便你能够在 TypeScript 中使用类型检查。

### 2. 安装完成之后，在项目下会有一个 cypress.config.ts

```bash
import { defineConfig } from "cypress";
export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // 如果需要在测试中自动启动 Vite 服务器，可以在这里添加代码来启动它
      // 注意：你需要确保 Vite 服务器在运行时监听并准备好处理请求
    },
    baseUrl: "http://localhost:8088", // Vite 开发服务器的地址
    supportFile :false,
    defaultCommandTimeout: 10000, // 将默认超时时间设置为 10 秒
  },
  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
});
```

### 3、在tsconfig.json中配置参数

```bash
  "types": ["cypress"],
  "include": ["cypress/**/*.ts","node_modules/cypress"]
```

## Cypress找不到chrome浏览器解决办法

**步骤**

- 可以运行npx cypress info 来查看可识别到的本地安装的浏览器
  > 因为cypress默认在C:/Program Files (x86)/Google/Chrome/Application/chrome.exe路径下找chrome，而我本机chrome不是在这个路径
- 创建链接，使用管理员身份打开cmd 执行命令
- mkdir "C:\Program Files (x86)\Google\Chrome\Application"
- 然后再执行 mklink "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" source_file，source_file是本机chrome的安装目录

## Cypress的相关用法

### 1、cy.contains() 和cy.get()

**例如 cy.contains('button', '添加线段').click()，详解：**

- cy.contains(): 这个命令用于查找包含特定文本的 DOM 元素。它会在页面上找到任何包含指定文本内容的元素，并返回该元素的引用。
- 'button': 第一个参数 'button' 指定了要查找的元素类型。在这个例子中，它表示查找所有标签。
- '添加线段': 第二个参数 '添加线段' 是文本内容，用于过滤出包含该文本的元素。Cypress 会查找页面上所有按钮，找到其中文本内容为 "添加线段" 的按钮。
- .click(): 这个命令会模拟用户点击该元素，也就是点击文本为 "添加线段" 的按钮。

**例如cy.get('.button').click();**

- 作用：cy.get() 用于选择页面上的 DOM 元素。它接受一个选择器（CSS 选择器），并返回匹配该选择器的所有元素。
- 选择方式：你可以使用任何合法的 CSS 选择器来选择元素，例如类名、ID、标签名、属性等。
- 适用场景：适用于你已知元素的结构或类名、ID，或者你需要通过某种 CSS 选择器来获取元素

### 2、cy.visit()

- 用途：用于访问一个指定的 URL，加载页面。
- 示例:

```js
cy.visit('https://example.com');
cy.visit('/path/to/your/page');  // 相对路径
```

### 3、cy.url()

- 用途：获取当前页面的 URL 或断言 URL。
- 示例:

```js
cy.url().should('include', '/login');  // 验证 URL 中是否包含 '/login'
```

### 4、cy.type()

- 用途：模拟用户在输入框中的输入。
- 示例:

```js
cy.get('input[name="username"]').type('testuser');  // 在输入框中输入 'testuser'
```

### 5、cy.clear()

- 清除输入框中的内容
- 示例:

```js
cy.get('input[name="username"]').clear();  // 清除输入框中的文本
```

### 6、cy.should()

- 对元素或行为进行断言，验证元素的状态或行
- 常见断言类型：
  - cy.should('be.visible'): 验证元素是否可见
  - cy.should('exist'): 验证元素是否存在
  - cy.should('have.class', 'active'): 验证元素是否有特定类
  - cy.should('have.text', 'Hello'): 验证元素的文本内容
  
- 示例:

```js
cy.get('.header').should('be.visible');  // 验证 `.header` 元素可见
cy.get('.btn').should('have.text', '提交');  // 验证按钮文本为 '提交'
```

### 7、cy.window()

- 访问浏览器的 window 对象，适用于获取应用中的 JavaScript 全局对象
- 示例:

```js
cy.window().should('have.property', 'app');
```

### 8、cy.within()

- 用法概述
  - 作用：将后续的 Cypress 命令限制在某个特定的父元素范围内。它通常与 cy.get() 配合使用，确保只在某个元素内部查找并操作子元素。
  - 常见场景：例如在表单中查找特定的输入框、在一个列表项中查找按钮，或者在某个区域内查找多个元素时，避免查找全局范围的元素

- 示例:

```js
cy.get('#login-form').within(() => {
  cy.get('input[name="username"]').type('testuser');  // 在表单内输入用户名
  cy.get('input[name="password"]').type('password');  // 在表单内输入密码
  cy.get('button[type="submit"]').click();  // 在表单内点击提交按钮
});
```