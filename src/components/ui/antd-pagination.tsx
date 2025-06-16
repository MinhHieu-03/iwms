import { Pagination, PaginationProps } from "antd";
import React from "react";

const DEFAULT_PAGINATION = {
  INITIAL_PAGE: 1,
  CURRENT_PAGE: 1,
  PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 30, 50, 100],
  TOTAL: 0,
  MAX_TAKE: 1000,
};

interface IBasePagination extends PaginationProps {
  defaultCurrent?: number;
  defaultPageSize?: number;
  current?: number;
  // currentPage: number;
  pageSize?: number;
  total: number;
  pageSizeOptions?: number[];
  onChange?: (page: number, pageSize: number) => void;
  restProps?: unknown;
}

const defaultProps: IBasePagination = {
  defaultCurrent: DEFAULT_PAGINATION.INITIAL_PAGE,
  defaultPageSize: DEFAULT_PAGINATION.PAGE_SIZE,
  current: DEFAULT_PAGINATION.CURRENT_PAGE,
  // currentPage: DEFAULT_PAGINATION.CURRENT_PAGE,
  pageSizeOptions: DEFAULT_PAGINATION.PAGE_SIZE_OPTIONS,
  total: DEFAULT_PAGINATION.TOTAL,
  onChange: () => {},
  restProps: "",
};

const BasePagination: React.FC<IBasePagination> = (props) => {
  const {
    defaultCurrent,
    defaultPageSize,
    current,
    // currentPage,
    pageSize = DEFAULT_PAGINATION.PAGE_SIZE,
    pageSizeOptions,
    total,
    onChange,
    ...restProps
  } = props;

  return (
    <div className="flex items-center justify-end mt-2">
      <Pagination
        current={current}
        pageSize={pageSize}
        defaultCurrent={defaultCurrent}
        defaultPageSize={defaultPageSize}
        total={total}
        onChange={onChange}
        pageSizeOptions={pageSizeOptions}
        showTitle={true}
        showLessItems={true}
        showSizeChanger={true}
        {...restProps}
      />
    </div>
  );
};

export default BasePagination;
