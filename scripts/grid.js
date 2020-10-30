const grid_state = {
	data: {},

	add_card: function(card_pos, image_url) {
		this.data[card_pos] = image_url;
	},

	remove_card: function(card_pos) {
		delete this.data[card_pos]
	},

	store: function() {
		window.localStorage.setItem("hex_grid_map", JSON.stringify(this.data));
	},

	restore: function() {
		this.data = JSON.parse(window.localStorage.getItem("hex_grid_map") || "{}");
		console.log(this.data);
		Object.keys(this.data).forEach(hex_position => {
			const hex = document.querySelector(`[data-position="${hex_position}"]`);
			hex.style.backgroundImage = `url("${this.data[hex_position]}")`;
		});
	},

	clear: function() {
		this.data = {};
	}
}


function select_hexagon(event) {
	const selected_hex = document.querySelector(".hex-container>.hex.bg-primary");
	if(selected_hex) {
		selected_hex.classList.remove("bg-primary");
		selected_hex.classList.add("bg-light");
		selected_hex.style.removeProperty("filter");
	}

	const new_select = event.target;

	new_select.classList.add("bg-primary");
	new_select.classList.remove("bg-light");
	new_select.style.filter = "blur(2px)";
}


function fill_hexagon(image_url) {
	const selected_hex = document.querySelector(".hex-container>.hex.bg-primary");
	if(! selected_hex) {
		return;
	}

	selected_hex.style.backgroundImage = `url("${image_url}")`
	grid_state.add_card(selected_hex.getAttribute("data-position"), image_url);
}


function empty_hexagon() {
	const selected_hex = document.querySelector(".hex-container>.hex.bg-primary");
	if(! selected_hex) { 
		return;
	}

	selected_hex.style.backgroundImage = "";

	const hex_pos = selected_hex.getAttribute("data-position");
	grid_state.remove_card(hex_pos);

}


function generate_grid() {
	const template_hexagon = document.querySelector("#hex-template");
	const grid_container = document.querySelector(".hex-container");

	for (let j = 1; j <= 12; j++) {
		for (let i = 1; i <= 12; i++) {
			const hexagon = template_hexagon.content.cloneNode(true).firstChild;
			hexagon.setAttribute("data-position", `${j}-${i}`);
			hexagon.addEventListener("click", select_hexagon);
			hexagon.style.gridRowStart = j;

			if (j % 2 == 1) hexagon.style.gridRow = `${i * 2} / span 2`;
			else hexagon.style.gridRow = `${i * 2 - 1} / span 2`;

			grid_container.appendChild(hexagon);
		}
	}
}


exports.generate_grid = generate_grid;
exports.fill_hexagon = fill_hexagon;
exports.grid_state = grid_state;
exports.empty_hexagon = empty_hexagon;
