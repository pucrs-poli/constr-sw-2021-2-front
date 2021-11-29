import React from "react";
import AppTableItem from "./AppTableItem";
import { Box } from "@mui/system";
import './AppTable.css';

export default class AppTable extends React.Component {
    render() {
        const items = this.props.items
            .map(item => (
                <Box className=".item-container">
                    <AppTableItem title={item.title} group={item.group} resources={item.resources} />
                </Box>
            ));

        return items;
    }
}