import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import toast, { Toaster } from 'react-hot-toast';

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: '',
    nameAr: '',
    description: '',
    descriptionAr: '',
    image: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/Category');
      setCategories(response.data);
    } catch (error) {
      toast.error('Failed to fetch categories.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsFormLoading(true);

    const formData = new FormData();
    formData.append('Name', form.name);
    formData.append('NameAr', form.nameAr);
    formData.append('Description', form.description || '');
    formData.append('DescriptionAr', form.descriptionAr || '');
    if (form.image) formData.append('Image', form.image);

    try {
      if (form.id) {
        await api.put(`/Category/${form.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Category updated successfully!');
      } else {
        await api.post('/Category', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Category created successfully!');
      }
      resetForm();
      fetchCategories();
    } catch (error) {
      toast.error('Failed to save category.');
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleEdit = (category: any) => {
    setForm({
      id: category.id,
      name: category.name,
      nameAr: category.nameAr || '',
      description: category.description || '',
      descriptionAr: category.descriptionAr || '',
      image: null,
    });
  };

  const openDeleteDialog = (category: any) => {
    setCategoryToDelete(category);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;
    try {
      await api.delete(`/Category/${categoryToDelete.id}`);
      toast.success('Category deleted successfully!');
      fetchCategories();
      setCategoryToDelete(null);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      toast.error('Failed to delete category.');
    }
  };

  const resetForm = () => {
    setForm({
      id: null,
      name: '',
      nameAr: '',
      description: '',
      descriptionAr: '',
      image: null,
    });
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <Toaster position="top-center" reverseOrder={false} />

      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Category Management</h1>

      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="md:w-1/3 p-4 sm:p-6 border rounded-lg shadow-md bg-white">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            {form.id ? 'Edit Category' : 'Create New Category'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name (English)</Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="nameAr">Name (Arabic)</Label>
              <Input
                id="nameAr"
                name="nameAr"
                value={form.nameAr}
                onChange={handleInputChange}
                dir="rtl"
              />
            </div>
            <div>
              <Label htmlFor="description">Description (English)</Label>
              <Textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="descriptionAr">Description (Arabic)</Label>
              <Textarea
                id="descriptionAr"
                name="descriptionAr"
                value={form.descriptionAr}
                onChange={handleInputChange}
                dir="rtl"
              />
            </div>
            <div>
              <Label htmlFor="image">Category Image</Label>
              <Input
                type="file"
                id="image"
                name="image"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={isFormLoading}>
                {isFormLoading ? 'Saving...' : form.id ? 'Save Changes' : 'Create Category'}
              </Button>
              {form.id && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </div>

        <div className="md:w-2/3 p-4 sm:p-6 border rounded-lg shadow-md bg-white">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Existing Categories</h2>
          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name (EN / AR)</TableHead>
                    <TableHead>Description (EN / AR)</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category: any) => (
                    <TableRow key={category.id}>
                      <TableCell>
                        <div className="font-bold">{category.name}</div>
                        <div className="text-sm text-muted-foreground">{category.nameAr}</div>
                      </TableCell>
                      <TableCell>
                        <div>{category.description}</div>
                        <div className="text-sm text-muted-foreground">{category.descriptionAr}</div>
                      </TableCell>
                      <TableCell className="space-x-1 sm:space-x-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleEdit(category)}
                        >
                          Edit
                        </Button>
                        {/* <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => openDeleteDialog(category)}
                        >
                          Delete
                        </Button> */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the category
              <span className="font-bold"> "{categoryToDelete?.name}" </span>
              and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
