import React from "react";
import AppTableItem from "./AppTableItem";
import { Box } from "@mui/system";
import "./AppTable.css";

export default class AppTable extends React.Component {

  onEditClick = (itemId) => {
    this.props.onEditClick && this.props.onEditClick(itemId);
  }

  onRemoveClick = (itemId) => {
    this.props.onRemoveClick && this.props.onRemoveClick(itemId);
  }

  render() {
    const { items, titleKey, keysLabels } = this.props;
    const appTableItems = items.map((item, index) => (
      <Box className=".item-container" key={index}>
        <AppTableItem
          id={item.id}
          title={this.props.fnFormat ? this.props.fnFormat(item[titleKey]) : item[titleKey]}
          fields={item}
          keysLabels={keysLabels}
          onEditClick={this.onEditClick}
          onRemoveClick={this.onRemoveClick}
        />
      </Box>
    ));

    return appTableItems;
  }
}
