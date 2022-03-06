import React from 'react';
import PropTypes from 'prop-types';
import {
    Card, 
    CardBody, 
    HeadingText, 
    AutoSizer
} from 'nr1';
import Grid from './Grid';

export default class JourneySlosVisualization extends React.Component {
    
    static propTypes = {
        groupName: PropTypes.string,
        entityGuid: PropTypes.string,
        slis: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string,
                critical: PropTypes.number,
                warning: PropTypes.number
            })
        )
    };


    render() {
        const { slis, entityGuid, groupName } = this.props;

        const propsAvailable = 
            slis && 
            slis.length > 0 &&
            slis[0].id != "";

        if (!propsAvailable) {
            return <EmptyState />;
        }

        return (
            <AutoSizer>
                {({width, height}) => (
                    <>
                        <div className="group-name">{groupName}</div>
                        <Grid guid={entityGuid} slis={slis} />
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
