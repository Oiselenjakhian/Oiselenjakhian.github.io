$(document).ready(function() {
	// Load the JSON file for the states and their local government areas
	var jsonData = "json/nigerian-states.json";
	
	// Hide the div for lga on page load
	$('.lga').hide();
	
	// Center Nigeria on the map
	var map = L.map('map').setView([9.082, 8.6753], 6);
	
	// Define your GeoJSON layers
	var statesLayer, lgasLayer, selectedLGALayer, geojsonLayer;
	
	// Respond to changes in the drop down
	$("select.states").change(function() {
		// Get the value selected by the user
		var selectedState = $(this).children("option:selected").val();
		
		// Show the lga div if the any state is selected
		if (selectedState == "Nigeria") {
			// Reset to the whole Nigeria			
			map.setView([9.082, 8.6753], 6);
			
			// Reset all state styles
			geojsonLayer.resetStyle();
			
			// Hide the lga div if Nigeria is selected
			$('.lga').hide();
			
			// Clear existing layers
			if (lgasLayer) {
				map.removeLayer(lgasLayer);
			}
			if (selectedLGALayer) {
				map.removeLayer(selectedLGALayer);
			}
			if (statesLayer) {
				map.removeLayer(statesLayer);
			}
			
			// Close all popups on the map
			map.closePopup();
		}
		else {
			// Show the lga div
			$('.lga').show();
			
			// Change the legend text to reflect the name of the state
			var lgaLegend = document.getElementById("legend-lga");
			
			// Differentiate with the showing of state
			if (selectedState == "Federal Capital Territory") {
				lgaLegend.innerHTML = 'Please select a local government area in ' + selectedState;
			}
			else {
				lgaLegend.innerHTML = 'Please select a local government area in ' + selectedState + " State";
			}
			
			// LGA dropdown declaration
			var dropdown = $('#lga-select');
			
			// Clear previous options
			dropdown.empty();
			
			// Place an empty option
			dropdown.append('<option value="' + '">' + '</option>');
			
			// Process the JSON data to populate the LGA dropdown
			$.getJSON(jsonData, function (data) {
				// Get the lgas for the selected state
				var lgas = data[selectedState];
				
				// Sort the lgas alphabetically
				lgas = lgas.sort();
			
				// Loop through each lga
				$.each(lgas, function(index, value) {
					// Remove , and . from the values
					value = value.replace(/[,\.]/g, "");
					
					// Add the value to the drop down
					dropdown.append('<option value="' + value + '">' + value + '</option>');
				});						
			});
			
			// Highlight selected state on the map
			geojsonLayer.eachLayer(function(layer) {
				if (layer.feature.properties.admin1Name === selectedState) {
					geojsonLayer.resetStyle(); // Reset previous styles
					layer.setStyle({
						weight: 2,
						color: 'black',
						fillOpacity: 1
					});
					
					// Zoom into the state
					map.fitBounds(layer.getBounds());
				}
			});
			
			$("select.lgaSelect").change(function() {
				var selectedLGA = $(this).val();
				if (!selectedLGA || !window.lgasData) return;

				// Remove previous selected LGA highlight
				if (selectedLGALayer) {
					map.removeLayer(selectedLGALayer);
				}

				// Filter the correct LGA feature
				var selectedLGAFeature = window.lgasData.features.find(f => 
					f.properties.admin2Name.replace(/[,\.]/g, "") === selectedLGA
				);

				if (selectedLGAFeature) {
					selectedLGALayer = L.geoJson(selectedLGAFeature, {
						style: {
							fillColor: "red",  // Highlight the selected LGA
							weight: 3,
							color: "black",
							fillOpacity: 0.9
						}
					}).addTo(map);

					// Zoom into the selected LGA
					map.fitBounds(selectedLGALayer.getBounds());
				}
			});
		}
	});
	
	// Define the colours for each individual state
	var stateColors = {
		"Abia": "#2FD600",
		"Adamawa": "#FF2700",
		"Akwa Ibom": "#FF2700",
		"Anambra": "#FF00FF",
		"Bauchi": "#6681FF",
		"Bayelsa": "#2FD600",
		"Benue": "#FF2700",
		"Borno": "#FFFF00",
		"Cross River": "#FF8130",
		"Delta": "#FFFF00",
		"Ebonyi": "#FF00FF",
		"Edo": "#FF2700",
		"Ekiti": "#FFFF00",
		"Enugu": "#6681FF",
		"Federal Capital Territory": "#FF2700",
		"Gombe": "#2FD600",
		"Imo": "#FF2700",
		"Jigawa": "#FF8130",
		"Kaduna": "#FFFF00",
		"Kano": "#FF2700",
		"Katsina": "#FF00FF",
		"Kebbi": "#2FD600",
		"Kogi": "#2FD600",
		"Kwara": "#FF2700",
		"Lagos": "#FF2700",
		"Nasarawa": "#FF8130",
		"Niger": "#FF8130",
		"Ogun": "#FFFF00",
		"Ondo": "#FF8130",
		"Osun": "#6681FF",
		"Oyo": "#2FD600",
		"Plateau": "#FF00FF",
		"Rivers": "#6681FF",
		"Sokoto": "#FF00FF",
		"Taraba": "#FFFF00",
		"Yobe": "#FF2700",
		"Zamfara": "#6681FF"
	};
	
	function changeStateDropdown(stateName) {
		if (stateName != "Nigeria") {
			$('#stateDropdown').val(stateName).change();
		}
	}
	
	function changeLGADropdown(lgaName) {
		$('.lgaSelect').val(lgaName).change();
	}
	
	function zoomToLGA(feature, center) {
		// Remove existing LGA layer if any
		if (selectedLGALayer) {
			map.removeLayer(selectedLGALayer);
		}

		// Add only the selected LGA
		selectedLGALayer = L.geoJson(feature, {
			style: { color: 'black', weight: 2 }
		}).addTo(map);

		// Zoom in on the LGA
		map.setView(center, 10);
	}
	
	// Load GeoJSON file from local storage
	fetch('geojson/states.geojson')
		.then(response => response.json())
		.then(data => {
			geojsonLayer = L.geoJSON(data, {
				style: function(feature) {
					return {
						fillColor: stateColors[feature.properties.admin1Name],
						weight: 1,
						color: 'white',
						fillOpacity: 0.7
					};
				},
				onEachFeature: function(feature, layer) {
					// Add permanent label to each state
					layer.bindTooltip(feature.properties.admin1Name, {
						permanent: true,
						direction: "center",
						className: "state-label"
					}).openTooltip();
					
					layer.on('click', function(e) {
						// Prevent default focus
						e.originalEvent.preventDefault();
						
						// Stop event bubbling
						e.originalEvent.stopPropagation();
						
						// Remove focus from clicked element
						document.activeElement.blur();
						
						// Reset styles for all states
						geojsonLayer.eachLayer(function(layer) {
							layer.unbindTooltip();
							geojsonLayer.resetStyle(layer);
						});
						
						// Change style for clicked state
						layer.setStyle({
							weight: 2,
							color: 'black',  // Change to preferred color
							fillOpacity: 0.7
						});
						
						// Optionally zoom into the clicked state
						map.fitBounds(layer.getBounds());
						
						// Change dropdown
						changeStateDropdown(feature.properties.admin1Name);
						
						// Show the state and lgas
						showStateAndLGAs(feature, e.latlng);
					});
				}
			}).addTo(map);
		})
	.catch(error => console.error("Error loading GeoJSON:", error));
	
	// Load LGAs GeoJSON
	fetch('geojson/lgas.geojson')
		.then(response => response.json())
		.then(lgasData => {
			// Store globally for filtering
			window.lgasData = lgasData;
		});
	
	function showStateAndLGAs(feature, center) {
		// Clear existing layers
		if (lgasLayer) {
			map.removeLayer(lgasLayer);
		}
		if (selectedLGALayer) {
			map.removeLayer(selectedLGALayer);
		}
		if (statesLayer) {
			map.removeLayer(statesLayer);
		}
		
		// Add selected state
		statesLayer = L.geoJson(feature, {
			style: { color: stateColors[feature.properties.admin1Name], weight: 1 },
		}).addTo(map);
		
		// Filter LGAs by selected state
		var filteredLGAs = {
			type: 'FeatureCollection',
			features: window.lgasData.features.filter(f => f.properties.admin1Name === feature.properties.admin1Name)
		};
		
		// Add LGAs to map
		lgasLayer = L.geoJson(filteredLGAs, {
			style: { color: 'white', weight: 1 },
			onEachFeature: function(feature, layer) {
				layer.on('mouseover', function(e) {
					layer.bindTooltip(feature.properties.admin2Name, { permanent: false, direction: 'top' }).openTooltip();
				});
				
				layer.on('mouseout', function(e) {
					layer.closeTooltip();
				});
				
				// Zoom into the selected local government area
				layer.on('click', function(e) {
					changeLGADropdown(feature.properties.admin2Name);
					zoomToLGA(feature, e.latlng);
				});
			}
		}).addTo(map);
	}
});
