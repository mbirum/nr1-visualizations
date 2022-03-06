import {
    Tooltip,
    Popover, 
    PopoverBody, 
    PopoverTrigger,
    NerdGraphQuery
  } from 'nr1';
import { useEffect, useState } from 'react';
import Hexagon from "react-hexagon";
import isFunction from "lodash/isFunction";
import { sliAttainmentQuery } from './nrql/queries';
import PopChart from './PopChart';

const criticalColor = "#bf362c";
const warningColor = "#d9c743";
const goodColor = "#159663";

const Hex = props => {
    const [attainmentValue, setAttainmentValue] = useState(0);
    const [hexColor, setHexColor] = useState(goodColor);
    const [sliName, setSliName] = useState("");

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
            {label}%
            </text>
        );
    };

    async function getSliAttainment(sliId) {
        let nrqlQuery = sliAttainmentQuery.replaceAll('#sliId', sliId).replaceAll("#since", '1 week ago');
        nrqlQuery = nrqlQuery.replace(/\n/g, "");
        
        const graphqlQuery = `
            {
                actor {
                account(id: 3413998) {
                    nrql(query: "${nrqlQuery}") {
                    results
                    }
                }
                }
            }
        `;

        const attainmentResults = await NerdGraphQuery.query({query: graphqlQuery});
        return attainmentResults.data.actor.account.nrql.results[0].result;
    }

    useEffect(() => {
        if (props.serviceLevelMap && props.sli.id) {
            props.serviceLevelMap.forEach((serviceLevel) => {
                if (serviceLevel.id === props.sli.id) {
                    setSliName(serviceLevel.name);
                }
            });
        }
    }, [props.serviceLevelMap, props.sli.id]);
    
    useEffect(() => {
        getSliAttainment(props.sli.id).then((attainment) => {
            let critical = props.sli.critical;
            let warning = props.sli.warning;
            attainment = attainment.toFixed(2);
            let newColor = goodColor;

            if (critical) {
                if (!warning) {
                    warning = critical;
                }
                if (warning >= critical) {
                    if (attainment <= critical) {
                        newColor = criticalColor;
                    }
                    else if (attainment <= warning) {
                        newColor = warningColor;
                    }
                }
                else if (warning < critical) {
                    if (attainment >= critical) {
                        newColor = criticalColor;
                    }
                    else if (attainment >= warning) {
                        newColor = warningColor;
                    }
                }
            }
            setHexColor(newColor);
            setAttainmentValue(attainment);
        });
    }, [props.sli.id, props.sli.critical, props.sli.warning, props.timerange]);

    return (
        <Tooltip text={sliName}>
            <Popover>
                <PopoverTrigger>
                    <Hexagon className="hex" style={{ fill: `${hexColor}`, stroke: "none", strokeWidth: props.strokeWidth }} >
                        {tryInvoke(renderHexagonContent, [attainmentValue], <tspan />)}
                    </Hexagon>
                </PopoverTrigger>
                <PopoverBody>
                    <PopChart sli={props.sli} sliName={sliName} timerange={props.timerange}/>
                </PopoverBody>
            </Popover>
        </Tooltip>
    );
};

export default Hex;