const main = () => {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const colorPicker = document.getElementById('colorPicker');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let isDrawing = false;
  let startX, startY;

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
}
main();
