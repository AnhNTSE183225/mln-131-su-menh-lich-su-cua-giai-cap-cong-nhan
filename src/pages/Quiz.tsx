import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { LoginPromptDialog } from '@/components/LoginPromptDialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Crossword } from './Games/Crossword';
import { MultipleChoiceQuiz } from './Games/MultipleChoiceQuiz';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function Quiz() {
  const { isAuthenticated } = useAuth();
  const [isLoginPromptOpen, setIsLoginPromptOpen] = useState(!isAuthenticated);

  if (!isAuthenticated) {
    return (
        <div className="container mx-auto px-4 py-8">
            <LoginPromptDialog isOpen={isLoginPromptOpen} onClose={() => setIsLoginPromptOpen(false)} />
            <Card className="text-center">
                <CardHeader>
                    <CardTitle>Yêu Cầu Đăng Nhập</CardTitle>
                    <CardDescription>Vui lòng đăng nhập để truy cập các trò chơi trắc nghiệm.</CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Tabs defaultValue="crossword">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="crossword">Ô Chữ</TabsTrigger>
            <TabsTrigger value="quiz">Trắc Nghiệm</TabsTrigger>
          </TabsList>
          <TabsContent value="crossword">
            <Crossword />
          </TabsContent>
          <TabsContent value="quiz">
            <MultipleChoiceQuiz />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}