import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";
import { resolve } from "path";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
    title: "Overflow",
    description: "猫猫式 mirai 实现于 Onebot 11",
    base: "/",
    lang: "zh-CN",
    locales: {
        "/": {
            lang: "zh-CN",
        },
    },
    markdown: {
        lineNumbers: true,
    },
    theme: hopeTheme({
        favicon: "/assets/images/favicon-32x32.png",
        logo: "/assets/images/favicon-32x32.png",
        sidebar: "structure",
        navbar: [
            {
                text: "用户手册",
                link: "/docs/",
            },
            {
                text: "开发文档",
                link: "/docs/dev/",
            },
            {
                text: "部署教程",
                link: "https://wiki.mrxiaom.top/overflow",
            }
        ],
        print: false,
        pure: true,
        repo: "MrXiaoM/Overflow",
        docsDir: "",
        plugins: {
            activeHeaderLinks: false,
            nprogress: true,
        },
        lastUpdated: true,
        breadcrumb: false,
        pageInfo: false,
        nextLink: true,
        prevLink: true,
    }),
    plugins: [
    ],
    bundler: viteBundler({
        viteOptions: {
            resolve: {
                alias: {
                    "@": resolve(__dirname, "docs"),
                },
            },
        },
        vuePluginOptions: {},
    }),
});
