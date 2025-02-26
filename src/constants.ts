const PRODUCTS_API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${
    import.meta.env.VITE_SHEET_ID
}/values/Hoja1?key=${import.meta.env.VITE_SHEET_API_KEY}`

export { PRODUCTS_API_URL }
