const main = () => {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const colorPicker = document.getElementById('colorPicker');
  const fileInput = document.getElementById('fileInput');
  const pencilButton = document.getElementById('pencilButton');
  const eraserButton = document.getElementById('eraserButton');
  const boxButton = document.getElementById('boxButton');

  let isDrawing = false;
  let startX, startY;
  let selectedTool = 'box';

  const setCanvasDimensions = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const drawImageOnCanvas = (image) => {
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
  };

  const setTool = (tool) => {
    selectedTool = tool;
  };

  const draw = (startX, startY, endX, endY) => {
    const width = endX - startX;
    const height = endY - startY;
    const selectedColor = colorPicker.value;

    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.fillStyle = selectedColor;

    if (selectedTool === 'pencil') {
      context.beginPath();
      context.moveTo(startX, startY);
      context.lineTo(endX, endY);
      context.stroke();
    } else if (selectedTool === 'eraser') {
      context.clearRect(startX, startY, width, height);
    } else if (selectedTool === 'box') {
      context.beginPath();
      context.rect(startX, startY, width, height);
      context.fill();
    }
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

    draw(startX, startY, currentX, currentY);
  });

  canvas.addEventListener('mouseup', () => {
    isDrawing = false;
  });

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const image = new Image();
      image.onload = () => {
        setCanvasDimensions();
        drawImageOnCanvas(image);
      };
      image.src = event.target.result;
    };

    reader.readAsDataURL(file);
  });

  pencilButton.addEventListener('click', () => {
    setTool('pencil');
  });

  eraserButton.addEventListener('click', () => {
    setTool('eraser');
  });

  boxButton.addEventListener('click', () => {
    setTool('box');
  });

  setCanvasDimensions();
};

main();
