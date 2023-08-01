
function closeApp() {
    electronAPI.close()
}

function minimizeApp() {
    electronAPI.minimize()
}

function unselectImage() {
    document.getElementById("intro_box").className = ""
    document.getElementById("form_box").className = "hidden"
    document.getElementById("image_display").src = ""
    document.getElementById("image_input").value = ""
}

function selectImage(input) {
    
    //Error Handling
    if (input.files.length < 1) {
        console.error("No file selected")
        return
    }
    
    const file = input.files[0]
    if(!isImage(file)) {
        console.error("Please select an image")
        return
    }

    //Update UI
    const objectURL = URL.createObjectURL(file)
    document.getElementById("intro_box").className = "hidden"
    document.getElementById("form_box").className = ""
    document.getElementById("image_display").src = objectURL
    document.getElementById("file_name").innerText = file.name
    let img = new Image()
    img.src = objectURL
    img.onload = () => {
        document.getElementById("input_width").placeholder = img.width
        document.getElementById("input_height").placeholder = img.height
    }
}

function isImage(file) {
    const validTypes = ["image/gif", "image/png", "image/jpeg"]
    return validTypes.includes(file.type)
}