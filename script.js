// function for purecss top bar
(function (window, document) {
    var menu = document.getElementById('menu'),
        rollback,
        WINDOW_CHANGE_EVENT = ('onorientationchange' in window) ? 'orientationchange':'resize';

    function toggleHorizontal() {
        menu.classList.remove('closing');
        [].forEach.call(
            document.getElementById('menu').querySelectorAll('.custom-can-transform'),
            function(el){
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


//Set starting location of the map


//Set starting zoom of the map


//Set marker style


//Set behavior when a marker is clicked

    // Pan to


    // Pop Up -- should only display the title and source


    // Call the other information into the left div


//Add tile layer - watercolor maps
L.tileLayer('https://watercolormaps.collection.cooperhewitt.org/tile/watercolor/{z}/{x}/{y}.jpg', {
        maxZoom: 19,
        attribution: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.'
}).addTo(Map);

Map.setView([40.7128, -74.0060], 16);
    
    
    // Initial adjustment on page load
    adjustMapHeight();

    // Attach the function to the window resize event
    window.addEventListener('resize', adjustMapHeight);



