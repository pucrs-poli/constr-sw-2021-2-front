import React from "react";
import AppTableItem from "./AppTableItem";
import { Box } from "@mui/system";
import "./AppTable.css";

export default class AppTable extends React.Component {
  render() {
    const { items, titleKey, keysLabels } = this.props;
    const appTableItems = items.map((item) => (
      <Box className=".item-container">
        <AppTableItem
          title={item[titleKey]}
          fields={item}
          keysLabels={keysLabels}
        />
      </Box>
    ));

    return appTableItems;
  }
}
