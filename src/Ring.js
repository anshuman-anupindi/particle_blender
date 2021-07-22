import Circle from "./Circle";
import "./Ring.scss";
import data from "./data.js";

export default function Ring(props) {
  let [creationObjects, setCreationObjects] = [
    props.creationObjects,
    props.setCreationObjects,
  ];
  let [createdObjects, setCreatedObjects] = [
    props.createdObjects,
    props.setCreatedObjects,
  ];
  let [chosenCombo, setCombo] = [props.chosenCombo, props.setCombo];
  let [levelNum, setLevel] = [props.levelNum, props.setLevel];

  const chooseObject = (idx) => {
    props.setMessage("");
    setCombo([...chosenCombo, creationObjects[idx]]);
  };

  return (
    <div className="ring">
      {creationObjects.map((creationObject, idx) => (
        <button
          onClick={() => {
            chooseObject(idx);
          }}
          className={creationObject}
        >
          {`${creationObject[0].toUpperCase() + creationObject.slice(1)}`}
        </button>
      ))}
      <Circle
        levelNum={levelNum}
        setLevel={setLevel}
        setCombo={setCombo}
        chosenCombo={chosenCombo}
        creationObjects={creationObjects}
        setCreationObjects={setCreationObjects}
        createdObjects={createdObjects}
        setCreatedObjects={setCreatedObjects}
        checkWinRound={props.checkWinRound}
        message={props.message}
        setMessage={props.setMessage}
      />
    </div>
  );
}

// fix instructions
// factory button when createObject is called
// EMISSIONS!
// fix valid combinations to make progression linear
// add a winning screen - more emphasis/reward
