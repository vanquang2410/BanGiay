import { keyLocalStorageItemCart, keyLocalStorageListSP } from "./constant.js";
import { handleBack, handleOpenCart, handleOpenHome } from "./handle.js";
import { deleteUser, getLocal, getUser, saveLocal, logout } from "./iife.js";

const listProduct=getLocal(keyLocalStorageListSP);
handleBack();
handleOpenCart();
handleOpenHome();
logout()
const getBill=async()=>{
    const listData= await getUser();
    console.log(listData);
    const render = document.getElementById("render_bill");
    const htmls=listData.map(item=>{
        return `
        <td class="table_th_code">${item.idBill} <div class="detail"  data-id=${item.idBill} > Detail </div> </td>
            <td class="table_th_customer">${item.fullName}</td>
            <td class="table_th_date">${item.date}</td>
            <td class="table_th_item">${item.product.length}</td>
            <td class="table_th_quantity">1</td>
            <td class="table_th_price">$${item.totalPrice}</td>
            <td class="table_th_return"><i class="fa-solid fa-circle-minus remove " data-id=${item.id}  ></i> </td>
            </tr>
        `
    })
    render.innerHTML=htmls
    clickDetail();
    removeBill()
}
getBill();
const detail_Bill =  async (idBill) => {
    const bill = await getUser(idBill)
    const listData = []

    bill[0].product.forEach(element => {
        listData.push(element)
    });
    const domDialog = document.querySelector(".render_bill")
    function renderDetailBill  (datas) {
        return  `   <div class="product_element"> 
        <img src="${datas.img}" alt="" class="img_product">
        <div class="info_product">
            <span class="name_product">
            ${datas.name}
            </span>
            <span class="count_product">
                $${datas.price}
            </span>
            <span class="price_product">
                Quantity: ${datas.count}
            </span>
        </div>
    </div> `
    }
    domDialog.innerHTML = listData.map(renderDetailBill).join('')
}
const clickDetail =()=>{
    const domDetail = document.querySelectorAll(".detail")
    domDetail.forEach(item=>{
        item.addEventListener('click',function(event){
            const idBill= event.target.dataset.id;
            detail_Bill(idBill)
            const dialog = document.querySelector(".dialog_detail_bill");
            dialog.showModal();
            const closeDetail=document.querySelector(".close_dialog");
            closeDetail.addEventListener('click',function(){            
            dialog.close();
         })
        })
    }) 
    
}
function removeBill(){
    const domBill = document.querySelectorAll(".remove");
    domBill.forEach(item=>{
        item.addEventListener('click',(event)=>{
            const billID=event.target.dataset.id;
            const result=confirm('ban co muon xoa bo hoa don nay');
           
          
            if(result){
                updateProductsStockReturnBill(billID);
                deleteUser(billID); 
            }
            else {

            }
             getBill()
        })
    })
}
const updateProductsStockReturnBill = async (billID) => {
    const bill = await getUser(billID);
    const listData=[];
    bill.map(item=>{
        item.product.map(item=>{
            listData.push(item)
        })
    })

    console.log(listData);
    for (let i=0 ; i<listData.length;i++){
        const cartItem=listData[i];
        const product = listProduct.find((item) => item.id === cartItem.id);
        if (product){
            for(let j=0 ; j<listProduct.length;j++){
              if(listProduct[j].id===cartItem.id){
                 listProduct[j].quantity+=cartItem.count;
                  saveLocal(keyLocalStorageListSP, listProduct);
                 }
            }
        }
    }

  }
