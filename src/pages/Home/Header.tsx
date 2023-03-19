"use-strict";

import { useMemo } from "react";
import { Layout, Typography, Avatar, Dropdown, MenuProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import useStore, { IStateStores } from "stores";
import {
  LOCAL_STORAGE_FIRST_NAME,
  LOCAL_STORAGE_LAST_NAME,
} from "common/constants";

const { Title } = Typography;
const { Header: AntHeader } = Layout;

const selector = ({ home }: IStateStores) => ({
  signOut: home.signOut,
});
export default function Header() {
  const { signOut } = useStore(selector);
  const firstName = localStorage.getItem(LOCAL_STORAGE_FIRST_NAME) || "";
  const lastName = localStorage.getItem(LOCAL_STORAGE_LAST_NAME) || "";

  const name = useMemo(() => firstName + " " + lastName, [firstName, lastName]);

  const items: MenuProps["items"] = useMemo(
    () => [
      {
        key: "1",
        label: <div onClick={signOut}>Sign out</div>,
      },
    ],
    [signOut]
  );

  return (
    <Layout>
      <AntHeader className="w-full fixed top-0 left-0">
        <div style={{ width: "fit-content", marginLeft: "auto" }}>
          <Dropdown menu={{ items }}>
            <span className="flex" style={{ color: "white" }}>
              <span>
                <Avatar
                  style={{ backgroundColor: "#1890ff" }}
                  icon={!lastName[0] && <UserOutlined />}
                >
                  {lastName[0]}
                </Avatar>
              </span>
              <Title
                level={5}
                style={{ color: "white", margin: "auto", marginLeft: 4 }}
              >
                {name}
              </Title>
            </span>
          </Dropdown>
        </div>
      </AntHeader>
    </Layout>
  );
}
