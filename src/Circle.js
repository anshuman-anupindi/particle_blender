import { useEffect } from "react";
import { indexOf } from "underscore";
import "./Circle.css";
import data from "./data.js";
const _ = require("underscore");

export default function Circle(props) {
  const {
    defaultCreationObjects,
    findCombinationKeys,
    arrToCombinations,
    getEmissionsFromComboArr,
  } = data;
  let [chosenCombo, setCombo] = [props.chosenCombo, props.setCombo];
  let [createdObjects, setCreatedObjects] = [
    props.createdObjects,
    props.setCreatedObjects,
  ];
  let [creationObjects, setCreationObjects] = [
    props.creationObjects,
    props.setCreationObjects,
  ];
  let [levelNum, setLevel] = [props.levelNum, props.setLevel];
  let checkWinRound = props.checkWinRound;
  let [message, setMessage] = [props.message, props.setMessage];

  const createObject = (combo) => {
    setCreatedObjects((prevCreatedObjects) => {
      let createdObject = findCombinationKeys(arrToCombinations(combo))[0];
      if (createdObject && prevCreatedObjects) {
        let updatedCreatedObjects = [...prevCreatedObjects, createdObject];
        let isDecayedQuark =
          combo.length == 1 &&
          combo[0] != "electron" &&
          combo[0] != "down" &&
          combo[0] != "up" &&
          levelNum == 0;

        if (checkWinRound(updatedCreatedObjects)) {
          handleWinRound();
        } else if (isDecayedQuark) {
          let objectToRemove = creationObjects.indexOf(...combo);
          let newCreationObjects = creationObjects
            .slice(0, objectToRemove)
            .concat(creationObjects.slice(objectToRemove + 1));
          setCreationObjects(newCreationObjects);
        } else {
          setCreationObjects([...creationObjects, createdObject]);
        }
        return updatedCreatedObjects;
      } else {
        setMessage(
          "Oops! Looks like that doesn't make any new particles! Try again."
        );
        return prevCreatedObjects;
      }
    });
    setCombo([]);
  };

  const handleWinRound = () => {
    setCombo([]);
    setLevel(levelNum + 1);
  };

  const handleAddCombo = () => {
    createObject(chosenCombo);
  };
  useEffect(() => {
    setCreationObjects(defaultCreationObjects[levelNum]);
    setCreatedObjects([]);
  }, [levelNum]);

  return (
    <div>
      <div className="circle">
        <div onClick={handleAddCombo} className="factory">
          Blend
        </div>
        <br />
        <div>
          {chosenCombo.map((chosenObject, idx) => (
            <button
              className={`object-btn ${chosenObject}`}
              key={idx}
              style={{
                width: `80px`,
                height: `80px`,
                fontSize: `12px`,
              }}
              onClick={() =>
                setCombo(
                  chosenCombo
                    .slice(0, idx)
                    .concat(chosenCombo.slice(idx + 1, -1))
                )
              }
            >
              {`${chosenObject[0].toUpperCase() + chosenObject.slice(1)}`}
            </button>
          ))}
        </div>
      </div>
      <div className="circle">
        <p>Particle Stash </p>
        <br />
        <div>
          {createdObjects.map((createdObject, idx) => (
            <button
              className={`object-btn ${createdObject}`}
              key={idx}
              style={{
                width: `80px`,
                height: `80px`,
                fontSize: `12px`,
              }}
            >
              {`${createdObject[0].toUpperCase() + createdObject.slice(1)}`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
