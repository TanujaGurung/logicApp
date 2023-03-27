import { Fragment } from "react";

const ArgsDropDown = ({
  args,
  handleArgChange,
  handleArgSelectChange,
  booleanSelector}
) => {
  return (
    <Fragment>
      {args && args.map((item, id) => {
        return (
          <div key={id}>
            <input
              type="text"
              value={item.label}
              maxLength={10}
              onChange={(e) => handleArgChange(e, id)}
            />
            <select onChange={(e) => handleArgSelectChange(e, id)}>
              {booleanSelector.map((item, id) => {
                return (
                  <option key={id} value={item.value}>
                    {item.label}
                  </option>
                );
              })}
            </select>
            <br />
            <br />
          </div>
        );
      })}
    </Fragment>
  );
};
export default ArgsDropDown