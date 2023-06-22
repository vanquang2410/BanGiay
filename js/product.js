import { keyLocalStorageItemCart, keyLocalStorageListSP, renderCountProduct, showAutoCloseAlert } from "./constant.js";
import { handleOpenBills, handleOpenCart, handleOpenHome } from "./handle.js";
import { getLocal, saveLocal } from "./iife.js";
import { listData } from "./infomationProduct.js";

let newListProduct=[]
if (getLocal(keyLocalStorageListSP)){
    newListProduct=getLocal(keyLocalStorageListSP)
}
else {
    saveLocal(keyLocalStorageListSP,listData);
}
handleOpenHome();
handleOpenCart(); 
handleOpenBills();
function checkQuantityInStock(productId) {
    const product = newListProduct.find(item => item.id === productId);
    if (product && product.quantity > 0) {
        return true;
    }
    return false;
}
function checkQuantityProduct(number, id) {
 
    for (let i = 0; i < newListProduct.length; i++) {
        if (newListProduct[i].id === id && newListProduct[i].quantity > number) {
            return true
        } 
        
    }
}
export const renderProduct=()=>{
    const listDatas=getLocal(keyLocalStorageListSP)
    let renderItem = document.querySelector(".render-product");
    const htmls=listDatas.map(item=>{
        return `
        <div class="box">
        <div class="box_img_custom">
        <img class="box_img"
            src="${item.img}"
            alt="">
            <i class="fa-solid fa-circle"></i>
            <i class="material-icons add_cart" valueID=${item.id} >&#xe854;</i>

    </div>
    <div class="img_info">
        <p class="name">${item.name}</p>
        <div>
            <span class="price">$ ${item.price}</span>
            <span class="quantity">Quantity: ${item.quantity}</span>

        </div>

    </div>
    </div>
        `
    })
    
    renderItem.innerHTML=htmls.join('');
}
renderProduct();
const add_cart=document.querySelectorAll(".add_cart");
add_cart.forEach((item,index)=>{
    item.addEventListener("click",function(e){
        const id =index+1;
        let cart=[];
        if (getLocal(keyLocalStorageItemCart)){
            cart=getLocal(keyLocalStorageItemCart);
        }
        else {
            cart=[]
        }
        let productId = id
        let productCount = 1
        let productPrice
        newListProduct.map(item=>{
            if (item.id===id){
                productPrice=item.price
            }
        })
        let product={
            id:productId,
            count:productCount,
            price:productPrice
        }
        if (checkQuantityInStock(id)) {
            let checkExist = false
        for (let j = 0; j < cart.length; j++) {
            if (cart[j].id === productId) {
                checkExist = true;
                productCount += cart[j].count
                if (checkQuantityProduct(cart[j].count, productId)) {
                    cart[j].count = productCount
                    showAutoCloseAlert("thêm sản phẩm thành công  ", 450)
                    break;
                } else {
                    showAutoCloseAlert("hết sản phẩm trong kho ", 450)
                }
            }
        } if (!checkExist) {
            cart.push(product)
            showAutoCloseAlert("thêm sản phẩm thành công  ", 450)
        }
 
        } else {
   
            showAutoCloseAlert("Sản phẩm  đã hết hàng", 450);
        }
        saveLocal(keyLocalStorageItemCart,cart);
        renderCountProduct(getLocal(keyLocalStorageItemCart));
    })
   
})
 renderCountProduct(getLocal(keyLocalStorageItemCart))