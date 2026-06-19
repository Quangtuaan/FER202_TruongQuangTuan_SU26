import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Nav,
  Navbar,
  Row,
  Spinner,
  Table,
  Toast,
  ToastContainer,
} from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { userApi } from '../api/userApi';
import UserForm from '../components/UserForm';
import ConfirmDialog from '../components/ConfirmDialog';

function UsersPage() {
  const { currentUser, logout, updateCurrentUser } = useAuth();

  const isAdmin = currentUser?.role === 'Admin';

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const [disableTarget, setDisableTarget] = useState(null);
  const [disableLoading, setDisableLoading] = useState(false);

  const [toast, setToast] = useState(null);

  const showToast = (message, variant = 'success') => {
    setToast({
      message,
      variant,
    });
  };

  const fetchUsers = useCallback(async () => {
    if (!currentUser) return;

    setLoading(true);
    setError('');

    try {
      if (isAdmin) {
        const params = {};

        if (filterRole) {
          params.role = filterRole;
        }

        const { data } = await userApi.getAll(params);
        setUsers(data);
      } else {
        const { data } = await userApi.getById(currentUser.id);
        setUsers([data]);
      }
    } catch (err) {
      setError(err.message || 'Không tải được danh sách người dùng.');
    } finally {
      setLoading(false);
    }
  }, [currentUser, isAdmin, filterRole]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = useMemo(() => {
    if (!isAdmin) {
      return users;
    }

    const keyword = search.toLowerCase().trim();

    if (!keyword) {
      return users;
    }

    return users.filter((u) => {
      return (
        u.fullName?.toLowerCase().includes(keyword) ||
        u.email?.toLowerCase().includes(keyword) ||
        u.phone?.includes(keyword)
      );
    });
  }, [users, search, isAdmin]);

  const handleAdd = () => {
    setEditUser(null);
    setFormError('');
    setShowForm(true);
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setFormError('');
    setShowForm(true);
  };

  const handleSubmit = async (formData) => {
    setFormLoading(true);
    setFormError('');

    try {
      if (editUser) {
        let payload;

        if (isAdmin) {
          payload = {
            ...editUser,
            ...formData,
          };
        } else {
          payload = {
            ...editUser,
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
          };
        }

        const { data: updatedUser } = await userApi.update(editUser.id, payload);

        if (!isAdmin && String(editUser.id) === String(currentUser.id)) {
          updateCurrentUser(updatedUser);
        }

        showToast('Cập nhật tài khoản thành công!');
      } else {
        if (!isAdmin) {
          showToast('Bạn không có quyền thêm tài khoản.', 'danger');
          return;
        }

        await userApi.create(formData);
        showToast('Thêm tài khoản thành công!');
      }

      setShowForm(false);
      setEditUser(null);
      fetchUsers();
    } catch (err) {
      setFormError(err.message || 'Lưu dữ liệu thất bại.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDisableConfirm = async () => {
    if (!disableTarget) return;

    setDisableLoading(true);

    try {
      await userApi.patch(disableTarget.id, {
        status: 'inactive',
      });

      showToast(`Đã vô hiệu hóa tài khoản "${disableTarget.fullName}".`);
      setDisableTarget(null);
      fetchUsers();
    } catch (err) {
      showToast('Vô hiệu hóa tài khoản thất bại.', 'danger');
      setDisableTarget(null);
    } finally {
      setDisableLoading(false);
    }
  };

  const renderRoleBadge = (role) => {
    if (role === 'Admin') return <Badge bg="danger">Admin</Badge>;
    if (role === 'Manager') return <Badge bg="warning">Manager</Badge>;
    return <Badge bg="secondary">User</Badge>;
  };

  const renderStatusBadge = (status) => {
    if (status === 'active') return <Badge bg="success">Active</Badge>;
    return <Badge bg="dark">Inactive</Badge>;
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>User Manager</Navbar.Brand>

          <Nav className="ms-auto d-flex align-items-center gap-3">
            <span className="text-white">
              {currentUser?.fullName} ({currentUser?.role})
            </span>

            <Button variant="outline-light" size="sm" onClick={logout}>
              Đăng xuất
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <Container className="py-4">
        <Card className="shadow-sm">
          <Card.Body>
            <Row className="mb-3 align-items-center">
              <Col md={4}>
                <h4 className="mb-0">
                  {isAdmin ? 'Danh sách người dùng' : 'Thông tin tài khoản của tôi'}
                </h4>
              </Col>

              {isAdmin && (
                <>
                  <Col md={3}>
                    <Form.Control
                      type="text"
                      placeholder="Tìm tên, email, SĐT..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </Col>

                  <Col md={3}>
                    <Form.Select
                      value={filterRole}
                      onChange={(e) => setFilterRole(e.target.value)}
                    >
                      <option value="">Tất cả vai trò</option>
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="User">User</option>
                    </Form.Select>
                  </Col>

                  <Col md={2} className="text-end">
                    <Button variant="primary" onClick={handleAdd}>
                      + Thêm
                    </Button>
                  </Col>
                </>
              )}
            </Row>

            {error && <Alert variant="danger">{error}</Alert>}

            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" />
                <div className="mt-2">Đang tải dữ liệu...</div>
              </div>
            ) : (
              <Table bordered hover responsive className="align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Họ tên</th>
                    <th>Email</th>
                    <th>SĐT</th>
                    <th>Vai trò</th>
                    <th>Trạng thái</th>
                    <th>Ngày tạo</th>
                    <th style={{ width: '220px' }}>Hành động</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center text-muted">
                        Không có dữ liệu.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.fullName}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{renderRoleBadge(user.role)}</td>
                        <td>{renderStatusBadge(user.status)}</td>
                        <td>{user.createdAt}</td>
                        <td>
                          <div className="d-flex gap-2 flex-wrap">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => handleEdit(user)}
                            >
                              Cập nhật
                            </Button>

                            {isAdmin && (
                              <Button
                                variant="outline-danger"
                                size="sm"
                                disabled={user.status === 'inactive'}
                                onClick={() => setDisableTarget(user)}
                              >
                                Disable
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </Container>

      <UserForm
        show={showForm}
        onHide={() => setShowForm(false)}
        onSubmit={handleSubmit}
        user={editUser}
        loading={formLoading}
        error={formError}
        isAdmin={isAdmin}
      />

      <ConfirmDialog
        show={!!disableTarget}
        title="Xác nhận vô hiệu hóa"
        message={`Bạn có chắc muốn vô hiệu hóa tài khoản "${disableTarget?.fullName}" không?`}
        onCancel={() => setDisableTarget(null)}
        onConfirm={handleDisableConfirm}
        loading={disableLoading}
      />

      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={!!toast}
          onClose={() => setToast(null)}
          delay={2500}
          autohide
          bg={toast?.variant || 'success'}
        >
          <Toast.Body className="text-white">{toast?.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default UsersPage;