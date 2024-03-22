import { defineClientConfig } from 'vuepress/client'

export default defineClientConfig({
  enhance({ router }) {
    router.afterEach((to, from) => {
        if (to.path == '/' && from.path != '/') {
            router.go(0);
        }
    })
  },
})
