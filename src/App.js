import { useState, useEffect, createRef, Fragment } from "react";
import "./App.css";
import ArgsDropDown from "./components/ArgsDropDown";
import BooleanDropDown from "./components/BooleanDropDown";
import ArgsSelectedDropDown from "./components/ArgSelectedDropDown";

function App() {
  const initialOptions = [
    { label: "constant", value: "constant" },
    { label: "argument", value: "argument" },
    { label: "and", value: "and" },
    { label: "or", value: "or" },
  ];
  const refs = [];
  const [selectedOptions, setSelectedOptions] = useState([initialOptions]);
  const [selected, setSelected] = useState(["initial"]);
  const [presentSelected, setPresentSelected] = useState();
  const [result, setResult] = useState();
  const booleanSelector = [
    { label: "true", value: true },
    { label: "false", value: false },
  ];

  const [args, setArg] = useState([{ label: "my arg", value: true }]);

  const handleAddArgs = () => {
    const tempArg = { label: "my arg", value: true };
    setArg((prevArray) => [...prevArray, tempArg]);
  };

  function update(index, newValue) {
    const newArray = args.map((v, i) => {
      if (i === index) return newValue;
      return v;
    });
    setArg(newArray);
  }

  function updateSelected(index, newValue) {
    const newArray = selected.map((v, i) => {
      if (i === index) return newValue;
      return v;
    });
    setSelected(newArray);
  }

  const handleArgChange = (e, id) => {
    const tempArg = { label: e.target.value, value: args[id].value };
    update(id, tempArg);
  };
  const handleArgSelectChange = (e, id) => {
    const tempArg = { label: args[id].label, value: e.target.value };
    update(id, tempArg);
  };

  useEffect(() => {
    if (selected.length === 1) {
      if (!selected.includes("initial")) {
        setResult(refs[0]?.current?.value);
      }
    } else {
      if (!selected.includes("initial")) {
        for (let i = 0; i < refs.length; i++) {
          if (refs[i]?.current?.value === "and") {
            var andResult =
              refs[i + 1]?.current?.value && refs[i + 2]?.current?.value;
            //console.log("finalResult", finalResult);
            setResult(andResult);
          }
          if (refs[i]?.current?.value === "or") {
            var orResult =
              refs[i + 1]?.current?.value || refs[i + 2]?.current?.value;
            setResult(orResult);
          }
        }
      }
    }

    const finalRefArr = refs.map((item, id) => {
      return item.current.value;
    });
    console.log("finalRefArr", finalRefArr);
  }, [refs, selected]);

  const addSelectsOptions = (id, logicOp) => {
    setPresentSelected(logicOp);
    updateSelected(id, logicOp);
    const tempOtions = initialOptions;
    setSelectedOptions((prevArray) => [...prevArray, tempOtions]);
    setSelectedOptions((prevArray) => [...prevArray, tempOtions]);
    const temp = "initial";
    setSelected((prevArray) => [...prevArray, temp]);
    setSelected((prevArray) => [...prevArray, temp]);
    setResult();
  };

  const check = (value, id) => {
    switch (value) {
      case "constant": {
        updateSelected(id, "constant");
        break;
      }
      case "argument": {
        updateSelected(id, "argument");
        break;
      }
      case "and": {
        addSelectsOptions(id, "and");
        break;
      }
      case "or": {
        addSelectsOptions(id, "or");
        break;
      }
      default: {
        updateSelected(id, "initial");
      }
    }
  };
  const onChangeSelector = (e, id) => {
    check(e.target.value, id);
  };
  const handleAddOpp = () => {
    //updateSelected(id, "initial");
    const tempOtions = initialOptions;
    setSelectedOptions((prevArray) => [...prevArray, tempOtions]);
    const temp = "initial";
    setSelected((prevArray) => [...prevArray, temp]);
    setPresentSelected();
    setResult();
  };
  //checking this error
  const onClose = (id, isLogicOp) => {
    if (isLogicOp) {
      const tempArr = selectedOptions;
      tempArr.splice(id, 2);
      const tempSelected = selected;
      tempSelected.splice(id, 2);
      setSelected(tempSelected);
      setSelectedOptions(tempArr);
      updateSelected(id, "initial");
      setPresentSelected()
      setResult();
    } else {
      updateSelected(id, "initial");
      setResult();
    }
  };

  const onChangeLogicSelector = (e, id) => {
    updateSelected(id, e.target.value);
  };
  console.log("slected", selected);
  return (
    <div>
      <div>
        <ArgsDropDown
          args={args}
          handleArgChange={handleArgChange}
          handleArgSelectChange={handleArgSelectChange}
          booleanSelector={booleanSelector}
        />
        <br />
        <button onClick={handleAddArgs}>add args</button>
      </div>
      <br />
      {selectedOptions.map((item, id) => {
        refs.push(createRef());
        return (
          <Fragment key={id}>
            {selected[id] === "initial" && (
              <select ref={refs[id]} onChange={(e) => onChangeSelector(e, id)}>
                <option value={undefined}>select...</option>

                {item.map((options, index) => {
                  return (
                    <option key={index} value={options.value}>
                      {options.label}
                    </option>
                  );
                })}
              </select>
            )}
            {selected[id] === "constant" && (
              <BooleanDropDown
                constantRef={refs[id]}
                setResult={setResult}
                constantSelector={booleanSelector}
                single={selected.length}
              />
            )}
            {selected[id] === "argument" && (
              <ArgsSelectedDropDown
                args={args}
                argsSelectedRef={refs[id]}
                setResult={setResult}
              />
            )}
            {selected[id] === "and" && (
              <Fragment>
                <select
                  ref={refs[id]}
                  onChange={(e) => onChangeLogicSelector(e, id)}
                >
                  <option value="and">and</option>
                  <option value="or">or</option>
                </select>
              </Fragment>
            )}
            {selected[id] === "or" && (
              <select
                ref={refs[id]}
                onChange={(e) => onChangeLogicSelector(e, id)}
              >
                <option value="or">or</option>
                <option value="and">and</option>
              </select>
            )}
            <span>
              <button
                onClick={() => {
                  onClose(id, selected[id] === "and" || selected[id] === "or");
                }}
              >
                <img src="/close.svg" alt="close" />
              </button>
            </span>
            <br />
          </Fragment>
        );
      })}
      <div>
        {(presentSelected === "and" || presentSelected === "or") && (
          <button onClick={() => handleAddOpp()}>add op</button>
        )}
      </div>

      <div>
        <p>result : {result ? result : "undefined"}</p>
      </div>
    </div>
  );
}

export default App;
