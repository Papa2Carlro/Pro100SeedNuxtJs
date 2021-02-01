export default async function ({store, redirect, app}) {
  const products = await store.getters['product/getProducts']

  if (products.length === 0) {
    const shopping = await app.$cookies.get('shopping') || []

    if (shopping.length === 0) {
      return redirect('/shop')
    }
  }
}
