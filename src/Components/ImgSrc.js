export const imgSrc = (tier) => {
  let result = "";

  switch (tier) {
    case "Beginner1":
      result = require("../Image/tier/Beginner1.png");
      break;
    case "Beginner2":
      result = require("../Image/tier/Beginner2.png");
      break;
    case "Beginner3":
      result = require("../Image/tier/Beginner3.png");
      break;

    case "Bronze1":
      result = require("../Image/tier/Bronze1.png");
      break;
    case "Bronze2":
      result = require("../Image/tier/Bronze2.png");
      break;
    case "Bronze3":
      result = require("../Image/tier/Bronze3.png");
      break;

    case "Silver1":
      result = require("../Image/tier/Silver1.png");
      break;
    case "Silver2":
      result = require("../Image/tier/Silver2.png");
      break;
    case "Silver3":
      result = require("../Image/tier/Silver3.png");
      break;

    case "Gold1":
      result = require("../Image/tier/Gold1.png");
      break;
    case "Gold2":
      result = require("../Image/tier/Gold2.png");
      break;
    case "Gold3":
      result = require("../Image/tier/Gold3.png");
      break;

    case "Diamond1":
      result = require("../Image/tier/Diamond1.png");
      break;
    case "Diamond2":
      result = require("../Image/tier/Diamond2.png");
      break;
    case "Diamond3":
      result = require("../Image/tier/Diamond3.png");
      break;

    case "Ruby1":
      result = require("../Image/tier/Ruby1.png");
      break;
    case "Ruby2":
      result = require("../Image/tier/Ruby2.png");
      break;
    case "Ruby3":
      result = require("../Image/tier/Ruby3.png");
      break;

    case "Helchang":
      result = require("../Image/tier/Helchang.png");
      break;
  }

  return result;
};
