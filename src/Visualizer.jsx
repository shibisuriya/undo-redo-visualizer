import React, { useState, useRef } from "react";

const DEFAULT_STACK_SIZE = 5;

function Visualizer() {
  const [actions, setActions] = useState([]);
  const [redos, setRedos] = useState([]);
  const [stackSize, setStackSize] = useState(DEFAULT_STACK_SIZE);

  const undo = () => {
    if (actions.length > 0) {
      setActions((prevActions) => {
        return prevActions.filter((action, index) => {
          return index != prevActions.length - 1;
        });
      });
      if (redos.length < getStackSize()) {
        setRedos((prevRedos) => {
          return [...prevRedos, actions[actions.length - 1]];
        });
      } else {
        setRedos((prevRedos) => {
          const [_, ...redos] = prevRedos;
          return [...redos, actions[actions.length - 1]];
        });
      }
    } else {
      alert("There is not actions in the array.");
    }
  };

  const redo = () => {
    if (redos.length > 0) {
      setActions((prevActions) => {
        return [...prevActions, redos[redos.length - 1]];
      });
      setRedos((prevRedos) => {
        return prevRedos.filter((redo, index) => {
          return index != prevRedos.length - 1;
        });
      });
    } else {
      alert("There is nothing to redo!");
    }
  };
  const random = useRef(1);

  const changeStackSize = (newStackSize) => {
    setActions([]);
    setRedos([]);
    setStackSize(newStackSize);
  };

  const generateRandom = () => {
    return random.current++;
  };

  const addAction = () => {
    setActions((prevActions) => {
      if (prevActions.length < getStackSize()) {
        return [...prevActions, generateRandom()];
      } else {
        const [_, ...actions] = prevActions;
        return [...actions, generateRandom()];
      }
    });
  };

  const getStackSize = () => {
    return stackSize ? stackSize : 1;
  };

  return (
    <div>
      <h1>Undo / Redo</h1>
      <div>
        <h1>Stack size: {stackSize ? stackSize : 1}</h1>
        <input
          type="number"
          value={stackSize}
          onChange={(e) => changeStackSize(e.target.value)}
        />
      </div>
      <div>Actions = {JSON.stringify(actions)}</div>
      <div>Redos = {JSON.stringify(redos)}</div>
      <button onClick={addAction}>Add action</button>
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
    </div>
  );
}

export default Visualizer;
