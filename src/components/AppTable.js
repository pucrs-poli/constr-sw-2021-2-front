import React from "react";
import AppTableItem from "./AppTableItem";
import { Box } from "@mui/system";
import './AppTable.css';

export default class AppTable extends React.Component {
    render() {
        const items = this.props.items
            .map((item, index) => (
                <Box className=".item-container" key={index}>
                    <AppTableItem onEditClick={this.props.onEditClick} onDeleteClick={this.props.onDeleteClick} title={item.title} group={item.group} resources={item.resources} />
                </Box>
            ));

        return items;
    }
}