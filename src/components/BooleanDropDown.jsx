


const BooleanDropDown = ({constantRef,setResult,constantSelector,single}) => (
  <select
    ref={constantRef}
    name="constant"
    id="constant"
    //defaultValue={{ label: "true", value: true }}
    onChange={(e) => {
     // console.log(e.target.value);
     if(single === 1)
      setResult(e.target.value);
    }}
  >
    {constantSelector.map((item, id) => {
      return (
        <option key={id} value={item.value}>
          {item.label}
        </option>
      );
    })}
  </select>
);

export default BooleanDropDown
