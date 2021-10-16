
let text_file = fetch("texttoreplace.txt")
    .then((response) => {
        return response.text();
    })
    .then((text) => {
        console.log(text.replace(/'/g, "\""));
    });

// console.log(text.replace(/'$/gm, "\""));

// let a = text.replace(/'/g, "\"");
