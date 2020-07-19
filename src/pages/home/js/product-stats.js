import { productCategoryWrapper, shopCartInfo } from './DOM';

const updateCategory = category => {
  const length = category.lastElementChild.children.length
  const update = category.firstElementChild.lastElementChild.textContent = `${length}/${length}`
}

const updateTotalCategory = ({ productCategoryWrapper }) => [...productCategoryWrapper].map(updateCategory)

const totalNumber = (prev, next) => prev + next

const currentUnits = item => parseFloat(item.firstElementChild.lastElementChild.textContent.slice(1, item.firstElementChild.lastElementChild.textContent.length))
const unitsChildren = category => [...category.lastElementChild.children].map(currentUnits).reduce(totalNumber)

const currentWeight = item => parseFloat(item.lastElementChild.firstElementChild.textContent.slice(0, item.lastElementChild.firstElementChild.textContent.length - 2))
const weightChildren = category => [...category.lastElementChild.children].map(currentWeight).reduce(totalNumber)

const activeCategory = category => [...category.lastElementChild.children].length > 0

const updateTotalProducts = ({ shopCartInfo, productCategoryWrapper }) => {
  const currentCategory = [...productCategoryWrapper].filter(activeCategory)

  const totalUnits = [...currentCategory].map(unitsChildren).reduce(totalNumber, 0)
  const totalWeight = [...currentCategory].map(weightChildren).reduce(totalNumber, 0)

  const units = shopCartInfo.firstElementChild.textContent = `Sztuk: ${totalUnits}`
  const weight = shopCartInfo.lastElementChild.textContent = `Waga: ${totalWeight}kg`
}

const composition = (updateTotalCategory, updateTotalProducts) => nodes => updateTotalProducts(nodes, updateTotalCategory(nodes))
const compose = composition(updateTotalCategory, updateTotalProducts)

export default () => compose({ productCategoryWrapper, shopCartInfo })
