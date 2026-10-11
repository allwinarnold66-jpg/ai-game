import React, { useEffect, useMemo, useState } from 'react';
import { Clock, Heart, LockKeyhole, CheckCircle2, RotateCcw, BrainCircuit } from 'lucide-react';

type ChallengeQuestion = {
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
  binary?: boolean;
};

// Level 1 questions are authored for Garden Escape: business logic, numerical reasoning,
// data interpretation and short binary/true-false checkpoints on questions 5, 10 and 15.
const QUESTIONS: ChallengeQuestion[] = [
  { prompt: 'A shop buys a bag for ₹400 and sells it for ₹500. What is the profit percentage on cost price?', options: ['20%', '25%', '10%', '15%'], answer: 1, explanation: 'Profit = ₹100. Profit percentage = 100 ÷ 400 × 100 = 25%.' },
  { prompt: 'A team completes 24 orders in 3 hours at a steady rate. How many orders can it complete in 5 hours?', options: ['30', '36', '40', '45'], answer: 2, explanation: 'The rate is 24 ÷ 3 = 8 orders per hour. In 5 hours: 8 × 5 = 40.' },
  { prompt: 'A company has 60 employees. If 15 work in sales, what fraction of the employees work in sales?', options: ['1/2', '1/3', '1/4', '1/5'], answer: 2, explanation: '15/60 simplifies to 1/4.' },
  { prompt: 'Find the next number in the pattern: 4, 8, 16, 32, ___.', options: ['48', '56', '64', '72'], answer: 2, explanation: 'Each number doubles, so 32 × 2 = 64.' },
  { prompt: 'BINARY CHECKPOINT 1: A project is on budget when actual spending is less than or equal to the approved budget. The budget is ₹10,000 and spending is ₹9,500. Is it on budget?', options: ['Yes', 'No'], answer: 0, explanation: '₹9,500 is less than ₹10,000, so the project is on budget.', binary: true },
  { prompt: 'A product costs ₹800. A discount of 10% is applied. What is the selling price?', options: ['₹700', '₹720', '₹740', '₹780'], answer: 1, explanation: '10% of ₹800 is ₹80. Selling price = ₹800 − ₹80 = ₹720.' },
  { prompt: 'Four workers complete a task in 6 days. At the same rate, how many worker-days does the task require?', options: ['10', '18', '24', '30'], answer: 2, explanation: 'Total work = 4 workers × 6 days = 24 worker-days.' },
  { prompt: 'A survey records 20, 25, and 30 customer visits over three days. What is the average per day?', options: ['20', '25', '27.5', '30'], answer: 1, explanation: 'Average = (20 + 25 + 30) ÷ 3 = 25.' },
  { prompt: 'A delivery is delayed only if the stock is unavailable or the vehicle breaks down. Stock is available and the vehicle works. What follows?', options: ['The delivery must be delayed', 'The delivery is not delayed for either stated reason', 'The stock is unavailable', 'The vehicle broke down'], answer: 1, explanation: 'Neither stated cause of delay is present.' },
  { prompt: 'BINARY CHECKPOINT 2: A report says revenue rose from ₹50,000 to ₹60,000. Is the increase 20% of the original revenue?', options: ['Yes', 'No'], answer: 0, explanation: 'The increase is ₹10,000; ₹10,000 ÷ ₹50,000 × 100 = 20%.', binary: true },
  { prompt: 'A store sold 12, 18, and 10 items on Monday, Tuesday, and Wednesday. How many items were sold in total?', options: ['38', '40', '42', '44'], answer: 1, explanation: '12 + 18 + 10 = 40 items.' },
  { prompt: 'All approved invoices have an invoice number. Invoice A has no invoice number. Based on this rule, what can you conclude?', options: ['Invoice A is approved', 'Invoice A is not approved', 'All invoices are rejected', 'Nothing about invoice A can be concluded'], answer: 1, explanation: 'If every approved invoice must have a number, an invoice without one cannot be approved under this rule.' },
  { prompt: 'A business earns ₹2,400 from 30 units sold. What is the revenue per unit?', options: ['₹60', '₹70', '₹80', '₹90'], answer: 2, explanation: '₹2,400 ÷ 30 = ₹80 per unit.' },
  { prompt: 'Three departments report 12, 8, and 15 open tasks. Which department has the most open tasks?', options: ['Department A (12)', 'Department B (8)', 'Department C (15)', 'All are equal'], answer: 2, explanation: '15 is the largest of 12, 8, and 15.' },
  { prompt: 'BINARY CHECKPOINT 3: If every purchase above ₹5,000 needs manager approval, does a purchase of ₹6,200 need approval?', options: ['Yes', 'No'], answer: 0, explanation: '₹6,200 is above ₹5,000, so manager approval is required.', binary: true },
];

