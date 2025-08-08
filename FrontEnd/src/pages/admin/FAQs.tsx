import { useEffect, useState } from "react";
import api from "@/lib/axios";
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from "@/components/ui/dialog";
import { Eye, EyeOff, Trash2, Edit, Save, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FAQDto {
  id?: number;
  questionEn: string;
  answerEn: string;
  questionAr?: string;
  answerAr?: string;
  displayOrder: number;
  isActive?: boolean;
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQDto[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newFaq, setNewFaq] = useState<FAQDto>({ questionEn: "", answerEn: "", questionAr: "", answerAr: "", displayOrder: 0 });
  const { toast } = useToast();
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "active" | "hidden">("all");

  const fetchFaqs = async () => {
    try {
      const res = await api.get("/FAQ");
      setFaqs(res.data);
    } catch {
      toast({ title: "Error", description: "Failed to load FAQs", variant: "destructive" });
    }
  };

  useEffect(() => { fetchFaqs(); }, []);

  const handleCreate = async () => {
    try {
      await api.post("/FAQ", newFaq);
      setNewFaq({ questionEn: "", answerEn: "", questionAr: "", answerAr: "", displayOrder: 0 });
      fetchFaqs();
      toast({ title: "Created", description: "FAQ added successfully" });
    } catch {
      toast({ title: "Error", description: "Failed to add FAQ", variant: "destructive" });
    }
  };

  const handleUpdate = async (id: number) => {
    try {
      await api.put(`/FAQ/${id}`, faqs.find(f => f.id === id));
      setEditingId(null);
      fetchFaqs();
      toast({ title: "Updated", description: "FAQ updated" });
    } catch {
      toast({ title: "Error", description: "Update failed", variant: "destructive" });
    }
  };

  const handleDelete = async () => {
    if (!pendingDeleteId) return;
    try {
      await api.delete(`/FAQ/${pendingDeleteId}`);
      fetchFaqs();
      toast({ title: "Deleted", description: "FAQ deleted" });
    } catch {
      toast({ title: "Error", description: "Delete failed", variant: "destructive" });
    } finally {
      setPendingDeleteId(null);
    }
  };

  const handleToggleStatus = async (id: number) => {
    try {
      await api.put(`/FAQ/${id}/toggle`);
      fetchFaqs();
      toast({ title: "Status changed" });
    } catch {
      toast({ title: "Error", description: "Status update failed", variant: "destructive" });
    }
  };

  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold">FAQ Management</h1>
        <p className="text-muted-foreground mt-1">Manage frequently asked questions in English and Arabic</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" /> Add New Question
          </CardTitle>
          <CardDescription>Fill in both English and Arabic versions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Question (English)" value={newFaq.questionEn} onChange={(e) => setNewFaq({ ...newFaq, questionEn: e.target.value })} />
          <Input placeholder="Question (Arabic)" value={newFaq.questionAr} onChange={(e) => setNewFaq({ ...newFaq, questionAr: e.target.value })} />
          <Textarea placeholder="Answer (English)" value={newFaq.answerEn} onChange={(e) => setNewFaq({ ...newFaq, answerEn: e.target.value })} />
          <Textarea placeholder="Answer (Arabic)" value={newFaq.answerAr} onChange={(e) => setNewFaq({ ...newFaq, answerAr: e.target.value })} />
          <Input placeholder="Display Order" type="number" value={newFaq.displayOrder} onChange={(e) => setNewFaq({ ...newFaq, displayOrder: Number(e.target.value) })} />
          <Button onClick={handleCreate}>Add Question</Button>
        </CardContent>
      </Card>

      <div className="flex justify-center mb-6">
        <Tabs value={filter} onValueChange={(value: "all" | "active" | "hidden") => setFilter(value)}>
          <TabsList>
            <TabsTrigger value="all">الكل</TabsTrigger>
            <TabsTrigger value="active">النشطة</TabsTrigger>
            <TabsTrigger value="hidden">المخفية</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {faqs
        .filter(faq => {
          if (filter === "active") return faq.isActive;
          if (filter === "hidden") return !faq.isActive;
          return true;
        })
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map((faq) => (
          <Card key={faq.id} className="relative shadow-sm border">
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant={faq.isActive ? "default" : "outline"}>{faq.isActive ? `#${faq.displayOrder} Active` : `#${faq.displayOrder} Hidden`}</Badge>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" onClick={() => handleToggleStatus(faq.id!)}>
                  {faq.isActive ? <><EyeOff className="w-4 h-4 mr-1" /> Hide</> : <><Eye className="w-4 h-4 mr-1" /> Show</>}
                </Button>
                <>
                  {editingId === faq.id ? (
                    <Button size="sm" onClick={() => handleUpdate(faq.id!)}><Save className="w-4 h-4 mr-1" />Save</Button>
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => setEditingId(faq.id)}><Edit className="w-4 h-4 mr-1" />Edit</Button>
                  )}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="destructive" onClick={() => setPendingDeleteId(faq.id!)}>
                        <Trash2 className="w-4 h-4 mr-1" /> Delete
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>This will permanently delete the FAQ.</DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setPendingDeleteId(null)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleDelete}>Yes, delete it</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              {editingId === faq.id ? (
                <>
                  <div>
                    <Label>Question (EN)</Label>
                    <Input value={faq.questionEn} onChange={(e) => setFaqs(faqs.map(f => f.id === faq.id ? { ...f, questionEn: e.target.value } : f))} />
                  </div>
                  <div>
                    <Label>Question (AR)</Label>
                    <Input value={faq.questionAr} onChange={(e) => setFaqs(faqs.map(f => f.id === faq.id ? { ...f, questionAr: e.target.value } : f))} />
                  </div>
                  <div>
                    <Label>Answer (EN)</Label>
                    <Textarea rows={3} value={faq.answerEn} onChange={(e) => setFaqs(faqs.map(f => f.id === faq.id ? { ...f, answerEn: e.target.value } : f))} />
                  </div>
                  <div>
                    <Label>Answer (AR)</Label>
                    <Textarea rows={3} value={faq.answerAr} onChange={(e) => setFaqs(faqs.map(f => f.id === faq.id ? { ...f, answerAr: e.target.value } : f))} />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Label className="text-sm text-muted-foreground">QUESTION (EN)</Label>
                    <p className="text-base font-medium">{faq.questionEn}</p>
                    <Label className="text-sm text-muted-foreground">QUESTION (AR)</Label>
                    <p className="text-base font-medium">{faq.questionAr}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">ANSWER (EN)</Label>
                    <p className="text-base">{faq.answerEn}</p>
                    <Label className="text-sm text-muted-foreground">ANSWER (AR)</Label>
                    <p className="text-base">{faq.answerAr}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
    </div>
  );
}