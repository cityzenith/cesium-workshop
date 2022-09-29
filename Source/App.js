(function () {
    "use strict";

    // TODO: Add your ion access token from cesium.com/ion/
    // Cesium.Ion.defaultAccessToken = '<YOUR ACCESS TOKEN HERE>';

    //////////////////////////////////////////////////////////////////////////
    // Creating the Viewer
    //////////////////////////////////////////////////////////////////////////

    var viewer = new Cesium.Viewer('cesiumContainer', {
        scene3DOnly: true,
        selectionIndicator: false,
        baseLayerPicker: false
    });

    //////////////////////////////////////////////////////////////////////////
    // Loading Imagery
    //////////////////////////////////////////////////////////////////////////

    // Remove default base layer
    //viewer.imageryLayers.remove(viewer.imageryLayers.get(0));

    // Add Sentinel-2 imagery
    //viewer.imageryLayers.addImageryProvider(new Cesium.IonImageryProvider({ assetId: 3954 }));

    //////////////////////////////////////////////////////////////////////////
    // Loading Terrain
    //////////////////////////////////////////////////////////////////////////

    // Load Cesium World Terrain
   /* viewer.terrainProvider = Cesium.createWorldTerrain({
        requestWaterMask : true, // required for water effects
        requestVertexNormals : true // required for terrain lighting
    });
    // Enable depth testing so things behind the terrain disappear.
    viewer.scene.globe.depthTestAgainstTerrain = true;*/

    //////////////////////////////////////////////////////////////////////////
    // Configuring the Scene
    //////////////////////////////////////////////////////////////////////////

    // Enable lighting based on sun/moon positions
    //viewer.scene.globe.enableLighting = true;

    // Create an initial camera view
    var initialPosition = new Cesium.Cartesian3.fromDegrees(144.962432, -37.814958, 140.3);
    var initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(7.1077496389876024807, -31.987223091598949054, 0.025883251314954971306);
    var homeCameraView = {
        destination : initialPosition,
        orientation : {
            heading : initialOrientation.heading,
            pitch : initialOrientation.pitch,
            roll : initialOrientation.roll
        }
    };
    // Set the initial view
    viewer.scene.camera.setView(homeCameraView);

    // Add some camera flight animation options
    homeCameraView.duration = 2.0;
    homeCameraView.maximumHeight = 2000;
    homeCameraView.pitchAdjustHeight = 2000;
    homeCameraView.endTransform = Cesium.Matrix4.IDENTITY;
    // Override the default home button
    viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function (e) {
        e.cancel = true;
        viewer.scene.camera.flyTo(homeCameraView);
    });

    // Set up clock and timeline.
   /* viewer.clock.shouldAnimate = true; // default
    viewer.clock.startTime = Cesium.JulianDate.fromIso8601("2017-07-11T16:00:00Z");
    viewer.clock.stopTime = Cesium.JulianDate.fromIso8601("2017-07-11T16:20:00Z");
    viewer.clock.currentTime = Cesium.JulianDate.fromIso8601("2017-07-11T16:00:00Z");
    viewer.clock.multiplier = 2; // sets a speedup
    viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER; // tick computation mode
    viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; // loop at the end
    viewer.timeline.zoomTo(viewer.clock.startTime, viewer.clock.stopTime); // set visible range */

    //////////////////////////////////////////////////////////////////////////
    // Loading and Styling Entity Data
    //////////////////////////////////////////////////////////////////////////

    /*var kmlOptions = {
        camera : viewer.scene.camera,
        canvas : viewer.scene.canvas,
        clampToGround : true
    };
    // Load geocache points of interest from a KML file
    // Data from : http://catalog.opendata.city/dataset/pediacities-nyc-neighborhoods/resource/91778048-3c58-449c-a3f9-365ed203e914
    var geocachePromise = Cesium.KmlDataSource.load('./Source/SampleData/sampleGeocacheLocations.kml', kmlOptions);

    // Add geocache billboard entities to scene and style them
    geocachePromise.then(function(dataSource) {
        // Add the new data as entities to the viewer
        viewer.dataSources.add(dataSource);

        // Get the array of entities
        var geocacheEntities = dataSource.entities.values;

        for (var i = 0; i < geocacheEntities.length; i++) {
            var entity = geocacheEntities[i];
            if (Cesium.defined(entity.billboard)) {
                // Adjust the vertical origin so pins sit on terrain
                entity.billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;
                // Disable the labels to reduce clutter
                entity.label = undefined;
                // Add distance display condition
                entity.billboard.distanceDisplayCondition = new Cesium.DistanceDisplayCondition(10.0, 20000.0);
                // Compute latitude and longitude in degrees
                var cartographicPosition = Cesium.Cartographic.fromCartesian(entity.position.getValue(Cesium.JulianDate.now()));
                var latitude = Cesium.Math.toDegrees(cartographicPosition.latitude);
                var longitude = Cesium.Math.toDegrees(cartographicPosition.longitude);
                // Modify description
                var description = '<table class="cesium-infoBox-defaultTable cesium-infoBox-defaultTable-lighter"><tbody>' +
                    '<tr><th>' + "Longitude" + '</th><td>' + longitude.toFixed(5) + '</td></tr>' +
                    '<tr><th>' + "Latitude" + '</th><td>' + latitude.toFixed(5) + '</td></tr>' +
                    '</tbody></table>';
                entity.description = description;
            }
        }
    }); */
    var geojsonOptions = {
        clampToGround : true
    };
  
    var promise = Cesium.GeoJsonDataSource.load('./Source/SampleData/Building_footprints_2020_Energy.geojson', geojsonOptions);
  
      
    //var neighborhoods;
    promise
    .then(function (dataSource) {
      viewer.dataSources.add(dataSource);

      //Get the array of entities
      const entities = dataSource.entities.values;

      const colorHash = {};
     // console.log("Height:"+ entities.length);
      for (let i = 0; i < entities.length; i++)
       {        
        const entity = entities[i];
        //const name = entity.properties.height;        
       const energy = entity.properties.total_2021;
       let color = colorHash[energy];
      
        if (!color) {            
           // alert("Height:"+ Height.height);
          // alert(i +"--Height:"+Height+" conndition:"+(Height > 10));
          if (energy >=23915.7 && energy <=34438.101563) {
            color = Cesium.Color.RED.withAlpha(0.7);
            colorHash[energy] = color;
        } else if (energy >=17200.3 && energy <=23915.599609)   {
            color = Cesium.Color.DARKSEAGREEN.withAlpha(0.9);
            colorHash[energy] = color;               
        } else if (energy >=10626 && energy <=17200.000000)   {
            color = Cesium.Color.DARKCYAN.withAlpha(0.9);
            colorHash[energy] = color;               
        }else if (energy >=5889 && energy <=10625.900391)   {
            color = Cesium.Color.GREENYELLOW.withAlpha(0.9);
            colorHash[energy] = color;               
        } else if (energy >=3570 && energy <=5888.720215)   {
            color = Cesium.Color.AQUAMARINE.withAlpha(0.9);
            colorHash[energy] = color;               
        } else if (energy >=2041.5 && energy <=3569.399902)   {
            color = Cesium.Color.GOLD.withAlpha(0.9);
            colorHash[energy] = color;               
        } else if (energy >=980 && energy <=2041.060059)   {
            color = Cesium.Color.CRIMSON.withAlpha(0.9);
            colorHash[energy] = color;               
        } else if (energy >=681.5 && energy <=979.310974)   {
            color = Cesium.Color.CORNFLOWERBLUE.withAlpha(0.9);
            colorHash[energy] = color;               
        } else if (energy >=303 && energy <=681)   {
            color = Cesium.Color.LIGHTGREEN.withAlpha(0.9);
            colorHash[energy] = color;               
        } else if (energy >=101 && energy <=302.710999)   {
            color = Cesium.Color.LIGHTSEAGREEN.withAlpha(0.9);
            colorHash[energy] = color;               
        } else if (energy >=0 && energy <=100.5)   {
            color = Cesium.Color.LIGHTBLUE.withAlpha(0.9);
            colorHash[energy] = color;               
        } else {           
            color = Cesium.Color.MAROON.withAlpha(0.9);
            colorHash[energy] = color;        
        }       
          
        } 
        //else alert("else")

        //Set the polygon material to our random color.
        entity.polygon.material = color;
        //Remove the outlines.
        entity.polygon.outline = false;

        //Extrude the polygon using height
        entity.polygon.extrudedHeight = entity.properties.height;
      }
    })
    .catch(function (error) {
      //Display any errrors encountered while loading.
      window.alert(error);
      
    });
  
   /* var geojsonOptions = {
        clampToGround : true
    };
    // Load neighborhood boundaries from a GeoJson file
    // Data from : https://data.cityofnewyork.us/City-Government/Neighborhood-Tabulation-Areas/cpf4-rkhq
    var neighborhoodsPromise = Cesium.GeoJsonDataSource.load('./Source/SampleData/Building_footprints_2020_Energy.geojson', geojsonOptions);

    // Save an new entity collection of neighborhood data
    var neighborhoods;
    neighborhoodsPromise.then(function(dataSource) {
        // Add the new data as entities to the viewer
        viewer.dataSources.add(dataSource);
        neighborhoods = dataSource.entities;

        // Get the array of entities
        var neighborhoodEntities = dataSource.entities.values;
        for (var i = 0; i < neighborhoodEntities.length; i++) {
            var entity = neighborhoodEntities[i];
            entity.polygon.extrudedHeight =
            entity.properties.height;

            if (Cesium.defined(entity.polygon)) {
                // Use kml neighborhood value as entity name
                entity.name = entity.properties.tier;
                // Set the polygon material to a random, translucent color
                entity.polygon.material = Cesium.Color.fromRandom({
                    red : 0.1,
                    maximumGreen : 0.5,
                    minimumBlue : 0.5,
                    alpha : 0.6
                });
                // Tells the polygon to color the terrain. ClassificationType.CESIUM_3D_TILE will color the 3D tileset, and ClassificationType.BOTH will color both the 3d tiles and terrain (BOTH is the default)
                entity.polygon.classificationType = Cesium.ClassificationType.TERRAIN;
                // Generate Polygon center
                var polyPositions = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions;
                var polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions).center;
                polyCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter);
                entity.position = polyCenter;
                // Generate labels
                entity.label = {
                    text : entity.name,
                    showBackground : true,
                    scale : 0.6,
                    horizontalOrigin : Cesium.HorizontalOrigin.CENTER,
                    verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
                    distanceDisplayCondition : new Cesium.DistanceDisplayCondition(10.0, 8000.0),
                    disableDepthTestDistance : 100.0
                };
            }
        }
    }); */

    // Load a drone flight path from a CZML file
  // var dronePromise = Cesium.CzmlDataSource.load('./Source/SampleData/sampleFlight.czml');

    // Save a new drone model entity
  /*  var drone;
    dronePromise.then(function(dataSource) {
        viewer.dataSources.add(dataSource);
        // Get the entity using the id defined in the CZML data
        drone = dataSource.entities.getById('Aircraft/Aircraft1');
        // Attach a 3D model
        drone.model = {
            uri : './Source/SampleData/Models/CesiumDrone.gltf',
            minimumPixelSize : 128,
            maximumScale : 1000,
            silhouetteColor : Cesium.Color.WHITE,
            silhouetteSize : 2
        };
        // Add computed orientation based on sampled positions
        drone.orientation = new Cesium.VelocityOrientationProperty(drone.position);

        // Smooth path interpolation
        drone.position.setInterpolationOptions({
            interpolationAlgorithm : Cesium.HermitePolynomialApproximation,
            interpolationDegree : 2
        });
        drone.viewFrom = new Cesium.Cartesian3(-30, 0, 0);
    }); */

    //////////////////////////////////////////////////////////////////////////
    // Load 3D Tileset
    //////////////////////////////////////////////////////////////////////////

    // Load the NYC buildings tileset
   // var city = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({ url: Cesium.IonResource.fromAssetId(75343) }));


    //////////////////////////////////////////////////////////////////////////
    // Style 3D Tileset
    //////////////////////////////////////////////////////////////////////////

    // Define a white, opaque building style
  /*  var defaultStyle = new Cesium.Cesium3DTileStyle({
        color : "color('white')",
        show : true
    });

    // Set the tileset style to default
    neighborhoodsPromise.style = defaultStyle;

    // Define a white, transparent building style
    var transparentStyle = new Cesium.Cesium3DTileStyle({
        color : "color('white', 0.3)",
        show : true
    });

    // Define a style in which buildings are colored by height
    var heightStyle = new Cesium.Cesium3DTileStyle({
        color : {
            conditions : [
                ["${Height} >= 300", "rgba(45, 0, 75, 0.5)"],
                ["${Height} >= 200", "rgb(102, 71, 151)"],
                ["${Height} >= 100", "rgb(170, 162, 204)"],
                ["${Height} >= 50", "rgb(224, 226, 238)"],
                ["${Height} >= 25", "rgb(252, 230, 200)"],
                ["${Height} >= 10", "rgb(248, 176, 87)"],
                ["${Height} >= 5", "rgb(198, 106, 11)"],
                ["true", "rgb(127, 59, 8)"]
            ]
        }
    });

    var tileStyle = document.getElementById('tileStyle');
    function set3DTileStyle() {
        var selectedStyle = tileStyle.options[tileStyle.selectedIndex].value;
        if (selectedStyle === 'none') {
            city.style = defaultStyle;
        } else if (selectedStyle === 'height') {
            city.style = heightStyle;
        } else if (selectedStyle === 'transparent') {
            city.style = transparentStyle;
        }
    }
    tileStyle.addEventListener('change', set3DTileStyle); */

    //////////////////////////////////////////////////////////////////////////
    // Custom mouse interaction for highlighting and selecting
    //////////////////////////////////////////////////////////////////////////

    // If the mouse is over a point of interest, change the entity billboard scale and color
   /* var previousPickedEntity;
    var handler = viewer.screenSpaceEventHandler;
    handler.setInputAction(function (movement) {
        var pickedPrimitive = viewer.scene.pick(movement.endPosition);
        var pickedEntity = Cesium.defined(pickedPrimitive) ? pickedPrimitive.id : undefined;
        // Unhighlight the previously picked entity
        if (Cesium.defined(previousPickedEntity)) {
            previousPickedEntity.billboard.scale = 1.0;
            previousPickedEntity.billboard.color = Cesium.Color.WHITE;
        }
        // Highlight the currently picked entity
        if (Cesium.defined(pickedEntity) && Cesium.defined(pickedEntity.billboard)) {
            pickedEntity.billboard.scale = 2.0;
            pickedEntity.billboard.color = Cesium.Color.ORANGERED;
            previousPickedEntity = pickedEntity;
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE); */

    //////////////////////////////////////////////////////////////////////////
    // Setup Camera Modes
    //////////////////////////////////////////////////////////////////////////

   /* var freeModeElement = document.getElementById('freeMode');
   var droneModeElement = document.getElementById('droneMode');

    // Create a follow camera by tracking the drone entity
    function setViewMode() {
        if (droneModeElement.checked) {
            viewer.trackedEntity = drone;
        } else {
            viewer.trackedEntity = undefined;
            viewer.scene.camera.flyTo(homeCameraView);
        }
    }

    freeModeElement.addEventListener('change', setViewMode);
    droneModeElement.addEventListener('change', setViewMode);

    viewer.trackedEntityChanged.addEventListener(function() {
        if (viewer.trackedEntity === drone) {
            freeModeElement.checked = false;
            droneModeElement.checked = true;
        }
    });*/

    //////////////////////////////////////////////////////////////////////////
    // Setup Display Options
    //////////////////////////////////////////////////////////////////////////

    //var shadowsElement = document.getElementById('shadows');
    //var neighborhoodsElement =  document.getElementById('neighborhoods');

   /* shadowsElement.addEventListener('change', function (e) {
        viewer.shadows = e.target.checked;
    }); */

    /*neighborhoodsElement.addEventListener('change', function (e) {
        neighborhoods.show = e.target.checked;
    });*/

    // Finally, wait for the initial city to be ready before removing the loading indicator.
    /*var loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'block';
    city.readyPromise.then(function () {
        loadingIndicator.style.display = 'none';
    }); */
    

}());
