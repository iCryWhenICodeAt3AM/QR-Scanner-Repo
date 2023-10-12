const video = document.getElementById('camera');
const resultElement = document.getElementById('result');

// Initialize Instascan scanner
const scanner = new Instascan.Scanner({ video });

// Add a listener for when a QR code is scanned
scanner.addListener('scan', function (content) {
    resultElement.textContent = content;
});

// Get the available cameras and start scanning with the first camera
try {
    Instascan.Camera.getCameras()
        .then(function (cameras) {
            if (cameras.length > 0) {
                scanner.start(cameras[0]);
            } else {
                resultElement.textContent = 'No cameras found.';
            }
        })
        .catch(function (error) {
            console.error('Error accessing cameras: ' + error);
        });
} catch (e) {
    console.error('Camera enumeration not supported:', e);
    resultElement.textContent = 'Camera enumeration not supported.';
}
