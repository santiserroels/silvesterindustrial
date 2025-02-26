import { xxHash32 } from 'js-xxhash'

const hashData = (text: string) => {
    return xxHash32(text).toString(16).padStart(8, '0')
}

const formatMoney = (amount: number) => {
    const currency = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        currencyDisplay: 'narrowSymbol',
    })

    return currency.format(amount)
}

const priceToNumber = (price: string) => Number(price.replace(/[^0-9.-]+/g, ''))

export { hashData, formatMoney, priceToNumber }
