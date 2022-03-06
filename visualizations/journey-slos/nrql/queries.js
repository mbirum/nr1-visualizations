const sliAttainmentQuery = `
FROM Metric 
SELECT clamp_max(count(newrelic.sli.good) / count(newrelic.sli.valid) * 100, 100) as 'Attainment' 
WHERE sli.id = '#sliId' 
SINCE #since 
`;

const sliAttainmentTimeseriesQuery = `
FROM Metric 
SELECT round(clamp_max(count(newrelic.sli.good) / count(newrelic.sli.valid) * 100, 100),1.11) as 'Attainment' 
WHERE sli.id = '#sliId' 
SINCE #since 
TIMESERIES MAX
`;

export { sliAttainmentQuery, sliAttainmentTimeseriesQuery };