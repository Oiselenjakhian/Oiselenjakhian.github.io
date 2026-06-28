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

// Load the external file as XML
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
	   .style("max-width", "100%")
	   .style("max-height", "100%");

	// Select all path elements within the imported SVG for future interaction
    const allPaths = svg.selectAll("path");
	
	// Grab all elements for the side panel
	const detailsContainer = d3.select("#state-details-container");
    const detailsStateName = d3.select("#details-state-name");
    const detailsResourceList = d3.select("#details-resource-list");
	
	// Select the tooltip element
	const tooltip = d3.select("#tooltip");
	
	// Add mouse interaction listeners
	allPaths
    .style("cursor", "pointer") // Turn cursor into a hand pointer on hover
	.on("click", function(event) {
		// Extract the tag element
		const stateTag = d3.select(this).attr("tag");
		
		if (!stateTag) {
			console.warn("This path is missing a 'tag' attribute:", this);
            return;
        }
		
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
        
        // Slightly dim or highlight the hovered state
        d3.select(this)
            .style("fill-opacity", 0.85)
            .style("stroke", "#000")
            .style("stroke-width", "1.5px");

        // Make the tooltip visible and inject the state name
        tooltip
            .style("opacity", 1)
            .html(stateName);
    })
    .on("mousemove", function(event) {
        // Move the tooltip dynamically based on the exact cursor coordinates
        // Adding 15px offsets prevents the box from clipping underneath the pointer icon
        tooltip
            .style("left", (event.pageX + 15) + "px")
            .style("top", (event.pageY + 15) + "px");
    })
    .on("mouseout", function() {
        // Revert the path style back to normal
        d3.select(this)
            .style("fill-opacity", 1)
            .style("stroke", "") 
            .style("stroke-width", "");

        // Hide the popup
        tooltip.style("opacity", 0);
    });    
}).catch(error => {
    console.error("Error loading the SVG map file:", error);
});