import { Fragment, useMemo } from "react";

const ArgsSelectedDropDown = ({ args, argsSelectedRef, setResult }) => {
  const newArgs = useMemo(() => {
    return args;
  }, [args]);

  return (
    <Fragment>
      {newArgs && (
        <select
          ref={argsSelectedRef}
          onChange={(e) => {
            setResult(e.target.value);
          }}
        >
          {newArgs.map((item, id) => {
            return (
              <option key={id} value={item.value}>
                {item.label}
              </option>
            );
          })}
        </select>
      )}
    </Fragment>
  );
};
export default ArgsSelectedDropDown;
