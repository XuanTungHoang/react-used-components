import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import _ from 'lodash';
import React, { FC, useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  Row,
} from '@tanstack/react-table';

import IndeterminateCheckbox from './common/IndeterminateCheckbox';
import SimpleFilter from './common/SimpleFilter';
import {
  Box,
  CssBaseline,
  TableFooter,
  TablePagination,
  TableSortLabel,
} from '@mui/material';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import TableToolbar from './common/TableToolbar';
import { UseQueryResult } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import TableCellDelete from './common/TableCellDelete';
// import TableCellEdit from './common/TableCellEdit';
// import TablePaginationActions from './common/TablePaginationActions';
// import TableToolbar from './common/TableToolbar';
interface DataTableProps extends WithChildren<WithClassName> {
  columns: Array<any>;
  data: Array<any>;
  maxResultCount: number;
  totalCount: number;
  enableFooter?: boolean;
  selectable?: boolean;
  handlePageChange?: (page: number) => void;
  handleChangeRowsPerPage?: (page: number) => void;
  handleToggleSort?: (field: string, isSortedDesc: boolean) => void;
  onClearSortClicked?: () => void;
  onCellEdit?: (model: any) => void;
  onCellDelete?: (model: any) => void;
  onCreate?: () => void;
  simpleSearch?: {
    onTextSearch?: (evt: string) => void;
    defaultValue?: string;
  };
  simpleFilter?: {
    onFilter?: (status: string) => void;
  };
  advanceFilter?: any;
  enableSearch?: boolean;
  // (props: FilterComponentProps) => React.ReactNode;
  checkCellEditable?: (model: any) => boolean;
  checkCellDeletable?: (model: any) => boolean;
  checkCellCreatable?: () => boolean;
  renderCellButtons?: (data: any) => React.ReactNode;

  filterColumns?: Array<any>;
  filterCallback?: (filter: any) => void;
  isLoading: boolean;

  pagingModel: any;
  rowOnClick?: (row: Row<any>) => void;
  // rowOnClick: boolean;
  disabledRowOnClick?: boolean;
}

