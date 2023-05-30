

 const animal = [{
    type: "כלבים",
    Subtype: "מעורב",
    age: 3,
    genus: "זכר",
    purpose: "מכירה",
    price: 700,
    residence: "מודיעין",
    Contacts: [{ name: "hgec", tel: "054-6313325" }]

}]

 const vehicle = [{
    type: "פרטי",
    manufacturer: "asdd",
    model: "c3",
    yearOfManufacturer: 2013,
    color: "אדום",
    yad: 3,
    km: 3000,
    licenseNumber: "0122334345",
    licenseGrade: "A",
    price: 7000,
    residence: "מודיעין",
    Contacts: [{ name: "hgec", tel: "054-6313325" }]
}]

 const realEstate = [{

}]

 const generalProduct = [{

}]

 const user = [{
name:"yaakov",
email:"gyaakov2000@gmail.com",
password:"1234",
products:[{
    refModel:"animals",idProduct:"6472fed4b05d67d90685e04e"
},{
    refModel:"vehicles",idProduct:"6472ffba67b5654e9adc2f01"
}]
}]


module.exports={animal,vehicle,realEstate,generalProduct,user}