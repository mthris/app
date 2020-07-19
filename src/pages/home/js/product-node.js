import products from './all-products.js';

export default next => {
  const productCategoryItem = document.createElement('div')
  const productCategoryItemId = productCategoryItem.setAttribute('data-id', next.id)
  const productCategoryItemClass = productCategoryItem.classList.add('product-category-item')

  const productCategoryItemLeft = document.createElement('div')
  const productCategoryItemLeftClass = productCategoryItemLeft.classList.add('product-category-item__left')

  const prependItems = productCategoryItem.append(productCategoryItemLeft)

  const productCategoryText = document.createElement('p')
  const productCategoryTextClass = productCategoryText.classList.add('product-category-text')
  const productCategoryTextNode = document.createTextNode(`${next.productName}`)

  const appendProductCategoryTextNode = productCategoryText.append(productCategoryTextNode)
  const appendProductCategoryText = productCategoryItemLeft.append(productCategoryText)

  const numberProductItem = document.createElement('span')
  const numberProductItemClass = numberProductItem.classList.add('number-product-item')
  const numberProductItemTextNode = document.createTextNode(`x${next.productUnits}`)

  const appendNumberProductItemTextNode = numberProductItem.append(numberProductItemTextNode)
  const appendNumberProductItem = productCategoryItemLeft.append(numberProductItem)

  const productItemOption = document.createElement('div')
  const productItemOptionClass = productItemOption.classList.add('product-item-option')
  const appendProductItemOption = productCategoryItem.append(productItemOption)

  const productItemWeight = document.createElement('span')
  const productItemWeightClass = productItemWeight.classList.add('product-item-weight')
  const productItemWeightTextNode = document.createTextNode(`${next.productWeight}kg`)

  const appendProductItemWeightTextNode = productItemWeight.append(productItemWeightTextNode)
  const appendItemWeight = productItemOption.append(productItemWeight)

  const productItemEdit = document.createElement('span')
  const productItemEditClass = productItemEdit.classList.add('product-item-edit')
  const appendItemEdit = productItemOption.append(productItemEdit)

  const productItemRemove = document.createElement('span')
  const productItemRemoveClass = productItemRemove.classList.add('product-item-remove')
  const appendProductItemRemove = productItemOption.append(productItemRemove)

  return productCategoryItem;
}
