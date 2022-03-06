const sliAttainment = `
FROM Metric 
SELECT clamp_max(count(newrelic.sli.good) / count(newrelic.sli.valid) * 100, 100) as 'Attainment' 
WHERE sli.id = '#sliId' 
SINCE #since 
TIMESERIES AUTO
`;

export const { sliAttainment };