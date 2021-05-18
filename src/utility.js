function cashBackRate(cashback) {
    const cashBack = Number(cashback)
    if (cashBack >= 0 && cashBack < 5) {
        return '50%'

    } else if (cashBack >= 5 && cashBack < 10) {
        return '40%'
    }
    else if (cashBack >= 10 && cashBack < 15) {
        return '30%'
    }
    else {
        return '20%'
    }
}

module.exports = { cashBackRate }