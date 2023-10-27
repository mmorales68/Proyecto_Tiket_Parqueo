function validacionTiket(){
    const expresion = /^\d{7}$/;
    var numTiket = document.getElementById("numTiket").value;
    
    if(expresion.test(numTiket)&&numTiket>0){
        document.getElementById('lbresultadoTiket').innerHTML="Tiket aceptada";
        document.getElementById('numTiket').style.backgroundColor="green";
    }else{
        document.getElementById('lbresultadoTiket').innerHTML="Ingrese un numero de tiket valido";
        document.getElementById('numTiket').style.backgroundColor="red";
    }
}

function calulo_pago(minutos){
    var i=minutos/60;
    var entero=Math.floor(i);
    var decimal=i%1;
    var saldo=(entero*10);

    if(minutos>15 && decimal>0){
        saldo=saldo+7;
    }
    return(saldo);
}



function estadia(){
    var minutos = document.getElementById("estadia").value;
    
    var efectivo=0;
    try{efectivo=document.getElementById('monto_efectivo').value}catch{}
    var cambio=efectivo-(calulo_pago(minutos));
    var pago=document.getElementById('pago').value;
    
    if(!(minutos>0)){
        document.getElementById('lbestadia').innerHTML="Ingrese la cantidad de minutos";
        document.getElementById('total_pago').innerHTML="<h1>Total a Pagar: Q 0.0 </h4>";
        document.getElementById("estadia").style.backgroundColor="red";
    }else{
        document.getElementById('lbestadia').innerHTML="Minutos "+minutos;
        document.getElementById('total_pago').innerHTML="<h1>Total a Pagar: Q "+calulo_pago(minutos)+".00</h4>";
        document.getElementById("estadia").style.backgroundColor="green";
    }

   if(pago=="Efectivo"){
    document.getElementById('cambio_efectivo').innerHTML="<H5>El cambio es: Q "+cambio+".00</H>";
   }

}

function tipo_pago(){
    var pago=document.getElementById('pago').value;
    if(pago=="Efectivo"){
        document.getElementById('lbtipo_pago').innerHTML="Ingrese la cantidad de efectivo";
        document.getElementById('tarjeta-efectivo').innerHTML='<div class="imputNum"><br><input type="number" oninput="pagoEfectivo()" placeholder="Ingrese el efectivo" id="monto_efectivo"></div><p>Ingrese la suma del efectivo para pagar</p>'
    }else{
        document.getElementById('lbtipo_pago').innerHTML="Ingrese un numero de tarjeta valido";
        document.getElementById('tarjeta-efectivo').innerHTML='<div class="imputNum"><br><input type="number" oninput="validacionTarjeta()" placeholder="Ingrese el numero de tarjeta" id="numero_tarjeta"></div><p>Ingrese un numero de tarjeta valido para pagar</p>'
        document.getElementById('cambio_efectivo').innerHTML="";
    }
}

function validacionTarjeta(){
    var tarjeta=document.getElementById('numero_tarjeta').value;
    if(tarjeta=='09092314463'||tarjeta=='0909232734'){
        document.getElementById('lbtipo_pago').innerHTML="Tarjeta aceptada";
        document.getElementById('numero_tarjeta').style.backgroundColor="green";
    }else{document.getElementById('lbtipo_pago').innerHTML="Ingrese un numero de tarjeta valido";
    document.getElementById('numero_tarjeta').style.backgroundColor="red";
    }
}

function pagoEfectivo(){
 var efectivo=document.getElementById('monto_efectivo').value;
 var minutos = document.getElementById("estadia").value;
 var cambio=efectivo-(calulo_pago(minutos));

 document.getElementById('cambio_efectivo').innerHTML="<H5>El cambio es: Q "+cambio+".00</H>";
    
    if(cambio<0&&cambio!=0){
        document.getElementById('lbtipo_pago').innerHTML="El efectivo es insuficiente para cancelar el saldo";
        document.getElementById('monto_efectivo').style.backgroundColor="red";
    }else{
        document.getElementById('lbtipo_pago').innerHTML="Ya cuenta con suficiente efectivo para realizar el pago";
        document.getElementById('monto_efectivo').style.backgroundColor="green";
    }
}

function pagar(){
    const expresion = /^\d{7}$/;
    var numTiket = document.getElementById("numTiket").value;
    var minutos = document.getElementById("estadia").value;
    var tiket=expresion.test(numTiket)&&numTiket>0;
    

    if(tiket&&minutos>0){               /**  Si hay Tiket y minutos */
        if(calulo_pago(minutos)>0){     /*Si hay saldo por pagar*/
        var tipo_pago=document.getElementById('pago').value;
        if(tipo_pago==''){              /*Si no se ha seleccionado el metodo de pago */
            alert("Seleccione un metodo de pago para continuar")
        }else{                          /*Si ya se selecciono el metodo de pago */            
            if(tipo_pago=="Efectivo"){  /*Cuando se paga en efectivo*/
                var efectivo=document.getElementById('monto_efectivo').value;
                if(efectivo>0){         /*Cuando se ha ingresado efectivo */
                    var cambio=efectivo-(calulo_pago(minutos));
                    if(cambio<0&&cambio!=0){    /*efectivo insuficiente */
                        alert("El efectivo es insuficiente para cancelar el saldo");
                    }else{                      /*efectivo suficiente */
                        alert("Pago realizado con exito");
                        location.reload();
                    }
                }else{                  /*Cuando no se ha Ingressdo efectivo */
                    alert("Ingrese un monto valido de efectivo");
                }          
            }else{                      /*Cuando se paga con tarjeta*/
                var tarjeta=document.getElementById('numero_tarjeta').value;
                if(tarjeta=='09092314463'||tarjeta=='0909232734'){
                    alert("Pago realizado con exito");
                    location.reload();
                }else{
                    alert("El numero de tarjeta no es valido");
                }

            }

        }


        }else{                          /*Si no hay saldo por pagar*/
            alert("Proceso realizado con exito")
            location.reload();
        }
    }else{                              /*Si no hay tiket o minutoss */
        alert("Error: Revisar los datos e intentar nuevamente");
    }
  
}