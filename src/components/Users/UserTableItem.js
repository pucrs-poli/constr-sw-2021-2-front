import EditUserModal from "./EditUserModal"
import { Box } from "@mui/system"
import React from "react";
import './UserTableItem.css';
import DeleteUserModal from "./DeleteUserModal";

export default class AppTableItem extends React.Component {
    render() {
        const roles = this.props.roles.map(item => (
            <Box className="item-roles">
                <p>{item}</p>
            </Box>
        ));
        return (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 3, px: 2 }} className="item">
                <Box sx={{ display: 'flex', flexDirection: 'column'}}>
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
                    <EditUserModal/>
                    <DeleteUserModal props={this.props.reg}/>
                </Box>
            </Box>
        );
    }
}