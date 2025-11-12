import React, {useEffect, useRef, useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Card, CardContent} from '@/components/ui/card';
import {Award, Check, Lightbulb, Trophy} from 'lucide-react';
import {useAuth} from '@/hooks/use-auth';
import {submitScore} from '@/api/games';
import {Leaderboard} from './Leaderboard';
import {cn} from '@/lib/utils';

const removeDiacritics = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/Đ/g, "D").replace(/đ/g, "d");
};


const crosswordData = {
    "rows": 20,
    "cols": 13, // Reduced from 15 to 13 (removed 2 more columns from left)
    "secretKeyColumn": 5, // Adjusted from 7 to 5 (shifted left by 2)
    "secretWord": "PASSMLN131", // Secret keyword revealed by highlighted characters
    "words": [
        {
            "word": "PHAMCHAT",
            "clue": "Bản chất tính giai cấp của giai cấp công nhân được thể hiện qua ... của nó.",
            "row": 0,
            "col": 5,
            "direction": "horizontal",
            "highlightIndex": 0
        },
        {
            "word": "GIAICAP",
            "clue": "Thuật ngữ chỉ nhóm người có vị trí, vai trò, lợi ích chung trong quan hệ sản xuất.",
            "row": 2,
            "col": 3,
            "direction": "horizontal",
            "highlightIndex": 2
        },
        {
            "word": "SANPHAM",
            "clue": "Kết quả lao động của công nhân trong quá trình sản xuất.",
            "row": 4,
            "col": 5,
            "direction": "horizontal",
            "highlightIndex": 0
        },
        {
            "word": "SANGTAO",
            "clue": "Khả năng đổi mới, cải tiến kỹ thuật, công nghệ là khả năng ... của giai cấp công nhân.",
            "row": 6,
            "col": 5,
            "direction": "horizontal",
            "highlightIndex": 0
        },
        {
            "word": "SUMENH",
            "clue": "Nhiệm vụ lịch sử: xóa bỏ chế độ bóc lột, xây dựng xã hội cộng sản chủ nghĩa.",
            "row": 8,
            "col": 3,
            "direction": "horizontal",
            "highlightIndex": 2
        },
        {
            "word": "LOIICH",
            "clue": "Mâu thuẫn cơ bản về mặt xã hội trong chủ nghĩa tư bản là mâu thuẫn về ... giữa giai cấp công nhân và giai cấp tư sản.",
            "row": 10,
            "col": 5,
            "direction": "horizontal",
            "highlightIndex": 0
        },
        {
            "word": "TIENPHONG",
            "clue": "Vai trò đi đầu trong các cuộc đấu tranh cách mạng của giai cấp công nhân.",
            "row": 12,
            "col": 1,
            "direction": "horizontal",
            "highlightIndex": 4
        },
        {
            "word": "10",
            "clue": "Ngày .../10/1930 là ngày Hội nghị lần thứ nhất Ban Chấp hành Trung ương Đảng Cộng sản Đông Dương diễn ra.",
            "row": 14,
            "col": 5,
            "direction": "horizontal",
            "highlightIndex": 0
        },
        {
            "word": "1933",
            "clue": "Năm ... là năm xảy ra phong trào Xô viết Nghệ Tĩnh - cao trào cách mạng quan trọng của giai cấp công nhân Việt Nam.",
            "row": 16,
            "col": 2,
            "direction": "horizontal",
            "highlightIndex": 3
        },
        {
            "word": "1/5",
            "clue": "Ngày ... là Ngày Quốc tế Lao động, ngày hội lớn của giai cấp công nhân thế giới.",
            "row": 18,
            "col": 5,
            "direction": "horizontal",
            "highlightIndex": 0
        }
    ]
};

type Cell = {
    char: string;
    isStart: boolean;
    wordIndices: number[];
    number: number | null;
    isVerticalKey?: boolean; // New property
};

type Grid = (Cell | null)[][];

