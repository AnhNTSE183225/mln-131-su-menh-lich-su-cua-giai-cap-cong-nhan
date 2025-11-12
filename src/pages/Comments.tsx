import {useEffect, useState} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Avatar, AvatarFallback} from '@/components/ui/avatar';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {Label} from '@/components/ui/label';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {Edit, Plus, Star, Trash2} from 'lucide-react';
import {useAuth} from '@/hooks/use-auth';
import {
    type Comment,
    type CommentStatistics,
    createComment,
    deleteComment,
    getComments,
    getCommentStatistics,
    updateComment,
} from '@/api/comments';
import {Spinner} from '@/components/ui/spinner';
import {Alert, AlertDescription} from '@/components/ui/alert';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination';

const CATEGORIES = ['Nội dung', 'Giao diện', 'Trắc nghiệm', 'Hiệu suất', 'Khác'];

export function Comments() {
    const {user, isAuthenticated} = useAuth();
    const [comments, setComments] = useState<Comment[]>([]);
    const [statistics, setStatistics] = useState<CommentStatistics | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 10;

    // Form states
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingComment, setEditingComment] = useState<Comment | null>(null);
    const [formContent, setFormContent] = useState('');
    const [formRating, setFormRating] = useState(5);
    const [formCategory, setFormCategory] = useState(CATEGORIES[0]);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchData();
    }, [page]);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const [commentsData, statsData] = await Promise.all([
                getComments(page, pageSize),
                getCommentStatistics(),
            ]);
            setComments(commentsData.content);
            setTotalPages(commentsData.totalPages);
            setStatistics(statsData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load comments');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateComment = async () => {
        if (!user || !formContent.trim()) return;

        try {
            setSubmitting(true);
            await createComment(user.userId, {
                content: formContent,
                rating: formRating,
                category: formCategory,
            });
            setIsCreateDialogOpen(false);
            resetForm();
            fetchData();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create comment');
        } finally {
            setSubmitting(false);
        }
    };

    const handleEditComment = async () => {
        if (!user || !editingComment || !formContent.trim()) return;

        try {
            setSubmitting(true);
            await updateComment(editingComment.id, user.userId, {
                content: formContent,
                rating: formRating,
                category: formCategory,
            });
            setIsEditDialogOpen(false);
            setEditingComment(null);
            resetForm();
            fetchData();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update comment');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteComment = async (commentId: string) => {
        if (!user) return;

        try {
            await deleteComment(commentId, user.userId);
            fetchData();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete comment');
        }
    };

    const openEditDialog = (comment: Comment) => {
        setEditingComment(comment);
        setFormContent(comment.content);
        setFormRating(comment.rating);
        setFormCategory(comment.category);
        setIsEditDialogOpen(true);
    };

    const resetForm = () => {
        setFormContent('');
        setFormRating(5);
        setFormCategory(CATEGORIES[0]);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    if (loading && comments.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-4rem)]">
                <Spinner/>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div className="text-center space-y-2 flex-1">
                        <h1 className="text-4xl font-bold">Nhận Xét & Phản Hồi</h1>
                        <p className="text-muted-foreground text-lg">
                            Ý kiến của người dùng về nội dung và trải nghiệm
                        </p>
                    </div>
                    {isAuthenticated && (
                        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                            <DialogTrigger asChild>
                                <Button onClick={resetForm}>
                                    <Plus className="h-4 w-4 mr-2"/>
                                    Thêm Nhận Xét
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle>Thêm Nhận Xét</DialogTitle>
                                    <DialogDescription>
                                        Chia sẻ ý kiến của bạn về trang web
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label>Nội dung</Label>
                                        <Textarea
                                            value={formContent}
                                            onChange={(e) => setFormContent(e.target.value)}
                                            placeholder="Nhập nhận xét của bạn..."
                                            rows={5}
                                            maxLength={2000}
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            {formContent.length}/2000 ký tự
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Đánh giá</Label>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Button
                                                    key={star}
                                                    type="button"
                                                    variant={star <= formRating ? 'default' : 'outline'}
                                                    size="sm"
                                                    onClick={() => setFormRating(star)}
                                                >
                                                    <Star
                                                        className={`h-4 w-4 ${
                                                            star <= formRating ? 'fill-yellow-400 text-yellow-400' : ''
                                                        }`}
                                                    />
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Danh mục</Label>
                                        <Select value={formCategory} onValueChange={setFormCategory}>
                                            <SelectTrigger>
                                                <SelectValue/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {CATEGORIES.map((cat) => (
                                                    <SelectItem key={cat} value={cat}>
                                                        {cat}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsCreateDialogOpen(false)}
                                        disabled={submitting}
                                    >
                                        Hủy
                                    </Button>
                                    <Button onClick={handleCreateComment} disabled={submitting || !formContent.trim()}>
                                        {submitting ? 'Đang gửi...' : 'Gửi'}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>

                {error && (
                    <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {/* Statistics */}
                {statistics && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Tổng Quan Đánh Giá</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold">
                                        {statistics.averageRating.toFixed(1)}
                                    </div>
                                    <div className="flex justify-center gap-1 mt-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`h-5 w-5 ${
                                                    star <= Math.round(statistics.averageRating)
                                                        ? 'fill-yellow-400 text-yellow-400'
                                                        : 'text-gray-300'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">Trung bình</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold">{statistics.totalComments}</div>
                                    <p className="text-sm text-muted-foreground mt-1">Tổng đánh giá</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold">{statistics.satisfiedPercentage}%</div>
                                    <p className="text-sm text-muted-foreground mt-1">Hài lòng</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Comments List */}
                <div className="space-y-4">
                    {comments.length === 0 ? (
                        <Card>
                            <CardContent className="py-8 text-center text-muted-foreground">
                                Chưa có nhận xét nào. Hãy là người đầu tiên đánh giá!
                            </CardContent>
                        </Card>
                    ) : (
                        comments.map((comment) => (
                            <Card key={comment.id}>
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarFallback>{getInitials(comment.displayName)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <CardTitle className="text-lg">{comment.displayName}</CardTitle>
                                                <CardDescription>{formatDate(comment.createdAt)}</CardDescription>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="secondary">{comment.category}</Badge>
                                            {isAuthenticated && user && comment.userId === user.userId && (
                                                <div className="flex gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => openEditDialog(comment)}
                                                    >
                                                        <Edit className="h-4 w-4"/>
                                                    </Button>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="ghost" size="sm">
                                                                <Trash2 className="h-4 w-4 text-destructive"/>
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Xóa nhận xét?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Bạn có chắc chắn muốn xóa nhận xét này? Hành động
                                                                    này không thể hoàn tác.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Hủy</AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    onClick={() => handleDeleteComment(comment.id)}
                                                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                                >
                                                                    Xóa
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-1 mt-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`h-4 w-4 ${
                                                    star <= comment.rating
                                                        ? 'fill-yellow-400 text-yellow-400'
                                                        : 'text-gray-300'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-base leading-relaxed">{comment.content}</p>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                                    className={page === 0 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                />
                            </PaginationItem>
                            {Array.from({length: totalPages}, (_, i) => i).map((pageNum) => (
                                <PaginationItem key={pageNum}>
                                    <PaginationLink
                                        onClick={() => setPage(pageNum)}
                                        isActive={pageNum === page}
                                        className="cursor-pointer"
                                    >
                                        {pageNum + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                                    className={page === totalPages - 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}

                {/* Edit Dialog */}
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Chỉnh Sửa Nhận Xét</DialogTitle>
                            <DialogDescription>Cập nhật nhận xét của bạn</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Nội dung</Label>
                                <Textarea
                                    value={formContent}
                                    onChange={(e) => setFormContent(e.target.value)}
                                    placeholder="Nhập nhận xét của bạn..."
                                    rows={5}
                                    maxLength={2000}
                                />
                                <p className="text-xs text-muted-foreground">
                                    {formContent.length}/2000 ký tự
                                </p>
                            </div>
                            <div className="space-y-2">
                                <Label>Đánh giá</Label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Button
                                            key={star}
                                            type="button"
                                            variant={star <= formRating ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => setFormRating(star)}
                                        >
                                            <Star
                                                className={`h-4 w-4 ${
                                                    star <= formRating ? 'fill-yellow-400 text-yellow-400' : ''
                                                }`}
                                            />
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Danh mục</Label>
                                <Select value={formCategory} onValueChange={setFormCategory}>
                                    <SelectTrigger>
                                        <SelectValue/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CATEGORIES.map((cat) => (
                                            <SelectItem key={cat} value={cat}>
                                                {cat}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setIsEditDialogOpen(false);
                                    setEditingComment(null);
                                }}
                                disabled={submitting}
                            >
                                Hủy
                            </Button>
                            <Button onClick={handleEditComment} disabled={submitting || !formContent.trim()}>
                                {submitting ? 'Đang cập nhật...' : 'Cập nhật'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
