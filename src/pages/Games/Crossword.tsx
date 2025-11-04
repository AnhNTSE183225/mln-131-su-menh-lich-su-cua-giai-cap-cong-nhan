import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Check, Award } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { submitScore } from '@/api/games';
import { Leaderboard } from './Leaderboard';
import { cn } from '@/lib/utils'; // Import cn for conditional classNames

const removeDiacritics = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/Đ/g, "D").replace(/đ/g, "d");
};

const crosswordData = {
  "rows": 11,
  "cols": 15,
  "words": [
    { "word": "CONGNHAN", "clue": "Con đẻ của nền đại công nghiệp tư bản chủ nghĩa, giai cấp đại biểu cho lực lượng sản xuất tiên tiến, cho phương thức sản xuất hiện đại.", "row": 0, "col": 2, "direction": "horizontal" },
    { "word": "TUSAN", "clue": "Giai cấp đối kháng với công nhân, chiếm hữu tư liệu sản xuất, bóc lột giá trị thặng dư.", "row": 2, "col": 0, "direction": "horizontal" },
    { "word": "GIATRITHANGDU", "clue": "Phần giá trị do công nhân tạo ra vượt quá giá trị sức lao động của họ, bị nhà tư bản chiếm đoạt.", "row": 4, "col": 1, "direction": "horizontal" },
    { "word": "MACLENIN", "clue": "Chủ nghĩa khoa học và cách mạng của giai cấp công nhân, nền tảng tư tưởng của Đảng Cộng sản.", "row": 6, "col": 0, "direction": "horizontal" },
    { "word": "SUMENH", "clue": "Nhiệm vụ lịch sử của giai cấp công nhân: xóa bỏ chế độ người bóc lột người, xây dựng xã hội cộng sản.", "row": 8, "col": 5, "direction": "horizontal" },
    { "word": "DANGCONGSAN", "clue": "Đội tiên phong, bộ tham mưu chiến đấu của giai cấp công nhân, đại biểu trung thành cho lợi ích của giai cấp công nhân và nhân dân lao động.", "row": 10, "col": 0, "direction": "horizontal" }
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
  const { user } = useAuth();
  const [grid, setGrid] = useState<Grid>([]);
  const [userGrid, setUserGrid] = useState<string[][]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[][]>([]);

  useEffect(() => {
    const newGrid: Grid = Array(crosswordData.rows).fill(null).map(() => Array(crosswordData.cols).fill(null));
    const newUserGrid: string[][] = Array(crosswordData.rows).fill(null).map(() => Array(crosswordData.cols).fill(""));
    inputRefs.current = Array(crosswordData.rows).fill(null).map(() => Array(crosswordData.cols).fill(null));

    let wordNumber = 1;
    crosswordData.words.forEach((wordObj, wordIndex) => {
      const word = wordObj.word;
      const { row, col, direction } = wordObj;
      let r = row;
      let c = col;
      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        if (i === 0) {
          if (newGrid[r][c] === null) {
            newGrid[r][c] = { char, isStart: true, wordIndices: [wordIndex], number: wordNumber, isVerticalKey: true }; // Mark as vertical key
          } else {
            newGrid[r][c]!.isStart = true;
            newGrid[r][c]!.wordIndices.push(wordIndex);
            if (newGrid[r][c]!.number === null) {
              newGrid[r][c]!.number = wordNumber;
            }
            newGrid[r][c]!.isVerticalKey = true; // Mark as vertical key
          }
          wordNumber++;
        } else {
          if (newGrid[r][c] === null) {
            newGrid[r][c] = { char, isStart: false, wordIndices: [wordIndex], number: null };
          } else {
            newGrid[r][c]!.wordIndices.push(wordIndex);
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
        for(let i = 0; i < word.length; i++) {
            if(userGrid[r][c] !== word[i]) {
                correct = false;
                break;
            }
            if(wordObj.direction === 'horizontal') c++; else r++;
        }
        if(correct) {
            currentScore += 10;
        } else {
            allWordsCorrect = false;
        }
    });

    if (allWordsCorrect) {
      currentScore += 50; // Bonus
    }
    setScore(currentScore);
    setGameOver(true);
    if (user) {
      submitScore({ userId: user.userId, gameType: 'crossword', score: currentScore });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ô Chữ: Từ Khóa Cốt Lõi</CardTitle>
          <CardDescription>
            Điền vào các ô chữ dựa trên các gợi ý. Hoàn thành tất cả để xem điểm số của bạn.
            <br />
            <span className="font-bold text-primary">Mẹo:</span> Các ô được tô màu vàng (hoặc màu khác trong chế độ tối) chứa chữ cái đầu tiên của mỗi từ khóa ngang. Khi đọc theo thứ tự từ trên xuống dưới, chúng sẽ tạo thành một từ khóa ẩn quan trọng!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${crosswordData.cols}, 1fr)` }}>
                {grid.map((row, r_idx) =>
                  row.map((cell, c_idx) => (
                    <div key={`${r_idx}-${c_idx}`} className="relative w-full aspect-square">
                      {cell ? (
                        <>
                          {cell.number && <span className="absolute top-0 left-0.5 text-[8px] font-bold">{cell.number}</span>}
                          <Input
                            ref={el => { inputRefs.current[r_idx][c_idx] = el; }}
                            type="text"
                            maxLength={1}
                            className={cn(
                              "w-full h-full p-0 text-center text-lg font-bold",
                              cell.isVerticalKey && "bg-yellow-200 dark:bg-yellow-800" // Highlight color
                            )}
                            value={userGrid[r_idx][c_idx]}
                            onChange={(e) => handleInputChange(r_idx, c_idx, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, r_idx, c_idx)}
                            disabled={gameOver}
                          />
                        </>
                      ) : (
                        <div className="w-full h-full bg-muted/20 rounded-sm" />
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Gợi ý:</h3>
              <div className="space-y-2 text-sm">
                {crosswordData.words.map((word, index) => (
                  <p key={index}><span className="font-bold">{index + 1}.</span> {word.clue}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <Button onClick={checkAnswers} disabled={gameOver}>
              <Check className="mr-2 h-4 w-4" />
              Kiểm Tra Đáp Án
            </Button>
          </div>
          {gameOver && (
            <Alert className="mt-6">
              <Award className="h-4 w-4" />
              <AlertTitle>Hoàn Thành!</AlertTitle>
              <AlertDescription>
                Điểm của bạn là: {score}. Bạn có thể xem bảng xếp hạng bên dưới.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
      <Leaderboard gameType="crossword" />
    </div>
  );
}