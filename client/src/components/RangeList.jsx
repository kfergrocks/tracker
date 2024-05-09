import PropTypes from 'prop-types';
export default function RangeList({
  prefix,
  rangeItems,
  rangeValues,
  handleUpdate,
}) {
  const handleRangeItemsUpdate = (e) => {
    const newValues = { ...rangeValues };
    newValues[e.target.getAttribute('data-rangeitemid')] = e.target.value;
    handleUpdate(newValues);
  };

  const buildRangeItemsList = () => {
    const RangeItemsList = [];

    for (let i = 0; i < rangeItems.length; i++) {
      let rangeItem = rangeItems[i];
      RangeItemsList.push(
        <div key={`${prefix}-${rangeItem.id}`}>
          <div className="row mt-5">
            <div className="col-4">
              <label
                htmlFor={`${prefix}-${rangeItem.id}`}
                className="form-label"
              >
                <b>{rangeItem.name}</b>
              </label>
            </div>
            <div className="col-8">
              <input
                type="range"
                className="form-range"
                min="0"
                max="6"
                id={`${prefix}-${rangeItem.id}`}
                list={`datalist-${prefix}-${rangeItem.id}`}
                data-rangeitemid={rangeItem.id}
                value={rangeValues[rangeItem.id]}
                onChange={handleRangeItemsUpdate}
              ></input>
              <datalist id={`datalist-${prefix}-${rangeItem.id}`}>
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
              </datalist>
            </div>
          </div>
        </div>
      );
    }
    return RangeItemsList;
  };

  return <div>{buildRangeItemsList()}</div>;
}

RangeList.propTypes = {
  prefix: PropTypes.string,
  rangeItems: PropTypes.array,
  rangeValues: PropTypes.object,
  handleUpdate: PropTypes.func,
};
