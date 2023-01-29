import React, { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { useCallback } from 'react';
import get from 'lodash/get';
import filter from 'lodash/filter';
import some from 'lodash/some';
import DataTable from '../DataGrid';
import ApiClient from '../../../api/ApiClient'
import _, { debounce } from 'lodash';
import { ColumnDef, Row } from '@tanstack/react-table';
import { useSearchParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

export interface FilterComponentProps {
  onSearch?: (searchModel?: any) => void;
  onTypeFilter?: (status: string) => void;
}

export interface PageCrudHelpers {
  setFilterModel: (filterModel: any) => void;
}

interface PageCrudDataProps extends React.PropsWithChildren {
  refreshKey?: string;
  api: any;
  exceptColumns?: Array<string>;
  onCellEdit?: (model: any) => void;
  onCellDelete?: (model: any) => void;
  onCreateClicked?: () => void;
  filterComponent?: (props: FilterComponentProps) => React.ReactNode;
  onTextSearch?: (helpers: PageCrudHelpers, evt: string) => void;
  checkCellEditable?: (model: any) => boolean;
  checkCellDeletable?: (model: any) => boolean;
  checkCellCreatable?: () => boolean;
  renderCellButtons?: (data: any) => React.ReactNode;
  columns: any;
  rowOnClick?: (row: Row<any>) => void;
  disabledRowOnClick?: boolean;
}

const PageCrudData: FC<PageCrudDataProps> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultMaxResultCount = 10;
  const defaultPagingModel = useMemo(() => {
    const pagingModel: any = {
      limit: defaultMaxResultCount,
      page: Number(searchParams.get('page')) || 1
    }
    return pagingModel
  }, [searchParams])
  
  const defaultFilterModel = useMemo(() => {
    searchParams.get('keyword');
    const filterModel: any = {
      keyword: searchParams.get('keyword')
    }
    return filterModel
  }, [searchParams])
  const [pagingModel, setPagingModel] = useState(defaultPagingModel);
  const [sortModel, setSortModel] = useState<any>({});
  const [filterModel, setFilterModel] = useState<any>(defaultFilterModel);
  const debounceFilterModal = debounce(filterModel, 500);

  const fetchingData = React.useCallback(
    async (page: any) => {
      const { data } = await ApiClient.get(props.api, {
        ...page,
        ...sortModel,
        ...filterModel,
      });
      return data;
    },
    [sortModel, filterModel, props.refreshKey, props.api],
  );

  const dataQuery = useQuery(
    [pagingModel, sortModel, debounceFilterModal, props.refreshKey, props.api],
    () => fetchingData(pagingModel),
    {
      keepPreviousData: true,
    },
  );

  const { status, data, error, isFetching, isPreviousData, isLoading, isSuccess } =
    dataQuery;


  const dataTotal = useMemo(() => {
    if (data && data.total) {
      return data.total;
    }
    return 1;
  }, [data]);

  const handlePageChange = useCallback(
    (page: number) => {
      console.log({ page });
      if (page > 0) {
        setSearchParams((pre:any) => ({ ...pre, page: page.toString() }))
        setPagingModel({ ...pagingModel, page })
      };
    },
    [pagingModel],
  );

  const handleChangeRowsPerPage = useCallback(
    (value: number) => {
      console.log({ value });
      setPagingModel({ page: 1, limit: value });
    },
    [pagingModel],
  );

  const handleClearSortClicked = () => {
    setSortModel({});
  };

  const columnsWithNo = useMemo(() => {
    const column: ColumnDef<any, any> = {
      accessorKey: '',
      id: 'No',
      cell: (info:any) =>
        info.row.index +
        1 +
        pagingModel.page * pagingModel.limit -
        pagingModel.limit,
      header: () => <span>No</span>,
      footer: (props:any) => props.column.id,
    };
    return [column, ...props.columns];
  }, [props.columns, pagingModel]);

  console.log({filterModel});

  return (
    <Box sx={{ display: 'flex', height: '100%', overflowY: 'auto' }}>
      {props.children}
      <DataTable
        data={get(data, 'data', [])}
        isLoading={isLoading}
        pagingModel={pagingModel}
        enableSearch
        renderCellButtons={props.renderCellButtons}
        simpleSearch={{
          onTextSearch: debounce((keyword: string) => {
            setFilterModel({ ...filterModel, keyword });
            setPagingModel({ ...pagingModel, page: 1 });
            setSearchParams((pre:any) => ({ ...pre, keyword, page: '1' }))
          }, 300),
          defaultValue: filterModel.keyword
        }}
        simpleFilter={{
          onFilter: (status: string) => {
            setFilterModel({ ...filterModel, status });
          },
        }}
        advanceFilter={props.filterComponent?.({
          onSearch: (data) => setFilterModel((prev: any) => ({ ...prev, ...data })),
          onTypeFilter: (data) =>
            setFilterModel((prev:any) => ({ ...prev, status: data })),
        })}
        checkCellCreatable={props.checkCellCreatable}
        checkCellEditable={props.checkCellEditable}
        checkCellDeletable={props.checkCellDeletable}
        onCellDelete={props.onCellDelete}
        onCreate={props.onCreateClicked}
        onCellEdit={props.onCellEdit}
        onClearSortClicked={handleClearSortClicked}
        // handleToggleSort={handleToggleSort}
        handlePageChange={handlePageChange}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        maxResultCount={pagingModel.limit ?? defaultMaxResultCount}
        totalCount={dataTotal}
        columns={filter(
          columnsWithNo,
          (cc) => !some(props.exceptColumns, (ex) => ex === get(cc, 'accessorKey')),
        )}
        rowOnClick={props.rowOnClick}
        disabledRowOnClick={props.disabledRowOnClick}
        // enableFooter={Boolean(props.apiTotal)}
      />
    </Box>
  );
};

export default PageCrudData;
