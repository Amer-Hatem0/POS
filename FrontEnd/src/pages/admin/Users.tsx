import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { Trash2, Pencil, Plus, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface User {
  userId: string;
  fullName: string;
  email: string;
  role: string;
}

const defaultForm = {
  fullName: "",
  email: "",
  password: "",
  role: "Admin",
  currentPassword: "",
  newPassword: "",
};

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ ...defaultForm });
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/auth/users");
      setUsers(res.data);
    } catch {
      toast.error("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  const openDeleteConfirm = (userId: string) => {
    setUserToDelete(userId);
    setDeleteConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (!userToDelete) return;
    try {
      await axios.delete(`/auth/delete/${userToDelete}`);
      setUsers(users.filter((u) => u.userId !== userToDelete));
      toast.success("User deleted successfully.");
      setDeleteConfirmOpen(false);
      setUserToDelete(null);
    } catch {
      toast.error("Failed to delete user.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (editId) {
        const dataToUpdate: any = {
          fullName: formData.fullName,
          email: formData.email,
          role: formData.role,
        };
        if (formData.newPassword.trim() !== "") {
          dataToUpdate.password = formData.newPassword;
        }

        await axios.put(`/auth/update/${editId}`, dataToUpdate);
        toast.success("User updated successfully.");
      } else {
        await axios.post("/auth/create", {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        });
        toast.success("User created successfully.");
      }

      setFormData({ ...defaultForm });
      setEditId(null);
      setOpen(false);
      fetchUsers();
    } catch (err: any) {
      const message = err?.response?.data || "Unknown error";
      setError(typeof message === "string" ? message : JSON.stringify(message));
      toast.error("Failed to save user.");
    }
  };

  const openAddModal = () => {
    setFormData({ ...defaultForm });
    setEditId(null);
    setShowPassword(false);
    setError(null);
    setOpen(true);
  };

  const openEditModal = (user: User) => {
    setFormData({
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      currentPassword: "********",
      newPassword: "",
      password: "", // won't be used in edit
    });
    setEditId(user.userId);
    setShowPassword(false);
    setError(null);
    setOpen(true);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <Button onClick={openAddModal}>
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users List</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-gray-600">Loading users...</p>
          ) : users.length === 0 ? (
            <p className="text-sm text-gray-600">No users found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border text-sm text-left">
                <thead className="bg-[#f1f5f9]">
                  <tr>
                    <th className="px-4 py-2 border">Full Name</th>
                    <th className="px-4 py-2 border">Email</th>
                    <th className="px-4 py-2 border">Role</th>
                    <th className="px-4 py-2 border text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.userId}>
                      <td className="px-4 py-2 border">{user.fullName}</td>
                      <td className="px-4 py-2 border">{user.email}</td>
                      <td className="px-4 py-2 border">{user.role}</td>
                      <td className="px-4 py-2 border text-center flex gap-2 justify-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditModal(user)}
                        >
                          <Pencil className="w-4 h-4 mr-1" /> Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => openDeleteConfirm(user.userId)}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editId ? "Edit User" : "Add User"}</DialogTitle>
          </DialogHeader>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div>
              <Label>Full Name</Label>
              <Input
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            {editId && (
              <div>
                <Label>Current Password</Label>
                <Input value={formData.currentPassword} disabled type="password" />
              </div>
            )}

            <div>
              <Label>{editId ? "New Password (optional)" : "Password"}</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={editId ? formData.newPassword : formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ...(editId
                        ? { newPassword: e.target.value }
                        : { password: e.target.value }),
                    })
                  }
                  required={!editId}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-1"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div>
              <Label>Role</Label>
              <select
                className="w-full border rounded px-3 py-2"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="Admin">Admin</option>
                <option value="Publisher">Publisher</option>
              </select>
            </div>
            <Button type="submit" className="w-full">
              {editId ? "Update User" : "Create User"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this user.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
