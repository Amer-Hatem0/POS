import { useEffect, useMemo, useState } from "react";
import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { Trash2, Pencil, Plus, Eye, EyeOff, Download, ChevronLeft, ChevronRight } from "lucide-react";
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

type SortKey = "fullName" | "email" | "role";

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

  const [q, setQ] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("");

  const [selected, setSelected] = useState<string[]>([]);

  const [sortBy, setSortBy] = useState<SortKey>("fullName");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchUsers = async () => {
    try {
      setLoading(true);
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
      const target = users.find((u) => u.userId === userToDelete);
      if (target?.role === "Admin") {
        toast.error("Cannot delete an Admin user.");
        setDeleteConfirmOpen(false);
        setUserToDelete(null);
        return;
      }
      await axios.delete(`/auth/delete/${userToDelete}`);
      setUsers((prev) => prev.filter((u) => u.userId !== userToDelete));
      setSelected((prev) => prev.filter((id) => id !== userToDelete));
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
      password: "",
    });
    setEditId(user.userId);
    setShowPassword(false);
    setError(null);
    setOpen(true);
  };

  const toggleAll = (checked: boolean) => {
    setSelected(checked ? pagedItems.map((u) => u.userId) : []);
  };

  const toggleOne = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const onHeaderSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDir("asc");
    }
  };

  const exportCsv = () => {
    const headers = ["Full Name", "Email", "Role"];
    const rows = pagedItems.map((u) => [u.fullName, u.email, u.role]);
    const csv =
      [headers.join(","), ...rows.map((r) => r.map((x) => `"${(x ?? "").toString().replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const bulkDelete = async () => {
    const targets = users.filter((u) => selected.includes(u.userId));
    const deletable = targets.filter((u) => u.role !== "Admin");
    const adminCount = targets.length - deletable.length;
    if (deletable.length === 0) {
      toast.error("No deletable users in selection.");
      return;
    }
    try {
      await Promise.all(deletable.map((u) => axios.delete(`/auth/delete/${u.userId}`)));
      setUsers((prev) => prev.filter((u) => !deletable.some((d) => d.userId === u.userId)));
      setSelected([]);
      if (adminCount > 0) toast("Skipped Admin users.", { icon: "⚠️" });
      toast.success("Selected users deleted.");
    } catch {
      toast.error("Failed to delete some users.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    let arr = [...users];
    if (ql) {
      arr = arr.filter(
        (u) =>
          u.fullName.toLowerCase().includes(ql) ||
          u.email.toLowerCase().includes(ql)
      );
    }
    if (roleFilter) {
      arr = arr.filter((u) => u.role === roleFilter);
    }
    arr.sort((a, b) => {
      const av = a[sortBy] ?? "";
      const bv = b[sortBy] ?? "";
      const cmp = String(av).localeCompare(String(bv), undefined, { sensitivity: "base" });
      return sortDir === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [users, q, roleFilter, sortBy, sortDir]);

  const total = filtered.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, pageCount) || 1;
  const pagedItems = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [q, roleFilter, pageSize]);

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <div className="flex gap-2">
         
          <Button onClick={openAddModal}><Plus className="w-4 h-4 mr-2" /> Add User</Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-4">
        <div className="flex gap-2 items-center">
          <Input placeholder="Search by name or email..." value={q} onChange={(e) => setQ(e.target.value)} className="w-64" />
          <select
            className="border rounded px-3 py-2"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">All roles</option>
            <option value="Admin">Admin</option>
            <option value="Publisher">Publisher</option>
          </select>
        </div>
        {selected.length > 0 && (
          <div className="p-2 bg-amber-50 border rounded flex gap-2 items-center">
            <span>{selected.length} selected</span>
            <Button size="sm" variant="destructive" onClick={bulkDelete}>
              <Trash2 className="w-4 h-4 mr-1" /> Delete Selected
            </Button>
          </div>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users List</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-gray-600">Loading users...</p>
          ) : total === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-sm text-gray-600 mb-3">No users found.</p>
              <Button onClick={openAddModal}><Plus className="w-4 h-4 mr-2" /> Create your first user</Button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full border text-sm text-left">
                  <thead className="bg-[#f1f5f9]">
                    <tr>
                      <th className="px-4 py-2 border w-10">
                        <input
                          type="checkbox"
                          className="h-4 w-4"
                          checked={pagedItems.length > 0 && selected.length > 0 && pagedItems.every((u) => selected.includes(u.userId))}
                          onChange={(e) => toggleAll(e.target.checked)}
                        />
                      </th>
                      <th className="px-4 py-2 border cursor-pointer select-none" onClick={() => onHeaderSort("fullName")}>
                        Full Name {sortBy === "fullName" ? (sortDir === "asc" ? "↑" : "↓") : ""}
                      </th>
                      <th className="px-4 py-2 border cursor-pointer select-none" onClick={() => onHeaderSort("email")}>
                        Email {sortBy === "email" ? (sortDir === "asc" ? "↑" : "↓") : ""}
                      </th>
                      <th className="px-4 py-2 border cursor-pointer select-none" onClick={() => onHeaderSort("role")}>
                        Role {sortBy === "role" ? (sortDir === "asc" ? "↑" : "↓") : ""}
                      </th>
                      <th className="px-4 py-2 border text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagedItems.map((user) => (
                      <tr key={user.userId} className="hover:bg-slate-50">
                        <td className="px-4 py-2 border">
                          <input
                            type="checkbox"
                            className="h-4 w-4"
                            checked={selected.includes(user.userId)}
                            onChange={() => toggleOne(user.userId)}
                          />
                        </td>
                        <td className="px-4 py-2 border">{user.fullName}</td>
                        <td className="px-4 py-2 border">{user.email}</td>
                        <td className="px-4 py-2 border">
                          <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${user.role === "Admin" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-2 border">
                          <div className="flex gap-2 justify-center">
                            <Button variant="outline" size="sm" onClick={() => openEditModal(user)}>
                              <Pencil className="w-4 h-4 mr-1" /> Edit
                            </Button>
                            {user.role !== "Admin" && (
                              <Button variant="destructive" size="sm" onClick={() => openDeleteConfirm(user.userId)}>
                                <Trash2 className="w-4 h-4 mr-1" /> Delete
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Page {safePage} of {pageCount} • {total} users
                  </span>
                  <select
                    className="border rounded px-2 py-1"
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                  >
                    <option value={5}>5 / page</option>
                    <option value={10}>10 / page</option>
                    <option value={20}>20 / page</option>
                    <option value={50}>50 / page</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={safePage <= 1}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" /> Prev
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                    disabled={safePage >= pageCount}
                  >
                    Next <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

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
