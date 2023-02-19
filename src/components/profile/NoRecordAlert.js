import {Alert, Anchor, Flex} from '@mantine/core';
import { Link } from "react-router-dom"
const NoRecordAlert = ({ section, message, href }) => {
    return (
        <Alert
            m={10}
            title={`You have no ${section} added!`} >
            { message }
            <Link to={href}>Add Now</Link>
        </Alert>
    )
}
export default NoRecordAlert