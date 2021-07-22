import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Ring from "./Ring";
import data from "./data.js";
const _ = require("underscore");

const { defaultCreationObjects, objectsToComplete, displayInstructions } = data;

function App() {
  let [levelNum, setLevel] = useState(0);
  let [chosenCombo, setCombo] = useState([]);
  let [createdObjects, setCreatedObjects] = useState([]);
  let [creationObjects, setCreationObjects] = useState(
    defaultCreationObjects[0]
  );
  let [message, setMessage] = useState("");

  const checkWinRound = (createdObjects) => {
    let hasCreatedAll = true;
    if (createdObjects) {
      objectsToComplete[levelNum].forEach((completedObject) => {
        if (!createdObjects.includes(completedObject)) {
          hasCreatedAll = false;
        }
      });
    } else {
      hasCreatedAll = false;
    }
    return hasCreatedAll;
  };

  return (
    <div className="App">
      <div className="instructions">{`${displayInstructions(
        levelNum,
        createdObjects
      )}`}</div>
      <Ring
        creationObjects={_.uniq(creationObjects)}
        createdObjects={_.uniq(createdObjects)}
        objectsToComplete={objectsToComplete}
        chosenCombo={chosenCombo}
        message={message}
        levelNum={levelNum}
        setCombo={setCombo}
        setCreatedObjects={setCreatedObjects}
        setCreationObjects={setCreationObjects}
        checkWinRound={checkWinRound}
        setLevel={setLevel}
        setMessage={setMessage}
      />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="instructions">{`${
        message ||
        "Click any particles on the wheel to add them to your blender. Then blend them to make the new particle."
      }`}</div>
    </div>
  );
}

export default App;
