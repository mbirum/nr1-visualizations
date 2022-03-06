import {
    Popover, 
    PopoverBody, 
    PopoverTrigger
  } from 'nr1';
import Hexagon from "react-hexagon";
import isFunction from "lodash/isFunction";

const tryInvoke = (func, params = [], defaultValue = null) => {
    return isFunction(func) ? func(...params) : defaultValue;
  };
  
const renderHexagonContent = (label) => {
    return (
        <text
        x="50%"
        y="56%"
        fontSize={100}
        fontWeight="lighter"
        style={{ fill: "white" }}
        textAnchor="middle"
        >
        {label}
        </text>
    );
};

const Hex = props => {

    return (
        <Popover>
            <PopoverTrigger>
                <Hexagon className="hex" style={{ fill: `${props.sli.color}`, stroke: "none", strokeWidth: props.strokeWidth }} >
                    {tryInvoke(renderHexagonContent, [props.sli.id], <tspan />)}
                </Hexagon>
            </PopoverTrigger>
            <PopoverBody>
                <div className="popover-text">
                    <p>{props.sli.id}</p>
                    <p>asdfasdfasdfasdf</p>
                    <p>nvioerwjoi</p>
                    <p>popwoj</p>
                    <p>qwqwqqw</p>
                    <p>ojjwnvninvindiwnowdonvowdvmowodmvw</p>
                </div>
            </PopoverBody>
        </Popover>
    );
};

export default Hex;