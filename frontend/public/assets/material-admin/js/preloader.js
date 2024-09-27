var pre = document.createElement("div");
pre.innerHTML = '<div className="loader-wrapper"><div className="loader">Loading...</div></div>';
document.body.insertBefore(pre, document.body.firstChild);

document.addEventListener("DOMContentLoaded", function(event) {
    document.body.className += " loaded"
}); 
