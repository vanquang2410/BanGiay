import { getById, removeAll, renderCart, totalPriceHandle } from "./cart.js";
import { keyLocalStorageItemCart, keyLocalStorageListSP, showAutoCloseAlert } from "./constant.js";
import { addUser, getLocal, saveLocal } from "./iife.js";
import { listData } from "./infomationProduct.js";


const listCart = getLocal(keyLocalStorageItemCart);
const listProduct=getLocal(keyLocalStorageListSP);
function val(){
  const firstName=document.getElementById("firstName").value;
  const lastName=document.getElementById("lastName").value
  const email = document.getElementById("email").value;
   const phone = document.getElementById("phone").value;
   const domProvince = document.getElementById("province")
   const domDistrict = document.getElementById("district")
   const domWard = document.getElementById("ward")
   const address = document.getElementById("address").value;
   const errors = {};
   clearErrors();
  if (!firstName) {
    errors.firstName = "Vui lòng nhập họ.";
  }else if (!isValidName(firstName)){
    errors.firstName = "Tên không có ký tự đặc biệt và số"
  }

  if (!lastName) {
    errors.lastName = "Vui lòng nhập tên.";
  }else if (!isValidName(lastName)){
    errors.lastName = "Tên không có ký tự đặc biệt và số"
  }

  if (!email) {
    errors.email = "Vui lòng nhập email.";
  } else if (!isValidEmail(email)) {
    errors.email = "Email không hợp lệ.";
  }

  if (!phone) {
    errors.phone = "Vui lòng nhập số điện thoại.";
  } else if (!isValidPhone(phone)){
    errors.phone = "số điện thoại phải bắt đầu bằng số 0 và có 10 số"
  }

  if (domProvince.selectedIndex === 0) {
    errors.province = "Vui lòng chọn thành phố.";
  }

  if (domDistrict.selectedIndex === 0) {
    errors.district = "Vui lòng chọn quận.";
  }

  if (domWard.selectedIndex === 0) {
    errors.ward = "Vui lòng chọn phường.";
  }
  if (!address) {
    errors.address = "Vui lòng nhập địa chỉ chi tiết.";
  }
  displayErrors(errors)
  console.log(errors);
  if (Object.keys(errors).length){
   let abc= false
    console.log(abc);
    return false
  }
  else {
    clearErrors();
   let abc=true
    console.log(abc);
    return true
  }
  
}
const form = document.getElementById("myform");
form.addEventListener("submit", function() {
  event.preventDefault();
  val()
  if(val()===true){
    updateProductsStock();
    saveData();
    
    
  }
 
});
function clearErrors() {
  const errorSpans = document.getElementsByClassName("error");
  for (const errorSpan of errorSpans) {
    errorSpan.textContent = "";
  }
}
function displayErrors(errors) {
  for (const field in errors) {
    const errorSpan = document.getElementById(`${field}Error`);
    if (errorSpan) {
      errorSpan.textContent = errors[field];
    }
  }
}
function isValidPhone(phone) {
  const phoneRegex = /^0\d{9}$/;
  return phoneRegex.test(phone);
}


function isValidName(name) {
  const nameRegex =  /^[\p{L}\s']+$/u;
  return nameRegex.test(name);
}

function isValidEmail(email) {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
}
function RandomId(length) {
  let id = "";

  const charset = "abcdefghijklmnopqrstuvwxyz0123456789";
  const randomIndex = Math.floor(Math.random() * charset.length);
  const firstRandomChar = charset[randomIndex];

  id += firstRandomChar;

  if (length === 1) {
      return id;
  }

  const remainingLength = length - 1;
  const remainingChars = RandomId(remainingLength);
  id += remainingChars;

  return id;
}
function saveData(){
  const firstName=document.getElementById("firstName").value;
  const lastName=document.getElementById('lastName').value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const domProvince = document.getElementById("province")
  const domDistrict = document.getElementById("district")
  const domWard = document.getElementById("ward")
  const province =  domProvince.options[domProvince.selectedIndex].text
  const district =  domDistrict.options[domDistrict.selectedIndex].text
  const ward =   domWard.options[domWard.selectedIndex].text
  const address = document.getElementById("address").value;
  const message = document.getElementById("message").value;
  const today = new Date().toLocaleDateString();
  const fullAddress = `${address} , ${ward} , ${district} ,${province}`
  const fullName = `${firstName} ${lastName}`
  const ListProducts = getById(listCart,listProduct)
  
  const orderInfo={
    idBill:RandomId(10),
    date:today,
    fullName:fullName,
    email:email,
    phone:phone,
    address:fullAddress,
    message:message,
    product:ListProducts,
    totalPrice: totalPriceHandle(ListProducts)
  }
  ListProducts.map(item=>{
    delete item.quantity;
  })
  
  
  event.preventDefault();
  removeAll();
  handleSaveOderInfo();
  addUser(orderInfo);
}                  
function handleSaveOderInfo (){
  showAutoCloseAlert("Mua hàng thành công", 1000)
  const dialog = document.querySelector(".dialog");
  dialog.close();
  
}
function updateProductsStock() {
  for (let i = 0; i < listCart.length; i++) {
    const cartItem = listCart[i];
    const product = listProduct.find((item) => item.id === cartItem.id);
    if (product) {
      for(let j=0 ; j<listProduct.length;j++){
        if(listProduct[j].id===cartItem.id){
          listProduct[j].quantity-=cartItem.count;
          console.log(listProduct[j]);
          saveLocal(keyLocalStorageListSP, listProduct);
        }
      }
    }
  } 
}
