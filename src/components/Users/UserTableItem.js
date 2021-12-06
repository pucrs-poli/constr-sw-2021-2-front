import { Edit, Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import './UserTableItem.css';

export default class UserTableItem extends React.Component {

    onEditClick = () => {
        this.props.onEditClick(this.props.reg);
    }

    onRemoveClick = () => {
        this.props.onRemoveClick(this.props.reg);
    }

    render() {
        const roles = this.props.roles.map((item, index) => (
            <Box className="item-roles" key={index}>
                <p>{item}</p>
            </Box>
        ));

        return (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 3, px: 2 }} className="item">
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <div className="item-name">{this.props.name}</div>
                        <div className="item-reg">{this.props.reg}</div>
                    </Box>
                    <div className="item-email">{this.props.email}</div>
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