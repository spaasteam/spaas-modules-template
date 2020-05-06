/**
 * Created by levy on 2018/7/10.
 */
import META from '@/const/meta'

interface ValueObject {
  htmlTitle?: string | undefined
  favicon?: string | undefined
  href?: string
}

export default function({ store, app }) {
  // if (process.server) return

  if (!store.state.meta.appName) {
    store.commit('update', {
      meta: META
    })

    const meta: ValueObject = store.state.meta
    const head: any = app.head
    const headLinks: any[] = head.link
    let link: ValueObject = {
      href: ''
    }

    // 为了支持IE。。。
    for (let i = 0; i < headLinks.length; i++) {
      if (headLinks[i].rel === 'icon') {
        link = headLinks[i]
        break
      }
    }

    head.title = meta.htmlTitle
    link.href = meta.favicon
  }
}
