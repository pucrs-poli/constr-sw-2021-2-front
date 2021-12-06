import React from "react";
import UserTableItem from "./UserTableItem";
import { Box } from "@mui/system";
import './UserTable.css';

export default class AppTable extends React.Component {
    render() {
        const items = this.props.items
            .map(item => (
                <Box className=".item-container">
                    <UserTableItem name={item.nome} reg={item.matricula} email={item.email} roles={item.papeis} />
                </Box>
            ));

        return items;
    }
}