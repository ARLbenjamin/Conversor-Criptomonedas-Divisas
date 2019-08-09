class API{
constructor(apiKey){
    this.apiKey= apiKey;
}
//optener la informacion de las monedas
async optenerMonedas(){
    //creando URL
 const url= `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${this.apiKey}`;
    
   //extrayendo datos de la URL
 const URLApi= await fetch(url);

 const URLApiJson= await URLApi.json();
 console.log(URLApiJson);
 return{

    URLApiJson

 }
}

}