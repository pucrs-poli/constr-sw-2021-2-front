import { Edit, Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import "./AppTableItem.css";

export default class AppTableItem extends React.Component {
  render() {
    const { title, keysLabels, fields } = this.props;
    return (
      <Box
        sx={{ display: "flex", justifyContent: "space-between", py: 3, px: 2 }}
        className="item"
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <div class={`item-title`}>{title}</div>
          {Object.entries(fields)
            .filter(([key]) => keysLabels[key])
            .map(([key, value]) => (
              <div
                class={`item-resources`}
              >{`${keysLabels[key]}: ${value}`}</div>
            ))}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton>
            <Edit />
          </IconButton>
          <IconButton>
            <Delete color="error" />
          </IconButton>
        </Box>
      </Box>
    );
  }
}
