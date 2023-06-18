const main = () => {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const colorPicker = document.getElementById('colorPicker');
  const fileInput = document.getElementById('fileInput');

  let isDrawing = false;
  let startX, startY;

  // default canvas
  const setCanvasDimensions = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  // new canvas
  const drawImageOnCanvas = (image) => {
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
  };

  canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    startX = event.offsetX;
    startY = event.offsetY;
  });

  canvas.addEventListener('mousemove', (event) => {
    if (!isDrawing) return;
    const currentX = event.offsetX;
    const currentY = event.offsetY;

    drawBox(startX, startY, currentX, currentY);
  });

  canvas.addEventListener('mouseup', () => {
    isDrawing = false;
  });

  // upload image
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const image = new Image();
      image.onload = () => {
        drawImageOnCanvas(image);
      };
      image.src = event.target.result;
    };
    // read image
    reader.readAsDataURL(file);
  });

  const drawBox = (startX, startY, endX, endY) => {
    const width = endX - startX;
    const height = endY - startY;
    const selectedColor = colorPicker.value;

    context.strokeStyle = 'black';
    context.lineWidth = 2;
    context.fillStyle = selectedColor;
    context.beginPath();
    context.rect(startX, startY, width, height);
    context.fill();
  };
  setCanvasDimensions();
};

main();
