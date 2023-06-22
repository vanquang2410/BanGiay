import { keyLocalStorageItemCart, keyLocalStorageListSP, renderCountProduct, showAutoCloseAlert } from "./constant.js";
import { handleBack, handleOpenBills, handleOpenCart } from "./handle.js";
import { getLocal, saveLocal } from "./iife.js";


const listCart = getLocal(keyLocalStorageItemCart);
const listProduct = getLocal(keyLocalStorageListSP);


console.log(listCart);
handleOpenBills();
handleOpenCart();
handleBack()
export function getById(listCart, listProduct) {
    let newListCart = []
    let newProduct
    for (let i = 0; i < listProduct.length; i++) {
        for (let j = 0; j < listCart.length; j++) {
            if (listCart[j].id === listProduct[i].id) {
                newProduct = {
                    id: listProduct[i].id, name: listProduct[i].name, img: listProduct[i].img,
                    quantity: listProduct[i].quantity, price: listProduct[i].price, count: listCart[j].count
                }
                newListCart.push(newProduct)
            }
        }
    }
    return newListCart
}


export function renderCart(){
    let tableListProduct = document.querySelector(".tableListProduct")
    
    let render = document.getElementById("render")
    function renderListCart(datas) {
        return `<tr class="tr_table" >
                <td class="table_td_name"> <img class="product_img"
                        src="${datas.img}"
                        alt="">
                    <span class="info_product">
                        <p class="product_name"> ${datas.name}</p>
                        <p class="product_quantity" > Quantity: ${datas.quantity} </p>
                    </span>
                </td>
                <td class="table_th_quantity text_quantity" data-id=${datas.id} > <i class="fa-solid fa-minus "   ></i> <span> ${datas.count} </span> <i
                        class="fa-solid fa-plus"  ></i> </td>
                <td class="table_th_sub">$${datas.price}</td>
                <td class="table_th_total ">$${datas.price * datas.count}</td>
                <td class="table_th_clear"  > <i class="fa-solid fa-circle-minus " data-id=${datas.id}  ></i> </td>
            </tr>`
    }
    if (listCart.length!==0){
        render.innerHTML=getById(listCart,listProduct).map(renderListCart).join('')
        console.log(getById(listCart,listProduct));
    }
    else {
        tableListProduct.innerHTML=`<img class="empty_cart" src="https://bwmachinery.com.au/wp-content/uploads/2019/07/your-cart-is-empty.png">`
    }
    noneButton();
    plusProduct();
    minusProduct();
    clearCart();
}
renderCart()

function plusProduct(){
    const plusProductId = document.querySelectorAll(".fa-plus");
    plusProductId.forEach(item=>{
        item.addEventListener('click',function(){
            const productId = Number (event.target.parentElement.dataset.id);
            let indexProduct=listProduct.findIndex((product)=>{
                return product.id===productId;
            })
            console.log(indexProduct);
            for (let i=0 ; i <listCart.length;i++){
                if (listCart[i].id  === productId && listCart[i].count < listProduct[indexProduct].quantity) {
                    listCart[i].count++
                    renderCart()
                    saveLocal(keyLocalStorageItemCart,listCart)
                   
                }
                if (listCart[i].id === productId && listCart[i].count === listProduct[indexProduct].quantity) {
                    showAutoCloseAlert("số lượng sản phẩm trong kho đã đến giới hạn ", 450)
                }
                  
            }
           renderTotal()
        })
    })
}
renderCountProduct(getLocal(keyLocalStorageItemCart))
function noneButton (){
    const buttonBuy = document.querySelector(".buy")
    if (listCart.length === 0) {
        buttonBuy.style.display = "none"
    }
}
function minusProduct(){
    const minusProductID=document.querySelectorAll(".fa-minus");
    minusProductID.forEach(item=>{
        item.addEventListener('click',function(){
            const productId = Number (event.target.parentElement.dataset.id);
            let indexProduct=listProduct.findIndex((product)=>{
                return product.id===productId;
            })
            console.log(indexProduct);
            for (let i=0 ; i <listCart.length;i++){
                if (listCart[i].id  === productId && listCart[i].count >=1) {
                    listCart[i].count--
                    renderCart()
                    saveLocal(keyLocalStorageItemCart,listCart)
                   
                }
                if (listCart[i].id === productId && listCart[i].count<1) {
                    const result=confirm("ban co muon xoa bo san pham nay");
                    if(result){
                        removeProduct(productId);
                    }
                }
                  
            }
           renderTotal()
        })
    })
}
renderTotal()
export function clearCart(){
    const findIdProduct = document.querySelectorAll(".fa-circle-minus")
    findIdProduct.forEach(item=>{
        item.addEventListener('click',function(event){
           const productID=Number(event.target.dataset.id);
           console.log(productID);
           const result=confirm('bạn có thực sự muốn xóa sản phẩm này ra khỏi giỏ hàng')
           if(result){
            removeProduct(productID);
           
           }
        })
    })
}
export function totalPriceHandle(arr) {
    const totalPrice = arr.reduce((total, item) => {
        return total + item.count * item.price;
    },0)
    return totalPrice
}
export function renderTotal() {
    let totalPrice = document.querySelector(".total")
    let total = totalPriceHandle(getById(listCart, listProduct))
    if (total != 0) {
        totalPrice.innerHTML = `Total: $${total} `
    } else {
        totalPrice.innerHTML = ""
    }
}

export function removeProduct(id){
    for (let i=0; i<listCart.length;i++){
        if (listCart[i].id===id){
            listCart.splice(i,1);
        }
    }
    saveLocal(keyLocalStorageItemCart,listCart);
    renderTotal();
    let tableListProduct = document.querySelector(".tableListProduct")
    if (listCart.length === 0) {
        tableListProduct.innerHTML = `<img class="empty_cart" src="https://bwmachinery.com.au/wp-content/uploads/2019/07/your-cart-is-empty.png"> `
    }
    renderCart()
}
function close(){
    const close=document.querySelector('.close')
    close.addEventListener('click',function(){
        const dialog=document.querySelector('.dialog');
        dialog.close();
    })
}
close()
function buy(){
   const buy=document.querySelector('.buy')
   
   buy.addEventListener('click',function(){
    const dialog= document.querySelector('.dialog');
    dialog.showModal();
   })
}
buy()

export function removeAll() {
    listCart.splice(0, listCart.length)
    saveLocal(keyLocalStorageItemCart, listCart)
    renderCart()
    renderTotal()
    renderCountProduct(getLocal(keyLocalStorageItemCart))
   
}