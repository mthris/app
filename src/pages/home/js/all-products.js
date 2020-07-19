const getProducts = () => {
  let products = []
  let id = 0;
  return (data, type) =>
    typeof data === 'object' ? (products.push({ id, ...data}), id++) :
    typeof data === 'undefined' ? products :
    typeof data === 'string' ? products = products.filter(product => product.id !== type) : false
}
export default getProducts()
