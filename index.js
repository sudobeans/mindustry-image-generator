// Adds some elements as variables: file upload button, source image, and code output box
let imgElement = document.getElementById('imageSrc');
let inputElement = document.getElementById('fileInput');
let codeoutput = document.getElementById('codeoutput');
inputElement.addEventListener('change', (e) => {
    imgElement.src = URL.createObjectURL(e.target.files[0]);
}, false);

imgElement.onload = function() {
    let newSize = new cv.Size(20, 20); // The resolution of the image for the display

    let uploadedImage = cv.imread(imgElement); // Loads the uploaded image as an OpenCV mat
    let resizedImage = new cv.Mat();

    cv.resize(uploadedImage, resizedImage, newSize, interpolation = cv.INTER_NEAREST); // Resizes the image
    cv.imshow('resizedImageCanvas', resizedImage);

    codeoutput.innerHTML = imageToCode(resizedImage, 80);

    uploadedImage.delete();
    resizedImage.delete();
};

// Converts an image to code
function imageToCode(image, displaySize) {
    let imageAsCode = "";
    let pixel = 0;
    let pixelSize = displaySize / image.rows;

    imageAsCode += "sensor draw switch1 @enabled\n" +
                   "jump 3 equal draw true\n" +
                   "end\n"+
                   "draw clear 0 0 0 0 0 0 \n"

    for(x = 0; x < image.cols; x++) {
        for(y = 0; y < image.rows; y++) {
            pixel = image.ucharPtr(y, x);
            imageAsCode += `draw color ${pixel[0]} ${pixel[1]} ${pixel[2]} ${pixel[3]} 0 0\n`;
                                                            /* the displaySize - (y + 1) * pixelSize is necessary because 
                                                            the top corner in OpenCV is (0, 0) 
                                                            but in Mindustry it is (80, 0)  */
            imageAsCode += `draw rect ${x * pixelSize} ${displaySize - ((y + 1) * pixelSize)} ${pixelSize} ${pixelSize} 0 0\n`;
        }
        imageAsCode += "drawflush display1\n"
    }

    imageAsCode += "control enabled switch1 false 0 0 0\n";

    return imageAsCode;
}