
function closeApp() {
    electronAPI.close()
}

function minimizeApp() {
    electronAPI.minimize()
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
    document.getElementById("intro_box").className = "hidden"
    document.getElementById("form_box").className = ""
    document.getElementById("image_display").src = URL.createObjectURL(file)
    document.getElementById("file_name").innerText = file.name
    console.log(file)
}

function isImage(file) {
    const validTypes = ["image/gif", "image/png", "image/jpeg"]
    return validTypes.includes(file.type)
}