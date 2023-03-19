import { useEffect, useMemo } from "react";
import { Button, Col, Row, Table, Typography } from "antd";
import useStore, { IStateStores } from "stores";
import { PlusOutlined } from "@ant-design/icons";
import { camelToUnderscore } from "common/helper";
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  ORDERING,
} from "common/constants";
import ModalAdd from "./ModalAdd";
import { mapDataToView } from "./helper";
import { COLUMNS } from "./constants";
import type { TableProps } from "antd/es/table";

const { Title } = Typography;

const selector = (state: IStateStores) => ({
  initData: state.invoices.initData,
  fetchInvoices: state.invoices.fetchInvoices,
  handleOpenModalAdd: state.invoices.handleOpenModalAdd,
  data: state.invoices.data.data,
  loading: state.invoices.data.loading,
  current: state.invoices.data.pageNum,
  pageSize: state.invoices.data.pageSize,
  total: state.invoices.data.total,
});

export default function Invoices() {
  const {
    initData,
    fetchInvoices,
    handleOpenModalAdd,
    data,
    total,
    loading,
    current,
    pageSize,
  } = useStore(selector);

  const onChange: TableProps<any>["onChange"] = (
    pagination,
    filters,
    sorter: any,
    extra
  ) => {
    fetchInvoices({
      pageNum: pagination.current || DEFAULT_PAGE_NUMBER,
      pageSize: pagination.pageSize || DEFAULT_PAGE_SIZE,
      sortBy: sorter?.order && camelToUnderscore(sorter?.field || ""),
      ordering: ORDERING[sorter?.order ? sorter?.order : "undefined"],
    });
  };

  const dataView = useMemo(() => mapDataToView(data), [data]);

  useEffect(() => {
    initData();
  }, [initData]);

  return (
    <>
      <ModalAdd />
      <Table
        title={() => (
          <Row>
            <Col flex="auto">
              <Title level={4} className="m-auto">
                Invoices
              </Title>
            </Col>
            <Col>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleOpenModalAdd}
              >
                Add
              </Button>
            </Col>
          </Row>
        )}
        showSorterTooltip={false}
        pagination={{ current, pageSize, total }}
        columns={COLUMNS}
        dataSource={dataView}
        onChange={onChange}
        loading={loading}
      />
    </>
  );
}
