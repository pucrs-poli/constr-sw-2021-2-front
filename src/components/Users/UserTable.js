import React from "react";
import UserTableItem from "./UserTableItem";
import { Box } from "@mui/system";
import './UserTable.css';

export default class AppTable extends React.Component {
    onEditClick = (itemId) => {
        this.props.onEditClick && this.props.onEditClick(itemId);
    }
    
    onRemoveClick = (itemId) => {
        this.props.onRemoveClick && this.props.onRemoveClick(itemId);
    }    

    render() {
        const items = this.props.items
            .map(item => (
                <Box className=".item-container">
                <UserTableItem
                        id={item.id}
                        onEditClick={this.onEditClick}
                        onRemoveClick={this.onRemoveClick}
                        name={item.nome} 
                        reg={item.matricula} 
                        email={item.email} 
                        roles={item.papeis == null ? [] : item.papeis.map((item) => item.nome)}
                    />
                </Box>
            ));

        return items;
    }
}