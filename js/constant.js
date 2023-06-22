export const keyLocalStorageListSP = "DANHSACHSP"
export const keyLocalStorageItemCart = "DANHSACHITEMCART"
export function renderCountProduct(arr) {
    const numberCart = document.querySelector(".number_cart")
    numberCart.innerHTML = arr.length
}
export function showAutoCloseAlert(message, duration) {
    const alertContainer = document.createElement('div')
    alertContainer.textContent = message
    alertContainer.classList.add('alert-container')
    document.body.appendChild(alertContainer)
  
    setTimeout(() => {
      alertContainer.remove()
    }, duration)
    }