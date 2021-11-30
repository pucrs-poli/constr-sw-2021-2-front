import { Edit, Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import './AppTableItem.css';

export default class AppTableItem extends React.Component {
    render() {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 3, px: 2 }} className="item">
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <div class="item-title">{this.props.title}</div>
                    <div class="item-group">{this.props.group}</div>
                    <div class="item-resources">{this.props.resources}</div>
                </Box>
                <Box sx={{ display: 'flex', alignItems: "center" }}>
                    <IconButton onClick={this.props.onEditClick}>
                        <Edit />
                    </IconButton>
                    <IconButton onClick={this.props.onDeleteClick}>
                        <Delete color="error" />
                    </IconButton>
                </Box>
            </Box>
        );
    }
}