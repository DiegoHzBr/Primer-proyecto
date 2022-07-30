
// funcion getData hace el llamado al JSON y contiene el resultado de la tabla
function getData(){

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
        };
        
        // en el apartado del fetch depende de donde tenga el JSON, en el caso de que lo tenga en otro servidor, cambiar la referencia
        fetch("http://localhost:3000/data", requestOptions)  
        .then(response => response.json())
        .then(result => tableStation(result[0]))
        .catch(error => console.log('error', error));
    }
    
    // funcion tableStation, es donde recorro JSON y creo la tabla con los datos que requiero
    function tableStation(stations) {
    
        //array filtrando datos a traves de la id_estacion
        const arraynew = 
        
        stations
        .map((el, ind, elnew) => {
          const existences = elnew.filter(obj => obj.id_estacion === el.id_estacion);
          if (existences.length > 1) {
            const $el = Object.assign({}, el, {
                Temperatura_en: existences.map(obj => [obj.heladas__fecha,obj.heladas__minima])
            });
            return $el;
               
          }
        })
        .filter((el, ind, elnew) => el)
        .filter((el, ind, elnew) => (
          elnew.findIndex($el => $el.id_estacion === el.id_estacion) === ind
        ));
    
        console.log("2",arraynew);
    
    
        //array con los datos que quiero que aparescan en mi tabla
    
        const jsonTable2 = Object.values(arraynew.reduce((arr2, { id_estacion, nombre, sector, Temperatura_en}) => {
            if(!arr2[id_estacion]) arr2[id_estacion] = {id_estacion, nombre, sector, Temperatura_en};
            return arr2;
        }, {}))
        console.log("3",jsonTable2);

        // creacion de un nuevo array con los datos reordenados
        const result = [];
        for (var i = 0; i < jsonTable2.length; i++) {
            var js = new Object();
            js["id_estacion"] = jsonTable2[i].id_estacion;
            js["Nombre"] = jsonTable2[i].nombre;
            js["Comuna"] = jsonTable2[i].sector;
            js[`Temperatura en ${jsonTable2[i].Temperatura_en[0][0]}`] = jsonTable2[i].Temperatura_en[0][1];
            js[`Temperatura en ${jsonTable2[i].Temperatura_en[1][0]}`] = jsonTable2[i].Temperatura_en[1][1];
            result.push(js);
        }
    
        console.log(result)
    
    
        //codigo para generar la tabla
    
        var claves = [];
        for (var i = 0; i < result.length; i++) {
            for (var key in result[i]) {
                if (claves.indexOf(key) === -1) {
                    claves.push(key);
                }
            }
        }
    
        var table = document.createElement("table");
        var tr = table.insertRow(-1);                
    
        for (var i = 0; i < claves.length; i++) {
            var th = document.createElement("th");      
            th.innerHTML = claves[i];
            tr.appendChild(th);
        }
    
        for (var i = 0; i < result.length; i++) {
    
            tr = table.insertRow(-1);
    
            for (var j = 0; j < claves.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = result[i][claves[j]];
            }
        }
    
        var divShowData = document.getElementById('showData');
        divShowData.innerHTML = "";
        divShowData.appendChild(table);
        
        
    
    }