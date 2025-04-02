import "../../../../styles/admin/manage-account/style.scss";
import { Spin } from "antd";
import { App, Col, Input, Row, Select, Switch, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  ACCOUNT_LIST,
  TOGGLE_STATUS,
  TOGGLE_ROLE,
  DELETE_ACCOUNT,
} from "../../../../api/constants";
import { toDate } from "../../../../utils/dataUtils";
import useApi from "../../../../hooks/useApi";
import { DeleteOutlined } from "@ant-design/icons";
const ManageAccounts = () => {
  const Api = useApi();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const { message } = App.useApp();
  const [filters, setFilters] = useState({ role: null, is_active: null });
  const [loading, setLoading] = useState(false);
  const roles = [
    { label: "User", value: "user" },
    { label: "Admin", value: "admin" },
  ];
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Họ và tên",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Lần cuối đăng nhập",
      dataIndex: "last_login",
      key: "last_login",
    },
    {
      title: "Quyền",
      dataIndex: "role",
      key: "role",
      filters: [
        { text: "User", value: "user" },
        { text: "Admin", value: "admin" },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.role === value,
      render: (role, record) => {
        return (
          <Select
            className="w-[100px]"
            value={role}
            options={roles}
            onChange={(newRole) => handleChangeRole(record.id, newRole)}
          />
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "is_active",
      key: "is_active",
      filters: [
        { text: "Hoạt động", value: true },
        { text: "Dừng hoạt động", value: false },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.is_active === value,
      render: (isActive, record) => {
        return (
          <Switch
            checked={isActive}
            onChange={(checked) => handleToggleStatus(record.id, checked)}
          />
        );
      },
    },
    {
      title: "Hành động",
      render: (record) => {
        return (
          <>
            <DeleteOutlined
              onClick={() => handleDelete(record.id)}
              style={{ color: "red", fontSize: "24px", cursor: "pointer" }}
            />
          </>
        );
      },
    },
  ];
  const handleDelete = async (id) => {
    await Api.Delete(DELETE_ACCOUNT(id));
    message.success("Xóa thành công!");
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const handleChangeRole = async (id, role) => {
    await Api.Put(TOGGLE_ROLE(id), { role: role });
    message.success("Cập nhật quyền thành công!");
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === id ? { ...user, role: role } : user))
    );
  };
  const handleToggleStatus = async (id, checked) => {
    await Api.Put(TOGGLE_STATUS(id), { is_active: checked });
    message.success("Cập nhật trạng thái thành công!");
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, is_active: checked } : user
      )
    );
  };
  const data = users.map((user, index) => ({
    key: index + 1,
    id: user.id,
    stt: (currentPage - 1) * pageSize + index + 1,
    full_name: user.full_name,
    email: user.email,
    created_at: toDate(user.created_at),
    last_login: toDate(user.last_login),
    role: user.role,
    is_active: user.is_active,
  }));

  useEffect(() => {
    const fetchData = async () => {
      console.log(filters);
      const response = await Api.Get(
        ACCOUNT_LIST(currentPage, pageSize, filters)
      );
      setUsers(response.users);
      setCurrentPage(response.page);
      setTotal(response.total);
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize, filters]);
  const handleChange = (newPage, newPageSize) => {
    setLoading(true);
    setCurrentPage(newPage);
    setpageSize(newPageSize);
  };
  return (
    <>
      <div class="!mt-[24px] font-[700] text-[20px] text-[#0F1012]">
        Danh sách tài khoản
      </div>
      <Row className="!mt-[24px]" gutter={16}>
        <Col span={24}>
          <Input addonAfter={<SearchOutlined />} placeholder="" />
        </Col>
      </Row>
      <Spin spinning={loading} size="large">
        <Table
          className="!mt-[24px]"
          columns={columns}
          dataSource={data}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: total,
            showSizeChanger: true,
            onChange: handleChange,
          }}
          onChange={(_, filters) => {
            setFilters({
              role: filters.role?.[0] ?? null,
              is_active: filters.is_active?.[0] ?? null,
            });
          }}
        />
      </Spin>
    </>
  );
};

export default ManageAccounts;
