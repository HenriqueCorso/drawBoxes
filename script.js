const main = () => {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const colorPicker = document.getElementById('colorPicker');
  const fileInput = document.getElementById('fileInput');
  const pencilButton = document.getElementById('pencilButton');
  const eraserButton = document.getElementById('eraserButton');
  const boxButton = document.getElementById('boxButton');
  const pencilWidthInput = document.getElementById('pencilWidthInput');
  const buttons = document.querySelectorAll('button');


  let isDrawing = false;
  let startX, startY;
  let selectedTool = 'box';
  let lastX, lastY;

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


    buttons.forEach(button => {
      if (button.id === tool + 'Button') {
        button.classList.add('selected');
      } else {
        button.classList.remove('selected');
      }
    });
  };

  const drawBox = (startX, startY, endX, endY) => {
    const width = endX - startX;
    const height = endY - startY;
    const selectedColor = colorPicker.value;

    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.fillStyle = selectedColor;


    if (selectedTool === 'eraser') {
      context.clearRect(startX, startY, width, height);
    } else if (selectedTool === 'box') {
      context.beginPath();
      context.rect(startX, startY, width, height);
      context.fill();
    }
  };

  const drawPencil = (currentX, currentY) => {
    const selectedColor = colorPicker.value;

    context.strokeStyle = selectedColor;
    context.lineWidth = pencilWidthInput.value;

    if (selectedTool === 'pencil') {
      context.beginPath();
      context.moveTo(lastX, lastY);
      context.lineTo(currentX, currentY);
      context.stroke();
      context.lineCap = "round";
    }

    lastX = currentX;
    lastY = currentY;
  };

  canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    startX = event.offsetX;
    startY = event.offsetY;

    if (selectedTool === 'pencil') {
      lastX = event.offsetX;
      lastY = event.offsetY;
    }
  });

  canvas.addEventListener('mousemove', (event) => {
    if (!isDrawing) return;
    const currentX = event.offsetX;
    const currentY = event.offsetY;

    if (selectedTool === 'box') {
      drawBox(startX, startY, currentX, currentY);
    } else if (selectedTool === 'eraser') {
      drawBox(startX, startY, currentX, currentY);
    } else if (selectedTool === 'pencil') {
      drawPencil(currentX, currentY);
    }
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

  pencilWidthInput.addEventListener('input', () => {
    context.lineWidth = pencilWidthInput.value;
  });

  setCanvasDimensions();
};

main();
