function resetGame() {
	
}

function startGame() {
	document.getElementById("intro-screen").style.display = "none";
	document.getElementById("game-screen").style.display = "flex";
}

function showMainMenu() {
	// Show the main menu buttons
	document.querySelector(".menu-buttons").style.display = "flex";

	// Hide all information panels
	document.querySelectorAll(".menu-panel").forEach(panel => {
		panel.style.display = "none";
	});
}

function returnToMenu() {
	document.getElementById("game-screen").style.display = "none";
	document.getElementById("intro-screen").style.display = "flex";

	showMainMenu();
}

function showPanel(panelId) {
	// Hide the main menu buttons
	document.querySelector(".menu-buttons").style.display = "none";

	// Hide all information panels
	document.querySelectorAll(".menu-panel").forEach(panel => {
		panel.style.display = "none";
	});

	// Display the selected panel
	document.getElementById(panelId).style.display = "block";
}
