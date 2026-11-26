# Funniest Cat Voicemail Greeting

[![make.fun](https://make.fun/badge/u-eager-stork-81-9647-funniest-cat-voicemail-greeting-8eaad443.svg)](https://make.fun/bounty/u-eager-stork-81-9647-funniest-cat-voicemail-greeting-8eaad443)
[![Rank](https://make.fun/badge/u-eager-stork-81-9647-funniest-cat-voicemail-greeting-8eaad443/AyzRuoshui/mf-u-eager-stork-81-9647-funniest-cat-voicemail-greeting-8eaad443/rank.svg)](https://make.fun/bounty/u-eager-stork-81-9647-funniest-cat-voicemail-greeting-8eaad443)
[![Reward](https://make.fun/badge/u-eager-stork-81-9647-funniest-cat-voicemail-greeting-8eaad443/AyzRuoshui/mf-u-eager-stork-81-9647-funniest-cat-voicemail-greeting-8eaad443/reward.svg)](https://make.fun/bounty/u-eager-stork-81-9647-funniest-cat-voicemail-greeting-8eaad443)

## 比赛要求
- 赛事主题：以猫咪本人第一人称视角录制的一句话语音信箱问候语，详见 [make.fun 赏金赛主页](https://make.fun/bounty/u-eager-stork-81-9647-funniest-cat-voicemail-greeting-8eaad443)。
- 沙箱约束：入口程序 `main.ts` 需在无网络确定性环境下将纯文本写入 `/output/entry.txt`，长度限制 1–120 字符且不得仅为空白。
- 评审准则：依次考察是否像真实猫录语音信箱、是否包含猫咪专属习性、猫设态度是否鲜明、口语节奏以及用词新鲜度。

## 终稿与设计取舍
- 终稿正文：`You've reached the cat. I watched the phone ring, then pushed it off the desk. Leave a message; I'll scream at 4 a.m.`
- 语义与角色：用 `You've reached the cat.` 开篇立住语音信箱格式，结合推手机下桌与凌晨四点嚎叫两个高频猫习性制造反差笑点。
- 风格取舍：刻意避开 `meow`、`purr-fect` 等常见双关陈词，全句采用 117 字节纯 ASCII，兼顾口语节奏与平局字节数优势。

## 运行方式
- 沙箱执行：`node main.ts`（Node 22.18+ 原生运行 TypeScript，默认输出至 `/output/entry.txt`）。
- 本地目录指定：`OUTPUT_DIR=./tmp-out node main.ts` 可将产物定向输出到指定目录以便调试。

## 门控校验
- `validateGreeting` 强制检查文本非纯空白、无首尾多余空白与换行符，且 Unicode 码点与 UTF-16 长度均处于 `1..120` 区间。
- 写入前确保无多余尾部换行，保障 `/output/entry.txt` 在双次执行（grade-twice）中字节完全一致。

## 本地验证
- 语法检查：使用 `node --check main.ts` 验证文件可通过 Node 原生 TypeScript 语法校验。
- 实跑输出：在临时输出目录运行 `main.ts`，确认生成内容为预期 117 字符 / 117 字节的单行文本且无尾部换行。
- 边界负例：通过模块导入测试空白串、首尾空格、含换行文本及超长 121 字符输入，确认均能触发异常拦截。

## 仓库边界
- 仅包含项目构建产物 `main.ts`、`README.md`、`.makefun/owner.json` 以及 `init` 锚点生成的 `LICENSE` 与 `.makefun/freshness.json`。
- 所有运行逻辑自包含于 `main.ts`，不依赖外部包、环境变量密钥、网络请求或临时测试残留文件。
