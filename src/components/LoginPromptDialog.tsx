import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface LoginPromptDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginPromptDialog({ isOpen, onClose }: LoginPromptDialogProps) {
  const navigate = useNavigate();

  const handleLogin = () => {
    onClose();
    navigate('/login');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="text-yellow-500" />
            Yêu Cầu Đăng Nhập
          </DialogTitle>
          <DialogDescription>
            Bạn cần đăng nhập để có thể tham gia trò chơi và lưu điểm số của mình.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Để Sau</Button>
          <Button onClick={handleLogin}>Đăng Nhập</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