const DataTable: FC<DataTableProps> = (props) => {
  // console.log("props --->", props)
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState<Array<any>>([]);
  const { columns, data, filterColumns, pagingModel } = props;
  const location = useLocation();

  const pagination = React.useMemo(
    () => ({
      pageIndex: pagingModel.page,
      pageSize: pagingModel.limit,
    }),
    [pagingModel],
  );

  const tableState = useReactTable({
    columns,
    data,
    state: {
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    manualPagination: true,
  });

  //! old version

  // (hooks: any) => {
  //   const extendColums: Array<any> = [
  //     {
  //       id: 'id',
  //       width: 50,
  //       header: (editCellProps: any) => <div></div>,
  //       Cell: ({ row }: any) => {
  //         const cellData = _.get(row, 'original');
  //         const editable =
  //           _.isFunction(props.onCellEdit) &&
  //           _.isFunction(props.checkCellEditable) &&
  //           props.checkCellEditable(cellData);
  //         const deletable =
  //           _.isFunction(props.onCellDelete) &&
  //           _.isFunction(props.checkCellDeletable) &&
  //           props.checkCellDeletable(cellData);

  //         return (
  //           <div className="d-flex justify-content-end align-items-center">
  //             {props.renderCellButtons?.(cellData)}
  //             {/* {editable && (
  //               <TableCellEdit onClicK={() => props.onCellEdit?.(cellData)} />
  //             )}
  //             {editable && deletable && <span className="px-1"></span>}
  //             {deletable && (
  //               <TableCellDelete onClicK={() => props.onCellDelete?.(cellData)} />
  //             )} */}
  //           </div>
  //         );
  //       },
  //     },
  //   ];

  //   if (props.selectable) {
  //     const checkboxColumn = {
  //       id: 'checkbox_id',
  //       header: ({ getToggleAllRowsSelectedProps }: any) => (
  //         <div>
  //           <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
  //         </div>
  //       ),
  //       Cell: ({ row }: any) => (
  //         <div>
  //           <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
  //         </div>
  //       ),
  //     };
  //     extendColums.push(checkboxColumn);
  //   }

  //   hooks.allColumns.push((columns: any[]) => [...columns, ...extendColums]);
  // },
  const handleChangePage = (evt: any, newPage: number) => {
    setPage(newPage);
    props.handlePageChange?.(newPage + 1);
  };

  const handleChangeRowsPerPage = (event: any) => {
    props.handleChangeRowsPerPage?.(_.toNumber(event.target.value));
  };

  // const handleColumnHeaderClicked = (column: any) => {
  //   const isSortedDesc = !_.get(column, 'isSortedDesc', false);
  //   props.handleToggleSort?.(column.id, isSortedDesc);
  // };

  const filterChange = (fieldName: string, event: any, fieldType: string) => {
    const newFilter: Array<any> = [...filter];
    let searchValue = '';
    if (fieldType === 'text') {
      searchValue = event.target.value;
    }

    if (newFilter.length > 0) {
      const indexOfField = newFilter.findIndex(
        (t: any) => t?.fieldName == fieldName,
      );
      if (indexOfField > -1) {
        if (!!searchValue) {
          newFilter[indexOfField]['searchValue'] = searchValue;
        } else {
          newFilter.splice(indexOfField, 1);
        }
      } else if (!!searchValue) {
        newFilter.push({ fieldName: fieldName, searchValue: searchValue });
      }
    } else if (!!searchValue) {
      newFilter.push({ fieldName: fieldName, searchValue: searchValue });
    }

    const objectFilter = newFilter.reduce(
      (obj, item) => Object.assign(obj, { [item.fieldName]: item.searchValue }),
      {},
    );

    props.filterCallback?.(objectFilter);
    setFilter(newFilter);
  };

  // tmp navigate for order detail
  const handleOnClick = (rowItem) => {
    // comment disabledOnClick DO NOT DELETE IT PLEASEEE
    if (props.disabledRowOnClick) return;
    if (props.rowOnClick) return props.rowOnClick(rowItem);
    navigate(`${location.pathname}/${rowItem.original.id}`);
    // if (!props.rowOnClick) return;
    // navigate(`/em-brands/order-list-management/${rowItem.original.id}`);
  };

  const { getHeaderGroups, getRowModel, getAllColumns } = tableState;

  return (
    <Box className="relative" sx={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <CssBaseline />
      <TableToolbar
        searchComponent={
          <SimpleFilter
            onSearch={props?.simpleSearch?.onTextSearch}
            onClearSortClicked={props.onClearSortClicked}
            defaultValue={props?.simpleSearch?.defaultValue}
          />
        }
        onAddClicked={props.checkCellCreatable?.() ? props.onCreate : undefined}
        advanceFilter={props.advanceFilter ? props.advanceFilter : undefined}
      />
      {props.isLoading && (
        <div className="backdrop-overlay">
          {/* <div>Loading component</div> */}
        </div>
      )}
      {props.children}
      <TableContainer sx={{ height: '100%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead style={{ backgroundColor: 'var(--navbar-bg)' }}>
            {_.map(getHeaderGroups(), (headerGroup, colIdx) => (
              <TableRow key={headerGroup.id}>
                {_.map(headerGroup.headers, (header) => {
                  // let sortByProps = header.get;
                  // if (filterColumns) {
                  // sortByProps = '';
                  // }
                  const filterColumn =
                    (filterColumns &&
                      filterColumns.find(
                        (t) =>
                          t.fieldName?.toLowerCase() === header['id']?.toLowerCase(),
                      )) ||
                    null;
                  return (
                    <TableCell
                      key={header.id}
                      colSpan={header.colSpan}
                      className="wrap-header-custom">
                      <div
                        className="d-flex flex-row header-custom"
                        style={{
                          justifyContent: filterColumns ? 'center' : 'normal',
                        }}>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {{
                            asc: <TableSortLabel active={true} direction={'asc'} />,
                            desc: (
                              <TableSortLabel active={true} direction={'desc'} />
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      </div>
                      {filterColumn && (
                        <input
                          className="form-control"
                          type={filterColumn.type ?? 'text'}
                          onChange={_.debounce(
                            (event) =>
                              filterChange(
                                filterColumn?.fieldName,
                                event,
                                filterColumn.type ?? 'text',
                              ),
                            400,
                          )}
                        />
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody className="data-table">
            {_.map(getRowModel().rows, (rowItem, i) => {
              return (
                <TableRow
                  hover
                  key={rowItem.id}
                  onClick={() => handleOnClick(rowItem)}>
                  {rowItem.getVisibleCells().map((cell) => {
                    // console.log("cell item -->", cell)
                    return (
                      <TableCell
                        key={cell.id}
                        // className={!props.enableFooter ? 'custom-td' : ''}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
            {getRowModel().rows.length < 1 && (
              // className={!props.enableFooter ? 'custom-td' : ''}
              <TableRow className="h-80">
                <TableCell colSpan={getAllColumns().length} align={'center'}>
                  {!props.isLoading && 'No Data'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          {/* {props.enableFooter && (
            <TableFooter>
              {footerGroups.map((group) => (
                <TableRow {...group.getFooterGroupProps()}>
                  {group.headers.map((column) => (
                    <TableCell {...column.getFooterProps()}>
                      {column.render('Footer')}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableFooter>
          )} */}
        </Table>
      </TableContainer>
      <TablePagination
        variant="footer"
        component="div"
        count={props.totalCount}
        rowsPerPage={props.maxResultCount}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </Box>
  );
};

export default DataTable;

DataTable.defaultProps = {
  disabledRowOnClick: true,
};
