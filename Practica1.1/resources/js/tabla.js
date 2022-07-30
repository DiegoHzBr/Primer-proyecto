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
    
    // funcion tableStation, es donde recorro JSON y creo la tabla con los datos tal cual vienen del JSON
    function tableStation(stations) {
    
        console.log(stations);
    
        // ciclo for que genera la tabla
        var col = [];
        for (var i = 0; i < stations.length; i++) {
            for (var key in stations[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }
    
        var table = document.createElement("table");
        var tr = table.insertRow(-1);                
    
        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      
            th.innerHTML = col[i];
            tr.appendChild(th);
        }
    
        for (var i = 0; i < stations.length; i++) {
    
            tr = table.insertRow(-1);
    
            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = stations[i][col[j]];
            }
        }
    
        var divShowData = document.getElementById('showData');
        divShowData.innerHTML = "";
        divShowData.appendChild(table);
    }