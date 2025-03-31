import { App, Col, Input, Row, Select, Switch, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { ACCOUNT_LIST, TOGGLE_STATUS } from "../../../../api/constants";
import { toDate } from "../../../../utils/dataUtils";
import useApi from "../../../../hooks/useApi";
const ManageAccounts = () => {
  const Api = useApi();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const { message } = App.useApp();
  const options = [
    {
      value: "",
      label: "Trạng thái",
    },
    {
      value: "active",
      label: "Trạng thái hoạt động",
    },
    {
      value: "inactive",
      label: "Trạng thái dừng hoạt động",
    },
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
    },
    {
      title: "Trạng thái",
      dataIndex: "is_active",
      key: "is_active",
      render: (isActive, record) => {
        return (
          <Switch
            defaultChecked
            checked={isActive}
            onChange={(checked) => handleToggleStatus(record.id, checked)}
          />
        );
      },
    },
  ];
  const handleToggleStatus = async (id, checked) => {
    try {
      console.log("Cập nhật trạng thái:", id, checked); // Kiểm tra id của user
      await Api.Put(TOGGLE_STATUS(id), { is_active: checked }); // Gửi API
      message.success("Cập nhật trạng thái thành công!");
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, is_active: checked } : user
        )
      );
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
    }
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
      const response = await Api.Get(ACCOUNT_LIST(currentPage, pageSize));
      setUsers(response.users);
      setCurrentPage(response.page);
      setTotal(response.total);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize]);

  const handleChange = (newPage, newPageSize) => {
    setCurrentPage(newPage);
    setpageSize(newPageSize);
  };
  return (
    <>
      <div class="!mt-[24px] font-[700] text-[20px] text-[#0F1012]">
        Danh sách tài khoản
      </div>
      <Row className="!mt-[24px]" gutter={16}>
        <Col span={20}>
          <Input addonAfter={<SearchOutlined />} placeholder="" />
        </Col>
        <Col span={4}>
          <Select className="w-full" defaultValue="" options={options} />
        </Col>
      </Row>
      <Table
        className="!mt-[24px]"
        columns={columns}
        dataSource={data}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: total,
          onChange: handleChange,
        }}
      />
    </>
  );
};

export default ManageAccounts;
