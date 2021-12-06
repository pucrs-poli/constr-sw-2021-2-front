import React from "react";
import UserTableItem from "./UserTableItem";
import { Box } from "@mui/system";
import './UserTable.css';

export default class AppTable extends React.Component {
    onEditClick = (itemReg) => {
        this.props.onEditClick && this.props.onEditClick(itemReg);
    }
    
    onRemoveClick = (itemReg) => {
        this.props.onRemoveClick && this.props.onRemoveClick(itemReg);
    }    

    render() {
        const items = this.props.items
            .map(item => (
                <Box className=".item-container">
                    <UserTableItem
                        id={item.reg}
                        onEditClick={this.onEditClick}
                        onRemoveClick={this.onRemoveClick}
                        name={item.name} 
                        reg={item.reg} 
                        email={item.email} 
                        roles={item.roles} 
                    />
                </Box>
            ));

        return items;
    }
}