interface Props { onComplete: () => void; }

export const LevelOneChallenge: React.FC<Props> = ({ onComplete }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionOrder, setQuestionOrder] = useState<number[]>(QUESTIONS.map((_, i) => i));
  const [consecutiveWrong, setConsecutiveWrong] = useState(0);
  const [mazeStep, setMazeStep] = useState(0);
  const [mazeFacing, setMazeFacing] = useState('Straight');
  const [lives, setLives] = useState(5);
  const [secondsLeft, setSecondsLeft] = useState(20 * 60);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ correct: boolean; text: string } | null>(null);
  const [failed, setFailed] = useState(false);
  const [finished, setFinished] = useState(false);
  const [blocks, setBlocks] = useState([false, false, false]);
  const question = QUESTIONS[questionOrder[questionIndex] ?? questionIndex];
  const questionNumber = questionIndex + 1;
  const timer = useMemo(() => `${String(Math.floor(secondsLeft / 60)).padStart(2, '0')}:${String(secondsLeft % 60).padStart(2, '0')}`, [secondsLeft]);

  useEffect(() => {
    if (finished || failed) return;
    const interval = window.setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => window.clearInterval(interval);
  }, [finished, failed]);

  useEffect(() => {
    if (secondsLeft === 0 && !finished) setFailed(true);
  }, [secondsLeft, finished]);

  const restart = () => {
    setQuestionIndex(0); setQuestionOrder(QUESTIONS.map((_, i) => i)); setConsecutiveWrong(0); setMazeStep(0); setMazeFacing('Straight'); setLives(5); setSecondsLeft(20 * 60); setSelected(null);
    setFeedback(null); setFailed(false); setFinished(false); setBlocks([false, false, false]);
  };

  const submit = () => {
    if (selected === null || feedback) return;
    if (selected === question.answer) {
      const nextBlocks = [...blocks];
      if (questionNumber === 5) nextBlocks[0] = true;
      if (questionNumber === 10) nextBlocks[1] = true;
      if (questionNumber === 15) nextBlocks[2] = true;
      setBlocks(nextBlocks);
      setConsecutiveWrong(0);
      setFeedback({ correct: true, text: question.explanation });
    } else {
      const wrongCount = consecutiveWrong + 1;
      setConsecutiveWrong(wrongCount);
      const shouldLoseLife = wrongCount >= 3;
      const remaining = shouldLoseLife ? Math.max(0, lives - 1) : lives;
      if (shouldLoseLife) setConsecutiveWrong(0);
      setLives(remaining);
      // Shuffle the unanswered question order after every incorrect answer.
      setQuestionOrder((old) => { const next = [...old]; const tail = next.slice(questionIndex); for (let i = tail.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [tail[i], tail[j]] = [tail[j], tail[i]]; } return [...next.slice(0, questionIndex), ...tail]; });
      setFeedback({ correct: false, text: `Incorrect. Question shuffled. ${shouldLoseLife ? 'Three wrong answers: one life removed.' : `${2 - (wrongCount % 3)} wrong attempt(s) until a life is lost.`} ${question.explanation}` });
      if (remaining <= 0) setFailed(true);
    }
  };

  const next = () => {
    if (!feedback) return;
    if (!feedback.correct) {
      setSelected(null); setFeedback(null); return;
    }
    if (questionIndex === QUESTIONS.length - 1) {
      setFinished(true); return;
    }
    setQuestionIndex((n) => n + 1); setSelected(null); setFeedback(null);
  };

  if (finished) return (
    <main className="min-h-screen w-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <section className="max-w-xl w-full text-center rounded-3xl border border-emerald-400/40 bg-slate-900 p-8 shadow-2xl">
        <div className="text-5xl mb-4">🏆</div><p className="text-emerald-300 font-black uppercase tracking-widest text-sm">Level 1 Complete</p>
        <h1 className="text-3xl font-black mt-2">Business Logic &amp; Data Reasoning</h1>
        <p className="text-slate-300 mt-3">All 15 questions solved and all 3 blocks unlocked. Level 2 is now available.</p>
        <button onClick={onComplete} className="mt-7 w-full rounded-xl bg-emerald-400 px-5 py-4 font-black text-slate-950 hover:bg-emerald-300">Continue to Level 2 →</button>
      </section>
    </main>
  );

  if (failed) return (
    <main className="min-h-screen w-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <section className="max-w-xl w-full text-center rounded-3xl border border-rose-400/40 bg-slate-900 p-8 shadow-2xl">
        <div className="text-5xl mb-4">🌱</div><p className="text-rose-300 font-black uppercase tracking-widest text-sm">Level 1 Not Completed</p>
        <h1 className="text-3xl font-black mt-2">Try the maze challenge again</h1>
        <p className="text-slate-300 mt-3">You need to answer all 15 questions within 20 minutes while keeping at least one life.</p>
        <button onClick={restart} className="mt-7 w-full rounded-xl bg-rose-400 px-5 py-4 font-black text-slate-950 hover:bg-rose-300 flex justify-center gap-2"><RotateCcw className="w-5 h-5"/> Restart Level 1</button>
      </section>
    </main>
  );

  return (
    <main className="min-h-screen w-screen overflow-auto bg-slate-950 text-white p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-wrap items-center justify-between gap-4 mb-6 rounded-2xl border border-emerald-400/30 bg-slate-900/90 p-4">
          <div className="flex items-center gap-3"><div className="rounded-xl bg-emerald-400/15 p-3"><BrainCircuit className="w-7 h-7 text-emerald-300"/></div><div><p className="text-xs font-black uppercase tracking-widest text-emerald-300">Garden Escape · Level 1 of 2</p><h1 className="text-xl md:text-2xl font-black">Business Logic &amp; Data Reasoning</h1></div></div>
          <div className="flex items-center gap-4"><div className="flex items-center gap-1 text-rose-300"><Heart className="w-4 h-4"/>{Array.from({length: 5}, (_, i) => <span key={i}>{i < lives ? '❤️' : '🖤'}</span>)}</div><div className={`flex items-center gap-2 rounded-xl px-3 py-2 font-mono font-black ${secondsLeft < 120 ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-800 text-white'}`}><Clock className="w-4 h-4"/>{timer}</div></div>
        </header>
        <div className="grid lg:grid-cols-[1fr_280px] gap-5">
          <section className="rounded-3xl border border-slate-700 bg-slate-900 p-5 md:p-8">
            <div className="flex items-center justify-between gap-3 mb-5"><span className="text-xs font-black uppercase tracking-widest text-slate-400">Question {questionNumber} / 15</span><span className="text-xs font-bold text-emerald-300">{question.binary ? 'BINARY BLOCK CHALLENGE' : 'LOGIC CHALLENGE'}</span></div>
            <div className="h-2 rounded-full bg-slate-800 mb-7 overflow-hidden"><div className="h-full rounded-full bg-emerald-400 transition-all" style={{width: `${(questionNumber / QUESTIONS.length) * 100}%`}}/></div>
            <h2 className="text-xl md:text-2xl font-bold leading-relaxed">{question.prompt}</h2>
            <div className={`grid ${question.binary ? 'sm:grid-cols-2' : 'sm:grid-cols-2'} gap-3 mt-7`}>
              {question.options.map((option, index) => <button key={option} disabled={!!feedback} onClick={() => setSelected(index)} className={`rounded-xl border-2 p-4 text-left font-semibold transition ${selected === index ? 'border-emerald-300 bg-emerald-400/15 text-white' : 'border-slate-700 bg-slate-950 hover:border-slate-500'} ${feedback && index === question.answer ? 'border-emerald-400 bg-emerald-400/15' : ''}`}>{String.fromCharCode(65 + index)}. {option}</button>)}
            </div>
            {feedback && <div className={`mt-5 rounded-xl p-4 ${feedback.correct ? 'border border-emerald-400/40 bg-emerald-400/10 text-emerald-100' : 'border border-rose-400/40 bg-rose-400/10 text-rose-100'}`}><p className="font-black mb-1">{feedback.correct ? 'Correct answer!' : 'Incorrect answer — 1 life lost'}</p><p className="text-sm">{feedback.text}</p></div>}
            <div className="flex flex-wrap gap-3 mt-7"><button disabled={selected === null || !!feedback} onClick={submit} className="flex-1 rounded-xl bg-emerald-400 px-5 py-3 font-black text-slate-950 disabled:opacity-40 hover:bg-emerald-300">Submit Answer</button>{feedback && <button onClick={next} className="flex-1 rounded-xl bg-sky-400 px-5 py-3 font-black text-slate-950 hover:bg-sky-300">{feedback.correct ? (questionNumber === 15 ? 'Finish Level 1' : 'Next Question →') : 'Retry Question'}</button>}</div>
          </section>
          <aside className="rounded-3xl border border-slate-700 bg-slate-900 p-5">
            <h3 className="font-black text-lg mb-3">First-person maze view</h3>
            <div className="relative h-56 overflow-hidden rounded-2xl border border-emerald-400/30 bg-gradient-to-b from-sky-950 via-emerald-950 to-amber-950" style={{ perspective: '500px' }}>
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-sky-900 to-slate-800"/>
              <div className="absolute inset-x-0 bottom-0 h-1/2" style={{ background: 'linear-gradient(165deg,#9a8667 0%,#c0a783 48%,#536b35 49%,#294522 100%)', transform: `perspective(220px) rotateX(${mazeFacing === 'Back' ? '18deg' : '0deg'})` }}/>
              <div className="absolute left-1/2 top-1/2 h-32 w-24 -translate-x-1/2 -translate-y-1/2 border-x-[18px] border-emerald-700 bg-amber-200/20 shadow-[0_0_24px_rgba(16,185,129,0.25)]" style={{ transform: `translateX(calc(-50% + ${mazeFacing === 'Left' ? '-22px' : mazeFacing === 'Right' ? '22px' : '0px'})) perspective(160px) rotateY(${mazeFacing === 'Left' ? '18deg' : mazeFacing === 'Right' ? '-18deg' : '0deg'})` }}><div className="absolute inset-x-0 top-1/2 border-t-8 border-emerald-800"/><div className="absolute inset-y-0 left-1/2 border-l-8 border-emerald-800"/></div>
              <div className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-1 text-xs font-bold">Position: {mazeStep + 1} · Facing {mazeFacing}</div>
            </div>
            <p className="mt-3 mb-2 text-xs text-slate-400">Answer correctly to choose where to move.</p>
            <div className="grid grid-cols-4 gap-1.5 mb-6">{(['Straight','Back','Left','Right'] as const).map((dir) => <button key={dir} disabled={!feedback?.correct} onClick={() => { setMazeFacing(dir); setMazeStep((n) => n + 1); }} className="rounded-lg border border-emerald-400/30 bg-slate-950 px-1 py-2 text-[11px] font-bold text-emerald-200 hover:bg-emerald-900/60 disabled:opacity-40 disabled:cursor-not-allowed">{dir}</button>)}</div>
            <h3 className="font-black text-lg mb-2 flex items-center gap-2"><LockKeyhole className="w-5 h-5 text-amber-300"/> Maze Blocks</h3><p className="text-sm text-slate-400 mb-5">Unlock one block at each binary checkpoint.</p>
            <div className="space-y-3">{blocks.map((unlocked, i) => <div key={i} className={`rounded-xl border p-4 flex items-center justify-between ${unlocked ? 'border-emerald-400/40 bg-emerald-400/10' : 'border-slate-700 bg-slate-950'}`}><div><p className="font-bold">Block {i + 1}</p><p className="text-xs text-slate-400">Question {(i + 1) * 5}</p></div>{unlocked ? <CheckCircle2 className="w-6 h-6 text-emerald-300"/> : <LockKeyhole className="w-5 h-5 text-slate-500"/>}</div>)}</div>
            <div className="mt-6 rounded-xl bg-slate-950 p-4"><p className="text-xs uppercase tracking-widest text-slate-500 font-black">Level Rules</p><ul className="mt-3 space-y-2 text-sm text-slate-300"><li>• 20-minute limit</li><li>• 5 lives maximum</li><li>• Questions 5, 10 and 15 are binary</li><li>• Complete all 15 to enter Level 2</li></ul></div>
          </aside>
        </div>
      </div>
    </main>
  );
};
