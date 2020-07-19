import { form, productCategoryWrapper } from './DOM';
import validate from './validate';
import products from './all-products';
import createProduct from './product-node';
import resetForm from './reset-form';
import productRemove from './product-remove';
import productEdit from './product-edit';
import updateProductsStats from './product-stats';

const prevent = e => e.preventDefault();

const increment = current => {
  let id = current ? current : 0
  return () => ++id
}

const itemId = increment();

const isChecked = checkbox => checkbox.checked
const isCheckboxValue = checkbox => checkbox.value

const saveProductClient = async (promise, { productName, productUnits, productWeight, productCategory, productCategoryWrapper }) => {
  const successValidate = await promise;
  const items = [...productCategory].filter(isChecked);

  const nextId = itemId();

  return [...items].map(() => products({
    productName: productName.value,
    productUnits: productUnits.value,
    productWeight: productWeight.value,
    categories: [...productCategory].filter(isChecked).map(isCheckboxValue),
    itemId: nextId
  }))

  return promise;
}

const saveProductStorage = async promise => {
  const successValidate = await promise
  const save = localStorage.setItem('products', JSON.stringify(products()))
  return promise;
}

const addProduct = async (promise, { productCategoryWrapper }) =>{
  const successValidate = await promise

  const lastItemId = [...products()].slice(-1)[0].itemId
  const lastProducts = [...products()].filter(product => product.itemId === lastItemId);
  const productsCategories = [...lastProducts[0].categories]

  const currentCategories = [...productCategoryWrapper].filter(current => [...productsCategories].find(category => current.getAttribute('data-category') === category))
  const append = [...currentCategories].map((category, i) => category.lastElementChild.append(createProduct(lastProducts[i])))

  const updateStats = updateProductsStats();
  const attachClickRemoveEvent = [...document.querySelectorAll('.product-item-remove')].map(productRemove)
  const attachClickProductEvent = [...document.querySelectorAll('.product-category-item')].map(productEdit)
}

const composition = (prevent, validate, saveProductClient, saveProductStorage, addProduct, resetForm) => nodes => e =>
resetForm(addProduct(saveProductStorage(saveProductClient(validate(prevent(e)), nodes)), nodes), nodes)

const compose = composition(prevent, validate, saveProductClient, saveProductStorage, addProduct, resetForm);
const curryNodes = compose({ ...form, productCategoryWrapper })

const newProduct = e => curryNodes(e)
const attachClickListener = form.btnSubmit.addEventListener('click', newProduct)
