import { form } from './DOM';

const removeInputs = input => input.value = ''
const removeCheckbox = checkbox => checkbox.checked = false

export default async (promise, { productName, productUnits, productWeight, productCategory }) => {
  const successValidate = await promise
  const checkbox = [productName, productUnits, productWeight].map(removeInputs);
  return [...productCategory].map(removeCheckbox)
}
