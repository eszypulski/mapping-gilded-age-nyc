// function for purecss top bar
(function (window, document) {
    var menu = document.getElementById('menu'),
        rollback,
        WINDOW_CHANGE_EVENT = ('onorientationchange' in window) ? 'orientationchange' : 'resize';

    function toggleHorizontal() {
        menu.classList.remove('closing');
        [].forEach.call(
            document.getElementById('menu').querySelectorAll('.custom-can-transform'),
            function (el) {
                el.classList.toggle('pure-menu-horizontal');
            }
        );
    };

    function toggleMenu() {
        // set timeout so that the panel has a chance to roll up
        // before the menu switches states
        if (menu.classList.contains('open')) {
            menu.classList.add('closing');
            rollBack = setTimeout(toggleHorizontal, 500);
        }
        else {
            if (menu.classList.contains('closing')) {
                clearTimeout(rollBack);
            } else {
                toggleHorizontal();
            }
        }
        menu.classList.toggle('open');
        document.getElementById('toggle').classList.toggle('x');
    };

    function closeMenu() {
        if (menu.classList.contains('open')) {
            toggleMenu();
        }
    }

    document.getElementById('toggle').addEventListener('click', function (e) {
        toggleMenu();
        e.preventDefault();
    });

    window.addEventListener(WINDOW_CHANGE_EVENT, closeMenu);
})(this, this.document);


// Adjusting the map height

function adjustMapHeight() {
    var windowWidth = window.innerWidth || document.documentElement.clientWidth;

    // threshold where the height changes
    var thresholdWidth = 568; // Same value as "sm" in pure css

    // Check if the window width is narrower than the threshold
    if (windowWidth < thresholdWidth) {
        //  div height for narrow screens
        document.getElementById('map').style.height = '120px';
    } else {
        // div height for larger screens
        document.getElementById('map').style.height = '100vh';
    }
}

//////////////////////////Map!/////////////////////////////////////

// Create a new Leaflet map
let Map;
Map = L.map("map");
//Add tile layer - watercolor maps
L.tileLayer('https://watercolormaps.collection.cooperhewitt.org/tile/watercolor/{z}/{x}/{y}.jpg', {
    maxZoom: 16,
    minZoom: 13,
    attribution: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.'
}).addTo(Map);



//Set starting location of the map

Map.setView([40.7566, -73.9806], 13);


// Add map data
L.geoJSON(mapData, {
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.nickname + "</br>" + feature.properties.sourcetext);
        layer.on('click', function () {
            let infoBlock = document.getElementById('info-block-source');
            infoBlock.innerHTML = feature.properties.author + "\'s New York";
            let infoBlockTitle = document.getElementById('info-block-title');
            infoBlockTitle.innerHTML = feature.properties.nickname + ", <i>" + feature.properties.sourcetext + "</i>";
            let infoBlockLoc = document.getElementById('info-block-loc');
            infoBlockLoc.innerHTML = feature.properties.address;
            let descriptionBlock = document.getElementById('description-block');
            descriptionBlock.innerHTML = "<p>" + feature.properties.description + "</p>";
            let quote = document.getElementById('quote');
            quote.innerHTML = feature.properties.quote || '';
            let quoteCitationBlock = document.getElementById('quote-citation-block');
            quoteCitationBlock.innerHTML = "<i>" + feature.properties.sourcetext + "</i>, " + feature.properties.year;

            /*let image = document.getElementById('image');
            if (image == null) {
                image.innerHTML = ""}
                else { image.innerHTML = "<img src='images/" + feature.properties.image + "' alt='" + feature.properties.imagealt + "'>" || '';}*/


            /*let image = document.getElementById('image');
            if (image !== null) {
            image.innerHTML = "<img src='images/" + feature.properties.image + "' alt='" + feature.properties.imagealt + "'>";}
            else {image.innerHTML =" ";}*/

            let image = document.getElementById('image');
            if (image !== null) {
            image.innerHTML = "<img src='images/" + feature.properties.image + "' alt='" + feature.properties.imagealt + "'>" || "";}

          
     
            
        });
    }
}).addTo(Map);

// Set bounds for the map
let southWest = L.latLng(40.6894, -74.037);
let northEast = L.latLng(40.8325, -73.9153);
let bounds = L.latLngBounds(southWest, northEast);

Map.setMaxBounds(bounds);
Map.on('drag', function () {
    Map.panInsideBounds(bounds, { animate: false })
});

/*
   // Assuming mapData is defined in map-data.js
        var geojsonData = mapData;

        // Create a GeoJSON layer
        var geojsonLayer = L.geoJSON(geojsonData, {
            onEachFeature: function (feature, layer) {
                // Bind a popup with the author's name to each marker
                layer.bindPopup(feature.properties.author);

                // Add a click event to update the content of the info-block-source div
                layer.on('click', function () {
                    var infoBlock = document.getElementById('info-block-source');
                    infoBlock.innerHTML = "Author: " + feature.properties.author;
                });
            }
        }).addTo(map);

*/



//Set marker style


//Set behavior when a marker is clicked
Map.on('click', function (e) {
    let currentMarker = e.latlng;
    // Zoom and pan to location
    Map.flyTo(currentMarker, 16);

}

);



// Pan to


// Pop Up -- should only display the title and source


// Call the other information into the left div




// Initial adjustment on page load
adjustMapHeight();

// Attach the function to the window resize event
window.addEventListener('resize', adjustMapHeight);



