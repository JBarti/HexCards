const request = require("request");

const { setup_decks, tab_setup, click_colapse_sidebar_generator } = require("./scripts/navbar");
const { generate_grid, fill_hexagon, grid_state, empty_hexagon } = require("./scripts/grid");

const DECK_API_URL = "https://hex-cards-api.herokuapp.com/decks";

const DEFAULT_HEX_WIDTH = 200;
const DEFAULT_HEX_HEIGHT = 174;
const DEFAULT_GRID_AUTO_ROWS = 87;
const DEFAULT_GRID_AUTO_COLUMNS = 151;


function zoom_grid(scale) {
	const hexes = document.querySelectorAll(".hex-container>.hex");
	hexes.forEach((hex) => {
		hex.style.width = `${DEFAULT_HEX_WIDTH * scale}px`;
		hex.style.height = `${DEFAULT_HEX_HEIGHT * scale}px`;
	});

	const grid_container = document.querySelector(".hex-container");
	grid_container.style.gridAutoRows = `${DEFAULT_GRID_AUTO_ROWS * scale}px`;
	grid_container.style.gridAutoColumns = `${DEFAULT_GRID_AUTO_COLUMNS * scale}px`;
}


document.querySelector(".container-cards").addEventListener("cardSelect", (event) =>
{
	const image_url = event.detail.image_url;
	fill_hexagon(image_url);

});

generate_grid();
tab_setup();

request(DECK_API_URL, function(err, resp, body) {
	const data = JSON.parse(body);
	setup_decks(data);

});
grid_state.restore();
window.addEventListener("hashchange", tab_setup);
window.addEventListener("beforeunload", () => grid_state.store());
document.querySelector(".scale-select")
	.addEventListener("change", event => {
		const scale_size = Number(event.target.value);
		console.log(scale_size);
		zoom_grid(scale_size);
	});
document.querySelector(".hex-delete")
	.addEventListener("click", () => {
		empty_hexagon();
	});
document.querySelector(".cards-tools>button")
	.addEventListener("click", () => {
		grid_state.clear();
		location.reload();
	});

const click_colapse = click_colapse_sidebar_generator();
document.querySelector(".btn-colapse")
	.addEventListener(
		"click",
		click_colapse,
	)

const btn_open = document.querySelector(".btn-open")
btn_open
	.addEventListener(
		"click",
		click_colapse,
	);
btn_open.style.display = "none";
