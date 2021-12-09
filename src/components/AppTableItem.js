import { Edit, Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import React from "react";
import "./AppTableItem.css";

export default class AppTableItem extends React.Component {

    onEditClick = () => {
        this.props.onEditClick(this.props.id);
    }

    onRemoveClick = () => {
        this.props.onRemoveClick(this.props.id);
    }
    onClickItem = () => {
        this.props.onClickItem(this.props.id);
    }

    render() {
        const { title, keysLabels, fields } = this.props;
        return (
            <Box
                sx={{ display: "flex", justifyContent: "space-between", py: 3, px: 2 }}
                className={`item`}
                onClick={this.props.onClickItem && this.onClickItem}
            >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <div className={`item-title`}>{title}</div>
                    {Object.entries(fields)
                        .filter(([key]) => keysLabels[key])
                        .map(([key, value], index) =>
                            key == 'link' ? (
                                <Link to={{ pathname: value }}>
                                    <div className={`item-resources link`}>{`${keysLabels[key]}`}</div>
                                </Link>
                            ) : (
                                    <div
                                        key={index}
                                        className={`item-resources`}
                                    >{`${keysLabels[key]}: ${value}`}</div>
                                )
                        )
                    }
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton onClick={(event) => { event.stopPropagation(); this.onEditClick(); }}>
                        <Edit />
                    </IconButton>
                    <IconButton onClick={(event) => { event.stopPropagation(); this.onRemoveClick(); }}>
                        <Delete color="error" />
                    </IconButton>
                </Box>
            </Box>
        );
    }
}
