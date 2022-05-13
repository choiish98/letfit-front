export const imgSrc = (tier) => {
  let result = "";

  switch (tier) {
    case "Beginner1":
      result = require("../../assets/tier/Beginner1.png");
      break;
    case "Beginner2":
      result = require("../../assets/tier/Beginner2.png");
      break;
    case "Beginner3":
      result = require("../../assets/tier/Beginner3.png");
      break;

    case "Bronze1":
      result = require("../../assets/tier/Bronze1.png");
      break;
    case "Bronze2":
      result = require("../../assets/tier/Bronze2.png");
      break;
    case "Bronze3":
      result = require("../../assets/tier/Bronze3.png");
      break;

    case "Silver1":
      result = require("../../assets/tier/Silver1.png");
      break;
    case "Silver2":
      result = require("../../assets/tier/Silver2.png");
      break;
    case "Silver3":
      result = require("../../assets/tier/Silver3.png");
      break;

    case "Gold1":
      result = require("../../assets/tier/Gold1.png");
      break;
    case "Gold2":
      result = require("../../assets/tier/Gold2.png");
      break;
    case "Gold3":
      result = require("../../assets/tier/Gold3.png");
      break;

    case "Diamond1":
      result = require("../../assets/tier/Diamond1.png");
      break;
    case "Diamond2":
      result = require("../../assets/tier/Diamond2.png");
      break;
    case "Diamond3":
      result = require("../../assets/tier/Diamond3.png");
      break;

    case "Ruby1":
      result = require("../../assets/tier/Ruby1.png");
      break;
    case "Ruby2":
      result = require("../../assets/tier/Ruby2.png");
      break;
    case "Ruby3":
      result = require("../../assets/tier/Ruby3.png");
      break;

    case "Helchang":
      result = require("../../assets/tier/Helchang.png");
      break;
  }

  return result;
};
