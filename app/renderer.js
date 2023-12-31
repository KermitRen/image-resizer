var aspect_ratio = 1

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
    document.getElementById("input_width").value = ""
    document.getElementById("input_height").value = ""
    document.getElementById("input_ar").checked = true
}

function validateNumber(input, type) {
    var newValue = input.value.replace(/\D/g,'')
    newValue = newValue.replace(/^0+/, '');
    input.value = newValue

    if(keepAR()) {

        if(newValue == "") {
            document.getElementById("input_height").value = ""
            document.getElementById("input_width").value = ""
            return
        }

        if(type == "width") {
            document.getElementById("input_height").value = Math.floor(parseInt(newValue)/aspect_ratio)
        } else if(type == "height") {
            document.getElementById("input_width").value = Math.floor(parseInt(newValue)*aspect_ratio)
        }
    }
}

function toastError(message) {
    electronAPI.toast({
        text: message,
        duration: 3000,
        className: "toast",
        gravity: "top",
        selector: document.getElementById("content")
    })
}

function updatedARSetting() {
    if (keepAR()) {
        const widthInput = document.getElementById("input_width")
        const heightInput = document.getElementById("input_height")
        if(widthInput.value == "") {
            heightInput.value = ""
        } else {
            heightInput.value = Math.floor(parseInt(widthInput.value)/aspect_ratio)
        }
    }
}

function selectImage(input) {
    
    //Error Handling
    if (input.files.length < 1) {
        return
    }
    
    const file = input.files[0]
    if(!isImage(file)) {
        toastError("Please select a valid image file type")
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
        aspect_ratio = img.width/img.height
    }
}

function sendImage() {

    //Error Handling
    const width = document.getElementById("input_width").value
    const height = document.getElementById("input_height").value
    if(width == "" || height == "") {
        toastError("Please provide a width and height")
        return
    }

    //Send Image
    const imgPath = document.getElementById("image_input").files[0].path
    electronAPI.sendImage({
        imgPath: imgPath,
        width: parseInt(width),
        height: parseInt(height)
    })

}

function isImage(file) {
    const validTypes = ["image/gif", "image/png", "image/jpeg"]
    return validTypes.includes(file.type)
}

function keepAR() {
    return document.getElementById("input_ar").checked
}