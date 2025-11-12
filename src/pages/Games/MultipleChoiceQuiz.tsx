import {useState} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Progress} from '@/components/ui/progress';
import {Badge} from '@/components/ui/badge';
import {CheckCircle2, RotateCcw, XCircle} from 'lucide-react';
import {useAuth} from '@/hooks/use-auth';
import {submitScore} from '@/api/games';
import {Leaderboard} from './Leaderboard';

interface QuizQuestion {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
}

const quizQuestions: QuizQuestion[] = [
    // I. Quan điểm cơ bản của Chủ nghĩa Mác - Lênin
    {
        id: 1,
        question: "Câu 1: Theo Chủ nghĩa Mác – Lênin, giai cấp công nhân được xác định dựa trên phương diện kinh tế - xã hội nào là cơ bản?",
        options: [
            "Là những người lao động có trình độ học vấn cao, có bằng cấp chuyên môn.",
            "Là giai cấp của những người lao động trực tiếp hay gián tiếp vận hành các công cụ sản xuất có tính chất công nghiệp ngày càng hiện đại và xã hội hóa cao.",
            "Là giai cấp không sở hữu tư liệu sản xuất và bị bóc lột tuyệt đối.",
            "Là những người lao động sống bằng việc bán sức lao động của mình và được tự do kiếm sống."
        ],
        correctAnswer: 1, // B
        explanation: "Đáp án B: Giai cấp công nhân được xác định là giai cấp của những người lao động trực tiếp hay gián tiếp vận hành các công cụ sản xuất có tính chất công nghiệp ngày càng hiện đại và xã hội hóa cao."
    },
    {
        id: 2,
        question: "Câu 2: Đặc điểm nổi bật của giai cấp công nhân (theo phương diện kinh tế - xã hội) là gì?",
        options: [
            "Nắm giữ quyền lực chính trị tuyệt đối.",
            "Lao động bằng phương thức công nghiệp với công cụ lao động là máy móc, tạo ra năng suất lao động cao, quá trình lao động mang tính chất xã hội hóa.",
            "Chủ yếu làm việc trong ngành nông nghiệp và tiểu thủ công nghiệp.",
            "Đại diện cho quan hệ sản xuất lạc hậu."
        ],
        correctAnswer: 1, // B
        explanation: "Đáp án B: Đặc điểm nổi bật là lao động bằng phương thức công nghiệp với công cụ lao động là máy móc, tạo ra năng suất lao động cao, quá trình lao động mang tính chất xã hội hóa."
    },
    {
        id: 3,
        question: "Câu 3: Khẳng định nào sau đây là nội dung cốt lõi, bao quát nhất về mục tiêu tổng quát của sứ mệnh lịch sử của giai cấp công nhân?",
        options: [
            "Giành lấy chính quyền và thiết lập nền dân chủ cho đa số nhân dân lao động.",
            "Thủ tiêu chế độ tư bản chủ nghĩa, giải phóng giai cấp công nhân, nhân dân lao động khỏi mọi áp bức, bóc lột, nghèo nàn, lạc hậu, xây dựng xã hội xã hội chủ nghĩa, cộng sản chủ nghĩa văn minh.",
            "Xây dựng nền văn hóa và tư tưởng mới.",
            "Thực hiện liên minh công - nông - trí thức."
        ],
        correctAnswer: 1, // B
        explanation: "Đáp án B: Mục tiêu tổng quát là thủ tiêu chế độ tư bản chủ nghĩa, giải phóng giai cấp công nhân và nhân dân lao động, xây dựng xã hội xã hội chủ nghĩa, cộng sản chủ nghĩa văn minh."
    },
    {
        id: 4,
        question: "Câu 4: Trong nội dung sứ mệnh lịch sử của giai cấp công nhân, nội dung nào là tiền đề vật chất - kỹ thuật cho sự ra đời của xã hội mới?",
        options: [
            "Nội dung chính trị - xã hội.",
            "Nội dung văn hóa, tư tưởng.",
            "Nội dung kinh tế (là nhân tố hàng đầu của lực lượng sản xuất xã hội hóa cao, đại biểu cho quan hệ sản xuất mới).",
            "Nội dung giải phóng con người."
        ],
        correctAnswer: 2, // C
        explanation: "Đáp án C: Nội dung kinh tế là tiền đề vật chất - kỹ thuật, bởi giai cấp công nhân là nhân tố hàng đầu của lực lượng sản xuất xã hội hóa cao và đại biểu cho quan hệ sản xuất mới."
    },
    {
        id: 5,
        question: "Câu 5: Điều kiện khách quan nào quyết định trực tiếp sứ mệnh lịch sử của giai cấp công nhân?",
        options: [
            "Giai cấp công nhân là giai cấp có tinh thần cách mạng triệt để nhất.",
            "Giai cấp công nhân là giai cấp có tính tổ chức và kỷ luật cao.",
            "Giai cấp công nhân luôn đấu tranh vì lợi ích cơ bản của đa số nhân dân lao động.",
            "Địa vị kinh tế - xã hội của giai cấp công nhân trong nền sản xuất hiện đại, đại diện cho phương thức sản xuất tiên tiến."
        ],
        correctAnswer: 3, // D
        explanation: "Đáp án D: Điều kiện khách quan quyết định là địa vị kinh tế - xã hội của giai cấp công nhân trong nền sản xuất hiện đại, đại diện cho phương thức sản xuất tiên tiến."
    },
    {
        id: 6,
        question: "Câu 6: Nhân tố chủ quan nào được xác định là quan trọng nhất để giai cấp công nhân thực hiện thắng lợi sứ mệnh lịch sử của mình?",
        options: [
            "Sự phát triển của bản thân giai cấp công nhân về số lượng và chất lượng.",
            "Đảng Cộng sản là đội tiền phong, tổ chức lãnh đạo giai cấp công nhân.",
            "Xây dựng được khối liên minh giai cấp vững chắc giữa công nhân, nông dân và các tầng lớp lao động khác.",
            "Phải được trang bị lý luận cách mạng tiên tiến là Chủ nghĩa Mác - Lênin."
        ],
        correctAnswer: 1, // B
        explanation: "Đáp án B: Đảng Cộng sản là nhân tố chủ quan quan trọng nhất, là đội tiền phong và tổ chức lãnh đạo giai cấp công nhân thực hiện sứ mệnh lịch sử."
    },
    {
        id: 7,
        question: "Câu 7: Điểm tương đồng căn bản nhất giữa giai cấp công nhân hiện nay so với giai cấp công nhân thế kỷ XIX là gì?",
        options: [
            "Đã giành được quyền lực chính trị ở tất cả các nước.",
            "Đều có xu hướng trí tuệ hóa cao.",
            "Vẫn là giai cấp bị giai cấp tư sản và chủ nghĩa tư bản bóc lột giá trị thặng dư.",
            "Đã hoàn toàn xóa bỏ được tình trạng thất nghiệp."
        ],
        correctAnswer: 2, // C
        explanation: "Đáp án C: Điểm tương đồng căn bản nhất là giai cấp công nhân vẫn bị giai cấp tư sản và chủ nghĩa tư bản bóc lột giá trị thặng dư trong các nước tư bản chủ nghĩa."
    },
    {
        id: 8,
        question: "Câu 8: Trong bối cảnh toàn cầu hóa và cách mạng khoa học công nghệ, xu hướng biến đổi nổi bật của giai cấp công nhân hiện nay là gì?",
        options: [
            "Giảm sút về số lượng và chất lượng.",
            "Rời bỏ ngành công nghiệp truyền thống.",
            "Xu hướng \"trí tuệ hóa\" (trở thành công nhân tri thức) và tham gia vào sở hữu (trung lưu hóa).",
            "Mất đi tính kỷ luật và tính tổ chức."
        ],
        correctAnswer: 2, // C
        explanation: "Đáp án C: Xu hướng biến đổi nổi bật là trí tuệ hóa (công nhân tri thức) và trung lưu hóa (tham gia vào sở hữu thông qua cổ phần hóa)."
    },
    // II. Sứ mệnh lịch sử của giai cấp công nhân Việt Nam
    {
        id: 9,
        question: "Câu 9: Đặc điểm nổi bật về sự ra đời của giai cấp công nhân Việt Nam (đầu thế kỷ XX) là gì?",
        options: [
            "Ra đời và phát triển cùng lúc với giai cấp tư sản.",
            "Ra đời trước giai cấp tư sản, và trực tiếp đấu tranh chống thực dân Pháp.",
            "Phát triển mạnh mẽ về số lượng ngay từ đầu.",
            "Ra đời trong điều kiện nền đại công nghiệp đã phát triển mạnh."
        ],
        correctAnswer: 1, // B
        explanation: "Đáp án B: Giai cấp công nhân Việt Nam ra đời trước giai cấp tư sản, và trực tiếp đấu tranh chống thực dân Pháp trong bối cảnh thuộc địa nửa phong kiến."
    },
    {
        id: 10,
        question: "Câu 10: Trong quá trình thực hiện sứ mệnh lịch sử tại Việt Nam, vai trò tiên phong của giai cấp công nhân được khẳng định thông qua:",
        options: [
            "Việc phát triển mạnh mẽ đội ngũ doanh nhân.",
            "Sự lớn mạnh của giai cấp nông dân.",
            "Sự lãnh đạo của đội tiền phong là Đảng Cộng sản Việt Nam.",
            "Tinh thần đoàn kết quốc tế."
        ],
        correctAnswer: 2, // C
        explanation: "Đáp án C: Vai trò tiên phong của giai cấp công nhân được khẳng định thông qua sự lãnh đạo của Đảng Cộng sản Việt Nam - đội tiền phong của giai cấp công nhân."
    },
    {
        id: 11,
        question: "Câu 11: Nội dung sứ mệnh lịch sử của giai cấp công nhân Việt Nam hiện nay trên lĩnh vực kinh tế là gì?",
        options: [
            "Đảm bảo chế độ sở hữu tư nhân về tư liệu sản xuất là chủ yếu.",
            "Là nguồn nhân lực lao động chủ yếu, lấy khoa học - công nghệ làm động lực quan trọng, quyết định tăng năng suất lao động, chất lượng và hiệu quả.",
            "Giữ vai trò nòng cốt trong việc xây dựng nông thôn mới.",
            "Thúc đẩy quá trình phân hóa giàu nghèo để tạo động lực phát triển."
        ],
        correctAnswer: 1, // B
        explanation: "Đáp án B: Trên lĩnh vực kinh tế, giai cấp công nhân là nguồn nhân lực lao động chủ yếu, lấy khoa học - công nghệ làm động lực để tăng năng suất, chất lượng và hiệu quả."
    },
    {
        id: 12,
        question: "Câu 12: Nội dung chính trị - xã hội hàng đầu trong sứ mệnh lịch sử của giai cấp công nhân Việt Nam hiện nay là gì?",
        options: [
            "Lãnh đạo xây dựng khối liên minh với mọi tầng lớp xã hội.",
            "Giữ vững và tăng cường sự lãnh đạo của Đảng, giữ vững bản chất giai cấp công nhân của Đảng, xây dựng hệ thống chính trị vững mạnh.",
            "Chỉ tập trung đấu tranh chống tham nhũng, lãng phí.",
            "Đảm bảo nguyên tắc phân phối theo nhu cầu."
        ],
        correctAnswer: 1, // B
        explanation: "Đáp án B: Nội dung chính trị - xã hội hàng đầu là giữ vững và tăng cường sự lãnh đạo của Đảng, giữ vững bản chất giai cấp công nhân của Đảng."
    },
    {
        id: 13,
        question: "Câu 13: Nội dung văn hóa, tư tưởng của sứ mệnh lịch sử giai cấp công nhân Việt Nam hiện nay bao gồm việc xây dựng:",
        options: [
            "Một nền văn hóa thuần túy tư sản.",
            "Các giá trị văn hóa đối lập hoàn toàn với truyền thống dân tộc.",
            "Nền văn hóa Việt Nam tiên tiến, đậm đà bản sắc dân tộc, với nội dung cốt lõi là xây dựng con người mới xã hội chủ nghĩa.",
            "Một nền văn hóa chỉ chú trọng đến khoa học kỹ thuật."
        ],
        correctAnswer: 2, // C
        explanation: "Đáp án C: Xây dựng nền văn hóa Việt Nam tiên tiến, đậm đà bản sắc dân tộc, với nội dung cốt lõi là xây dựng con người mới xã hội chủ nghĩa."
    },
    {
        id: 14,
        question: "Câu 14: Trong phương hướng xây dựng giai cấp công nhân Việt Nam hiện nay, Đảng nhấn mạnh nhiệm vụ nào là trọng tâm để phát triển giai cấp công nhân?",
        options: [
            "Giảm thiểu công nhân tham gia vào chính quyền.",
            "Phát triển về số lượng, chất lượng và tổ chức, nâng cao giác ngộ và bản lĩnh chính trị, trình độ học vấn nghề nghiệp.",
            "Hạn chế liên minh với các giai cấp khác.",
            "Ưu tiên giải quyết vấn đề thất nghiệp bằng mọi giá."
        ],
        correctAnswer: 1, // B
        explanation: "Đáp án B: Nhiệm vụ trọng tâm là phát triển về số lượng, chất lượng và tổ chức, nâng cao giác ngộ và bản lĩnh chính trị, trình độ học vấn nghề nghiệp."
    },
    {
        id: 15,
        question: "Câu 15: Giải pháp nào dưới đây nhằm thực hiện mục tiêu xây dựng giai cấp công nhân lớn mạnh gắn với xây dựng và phát huy sức mạnh của khối liên minh giai cấp?",
        options: [
            "Đẩy mạnh cổ phần hóa tất cả các doanh nghiệp nhà nước.",
            "Tăng cường quan hệ đoàn kết, hợp tác quốc tế với giai cấp công nhân trên toàn thế giới.",
            "Xây dựng lực lượng nòng cốt chỉ là công nhân và trí thức.",
            "Phát huy vai trò giai cấp công nhân trong khối đại đoàn kết toàn dân tộc – động lực chủ yếu của sự phát triển đất nước."
        ],
        correctAnswer: 3, // D
        explanation: "Đáp án D: Giải pháp là phát huy vai trò giai cấp công nhân trong khối đại đoàn kết toàn dân tộc – động lực chủ yếu của sự phát triển đất nước."
    }
];

