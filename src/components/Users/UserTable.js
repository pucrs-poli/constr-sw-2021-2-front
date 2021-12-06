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
                        id={item.matricula}
                        onEditClick={this.onEditClick}
                        onRemoveClick={this.onRemoveClick}
                        name={item.nome} 
                        reg={item.matricula} 
                        email={item.email} 
                        roles={item.papeis} 
                    />
                </Box>
            ));

        return items;
    }
}