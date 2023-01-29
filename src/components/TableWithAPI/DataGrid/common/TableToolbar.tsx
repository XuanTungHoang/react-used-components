import React, { FC, useState } from 'react';
import isFunction from 'lodash/isFunction';
import { Button, Input, Toolbar } from '@mui/material';

interface TableToolbarProps {
  onClearSortClicked?: () => void;
  onAddClicked?: () => void;
  searchComponent?: React.ReactNode;
  advanceFilter?: React.ReactNode;
  btnCreateTitle?: string | null;
}

const TableToolbar: FC<TableToolbarProps> = (props) => {

  return (
    <Toolbar className="p-3">
      <div className="grid grid-cols-2 w-full h-full">
        <div className="flex-fill pb-2">
          {isFunction(props.onAddClicked) && (
            <Button onClick={props.onAddClicked}>
               {/* <img>PLUS IMG</img> */}
            </Button>
          )}
          {props.advanceFilter}
        </div>
        <div className="flex justify-end">{props.searchComponent}</div>
      </div>
    </Toolbar>
  );
};

export default React.memo(TableToolbar);
