import { useCallback } from "react";
import moment from "moment";
import { DatePicker, Form, Input, Modal } from "antd";
import useStore, { IStateStores } from "stores";
import { FOMART_TIME_BE } from "common/constants";
import { useResetFormOnCloseModal } from "./useResetFormOnCloseModal";

const selector = ({ invoices }: IStateStores) => ({
  isOpen: invoices.data.isOpen,
  loading: invoices.data.modaLoading,
  createInvoice: invoices.createInvoice,
  handleOpenModalAdd: invoices.handleOpenModalAdd,
  handleCloseModalAdd: invoices.handleCloseModalAdd,
});

const ModalAdd = () => {
  const [form] = Form.useForm();
  const { isOpen, loading, createInvoice, handleCloseModalAdd } = useStore(
    selector
  );

  useResetFormOnCloseModal({ form, open: isOpen });

  const onOk = useCallback(() => {
    form.submit();
  }, [form]);

  const handleSubmit = useCallback(
    (values: any) => {
      createInvoice({
        dueDate: moment(values.dueDate).format(FOMART_TIME_BE),
        invoiceDate: moment(values.dueDate).format(FOMART_TIME_BE),
        invoiceNumber: values.invoiceNumber,
        description: values.description,
      });
    },
    [createInvoice]
  );

  return (
    <Modal
      title="Create Invoice"
      open={isOpen}
      onOk={onOk}
      onCancel={handleCloseModalAdd}
      destroyOnClose
      confirmLoading={loading}
    >
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Invoice Number"
          name="invoiceNumber"
          rules={[
            { required: true, message: "Please input your Invoice Number!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Invoice Date"
          name="invoiceDate"
          rules={[
            { required: true, message: "Please input your Invoice Date!" },
          ]}
        >
          <DatePicker format={"DD/MM/YYYY"} />
        </Form.Item>
        <Form.Item
          label="Due Date"
          name="dueDate"
          rules={[{ required: true, message: "Please input your Due Date!" }]}
        >
          <DatePicker format={"DD/MM/YYYY"} />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAdd;
