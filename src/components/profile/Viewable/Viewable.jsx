import React from 'react';
import {Card, createStyles, Flex, Title,Spoiler} from "@mantine/core";

import {FiEdit2} from "react-icons/fi";

const useStyles = createStyles((theme) => ({
    card: {

        minWidth: "100%",
        marginTop:"0px"

    }
}));

function Viewable(props) {
    const {classes} = useStyles();
    return (

        <Card  className={classes.card} withBorder radius={"md"} shadow={"sm"}>
            <Flex  justify={"space-between"}>
                <Title size={20}>About</Title>

                    <FiEdit2 size={20}/>

            </Flex>
            <Spoiler maxHeight={80} showLabel="Show more" hideLabel="Hide">
                A Software Engineer Student of NUST exploring different fields of technology mainly software development
                with CGPA 3.3 .Filled with aspiration to participate in the innovation ,along with applying skills
                gained through the process.
                Collaborated with some clients reached through freelancing websites .I believe in full satisfaction and
                dedication towards each project .Experiences in Backend Development of website with frameworks like
                Django, Flask with custom API development along with writing data extraction scripts and Automation.
                Currently Focusing on front end library like React JS.
            </Spoiler>


        </Card>


    );
}

export default Viewable;
