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
 
   return{
  
      URLApiJson
  
   }
  }

  async optenerValor(moneda, criptoMoneda){
  const url=`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}&api_key=${this.apiKey}`
  
  //consultar los datos de la url
  const urlDatos= await fetch(url);
  
  const resultado= await urlDatos.json();

  return{
    resultado
  }

}
  
  }

const  app= new API('a32dcaa207242664a0f8ed2a46b97660eb8d2e8b4dbb623e96fdfa8e351d5e5d');
app.optenerMonedas();

class Interfaz {                                                                                           
  constructor(){
    this.init();
  }
  init(){
    this.cripMonedasItz();
  }
    cripMonedasItz(){
      let htmlCr= '<option value="" disabled selected>Elige Criptomoneda</option>';
    app.optenerMonedas()
    .then(monedas =>{
     for(const[key, value] of Object.entries(monedas.URLApiJson.Data)){
       htmlCr += `<option value= "${value.Symbol}">${value.CoinName}</option>`
     }
     
    document.querySelector('#criptomoneda').innerHTML=htmlCr;

    })
    }

    mostrarMensaje(mensaje, clase) {
        const div = document.createElement('div');
        div.className = clase;
        div.appendChild(document.createTextNode(mensaje));
        const divMensaje= document.querySelector('.mensajes');
        divMensaje.appendChild(div); 
       setTimeout(() => {
         document.querySelector('.mensajes div').remove();
       }, 3000);

      
    }
       //mostrar resultados
    mostrarResultado(resultado, moneda, criptoM){
    
    const resultadoAnterior= document.querySelector('#resultado > div')
    
    if(resultadoAnterior){
      resultadoAnterior.remove();
    }

     const infoMoneda= resultado[criptoM][moneda];
     console.log(infoMoneda);

    let precio= infoMoneda.PRICE.toFixed(4);
    let variacion= infoMoneda.CHANGEPCTDAY.toFixed(3);
    let actualizado= new Date(infoMoneda.LASTUPDATE*1000).toLocaleDateString('es-CO');
     
    //construir el template
    let templateHTML= `
    <div class="crad bg-warning">
      <div class="card-body text-light">
      <h2 class="card-title">Resultado:</h2>
      <p>El Precio de ${infoMoneda.FROMSYMBOL} a Moneda ${infoMoneda.TOSYMBOL}: ${precio} </p>
      <p>Variación en el Último día: ${variacion}%</p>
      <p>Su Ultima Actualización Fue: ${actualizado}</p>
      </div>
    </div>
    `;
    
    this.mostrarOcultarSpinner('block');
    setTimeout(()=>{

    document.querySelector('#resultado').innerHTML= templateHTML;
    this.mostrarOcultarSpinner('none');
    }, 3000)
     //insertar el resultado
   
    }

    //mostrar spiner de carga
    mostrarOcultarSpinner(vista){

    const spinner= document.querySelector('.contenido-spinner');
    spinner.style.display= vista;

    }
}

const UI = new Interfaz();

const moneda= document.querySelector('#moneda');
const criptoM= document.querySelector('#criptomoneda');

//leemos el formulario
const formulario= document.querySelector('#formulario');

formulario.addEventListener('submit', (e)=>{
e.preventDefault();

const monedaSelect= moneda.options[moneda.selectedIndex].value;

const cripMonedaSelect= criptoM.options[criptoM.selectedIndex].value;


if(monedaSelect=== '' || cripMonedaSelect=== ''){
   //Alerta de valores no seleccionados
   UI.mostrarMensaje('Ambos campos son obligatorios', 'alert bg-danger text-center');

}else{
  //los valores fueron seleccionados
 
 app.optenerValor(monedaSelect, cripMonedaSelect).then(data=>{
  UI.mostrarResultado(data.resultado.RAW, monedaSelect, cripMonedaSelect)
 })
}
})