export function Crossword() {
    const {user} = useAuth();
    const [grid, setGrid] = useState<Grid>([]);
    const [userGrid, setUserGrid] = useState<string[][]>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [hintsUsed, setHintsUsed] = useState(0);
    const [revealedCells, setRevealedCells] = useState<Set<string>>(new Set());
    const [hoveredWordIndex, setHoveredWordIndex] = useState<number | null>(null);
    const [completedWords, setCompletedWords] = useState<Set<number>>(new Set());
    const inputRefs = useRef<(HTMLInputElement | null)[][]>([]);

    useEffect(() => {
        const newGrid: Grid = Array.from({length: crosswordData.rows}, () =>
            Array.from({length: crosswordData.cols}, () => null)
        );
        const newUserGrid: string[][] = Array.from({length: crosswordData.rows}, () =>
            Array.from({length: crosswordData.cols}, () => "")
        );
        inputRefs.current = Array.from({length: crosswordData.rows}, () =>
            Array.from({length: crosswordData.cols}, () => null)
        );

        let wordNumber = 1;
        crosswordData.words.forEach((wordObj, wordIndex) => {
            const word = wordObj.word;
            const {row, col, direction, highlightIndex} = wordObj;
            let r = row;
            let c = col;
            for (let i = 0; i < word.length; i++) {
                const char = word[i];

                // Boundary check
                if (r < 0 || r >= crosswordData.rows || c < 0 || c >= crosswordData.cols) {
                    console.error(`Word "${word}" at position (${row}, ${col}) exceeds grid bounds at index ${i}`);
                    break;
                }

                // Check if current position is in the secret key column
                const isHighlightedChar = c === crosswordData.secretKeyColumn && i === highlightIndex;

                if (i === 0) {
                    if (newGrid[r][c] === null) {
                        newGrid[r][c] = {
                            char,
                            isStart: true,
                            wordIndices: [wordIndex],
                            number: wordNumber,
                            isVerticalKey: isHighlightedChar
                        };
                    } else {
                        newGrid[r][c]!.isStart = true;
                        newGrid[r][c]!.wordIndices.push(wordIndex);
                        if (newGrid[r][c]!.number === null) {
                            newGrid[r][c]!.number = wordNumber;
                        }
                        if (isHighlightedChar) {
                            newGrid[r][c]!.isVerticalKey = true;
                        }
                    }
                    wordNumber++;
                } else {
                    if (newGrid[r][c] === null) {
                        newGrid[r][c] = {
                            char,
                            isStart: false,
                            wordIndices: [wordIndex],
                            number: null,
                            isVerticalKey: isHighlightedChar
                        };
                    } else {
                        newGrid[r][c]!.wordIndices.push(wordIndex);
                        if (isHighlightedChar) {
                            newGrid[r][c]!.isVerticalKey = true;
                        }
                    }
                }

                if (direction === 'horizontal') {
                    c++;
                } else {
                    r++;
                }
            }
        });
        setGrid(newGrid);
        setUserGrid(newUserGrid);
    }, []);

    const handleInputChange = (row: number, col: number, value: string) => {
        const newUserGrid = [...userGrid];
        newUserGrid[row][col] = removeDiacritics(value.toUpperCase()).slice(0, 1);
        setUserGrid(newUserGrid);

        // Check if any words are completed
        checkWordCompletion(newUserGrid);

        if (value) {
            const cell = grid[row][col];
            if (cell) {
                const wordIndex = cell.wordIndices[0];
                const currentWord = crosswordData.words[wordIndex];
                if (currentWord.direction === 'horizontal' && col + 1 < crosswordData.cols && grid[row][col + 1]) {
                    inputRefs.current[row][col + 1]?.focus();
                } else if (currentWord.direction === 'vertical' && row + 1 < crosswordData.rows && grid[row + 1][col]) {
                    inputRefs.current[row + 1][col]?.focus();
                }
            }
        }
    };

    const checkWordCompletion = (currentGrid: string[][]) => {
        const newCompletedWords = new Set(completedWords);
        crosswordData.words.forEach((wordObj, wordIndex) => {
            let r = wordObj.row;
            let c = wordObj.col;
            let correct = true;
            for (let i = 0; i < wordObj.word.length; i++) {
                if (currentGrid[r][c] !== wordObj.word[i]) {
                    correct = false;
                    break;
                }
                if (wordObj.direction === 'horizontal') c++; else r++;
            }
            if (correct) {
                newCompletedWords.add(wordIndex);
            } else {
                newCompletedWords.delete(wordIndex);
            }
        });
        setCompletedWords(newCompletedWords);
    };

    const useHint = () => {
        if (gameOver || hintsUsed >= 3) return;

        // Find an empty cell that hasn't been revealed
        for (let r = 0; r < crosswordData.rows; r++) {
            for (let c = 0; c < crosswordData.cols; c++) {
                const cell = grid[r][c];
                if (cell && !userGrid[r][c] && !revealedCells.has(`${r}-${c}`)) {
                    const newUserGrid = [...userGrid];
                    newUserGrid[r][c] = cell.char;
                    setUserGrid(newUserGrid);

                    const newRevealed = new Set(revealedCells);
                    newRevealed.add(`${r}-${c}`);
                    setRevealedCells(newRevealed);

                    setHintsUsed(hintsUsed + 1);
                    checkWordCompletion(newUserGrid);
                    return;
                }
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, row: number, col: number) => {
        switch (e.key) {
            case 'ArrowUp':
                if (row > 0 && grid[row - 1][col]) inputRefs.current[row - 1][col]?.focus();
                break;
            case 'ArrowDown':
                if (row < crosswordData.rows - 1 && grid[row + 1][col]) inputRefs.current[row + 1][col]?.focus();
                break;
            case 'ArrowLeft':
                if (col > 0 && grid[row][col - 1]) inputRefs.current[row][col - 1]?.focus();
                break;
            case 'ArrowRight':
                if (col < crosswordData.cols - 1 && grid[row][col + 1]) inputRefs.current[row][col + 1]?.focus();
                break;
            case 'Backspace':
                if (!userGrid[row][col]) {
                    if (col > 0 && grid[row][col - 1]) inputRefs.current[row][col - 1]?.focus();
                }
                break;
        }
    };

    const checkAnswers = () => {
        let currentScore = 0;
        let allWordsCorrect = true;

        crosswordData.words.forEach(wordObj => {
            let correct = true;
            let r = wordObj.row;
            let c = wordObj.col;
            const word = wordObj.word;
            for (let i = 0; i < word.length; i++) {
                if (userGrid[r][c] !== word[i]) {
                    correct = false;
                    break;
                }
                if (wordObj.direction === 'horizontal') c++; else r++;
            }
            if (correct) {
                currentScore += 10;
            } else {
                allWordsCorrect = false;
            }
        });

        if (allWordsCorrect) {
            currentScore += 50; // Bonus for completing all words
        }

        // Deduct points for hints used
        currentScore -= hintsUsed * 5;
        currentScore = Math.max(0, currentScore);

        setScore(currentScore);
        setGameOver(true);
        if (user) {
            submitScore({userId: user.userId, gameType: 'crossword', score: currentScore});
        }
    };

    return (
        <div className="min-h-screen p-2 md:p-4 flex items-center justify-center">
            {/* Centered container with max width */}
            <div className="w-full max-w-[1200px] mx-auto">
                {/* Compact Header */}
                <div className="text-center mb-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                        Ô Chữ: Từ Khóa Cốt Lõi
                    </h1>
                    <div className="max-w-4xl mx-auto">
                        <div className="p-3 bg-card rounded-lg border border-primary/40">
                            <p className="text-foreground text-sm md:text-base">
                                <span className="font-bold text-primary">Bí mật:</span> Các ô <span className="font-extrabold text-yellow-500">màu vàng</span> căn thẳng
                                cột dọc - đọc từ trên xuống để khám phá từ khóa ẩn!
                            </p>
                        </div>
                    </div>
                </div>

                <Card className="bg-card border-primary/40 shadow-2xl">
                    <CardContent className="p-3 md:p-4">
                        <div className="flex flex-col lg:flex-row gap-4">
                            {/* Crossword Grid - Left Column (60% on desktop) */}
                            <div className="w-full lg:w-[60%] flex flex-col">
                                <div className="mb-2 flex flex-wrap gap-2">
                                    <Button
                                        onClick={useHint}
                                        disabled={gameOver || hintsUsed >= 3}
                                        size="sm"
                                        className="bg-primary hover:bg-primary/90 text-primary-foreground border border-primary/40"
                                    >
                                        <Lightbulb className="mr-2 h-4 w-4"/>
                                        Gợi ý ({3 - hintsUsed} còn lại)
                                    </Button>
                                    <div
                                        className="flex items-center gap-2 px-3 py-1 bg-secondary rounded-lg border border-muted/30">
                                        <Trophy className="h-4 w-4 text-primary"/>
                                        <span
                                            className="text-muted-foreground text-sm font-semibold">{completedWords.size}/{crosswordData.words.length} từ</span>
                                    </div>
                                </div>

                                {/* Grid Container - Optimized for viewport */}
                                <div
                                    className="w-full bg-secondary p-3 md:p-4 rounded-lg border-2 border-border flex items-center justify-center overflow-x-auto">
                                    <div
                                        className="grid gap-1 md:gap-1.5 lg:gap-2 mx-auto"
                                        style={{
                                            gridTemplateColumns: `repeat(${crosswordData.cols}, auto)`,
                                            gridAutoRows: 'auto'
                                        }}
                                    >
                                        {grid.map((row, r_idx) =>
                                                row.map((cell, c_idx) => {
                                                    const isHovered = cell && hoveredWordIndex !== null && cell.wordIndices.includes(hoveredWordIndex);
                                                    const isRevealed = revealedCells.has(`${r_idx}-${c_idx}`);
                                                    const isInCompletedWord = cell && Array.from(completedWords).some(wi => cell.wordIndices.includes(wi));

                                                    return (
                                                        <div key={`${r_idx}-${c_idx}`}
                                                             className="relative aspect-square w-6 md:w-7 lg:w-8">
                                                            {cell ? (
                                                                <>
                                                                    {cell.number && (
                                                                        <span
                                                                            className="absolute top-0.5 left-0.5 text-[7px] md:text-[9px] font-bold text-primary z-10 leading-none pointer-events-none">
                                  {cell.number}
                                </span>
                                                                    )}
                                                                    <Input
                                                                        ref={el => {
                                                                            inputRefs.current[r_idx][c_idx] = el;
                                                                        }}
                                                                        type="text"
                                                                        maxLength={1}
                                                                        className={cn(
                                                                            "absolute inset-0 w-full h-full p-0 flex items-center justify-center text-center text-[10px] md:text-xs lg:text-sm font-bold transition-all duration-200",
                                                                            "border border-border focus:border-primary focus:ring-1 focus:ring-[#DAA520] focus:outline-none",
                                                                            "rounded-sm",
                                                                            // Base color for non-keyword cells
                                                                            !cell.isVerticalKey && "bg-muted text-foreground",
                                                                            // Completed word styling (only for non-keyword cells)
                                                                            isInCompletedWord && !cell.isVerticalKey && "bg-green-200 text-gray-900 animate-pulse",
                                                                            // Revealed hint styling (only for non-keyword cells)
                                                                            isRevealed && !cell.isVerticalKey && "bg-blue-200 text-gray-900",
                                                                            // Keyword cells always stay yellow (highest priority)
                                                                            cell.isVerticalKey && "bg-yellow-400 text-gray-900 font-extrabold shadow-lg",
                                                                            // Hover effect
                                                                            isHovered && "!ring-2 !ring-primary !border-primary z-10"
                                                                        )}
                                                                        value={userGrid[r_idx][c_idx]}
                                                                        onChange={(e) => handleInputChange(r_idx, c_idx, e.target.value)}
                                                                        onKeyDown={(e) => handleKeyDown(e, r_idx, c_idx)}
                                                                        disabled={gameOver || isRevealed}
                                                                    />
                                                                </>
                                                            ) : (
                                                                <div
                                                                    className="w-full aspect-square bg-background rounded-sm"/>
                                                            )}
                                                        </div>
                                                    );
                                                })
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Clues Section - Right Column (40% on desktop) */}
                            <div className="w-full lg:w-[40%]">
                                <div className="bg-secondary p-3 md:p-4 rounded-lg border border-border">
                                    <h3 className="text-lg md:text-xl font-bold mb-3 text-primary flex items-center gap-2">
                                        <Award className="h-5 w-5"/>
                                        Gợi ý Ngang
                                    </h3>
                                    <div className="space-y-2">
                                        {crosswordData.words.map((word, index) => {
                                            const isCompleted = completedWords.has(index);
                                            return (
                                                <div
                                                    key={index}
                                                    onMouseEnter={() => setHoveredWordIndex(index)}
                                                    onMouseLeave={() => setHoveredWordIndex(null)}
                                                    className={cn(
                                                        "p-2 md:p-3 rounded-lg border-l-4 transition-all cursor-pointer",
                                                        isCompleted
                                                            ? "bg-primary border-primary opacity-70"
                                                            : hoveredWordIndex === index
                                                                ? "bg-muted border-primary scale-102 shadow-lg"
                                                                : "bg-card border-muted/30 hover:bg-muted"
                                                    )}
                                                >
                                                    <div className="flex items-start gap-3">
                        <span className={cn(
                            "font-bold text-sm md:text-base min-w-[24px]",
                            isCompleted ? "text-background" : "text-primary"
                        )}>
                          {index + 1}.
                        </span>
                                                        <p className={cn(
                                                            "text-sm md:text-base leading-snug",
                                                            isCompleted ? "text-background line-through" : "text-foreground"
                                                        )}>
                                                            {word.clue}
                                                            {isCompleted && (
                                                                <span
                                                                    className="ml-2 text-background font-semibold text-xs">✓</span>
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-4 flex justify-center gap-4">
                            <Button
                                onClick={checkAnswers}
                                disabled={gameOver}
                                size="lg"
                                className="bg-primary hover:bg-primary/90 text-primary-foreground border border-primary text-lg px-8 py-6"
                            >
                                <Check className="mr-2 h-5 w-5"/>
                                Kiểm Tra Đáp Án
                            </Button>
                        </div>

                        {/* Game Over Alert with Animation - Full Width */}
                        {gameOver && (
                            <div
                                className="mt-8 w-full bg-gradient-to-br from-card to-muted border-2 border-primary rounded-lg p-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
                                    <Award className="h-12 w-12 text-primary animate-bounce flex-shrink-0"/>
                                    <div className="flex-1 w-full">
                                        <div className="text-2xl md:text-3xl font-bold text-primary mb-3">
                                            Hoàn Thành!
                                        </div>
                                        <div className="text-foreground">
                                            <div
                                                className="flex flex-row flex-wrap items-baseline gap-2 text-lg md:text-xl mb-2">
                                                <span>Điểm của bạn:</span>
                                                <span
                                                    className="font-bold text-primary text-2xl md:text-3xl">{score}</span>
                                            </div>
                                            {hintsUsed > 0 && (
                                                <div className="text-sm md:text-base text-muted-foreground mb-2">
                                                    (Đã sử dụng {hintsUsed} gợi ý - Trừ {hintsUsed * 5} điểm)
                                                </div>
                                            )}
                                            <div className="text-sm md:text-base">Bạn có thể xem bảng xếp hạng bên
                                                dưới.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Leaderboard with proper spacing */}
                <div className="mt-6">
                    <Leaderboard gameType="crossword"/>
                </div>
            </div>
        </div>
    );
}
