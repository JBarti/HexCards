const request = require("request");

const { setup_decks, tab_setup, click_colapse_sidebar_generator } = require("./scripts/navbar");
const { generate_grid, fill_hexagon, grid_state, empty_hexagon } = require("./scripts/grid");

const DECK_API_URL = "https://hex-cards-api.herokuapp.com/decks";
//const DECK_API_URL = "http://0.0.0.0:3000/decks";


function detect_mobile() {
    return navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
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
    );

const btn_open = document.querySelector(".btn-open");
btn_open
    .addEventListener(
        "click",
        click_colapse,
    );
btn_open.style.display = "none";

const hex_container = document.querySelector(".hex-container");
document.querySelector(".zoom-scale")
    .addEventListener(
        "change", 
        function(e) {
            hex_container.style.transform = `scale(${e.target.value})`;
        }
    );


if(detect_mobile()) {
    document.querySelector(".grid-container").style.overflow = "auto";
    $(".modal-fullscreen").modal("show");
    document
        .querySelector(".accept-fullscreen")
        .addEventListener("click", () => {
            document.documentElement.requestFullscreen();
            $(".modal-fullscreen").modal("hide");
        });
}
