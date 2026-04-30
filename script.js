document.addEventListener("DOMContentLoaded", function () {

    let latitudes = [4.7110];
    let longitudes = [-74.0721];
    let nombres = ["Bogotá"];

    Plotly.newPlot("mi-mapa", [{
        type: "scattermapbox",
        mode: "markers",
        lat: latitudes,
        lon: longitudes,
        text: nombres,
        marker: {
            size: 12,
            color: "blue"
        }
    }], {
        mapbox: {
            style: "open-street-map",
            center: {
                lat: 4.7110,
                lon: -74.0721
            },
            zoom: 12
        },
        margin: {t:0,b:0,l:0,r:0}
    });

    const mapa = document.getElementById("mi-mapa");

    mapa.on('plotly_afterplot', function () {

        const mapboxCanvas = mapa.querySelector(".mapboxgl-canvas");

        mapboxCanvas.addEventListener("click", function(e){

            const graphDiv = document.getElementById("mi-mapa");

            const internalMap = graphDiv._fullLayout.mapbox._subplot.map;

            const rect = mapboxCanvas.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const lngLat = internalMap.unproject([x, y]);

            latitudes.push(lngLat.lat);
            longitudes.push(lngLat.lng);
            nombres.push("Nuevo Pin");

            Plotly.restyle("mi-mapa", {
                lat: [latitudes],
                lon: [longitudes],
                text: [nombres]
            });

        });

    });

});