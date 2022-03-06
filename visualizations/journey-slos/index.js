import React from 'react';
import PropTypes from 'prop-types';
import {
    Card, 
    CardBody, 
    HeadingText, 
    AutoSizer
} from 'nr1';
import Grid from './Grid';
import { sliAttainment } from './nrql/queries';

const criticalColor = "#bf362c";
const warningColor = "#d9c743";
const goodColor = "#24a359";

export default class JourneySlosVisualization extends React.Component {
    
    static propTypes = {
        journeyName: PropTypes.string,
        slis: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string,
            })
        )
    };


    render() {
        const { slis, journeyName } = this.props;

        const propsAvailable = 
            slis && 
            slis.length > 0 &&
            slis[0].id != "";

        if (!propsAvailable) {
            return <EmptyState />;
        }

        let richSlis = [];
        for (let i = 0; i < slis.length; i++) {
            let richSli = {
                id: slis[i].id,
                color: (slis[i].id == 0) ? goodColor : (slis[i].id == 1) ? criticalColor : warningColor
            };
            richSlis.push(richSli);
        }

        return (
            <AutoSizer>
                {({width, height}) => (
                    <>
                        <div className="journey-name">{journeyName}</div>
                        <Grid slis={richSlis} />
                    </>
                )}
            </AutoSizer>
        );
    }
}

const EmptyState = () => (
    <Card className="EmptyState">
        <CardBody className="EmptyState-cardBody">
            <HeadingText
                spacingType={[HeadingText.SPACING_TYPE.LARGE]}
                type={HeadingText.TYPE.HEADING_3}
            >
                Please provide at least one SLI ID
            </HeadingText>
        </CardBody>
    </Card>
);

const ErrorState = (props) => (
    <Card className="ErrorState">
        <CardBody className="ErrorState-cardBody">
            <HeadingText
                className="ErrorState-headingText"
                spacingType={[HeadingText.SPACING_TYPE.LARGE]}
                type={HeadingText.TYPE.HEADING_3}
            >
                Oops! Something went wrong.
            </HeadingText>
            {props.message}
        </CardBody>
    </Card>
);
