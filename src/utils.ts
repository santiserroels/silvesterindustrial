import clsx from 'clsx'
import { ClassValue } from 'clsx'
import { xxHash32 } from 'js-xxhash'
import { twMerge } from 'tailwind-merge'

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

const cn = (...input: Array<ClassValue>) => twMerge(clsx(input))

const getImageId = (url: string) => url.split('/d/').at(1)?.split('/').at(0) || null

export { hashData, formatMoney, priceToNumber, cn, getImageId }
