import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../../api'
import productsKeys from './products.keys'

const useProducts = () => {
    return useQuery({ ...productsKeys.list, queryFn: fetchProducts })
}

export default useProducts
