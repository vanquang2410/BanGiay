export const getLocal=(name)=>{
    const data= JSON.parse(localStorage.getItem(name))
    return data
}
export const saveLocal=(name,value)=>{
    localStorage.setItem(name,JSON.stringify(value))
}
export const getProvine= async ()=>{
    try{
        const res=await fetch("https://provinces.open-api.vn/api/")
        const data =res.json();
        return data; 
    }
    catch(error){
        console.log(error.massage);
    }
}
export const getDistrict=async(id)=>{
    try{
        const res=await fetch(`https://provinces.open-api.vn/api/p/${id}?depth=2`)
        const data =res.json();
        return data; 
    }
    catch(error){
        console.log(error.massage);
    }
}
export const getWard=async(id)=>{
    try{
        const res=await fetch(`https://provinces.open-api.vn/api/d/${id}?depth=2`)
        const data =res.json();
        return data; 
    }
    catch(error){
        console.log(error.massage);
    }
}
export const addUser= (product)=>{
    fetch("http://localhost:3000/user",{
      method:"POST",
      headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
      },
      body:JSON.stringify(product)
  })
  .then(res=>res.json())
  .then(data=>{
  
  })
  .catch((error) => {
    console.error("Đã xảy ra lỗi:", error);
    throw error;
  });
  }
  export const deleteUser=(id)=>{
    fetch(`http://localhost:3000/user/${id}`,{
        method:"DELETE",
        
    })
    .catch((error) => {
        console.error("Đã xảy ra lỗi:", error);
        throw error;
      });
  }
  export const getUser= async(id)=>{
    const res= await fetch(`http://localhost:3000/user/?${id}`);
    const data= res.json();
    return data
  }
  export const logout = ()=>{
    const logout=document.querySelector('svg')
    logout.addEventListener('click',()=>{
        document.location.href='../html/signIn.html'
    })
  }