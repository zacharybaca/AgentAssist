import './toggle-axis.css';

const ToggleAxis = () => {

    return (
        <div className="axis-toggle">
          <span>{axis === "x" ? "Horizontal" : "Vertical"}</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={axis === "y"}
              onChange={() => setAxis(axis === "x" ? "y" : "x")}
            />
            <span className="slider" />
          </label>
        </div>
    )
}

export default ToggleAxis;
