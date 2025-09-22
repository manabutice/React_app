// make-icon.js
const { createCanvas } = require("canvas");
const fs = require("fs");

const size = 64;
const canvas = createCanvas(size, size);
const ctx = canvas.getContext("2d");

// 背景白
ctx.fillStyle = "white";
ctx.fillRect(0, 0, size, size);

// ↓マーク
ctx.fillStyle = "black";
ctx.beginPath();
ctx.moveTo(size / 2, 10);
ctx.lineTo(size / 2, 40);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(size / 2 - 10, 30);
ctx.lineTo(size / 2, 50);
ctx.lineTo(size / 2 + 10, 30);
ctx.fill();

const buffer = canvas.toBuffer("image/png");
fs.writeFileSync("dl.png", buffer);
console.log("dl.png を作成しました！");
