import products from './all-products';
import updateProductsStats from './product-stats';

const removeClientProduct = e => {
  const removedProductId = parseFloat(e.target.parentNode.parentNode.getAttribute('data-id'))
  const removeClientProduct = products('remove', removedProductId)

  const remove = e.target.parentNode.parentNode.remove()
  const updateStats = updateProductsStats()
}

const updateStorageProduct = () => localStorage.setItem('products', JSON.stringify(products()))

const composition = (removeClientProduct, updateStorageProduct) => e => updateStorageProduct(removeClientProduct(e))
const compose = composition(removeClientProduct, updateStorageProduct)
const productRemove = e => compose(e);

export default removeIcon => removeIcon.addEventListener('click', productRemove)
