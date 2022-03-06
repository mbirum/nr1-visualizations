const sliAttainmentQuery = `
FROM Metric 
SELECT clamp_max(count(newrelic.sli.good) / count(newrelic.sli.valid) * 100, 100) as 'Attainment' 
WHERE sli.id = '#sliId' 
SINCE #since 
`;

const sliAttainmentTimeseriesQuery = `
FROM Metric 
SELECT #critical as 'SLO', clamp_max(count(newrelic.sli.good) / count(newrelic.sli.valid) * 100, 100) as 'Attainment' 
WHERE sli.id = '#sliId' 
SINCE #since 
TIMESERIES MAX
`;

export { sliAttainmentQuery, sliAttainmentTimeseriesQuery };