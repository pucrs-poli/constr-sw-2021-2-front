import { Edit, Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import './UserTableItem.css';

export default class AppTableItem extends React.Component {

    onEditClick = () => {
        this.props.onEditClick(this.props.reg);
    }

    onRemoveClick = () => {
        this.props.onRemoveClick(this.props.reg);
    }

    render() {
        const roles = this.props.roles.map(item => (
            <Box className="item-roles">
                <p>{item}</p>
            </Box>
        ));

        return (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 3, px: 2 }} className="item">
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <div class="item-name">{this.props.name}</div>
                        <div class="item-reg">{this.props.reg}</div>
                    </Box>
                    <div class="item-email">{this.props.email}</div>
                </Box>
                <Box sx={{ display: 'flex', alignItems: "center" }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                        {roles}
                    </Box>
                    <IconButton onClick={this.onEditClick}>
                        <Edit />
                    </IconButton>
                    <IconButton onClick={this.onRemoveClick}>
                        <Delete color="error" />
                    </IconButton>
                </Box>
            </Box>
        );
    }
}