import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { submitScore } from '@/api/games';
import { Leaderboard } from './Leaderboard';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Theo chủ nghĩa Mác - Lênin, giai cấp công nhân là con đẻ của cái gì?',
    options: [
      'Chế độ phong kiến',
      'Nền đại công nghiệp tư bản chủ nghĩa',
      'Nền kinh tế nông nghiệp',
      'Chủ nghĩa đế quốc',
    ],
    correctAnswer: 1,
    explanation: 'C. Mác và Ph. Ăngghen đã chỉ rõ giai cấp công nhân là con đẻ của nền đại công nghiệp tư bản chủ nghĩa.',
  },
  {
    id: 2,
    question: 'Đặc điểm nổi bật của giai cấp công nhân là gì?',
    options: [
      'Lao động bằng phương thức thủ công',
      'Sở hữu tư liệu sản xuất',
      'Lao động bằng phương thức công nghiệp với đặc trưng công cụ lao động là máy móc',
      'Lao động có tính chất cá nhân, riêng lẻ',
    ],
    correctAnswer: 2,
    explanation: 'Đặc điểm nổi bật của giai cấp công nhân là lao động bằng phương thức công nghiệp với đặc trưng công cụ lao động là máy móc, tạo ra năng suất lao động cao, quá trình lao động mang tính chất xã hội hóa.',
  },
  {
    id: 3,
    question: 'Mâu thuẫn cơ bản của phương thức sản xuất tư bản chủ nghĩa là gì?',
    options: [
      'Mâu thuẫn giữa giai cấp nông dân và địa chủ',
      'Mâu thuẫn giữa lực lượng sản xuất xã hội hóa và quan hệ sản xuất tư bản chủ nghĩa',
      'Mâu thuẫn giữa các quốc gia tư bản',
      'Mâu thuẫn giữa tôn giáo và khoa học',
    ],
    correctAnswer: 1,
    explanation: 'Mâu thuẫn cơ bản của phương thức sản xuất tư bản chủ nghĩa là mâu thuẫn giữa lực lượng sản xuất xã hội hóa ngày càng rộng lớn với quan hệ sản xuất tư bản chủ nghĩa dựa trên chế độ tư hữu tư bản chủ nghĩa về tư liệu sản xuất.',
  },
  {
    id: 4,
    question: 'Nội dung sứ mệnh lịch sử của giai cấp công nhân về mặt kinh tế là gì?',
    options: [
      'Lật đổ quyền thống trị của giai cấp tư sản',
      'Xây dựng hệ giá trị mới',
      'Tạo tiền đề vật chất - kỹ thuật cho sự ra đời của xã hội mới',
      'Duy trì chế độ tư hữu',
    ],
    correctAnswer: 2,
    explanation: 'Về nội dung kinh tế, sứ mệnh lịch sử của giai cấp công nhân là tạo tiền đề vật chất - kỹ thuật cho sự ra đời của xã hội mới bằng cách phát triển lực lượng sản xuất.',
  },
  {
    id: 5,
    question: 'Nhân tố chủ quan quan trọng nhất để giai cấp công nhân thực hiện thắng lợi sứ mệnh lịch sử của mình là gì?',
    options: [
      'Sự phát triển của khoa học kỹ thuật',
      'Sự giúp đỡ của các nước xã hội chủ nghĩa',
      'Sự ủng hộ của giai cấp tư sản',
      'Đảng Cộng sản',
    ],
    correctAnswer: 3,
    explanation: 'Đảng Cộng sản là nhân tố chủ quan quan trọng nhất để giai cấp công nhân thực hiện thắng lợi sứ mệnh lịch sử của mình, là đội tiên phong và là người lãnh đạo cuộc cách mạng.',
  },
];

export function MultipleChoiceQuiz() {
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);

    if (answerIndex === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
      if (user) {
        submitScore({ userId: user.userId, gameType: 'multipleChoiceQuiz', score: score * 10 }); // Each correct answer is 10 points
      }
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  if (showResult) {
    const totalScore = score * 10;
    const percentage = (score / quizQuestions.length) * 100;
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Kết Quả Trắc Nghiệm</CardTitle>
            <CardDescription>Bạn đã hoàn thành bài trắc nghiệm!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="text-6xl font-bold text-primary">{totalScore}</div>
              <div className="text-2xl">
                Số câu đúng: {score}/{quizQuestions.length}
              </div>
              <Badge
                variant={percentage >= 80 ? 'default' : percentage >= 60 ? 'secondary' : 'destructive'}
                className="text-lg px-4 py-2"
              >
                {percentage >= 80 ? 'Xuất sắc!' : percentage >= 60 ? 'Khá tốt!' : 'Cần cố gắng thêm'}
              </Badge>
            </div>
            <Button onClick={handleRestart} className="w-full" size="lg">
              <RotateCcw className="mr-2 h-5 w-5" />
              Làm lại
            </Button>
          </CardContent>
        </Card>
        <Leaderboard gameType="multipleChoiceQuiz" />
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Trắc Nghiệm Sứ Mệnh Lịch Sử</h1>
          <Badge variant="outline">
            Câu {currentQuestion + 1}/{quizQuestions.length}
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{question.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer;
            const showCorrect = selectedAnswer !== null && isCorrect;
            const showIncorrect = selectedAnswer !== null && isSelected && !isCorrect;

            return (
              <Button
                key={index}
                variant={
                  showCorrect ? 'default' : showIncorrect ? 'destructive' : 'outline'
                }
                className="w-full justify-start text-left h-auto py-4 px-6"
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="flex-1">{option}</span>
                  {showCorrect && <CheckCircle2 className="h-5 w-5 ml-2" />}
                  {showIncorrect && <XCircle className="h-5 w-5 ml-2" />}
                </div>
              </Button>
            );
          })}
        </CardContent>
      </Card>

      {selectedAnswer !== null && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              {selectedAnswer === question.correctAnswer ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  Chính xác!
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-600" />
                  Chưa đúng!
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>{question.explanation}</p>
            <Button onClick={handleNext} className="w-full">
              {currentQuestion < quizQuestions.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}