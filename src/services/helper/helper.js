const data = require('npm-nationality-list')


function getCountry() {
   const countryList= data.getList().map(item=>{
        return {
            value:item.nationality,
            label:item.nationality
        }
    })
return countryList
}
export default getCountry