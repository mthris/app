import products from './all-products';

const findProduct = (target, product) => product.id === parseFloat(target.getAttribute('data-id'))

const handlerProductName = e => {
  const currentProductNode = [...document.querySelectorAll('.product-category-item')].find(node => node.classList.contains('product-category-item--active'))
  const currentProduct = products().find(findProduct.bind(null, currentProductNode))

  const isBackspace = e.keyCode === 8 ? products().map(product => product.id === currentProduct.id ? product.productName = product.productName.slice(0, product.productName.length - 1) : false) : false
  const isLetters = e.keyCode !== 8 && e.keyCode !== 16 && e.keyCode !== 13 && e.keyCode !== 9 && e.keyCode !== 17 && e.keyCode !== 20 && e.keyCode !== 18 ? products().map(product => product.id === currentProduct.id ? product.productName += e.key : false) : false

  const updateClientProductName = currentProductNode.firstElementChild.firstElementChild.textContent = products().find(product => product.id === currentProduct.id).productName
  const updateProductStorage = localStorage.setItem('products', JSON.stringify(products()))
}

const attachProductNameKeyDown = e => e.currentTarget.classList.contains('product-category-item--active') ? window.addEventListener('keydown', handlerProductName) : window.removeEventListener('keydown', handlerProductName)
const productItemClass = node => node.classList.remove('product-category-item--active')

const handlerProductCategoryClass = e => {
  const hideActive = e.target.className !== 'product-item-edit' ? [...document.querySelectorAll('.product-category-item')].map(productItemClass) : false;
  return e.target.className !== 'product-item-edit' ? window.removeEventListener('keydown', handlerProductName) : false
}

const removeProductCategoryClass = window.addEventListener('click', handlerProductCategoryClass)
const removeProductItemEdit = () => [...document.querySelectorAll('.product-category-item')].map(productItemClass)

const getProductItemEdit = e => e.target.className === 'product-item-edit' ? e.currentTarget.classList.add('product-category-item--active') : false


const composition = (removeProductItemEdit, getProductItemEdit, attachProductNameKeyDown) => e => attachProductNameKeyDown(e, getProductItemEdit(e, removeProductItemEdit()))
const compose = composition(removeProductItemEdit, getProductItemEdit, attachProductNameKeyDown)
const productEdit = e => compose(e)

export default editIcon => editIcon.addEventListener('click', productEdit)
