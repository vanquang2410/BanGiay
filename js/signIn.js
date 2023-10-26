const emailLogin = document.querySelector('.sign-in-container .email-login')
const passwordLogin= document.querySelector('.sign-in-container .password-login')
const nameRegister = document.querySelector('.sign-up-container .name-register')
const emailRegister = document.querySelector('.sign-up-container .email-register')
const passwordRegister= document.querySelector('.sign-up-container .password-register')
const clickSignIn = document.querySelector('.sign-in-container button')
const clickSignUp = document.querySelector('.sign-up-container button')
const buttonSignUp = document.querySelector('.overlay-container #signUp')
const buttonSignIn = document.querySelector(' #signIn')
const formLogin = document.querySelector('.sign-in-container')
const formRegister= document.querySelector('.sign-up-container')
const container = document.getElementById('container');






function clickButtonSignUp(){
    buttonSignUp.addEventListener('click',()=>{
        container.classList.add('right-panel-active');
    })
  }
  function clickButtonSignIn(){
    buttonSignIn.addEventListener('click',()=>{
        container.classList.remove('right-panel-active')
    })
}
 function signIn() {
    clickSignIn.addEventListener('click',async()=>{
        try {
            let emailValue = emailLogin.value
            let passwordValue = passwordLogin.value
            console.log(emailValue,passwordValue);
            const res = await fetch('http://localhost:4000/api/auth/login',{
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  method: "POST",
                  body: JSON.stringify({
                    email:emailValue,
                    password:passwordValue
                  })
            })
            const resultJson =await res.json()
            console.log(resultJson);
            // if(resultJson.message){
            //     alert(`${resultJson.message}`)
            // }
            
            if(resultJson.Accesstoken){
                alert('Đăng nhập thành công')
                localStorage.setItem('accessToken',resultJson.Accesstoken)
                window.location.href='../html/product.html'
            }
           
        } catch (error) {
            alert(error)
        }
       
        
    })
}

 function singUp(){
    clickSignUp.addEventListener('click',async()=>{
        try {
            
            let nameValue = nameRegister.value
            let emailValue= emailRegister.value
            let passwordvalue=passwordRegister.value
            console.log(nameValue,emailValue,passwordvalue);
            const res = await fetch('http://localhost:4000/api/auth/register',{
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                      method: "POST",
                      body: JSON.stringify({
                        name:nameValue,
                        email:emailValue,
                        password:passwordvalue
                      })
                })
                const resJson = await res.json()
                if(resJson.complete==true){
                    alert('đăng kí tài khoản thành công')
                    nameRegister.value=''
                    emailRegister.value=''
                    passwordvalue.value=''
                }
                if(resJson.message){
                    alert(res.message)
                }
        } catch (error) {
            
        }
       
    })
 }

clickButtonSignIn()
clickButtonSignUp()
signIn()
singUp()
