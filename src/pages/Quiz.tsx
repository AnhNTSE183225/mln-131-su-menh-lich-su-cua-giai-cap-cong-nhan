import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

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
    question: 'Cách mạng Tháng Mười Nga diễn ra vào năm nào?',
    options: ['1915', '1917', '1918', '1920'],
    correctAnswer: 1,
    explanation: 'Cách mạng Tháng Mười Nga diễn ra vào tháng 10 năm 1917 (theo lịch Nga cũ).',
  },
  {
    id: 2,
    question: 'Ai là lãnh tụ chính của Cách mạng Tháng Mười?',
    options: ['Sta-lin', 'Tơ-rốt-xki', 'V.I. Lê-nin', 'Kê-ren-xki'],
    correctAnswer: 2,
    explanation:
      'V.I. Lê-nin là lãnh tụ của Đảng Bolshevik và là người lãnh đạo Cách mạng Tháng Mười.',
  },
  {
    id: 3,
    question: 'Cách mạng Tháng Mười đã lật đổ chính quyền nào?',
    options: [
      'Chính quyền Sa hoàng',
      'Chính quyền lâm thời',
      'Chính quyền phát xít',
      'Chính quyền quân chủ',
    ],
    correctAnswer: 1,
    explanation:
      'Cách mạng Tháng Mười lật đổ Chính phủ lâm thời do đảng Menshevik và các đảng tư sản lãnh đạo.',
  },
  {
    id: 4,
    question: 'Chính quyền mới sau Cách mạng Tháng Mười có tên gọi là gì?',
    options: [
      'Chính phủ nhân dân',
      'Chính quyền Xô viết',
      'Chính phủ cộng hòa',
      'Chính quyền công nông',
    ],
    correctAnswer: 1,
    explanation:
      'Sau cách mạng, chính quyền Xô viết được thành lập, với tên đầy đủ là Chính quyền Xô viết các đại biểu công nhân và binh lính.',
  },
  {
    id: 5,
    question: 'Ý nghĩa lớn nhất của Cách mạng Tháng Mười là gì?',
    options: [
      'Kết thúc chiến tranh thế giới thứ nhất',
      'Ra đời chế độ xã hội chủ nghĩa đầu tiên',
      'Thống nhất nước Nga',
      'Phát triển kinh tế Nga',
    ],
    correctAnswer: 1,
    explanation:
      'Cách mạng Tháng Mười đánh dấu sự ra đời của chế độ xã hội chủ nghĩa đầu tiên trên thế giới.',
  },
];

export function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Already answered

    setSelectedAnswer(answerIndex);

    if (answerIndex === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setAnsweredQuestions([...answeredQuestions, currentQuestion]);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  if (showResult) {
    const percentage = (score / quizQuestions.length) * 100;
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Kết Quả Trắc Nghiệm</CardTitle>
              <CardDescription>Bạn đã hoàn thành bài trắc nghiệm!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="text-6xl font-bold text-primary">{percentage.toFixed(0)}%</div>
                <div className="text-2xl">
                  Điểm số: {score}/{quizQuestions.length}
                </div>
                <Badge
                  variant={percentage >= 80 ? 'default' : percentage >= 60 ? 'secondary' : 'destructive'}
                  className="text-lg px-4 py-2"
                >
                  {percentage >= 80 ? 'Xuất sắc!' : percentage >= 60 ? 'Khá tốt!' : 'Cần cố gắng thêm'}
                </Badge>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Thống kê:</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {score}
                    </div>
                    <div className="text-sm text-muted-foreground">Câu đúng</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {quizQuestions.length - score}
                    </div>
                    <div className="text-sm text-muted-foreground">Câu sai</div>
                  </div>
                </div>
              </div>

              <Button onClick={handleRestart} className="w-full" size="lg">
                <RotateCcw className="mr-2 h-5 w-5" />
                Làm lại
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Trắc Nghiệm Lịch Sử</h1>
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
    </div>
  );
}
