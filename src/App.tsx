import { useEffect, useState } from 'react';
import type { PersonalityReport, Screen } from '@/types';
import { mockOcrRecognize, type OcrResult } from '@/services/ocr';
import { analyzePersonality } from '@/services/analyzer';
import { loadHistory, saveReport, deleteReport } from '@/services/history';
import { LandingScreen } from '@/screens/LandingScreen';
import { ScanningScreen } from '@/screens/ScanningScreen';
import { ConfirmScreen } from '@/screens/ConfirmScreen';
import { AnalyzingScreen } from '@/screens/AnalyzingScreen';
import { ReportScreen } from '@/screens/ReportScreen';
import { HistoryScreen } from '@/screens/HistoryScreen';

function App() {
  const [screen, setScreen] = useState<Screen>('landing');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [ocrResult, setOcrResult] = useState<OcrResult | null>(null);
  const [report, setReport] = useState<PersonalityReport | null>(null);
  const [history, setHistory] = useState<PersonalityReport[]>([]);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  function handleImageSelected(file: File) {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setScreen('scanning');
  }

  function handleScanningDone() {
    const result = mockOcrRecognize();
    setOcrResult(result);
    setScreen('confirm');
  }

  function handleAnalyzingDone() {
    if (!ocrResult) {
      setScreen('landing');
      return;
    }
    const newReport = analyzePersonality(ocrResult.storeName, ocrResult.items);
    setReport(newReport);
    const updated = saveReport(newReport);
    setHistory(updated);
    setScreen('report');
  }

  function handleOpenHistoryReport(r: PersonalityReport) {
    setReport(r);
    setScreen('report');
  }

  function handleDeleteReport(id: string) {
    const updated = deleteReport(id);
    setHistory(updated);
  }

  function handleHome() {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
      setImageUrl('');
    }
    setOcrResult(null);
    setReport(null);
    setScreen('landing');
  }

  return (
    <div className="min-h-screen max-w-md mx-auto bg-paper-100 relative overflow-hidden">
      {screen === 'landing' && (
        <LandingScreen
          onImageSelected={handleImageSelected}
          onShowHistory={() => setScreen('history')}
          historyCount={history.length}
        />
      )}
      {screen === 'scanning' && (
        <ScanningScreen imageUrl={imageUrl} onDone={handleScanningDone} />
      )}
      {screen === 'confirm' && ocrResult && (
        <ConfirmScreen
          storeName={ocrResult.storeName}
          items={ocrResult.items}
          onBack={() => setScreen('landing')}
          onConfirm={(storeName, items) => {
            setOcrResult({ storeName, items });
            setScreen('analyzing');
          }}
        />
      )}
      {screen === 'analyzing' && <AnalyzingScreen onDone={handleAnalyzingDone} />}
      {screen === 'report' && report && (
        <ReportScreen
          report={report}
          onBack={() => setScreen('history')}
          onHome={handleHome}
        />
      )}
      {screen === 'history' && (
        <HistoryScreen
          history={history}
          onBack={() => setScreen('landing')}
          onOpenReport={handleOpenHistoryReport}
          onDelete={handleDeleteReport}
        />
      )}
    </div>
  );
}

export default App;
