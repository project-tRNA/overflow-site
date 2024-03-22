import { defineClientConfig } from 'vuepress/client'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    router.afterEach((to, from) => {
        if (to.path == "/") {
            router.go(0);
        }
    })
  },
})
