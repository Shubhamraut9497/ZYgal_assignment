document.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var downloadLink = document.getElementById('downloadLink');

    // Set canvas size and font properties
    canvas.width = 16;
    canvas.height = 34;
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Generate a random font color (excluding black)
    var fontColor = getRandomColor();

    // Draw the initial canvas
    drawCanvas();

    // Allow the user to type any character within the canvas
    canvas.addEventListener('click', function(event) {
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;

        var char = prompt('Enter a character:');
        if (char) {
            drawCanvas();
            ctx.fillStyle = fontColor;
            ctx.fillText(char, x, y);
        }
    });

    // Download the pixel data as a text file
    downloadLink.addEventListener('click', function() {
        var pixelData = getPixelData();
        var fileBlob = new Blob([pixelData], { type: 'text/plain' });
        downloadLink.href = URL.createObjectURL(fileBlob);
    });

    // Function to draw the canvas with an empty background
    function drawCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Function to generate a random color (excluding black)
    function getRandomColor() {
        var colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF', '#800080', '#FFA500'];
        var randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }

    // Function to get the pixel data of the canvas
    function getPixelData() {
        var pixelData = '';
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        for (var i = 0; i < imageData.length; i += 4) {
            var hexColor = rgbToHex(imageData[i], imageData[i + 1], imageData[i + 2]);
            pixelData += hexColor + ', ';
        }
        return pixelData.trim();
    }

    // Function to convert RGB color values to hex format
    function rgbToHex(r, g, b) {
        var hex = ((r << 16) | (g << 8) | b).toString(16);
        return '0x' + ('00000000' + hex).slice(-8);
    }
});
