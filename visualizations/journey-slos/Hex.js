import {
    Popover, 
    PopoverBody, 
    PopoverTrigger,
    NerdGraphQuery
  } from 'nr1';
import { useEffect, useState } from 'react';
import Hexagon from "react-hexagon";
import isFunction from "lodash/isFunction";
import { sliAttainmentQuery, sliAttainmentTimeseriesQuery } from './nrql/queries';

const Hex = props => {
    const [attainmentValue, setAttainmentValue] = useState(0);

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
        getSliAttainment(props.sli.id).then((attainment) => {
            console.log(attainment);
            setAttainmentValue(attainment);
        });
    }, [props.sli.id, props.timerange]);

    return (
        <Popover>
            <PopoverTrigger>
                <Hexagon className="hex" style={{ fill: `${props.sli.color}`, stroke: "none", strokeWidth: props.strokeWidth }} >
                    {tryInvoke(renderHexagonContent, [attainmentValue], <tspan />)}
                </Hexagon>
            </PopoverTrigger>
            <PopoverBody>
                <div className="popover-text">
                    <p>{attainmentValue}</p>
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