export function MultipleChoiceQuiz() {
    const {user} = useAuth();
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
                submitScore({userId: user.userId, gameType: 'multipleChoiceQuiz', score: score * 10}); // Each correct answer is 10 points
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
                        <Button onClick={handleRestart} className="w-full text-primary-foreground" size="lg">
                            <RotateCcw className="mr-2 h-5 w-5"/>
                            Làm lại
                        </Button>
                    </CardContent>
                </Card>
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
                <Progress value={progress} className="h-2"/>
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
                                <div className="flex items-start gap-3 w-full">
                                    <span className="flex-1 whitespace-normal break-words">{option}</span>
                                    <span className="flex-shrink-0">
                    {showCorrect && <CheckCircle2 className="h-5 w-5"/>}
                                        {showIncorrect && <XCircle className="h-5 w-5"/>}
                  </span>
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
                                    <CheckCircle2 className="h-5 w-5 text-green-600"/>
                                    Chính xác!
                                </>
                            ) : (
                                <>
                                    <XCircle className="h-5 w-5 text-red-600"/>
                                    Chưa đúng!
                                </>
                            )}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p>{question.explanation}</p>
                        <Button onClick={handleNext} className="w-full text-primary-foreground">
                            {currentQuestion < quizQuestions.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}
                        </Button>
                    </CardContent>
                </Card>
            )}
            <div className="mt-6">
                <Leaderboard gameType="multipleChoiceQuiz"/>
            </div>
        </div>
    );
}