// src/index.js
import "./chap03/index";
// ※ これだけにする（StateBasic を import/render している記述は外す）
import ForNest from "./chap03/ForNest";
import books from "./chap03/books";

root.render(
  <ForNest src={books} />
);