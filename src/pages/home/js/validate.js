import { form } from './DOM';

const isChecked = checkbox => checkbox.checked

export default async () => new Promise((resolve, reject) =>
  form.productName.value.length > 0 &&
  form.productUnits.value.length > 0 &&
  form.productWeight.value.length > 0 &&
  [...form.productCategory].filter(isChecked).length > 0 ?
  (resolve('Validate success!'), document.querySelector('.product').classList.remove('validate-error')) :
  (reject('Validate failed. Try again'), document.querySelector('.product').classList.add('validate-error'))
)
