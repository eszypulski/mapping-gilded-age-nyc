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

// Adjust the title text size
function adjustTitleSize() {
    // Get the width of the window
    let windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    // Set the threshold width
    let thresholdWidth = 568; // Same width as declared in purecss
    
    // Set the font size for window widths below the threshold
    let smallFontSize = 15; // Size when the window is < 568
    
    // Get the element with the ID 'gilded-title'
    let gildedTitle = document.getElementById('gilded-title');
    
    // Check the window width and apply the font size
    if (windowWidth < thresholdWidth) {
        gildedTitle.style.fontSize = smallFontSize + 'px';
    } else {
        // Use the normal font size if the window isn't so small
        gildedTitle.style.fontSize = '';
    }
}

window.addEventListener('resize', adjustTitleSize);
window.addEventListener('load', adjustTitleSize);


   


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

//add icons

let iconMapping = {
 "The House of Mirth": "houseofmirth.png",
 "The Age of Innocence": "ageofinnocence.png",
 "How the Other Half Lives": "jacobriis.png",
 "The Custom of the Country": "customofthecountry.png"
};

// function to make icon mapping work - get the icon for the feature based on sourcetext
function getMarkerIcon(feature) {
    let sourcetext = feature.properties.sourcetext;
    if (iconMapping.hasOwnProperty(sourcetext)) {
        let iconURL = 'images/' + iconMapping[sourcetext];
        return L.icon ({
            iconUrl: iconURL,
            iconSize: [33, 43],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]

        });
    } else {
        //return the default icon if not
        return L.Icon.Default();
    }
    }
        
// Add map data
L.geoJSON(mapData, {
    pointToLayer: function (feature, latlng) {
        var markerIcon = getMarkerIcon(feature);
        return L.marker(latlng, { icon: markerIcon });
    },
    onEachFeature: function (feature, layer) {
        
        layer.bindPopup("<em>"+feature.properties.sourcetext + "</em>: </br>" + feature.properties.nickname);
        
        layer.on('click', function (e) {
            let mapMarker = e.latlng;
            // Zoom and pan to location
            Map.flyTo(mapMarker, 14);
        
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
                else { image.innerHTML = "<img src='images/" + feature.properties.image + "' class alt='" + feature.properties.imagealt + "'>" || '';}*/


            /*let image = document.getElementById('image');
            if (image !== null) {
            image.innerHTML = "<img src='images/" + feature.properties.image + "' alt='" + feature.properties.imagealt + "'>";}
            else {image.innerHTML =" ";}*/

            let image = document.getElementById('image');
            if (image !== null) {
            image.innerHTML = "<img src='images/" + feature.properties.image + "' class= 'map-image' alt='" + feature.properties.imagealt + "'>" || "";}

            let imageCaption = document.getElementById('image-caption');
            imageCaption.innerHTML = feature.properties.imagecaption || '';

          
     
            
        })
        
        ;
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




//Set marker style


//Set behavior when a marker is clicked
Map.on('click', function (e) {
    let currentMarker = e.latlng;
    // Zoom and pan to location
    Map.flyTo(currentMarker, 14);

}

);



// Pan to


// Pop Up -- should only display the title and source


// Call the other information into the left div


function adjustMapHeight() {
    let windowWidth = window.innerWidth || document.documentElement.clientWidth;
    let mapFill = document.getElementById('map');
  

    if (windowWidth < 768) {
        // Set height to the correct size for narrow screens
        mapFill.style.height = '250px';


    } else {
        // Set height to full window height for larger screens
        mapFill.style.height = '100vh';
      
    }
}

// Call the function when the window is resized
window.addEventListener('resize', adjustMapHeight);

// Call the function on page load
window.addEventListener('load', adjustMapHeight);


// Assuming 'Map' is your Leaflet map object

// Create a custom control
var legendControl = L.control({ position: 'topright' });

// Define the content for the legend
legendControl.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'legend'); // 'legend' is a CSS class for styling

    // Add legend content here:
    div.innerHTML += '<b>Wharton sites:</b></br><img src="images/whartonkey.png">';
    div.innerHTML += '</br><b>Riis sites:</b></br><img src="images/whartonkey2.png">';
    
    return div;
};

// Add the control to the map
legendControl.addTo(Map);


