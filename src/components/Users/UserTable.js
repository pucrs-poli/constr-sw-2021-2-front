import React from "react";
import UserTableItem from "./UserTableItem";
import { Box } from "@mui/system";
import './UserTable.css';

export default class AppTable extends React.Component {
    render() {
        const items = this.props.items
            .map(item => (
                <Box className=".item-container">
                    <UserTableItem name={item.name} reg={item.reg} email={item.email} roles={item.roles} />
                </Box>
            ));

        return items;
    }
}