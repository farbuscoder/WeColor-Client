export function generateColors(min, max) {
  let color = {
    red: Math.round(Math.random() * (max - min) + min),
    green: Math.round(Math.random() * (max - min) + min),
    blue: Math.round(Math.random() * (max - min) + min),
  };

  const hex = transformaRgbAHex(color.red, color.green, color.blue);
  console.log({ hex: hex, rgb: color });

  return { hex: hex, rgb: color };
}

function transformaRgbAHex(red, green, blue) {
  let hex = {
    hex_color:
      "#" +
      ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1),
  };
  return hex.hex_color;
}
