import { getDistrict, getProvine, getWard } from "./iife.js";

const renderProvineSelect=async()=>{
    const provincesSelect = document.getElementById('province');
    const provinces = await getProvine();
    let options = '<option value="">-- Chọn tỉnh --</option>';
    provinces.forEach((province) => {
        options += `<option value="${province.code}">${province.name}</option>`;
    });
    provincesSelect.innerHTML = options;
}
renderProvineSelect();


 const renderDistrictSelect= async(provinceCode)=>{
    const districtSelect=document.getElementById('district');
    const district= await getDistrict(provinceCode);
    
    let options = '<option value="">-- Chọn huyện --</option>';
    
    district.districts.forEach((district) => {
        options += `<option value="${district.code}">${district.name}</option>`;
    });
    
    districtSelect.innerHTML = options;
}

const handleGetIDprovinces =async ()=>{
    const provincesSelect = document.getElementById('province');
    provincesSelect.addEventListener('change',  (event) => {
        const provinceCode = event.target.value;
         renderDistrictSelect(provinceCode);
         const wardsSelect = document.getElementById('ward');
         wardsSelect.innerHTML = '<option value="">-- Chọn xã --</option>';
    });
}
handleGetIDprovinces()
const renderWardSelect= async(districtCode)=>{
    const wardsSelect = document.getElementById('ward');
    const wards = await getWard(districtCode);
    let options = '<option value="">-- Chọn xã --</option>';

    wards.wards.forEach((ward) => {
        options += `<option value="${ward.code}">${ward.name}</option>`;
    });

    wardsSelect.innerHTML = options;
}
const handleGetIDDistrict=()=>{
    const districtsSelect = document.getElementById('district');
    districtsSelect.addEventListener('change',(event)=>{
        const districtCode=event.target.value;
        renderWardSelect(districtCode);
    })
}
handleGetIDDistrict();