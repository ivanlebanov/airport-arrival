import store from '@/store'
import router from '@/router'
export default async function auth({ next, router }) {
  try {
    let token = await store.dispatch('user/checkToken')
    if(!token.isAdmin) {
      return router.push({ name: 'Home' })
    }
    return next()
  } catch (e) {
    console.log(e)
    return router.push({ name: 'Home' })
  }
}
