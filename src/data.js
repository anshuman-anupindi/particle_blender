const _ = require("underscore");

const defaultCreationObjects = [
  "down,up,strange,charm,bottom,top,electron".split(","),
  "proton,neutron,electron".split(","),
  "hydrogen,deuterium,helium3,helium4,lithium,beryllium".split(","),
];

const objectsToComplete = defaultCreationObjects.slice(1);

const validCombinations = {
  proton: [{ up: 2, down: 1 }, { proton: 1 }],
  neutron: [{ down: 2, up: 1 }],
  electron: [{ electron: 1 }],
  up: [{ up: 1 }, { strange: 1 }, { bottom: 1 }],
  down: [{ down: 1 }, { top: 1 }, { charm: 1 }],
  hydrogen: [{ proton: 1, electron: 1 }],
  deuterium: [{ hydrogen: 1, neutron: 1 }],
  helium3: [{ deuterium: 1, proton: 1 }, { deuterium: 2 }],
  tritium: [{ deuterium: 2 }, { helium3: 1, neutron: 1 }],
  helium4: [
    { helium3: 1, deuterium: 1 },
    { tritium: 1, deuterium: 1 },
    { lithium: 1, proton: 1 },
  ],
  beryllium: [{ helium3: 1, helium4: 1 }],
  lithium: [{ tritium: 1, helium4: 1 }],
};

// hydrogen -> deuterium -> helium3 -> tritium -> helium4 -> beryllium -> lithium

const emissions = {
  hydrogen: [""],
  deuterium: ["light"],
  helium3: ["light", "neutron"],
  tritium: ["proton", "proton"],
  beryllium: ["light"],
  lithium: ["proton", "light"],
  helium4: ["proton", "neutron", "helium4"],
};

function findCombinationKeys(itemCountHash) {
  return Object.keys(validCombinations).filter((objectToCreate) => {
    let objCompositions = validCombinations[objectToCreate];
    for (let i = 0; i < objCompositions.length; i++) {
      if (_.isEqual(objCompositions[i], itemCountHash)) return true;
    }
  });
}

const arrToCombinations = (comboArr) => {
  let comboHash = {};
  comboArr.forEach((creationObject) => {
    !comboHash[creationObject]
      ? (comboHash[creationObject] = 1)
      : comboHash[creationObject]++;
  });
  return comboHash;
};

const getEmissionsFromComboArr = (comboArr) => {
  let comboHash = arrToCombinations(comboArr);
  let resultingElement = findCombinationKeys(comboHash);
  let comboIndex = 0;

  validCombinations[resultingElement].forEach((possibleCombo, index) => {
    if (_.isEqual(possibleCombo, comboHash)) {
      comboIndex = index;
    }
  });
  return emissions[resultingElement][comboIndex];
};

const displayInstructions = (levelNum, createdObjects) => {
  if (levelNum == 0) {
    if (createdObjects.length < 1) {
      return "Everything on the wheel is a quark, except the electron. Try blending every quark individually first.";
    } else if (createdObjects.length < 4) {
      return `Try blending the other ${
        4 - createdObjects.length
      } quarks! We'll need electrons too.`;
    } else {
      return "Congrats, you've observed that all quarks decay into Up and Down quarks. At this time in the universe, protons and neutrons were made from 3 quarks each. Since all quarks decay into up and down quarks, you should try making up/down quark groups of 3.";
    }
  } else if (levelNum == 1) {
    if (!createdObjects.includes("hydrogen")) {
      return "Congrats! You've created the essential nucleons. To kickstart the formation of elements, we need to first make hydrogen, the simplest element. Try adding a proton and an electron together.";
    } else if (!createdObjects.includes("deuterium")) {
      return "Great! Now we need to make Deuterium, or Hydrogen - 2. That's Hydrogen with an extra neutron.";
    } else if (!createdObjects.includes("helium3")) {
      return "You've made Deuterium! We need to make Helium-3 now. Try blending Deuterium with a nucleon to do this.";
    } else if (!createdObjects.includes("tritium")) {
      return "You just made Helium-3! Try blending Helium-3 with a nucleon to make Tritium, or Hydrogen-3.";
    } else if (!createdObjects.includes("helium4")) {
      return "Nice work. You're at the final stretch - you need to make Helium-4 next. Try to blend Tritium with another Hydrogen isotope (Hydrogen-1, 2, or 3).";
    } else if (!createdObjects.includes("beryllium")) {
      return "The universe loses some of its dazzling heat. We can now make Beryllium. Try to blend two isotopes of Helium";
    } else if (!createdObjects.includes("lithium")) {
      return "The universe gets a little less hot. To kickstart the formation of stars, finally, try to blend a Hydrogen isotope with a Helium isotope.";
    } else {
      return "Stars form!";
    }
  } else {
    return "You won! Stars begin to form and the rest of the periodic table fills out over hundreds of millions of years.";
  }
};

const data = {
  defaultCreationObjects,
  objectsToComplete,
  validCombinations,
  findCombinationKeys,
  arrToCombinations,
  getEmissionsFromComboArr,
  displayInstructions,
};

export default data;

// console.log("CIRCLE");
// console.log(
//   `objectsToComplete[levelNum] (CIRCLE): `,
//   objectsToComplete[levelNum]
// );
// console.log(`createdObjects (CIRCLE): `, createdObjects);
// console.log(`levelNum (CIRCLE)`, levelNum);
// console.log(`creationObjects (CIRCLE): `, creationObjects);
// console.log(`checkWinRound (CIRCLE): `, checkWinRound(createdObjects));
