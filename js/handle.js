export function handleOpenHome (){
    const home = document.querySelector(".home");
    home.addEventListener('click',  () => {
        window.location.href = "../html/product.html"
    });
}
export function handleOpenCart (){
    const openCart = document.querySelector(".icon_cart ")
    openCart.addEventListener('click', () => {
        window.location.href = "../html/cart.html"
    });
}
export function handleOpenBills (){
    const openBill = document.querySelector(".bills ")
    openBill.addEventListener('click', () => {
        window.location.href = "../html/bill.html"
    });
}
export function handleBack (){
    const goBack = document.querySelector(".back");
    goBack.addEventListener('click', function(){
        window.location.href="../html/product.html"
    })
}

