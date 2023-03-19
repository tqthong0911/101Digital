import { useCallback } from "react";
import { Layout, Space } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import useStore, { IStateStores } from "stores";

const { Title } = Typography;
const { Content } = Layout;

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
  },
};

const selector = (state: IStateStores) => ({
  signIn: state.login.signIn,
  loading: state.login.data.loading,
});

export default function Login() {
  const { signIn, loading } = useStore(selector);

  const onFinish = useCallback(
    (values: any) => {
      signIn({ email: values.email, password: values.password });
    },
    [signIn]
  );

  return (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout>
        <Content
          className="w-full h-screen pt-16"
          style={{
            backgroundImage:
              "url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center 110px",
            backgroundSize: "100%",
          }}
        >
          <div className="flex flex-row m-auto w-fit">
            <Title className="m-auto" level={3}>
              101 Digital
            </Title>
          </div>
          <Form
            name="login_form"
            className="m-auto"
            layout="vertical"
            style={{ width: 328 }}
            onFinish={onFinish}
            validateMessages={validateMessages}
            initialValues={{ remember: true }}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email"
                type="email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true }]}
            >
              <Input
                prefix={<LockOutlined />}
                placeholder="Password"
                type="password"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    </Space>
  );
}
