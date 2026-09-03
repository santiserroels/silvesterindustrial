import { createQueryKeys } from '@lukemorales/query-key-factory'

const productsKeys = createQueryKeys('products', {
    list: null,
})

export default productsKeys
