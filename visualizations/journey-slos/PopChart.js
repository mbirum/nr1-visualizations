import React, { useEffect, useState } from "react";
import { NerdletStateContext, LineChart } from 'nr1';
import { sliAttainmentTimeseriesQuery } from './nrql/queries';

const PopChart = props => {

    useEffect(() => {

    }, [props.sli.id, props.timerange]);

    function generateQuery() {
        let query = sliAttainmentTimeseriesQuery.replaceAll("#sliId", props.sli.id).replaceAll("#since", "1 week ago");
        return query;
    }

    return (
        <NerdletStateContext.Consumer>
            {(nerdletState) => (
                <div className="popover-chart">
                    <div className="popover-name">{props.sliName}</div>
                    <LineChart
                        accountIds={[3413998]}
                        query={generateQuery()}
                        fullWidth
                    />
              </div>
                
            )}
        </NerdletStateContext.Consumer>
      );
};

export default PopChart;