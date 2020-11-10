function tab_setup() {
    let window_hash = window.location.hash;
    if (!window_hash) window_hash = "#nav-decks";

    const clicked_tab = document.querySelector(`[href='${window_hash}']`);

    document.querySelectorAll(".nav-link").forEach((element) => {
        if (clicked_tab === element) {
            element.classList.add("active");
        } else {
            element.classList.remove("active");
        }
    });

    document.querySelectorAll(".tab-container").forEach((element) => {
        if (element.getAttribute("data-hash") === window_hash) {
            element.classList.remove("d-none");
        } else {
            element.classList.add("d-none");
        }
    });
}


function build_cards(selected_cards) {
    const cards_container = document.querySelector(".container-cards");
    const template_hexagon = document.querySelector("#hex-template");

    Array.from(cards_container.querySelectorAll(".hex:not(.first)"))
        .forEach(element => {
            element.remove()
        });

    selected_cards.forEach((card_url) => {
        const hexagon = template_hexagon.content.cloneNode(true).firstChild;
        hexagon.addEventListener("click", () => {
            cards_container.dispatchEvent(
                new CustomEvent("cardSelect", {detail: {image_url: card_url}})
            );
        })

        hexagon.style.backgroundImage = `url("${card_url}")`;
        cards_container.appendChild(hexagon);
    });
}


function setup_decks(DECKS) {
    const deck_covers = DECKS["BACK"];
    delete DECKS["BACK"];
    const deck_cards = Object.values(DECKS)
    const template_hexagon = document.querySelector("#hex-template");
    const decks_container = document.querySelector(".container-decks");

    deck_covers.forEach((cover, index) => {
        const hexagon = template_hexagon.content.cloneNode(true).firstChild;
        hexagon.style.backgroundImage = `url("${cover}")`;
        decks_container.appendChild(hexagon);
        hexagon.addEventListener("click", () => {
            build_cards(deck_cards[index])
            window.location.hash = "#nav-cards";
        });
    });
}

function click_colapse_sidebar_generator() {
    let is_colapsed = false;
    const sidebar = document.querySelector(".col-cards")
    const colapse_button = document.querySelector(".btn-colapse")
    const open_button = document.querySelector(".btn-open");

    return function() {
        !is_colapsed ? 
            colapse_sidebar(sidebar, open_button, colapse_button) : 
            open_sidebar(sidebar, open_button, colapse_button) 
        is_colapsed = !is_colapsed;
    }
}

function colapse_sidebar(sidebar, open_button, colapse_button) {
    sidebar.style.display = "none";
    colapse_button.style.display = "none";
    open_button.style.removeProperty("display");
}

function open_sidebar(sidebar, open_button, colapse_button) {
    sidebar.style.removeProperty("display");
    open_button.style.display = "none";
    colapse_button.style.removeProperty("display");
}


exports.setup_decks = setup_decks;
exports.tab_setup = tab_setup;
exports.click_colapse_sidebar_generator = click_colapse_sidebar_generator;
