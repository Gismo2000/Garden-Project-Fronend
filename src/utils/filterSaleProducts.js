const filterSaleProducts = (item) => {
    return item.filter(el => el.discont_price != null)
}
export default filterSaleProducts
