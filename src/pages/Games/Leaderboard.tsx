import { useEffect, useState } from 'react';
import { getLeaderboard, type LeaderboardEntry } from '@/api/games';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Trophy } from 'lucide-react';

interface LeaderboardProps {
  gameType: string;
}

export function Leaderboard({ gameType }: LeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const data = await getLeaderboard(gameType);
        setLeaderboard(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load leaderboard');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [gameType]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Trophy className="text-yellow-500"/>
            Bảng Xếp Hạng Hàng Ngày
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <div className="flex justify-center items-center h-40"><Spinner /></div>}
        {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
        {!loading && !error && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Hạng</TableHead>
                <TableHead>Tên Người Chơi</TableHead>
                <TableHead className="text-right">Điểm</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboard.length > 0 ? (
                leaderboard.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{entry.rank}</TableCell>
                    <TableCell>{entry.displayName}</TableCell>
                    <TableCell className="text-right">{entry.score}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">Chưa có ai trên bảng xếp hạng hôm nay. Hãy là người đầu tiên!</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
