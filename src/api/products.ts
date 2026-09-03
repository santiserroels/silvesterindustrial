import axios from 'axios'
import { PRODUCTS_API_URL } from '../constants'
import { getImageId, hashData } from '../utils'

const fetchProducts = async (): Promise<Product[]> => {
    const response: FileResponse = await axios.get(PRODUCTS_API_URL).then((res) => res.data)

    response.values.shift()

    return response.values.reduce((accum, current) => {
        accum.push({
            image_id: getImageId(current[0]),
            sku: current[1],
            name: current[2],
            description: current[3],
            price: current[4],
            hash: hashData(current[2]),
            stock: current[5] === 'TRUE',
            category: current[6],
        })

        return accum
    }, [] as Product[])
}

export { fetchProducts }
