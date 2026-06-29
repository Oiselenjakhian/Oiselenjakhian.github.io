// Select the wrapper container from HTML
const container = d3.select("#map");

// Variable for JSON data
let data;

async function loadData() {
	try {
		// Fetch and parse the JSON file
		data = await d3.json("data/nigeria.json");
	} catch (error) {
		console.error("Error loading the JSON:", error);
	}
}

loadData();

// Load the SVG file as XML
d3.xml("svg/nigeria.svg").then(xmlData => {
	// Extract the actual SVG element from the XML document
    const svgNode = xmlData.documentElement;
    
    // Append the SVG node directly into your DOM container
    container.node().appendChild(svgNode);
	
	// D3 wrap the newly injected SVG element
	const svg = d3.select(svgNode);
	
	// Get the intrinsic width and height defined in the SVG file
	const originalWidth = svg.attr("width") || 744.24; 
	const originalHeight = svg.attr("height") || 599.93;
	
	// Set the viewBox using those original coordinates and remove fixed dimensions
	svg.attr("viewBox", `0 0 ${originalWidth} ${originalHeight}`)
	   .attr("width", "100%")
	   .attr("height", "100%")
	   .attr("preserveAspectRatio", "xMidYMid meet");
	   
	// To safely zoom the map without moving the entire canvas layout, 
    // we bundle all path elements into a master <g> container.
    const mapGroup = svg.append("g").attr("class", "map-viewport");
	
	// Move all existing child elements (paths) from the root SVG into our new zoom group
    // This maintains your crisp structure while enabling dynamic scaling properties
    svg.selectAll("path").each(function() {
        mapGroup.node().appendChild(this);
    });

	// Select all path elements within the imported SVG for future interaction
    const allPaths = mapGroup.selectAll("path");
	
	// Grab all elements for the side panel
	const detailsContainer = d3.select("#state-details-container");
    const detailsStateName = d3.select("#details-state-name");
    const detailsResourceList = d3.select("#details-resource-list");
	
	// Select the tooltip element
	const tooltip = d3.select("#tooltip");
	
	// Define the d3 zoom behaviour
	const zoomBehavior = d3.zoom()
        .scaleExtent([0.5, 8]) // Restricts zoom depth (0.5x min, 8x max magnification)
        .extent([[0, 0], [originalWidth, originalHeight]])
        .on("zoom", (event) => {
            // Apply the active transform matrix to the master group element
            mapGroup.attr("transform", event.transform);
        });

    // Attach the interactive mouse and touch event wrappers to the outer root SVG element
    svg.call(zoomBehavior);
	
	// Wire up the zoom buttons
	d3.select("#zoom-in-button").on("click", () => {
        svg.transition().duration(300).call(zoomBehavior.scaleBy, 1.3);
    });
    d3.select("#zoom-out-button").on("click", () => {
        svg.transition().duration(300).call(zoomBehavior.scaleBy, 0.7);
    });
	
	// Add mouse interaction listeners
	allPaths
    .style("cursor", "pointer") // Turn cursor into a hand pointer on hover
	.on("click", function(event) {
		const stateTag = d3.select(this).attr("tag");
		const stateTitle = d3.select(this).attr("title");
    
		// If a state tag is non-existent, return end the program
		if (!stateTag) return;
		
		// This updates the <select> menu to match whichever state path was just clicked
		// We trim out the word " State" if your option values are just "Abia", "Kogi" instead of full titles
		const cleanTitle = stateTitle ? stateTitle.replace(" State", "").trim() : "";
		d3.select("#state").property("value", cleanTitle);
		
		// Reset other controls
		d3.select("#region").property("value", "");
		d3.select("#search").property("value", "");

		// Below this, your existing click highlighting and resource listing code runs normally...
		allPaths.classed("faded", false).classed("selected-state", false); // clear previous classes
		d3.select(this).classed("selected-state", true); 
			
		// Get the resources of a state
		const stateResources = data[stateTag].resources;
		
		if (stateResources) {
			// Make the hidden side panel details block visible
			detailsContainer.style("display", "block");
			
			// Inject the human-readable state title and region metadata
			detailsStateName.text(`${d3.select(this).attr("title")}`); //
			
			// Flush stale items from the resource bullet list
			detailsResourceList.html("");
			
			// Iterate through the array and append each resource as an <li> item
			stateResources.forEach(resource => {
				detailsResourceList.append("li")
					.text(resource)
					.style("margin-bottom", "6px");
			});
			
			// Place a space at the bottom of the list
			detailsResourceList.style("margin-bottom", "20px");
		} else {
			// Graceful fallback display if a tag is found but doesn't exist in nigeria.json
			detailsContainer.style("display", "block");
			detailsStateName.text(stateTitle);
			detailsResourceList.html("<li>No resource endowment profile matched this state code.</li>");
		}
	}) 
    .on("mouseover", function(event) {
        // 'this' refers to the specific path being hovered over
        // We look for the "title" attribute inside the SVG tag
        const stateName = d3.select(this).attr("title") || "Unknown State";
		
		// Read the value from the search element and trim accidental whitespaces
		const searchQuery = d3.select("#search").property("value").trim();
        
        // If searchQuery is NOT empty, stop this function immediately!
        if (searchQuery !== "") {
            return; 
        }
		
		// Slightly dim or highlight the hovered state
		d3.select(this)
			.style("fill-opacity", 0.85)
			.style("stroke", "#000")
			.style("stroke-width", "1.5px");

		// Reveal and fill out the tooltip
        d3.select("#tooltip")
            .style("opacity", 1)
            .html(stateName);
    })
    .on("mousemove", function(event) {
		// Also safeguard the mousemove tracker to prevent the tooltip bounding box 
        // from flashing onto the screen while dragging across states during an active search
        const searchQuery = d3.select("#search").property("value").trim();
        if (searchQuery !== "") return;
		
        // Move the tooltip dynamically based on the exact cursor coordinates
        // Adding 15px offsets prevents the box from clipping underneath the pointer icon
        tooltip
            .style("left", (event.pageX + 15) + "px")
            .style("top", (event.pageY + 15) + "px");
    })
    .on("mouseout", function() {
		// Hide the tooltip popup canvas cleanly
		d3.select("#tooltip").style("opacity", 0);

		// Get if the search box is empty
		const searchQuery = d3.select("#search").property("value").trim();

		// If the search is active, do not force inline values
		if (searchQuery !== "") {
			// We only strip out temporary hover stroke/border adjustments.
			// We leave fill-opacity completely alone so that your '.faded' 
			// or '.highlighted-search' CSS classes function perfectly.
			d3.select(this)
				.style("stroke", "") 
				.style("stroke-width", "");
				
			return; // Halt execution early
		}

		// When the input box is totally clear, it is completely safe 
		// to wipe out all custom inline properties back to pristine default configurations.
		d3.select(this)
			.style("fill-opacity", 1)
			.style("stroke", "") 
			.style("stroke-width", "");
	});

	// Take a reference to the search textbox
	const searchInput = d3.select("#search");
	
	searchInput.on("input", function(event) {
		// Capture and sanitize user input text
		const query = event.target.value.toLowerCase().trim();

		// If the search bar is completely empty, reset all map paths back to their default look
		if (query === "") {
			allPaths
				.classed("faded", false)
				.classed("highlighted-search", false)
				.style("fill", "")
				.style("stroke", "")
				.style("stroke-width", "");
			return;
		}

		// Evaluate matching metrics across your paths collection
		allPaths.each(function() {
			const path = d3.select(this);
			const stateTag = path.attr("tag");      // e.g., "kogi"
			const stateTitle = path.attr("title");  // e.g., "Niger State"

			// If the path doesn't have a valid identifier tag, skip it safely
			if (!stateTag) return;

			// Retrieve the structured details from your global nigeria.json structure
			const stateData = data[stateTag];

			let isMatch = false;

			if (stateData) {
				// Check Criterion A: Does the query match the state's name/tag?
				const nameMatches = stateTag.includes(query) || 
									(stateTitle && stateTitle.toLowerCase().includes(query));

				// Check Criterion B: Does the query match any of the resources in the array?
				const resourceMatches = stateData.resources.some(resource => 
					resource.toLowerCase().includes(query)
				);

				// If either condition evaluates to true, we have a valid match
				if (nameMatches || resourceMatches) {
					isMatch = true;
				}
			}

			// Update the visual states based on evaluation results
			if (isMatch) {
				path.classed("highlighted-search", true);
				path.classed("faded", false);
			} else {
				path.classed("faded", true);
				path.classed("highlighted-search", false);
			}
		});
	});
	
	// Locate the region dropdown select element from HTML
	const regionSelect = d3.select("#region");
	
	regionSelect.on("change", function(event) {
		// Capture the selected value from the dropdown menu
		const selectedRegionValue = event.target.value;

		// Clear out any text from the search input box to prevent filtering conflicts
		d3.select("#search").property("value", "");

		// If the user picked "Please select a region", reset the map graphics
		if (selectedRegionValue === "") {
			allPaths
				.classed("faded", false)
				.classed("highlighted-region", false)
				.style("fill", "")
				.style("stroke", "")
				.style("stroke-width", "");
			return;
		}

		// Map dropdown codes to the exact string matching values in nigeria.json
		const regionMapping = {
			"nc": "North Central",
			"ne": "North East",
			"nw": "North West",
			"se": "South East",
			"ss": "South South",
			"sw": "South West"
		};
		
		const targetRegionName = regionMapping[selectedRegionValue];

		// Loop over every state path and apply classes based on regional alignment
		allPaths.each(function() {
			const path = d3.select(this);
			const stateTag = path.attr("tag");

			if (!stateTag) return;

			// Fetch state's profile from loaded JSON
			const stateData = data[stateTag];

			// Check if this state belongs to the selected region
			if (stateData && stateData.region === targetRegionName) {
				path.classed("highlighted-region", true);
				path.classed("faded", false);
			} else {
				path.classed("faded", true);
				path.classed("highlighted-region", false);
			}
		});
	});
	
	// Locate the state dropdown select element from HTML
	const stateSelect = d3.select("#state");

	stateSelect.on("change", function(event) {
		// Capture the selected value from the dropdown menu (e.g., "Kogi", "Abia")
		const selectedStateTitle = event.target.value;

		// Clear any competing input highlights or search filters
		d3.select("#search").property("value", "");
		d3.select("#region").property("value", "");
		
		// Reset all paths by removing any temporary utility filters/opacities
		allPaths
			.classed("faded", false)
			.classed("highlighted-search", false)
			.classed("highlighted-region", false)
			.classed("selected-state", false)
			.style("fill", "")
			.style("stroke", "")
			.style("stroke-width", "");

		// If the user selected the default placeholder option, hide the resource panel and stop
		if (selectedStateTitle === "") {
			d3.select("#state-details-container").style("display", "none");
			return;
		}

		// Find the matching path on the map
		// We scan the SVG paths to see which one has a 'title' attribute matching the selected option
		let matchingPathNode = null;
		
		allPaths.each(function() {
			const path = d3.select(this);
			const stateTitle = path.attr("title"); // e.g., "Kogi State" or "Kogi"
			
			// Check if the SVG title contains or matches the selected option title
			if (stateTitle && stateTitle.toLowerCase().includes(selectedStateTitle.toLowerCase())) {
				matchingPathNode = this;
				path.classed("selected-state", true);
			} else {
				// Optional: Dim other states to draw focus entirely to the chosen state
				path.classed("faded", true);
			}
		});

		// Update the resource information panel dynamically using the matched path's tag
		if (matchingPathNode) {
			const stateTag = d3.select(matchingPathNode).attr("tag");
			
			if (stateTag && data[stateTag]) {
				const stateData = data[stateTag];
				
				// Re-use your panel updating logic
				detailsContainer.style("display", "block");
				detailsStateName.text(`${selectedStateTitle} State`);
				detailsResourceList.html("");
				
				stateData.resources.forEach(resource => {
					detailsResourceList.append("li")
						.text(resource)
						.style("margin-bottom", "6px");
				});
				
				detailsResourceList.style("margin-bottom", "20px");
			}
		}
	});
}).catch(error => {
    console.error("Error loading the SVG map file:", error);
});