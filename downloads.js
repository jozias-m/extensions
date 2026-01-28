if (document.location.href.match(/.*download=.*/) && document.location.href.match(/.*(?!\.\.).*/)) {
    const params = new URLSearchParams(window.location.search);
    const file = params.get("download");
    window.location.href = `./files/${file}`;
}