'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Award, CheckCircle2, RotateCcw, Sparkles, X, Zap } from 'lucide-react'

type QuizModalProps = {
  onClose: () => void
  onOpenLead: (course: string, note: string) => void
}

type Question = {
  question: string
  subtext: string
  options: string[]
  correctIndex: number
  explanation: string
}

const QUIZ_QUESTIONS: Question[] = [
  {
    question: 'Chọn câu diễn đạt đúng nhất:',
    subtext: 'Thì hiện tại đơn diễn tả thói quen hàng ngày.',
    options: [
      'She go to school every day.',
      'She goes to school every day.',
      'She going to school every day.',
    ],
    correctIndex: 1,
    explanation: 'Chủ ngữ "She" ngôi thứ 3 số ít nên động từ thêm "-es" thành "goes".',
  },
  {
    question: 'Từ "brilliant" có nghĩa tương đương với từ nào?',
    subtext: 'Mở rộng vốn từ vựng miêu tả ấn tượng.',
    options: [
      'Very clever or impressive (Rất xuất sắc, tài giỏi)',
      'A little bit tired (Hơi mệt mỏi)',
      'Extremely hungry (Rất đói bụng)',
    ],
    correctIndex: 0,
    explanation: '"Brilliant" dùng để khen ngợi điều gì đó rực rỡ, thông minh hoặc xuất chúng.',
  },
  {
    question: 'Điền từ còn thiếu: “If I ___ more time, I would travel.”',
    subtext: 'Câu điều kiện loại 2 giả định điều không có thật ở hiện tại.',
    options: [
      'have',
      'had',
      'will have',
    ],
    correctIndex: 1,
    explanation: 'Vế "If" trong câu điều kiện loại 2 chia ở thì Quá khứ đơn (had).',
  },
]

export function QuizModal({ onClose, onOpenLead }: QuizModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  const totalQuestions = QUIZ_QUESTIONS.length
  const q = QUIZ_QUESTIONS[currentStep]

  function handleNext() {
    if (selectedOption === null) return
    const isCorrect = selectedOption === q.correctIndex
    const nextScore = isCorrect ? score + 1 : score

    if (currentStep + 1 < totalQuestions) {
      setScore(nextScore)
      setCurrentStep(currentStep + 1)
      setSelectedOption(null)
    } else {
      setScore(nextScore)
      setShowResult(true)
    }
  }

  function handleRestart() {
    setCurrentStep(0)
    setSelectedOption(null)
    setScore(0)
    setShowResult(false)
  }

  const getRecommendation = () => {
    if (score === 3) {
      return {
        level: 'CEFR B2 · Advanced (Khá Giỏi)',
        course: 'THPT & IELTS · IELTS Mastery 7.0+ (15+ tuổi)',
        desc: 'Nền tảng của bạn rất vững chắc! Bạn có khả năng phản xạ và ngữ pháp tốt, hoàn toàn phù hợp để bứt phá band 7.0+ hoặc tham gia các lớp giao tiếp chuyên nghiệp.',
      }
    }
    if (score === 2) {
      return {
        level: 'CEFR B1 · Intermediate (Trung cấp)',
        course: 'THCS · IELTS Breakthrough (12–17 tuổi)',
        desc: 'Bạn đã có nền tảng ngữ pháp khá tốt! Khóa học tăng cường phản xạ, mở rộng từ vựng học thuật sẽ giúp bạn nhanh chóng tự tin giao tiếp và thi chứng chỉ.',
      }
    }
    return {
      level: 'CEFR A2 · Foundation (Khởi động)',
      course: 'Tiểu học · Bright Stars (6–11 tuổi)',
      desc: 'Bạn đang bắt đầu rất tốt! Hãy tham gia lớp học phản xạ tự nhiên cùng 100% giáo viên quốc tế để xây nền móng phát âm chuẩn và tự tin dùng tiếng Anh mỗi ngày.',
    }
  }

  const result = getRecommendation()

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      role="presentation"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="quiz-modal-title"
        className="relative my-auto w-full max-w-lg animate-[modal-scale-in_300ms_ease-out] rounded-[28px] border border-white/70 bg-white p-6 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng bài kiểm tra"
          className="absolute right-5 top-5 grid size-11 place-items-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <X size={18} />
        </button>

        {!showResult ? (
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid size-10 place-items-center rounded-xl bg-amber-100 text-amber-700">
                <Zap size={18} />
              </span>
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-700">
                  Quick Placement Test · 3 phút
                </p>
                <h2 id="quiz-modal-title" className="text-lg sm:text-xl font-black text-[#0A192F]">
                  Câu hỏi {currentStep + 1} / {totalQuestions}
                </h2>
              </div>
            </div>

            <div className="mt-3.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
              />
            </div>

            <div className="mt-4 rounded-xl bg-indigo-50/60 p-3.5 border border-indigo-100/60">
              <h3 className="text-sm sm:text-base font-extrabold text-[#0A192F]">{q.question}</h3>
              <p className="mt-0.5 text-xs sm:text-[13px] text-slate-600">{q.subtext}</p>
            </div>

            <div className="mt-3.5 grid gap-2" role="radiogroup" aria-label="Đáp án lựa chọn">
              {q.options.map((opt, idx) => {
                const isSelected = selectedOption === idx
                return (
                  <button
                    key={opt}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setSelectedOption(idx)}
                    className={`flex min-h-11 w-full items-center justify-between rounded-xl border p-3 text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 shadow-sm ring-2 ring-indigo-500/20'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-slate-50'
                    }`}
                  >
                    <span>{opt}</span>
                    <span
                      className={`grid size-5 shrink-0 place-items-center rounded-full border text-[11px] font-bold ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-600 text-white'
                          : 'border-slate-300 bg-white text-transparent'
                      }`}
                    >
                      ✓
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3.5">
              <p className="text-xs text-slate-500">Chọn 1 đáp án để tiếp tục</p>
              <button
                type="button"
                disabled={selectedOption === null}
                onClick={handleNext}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-indigo-600 px-5 text-xs sm:text-sm font-bold text-white shadow-md shadow-indigo-500/20 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
              >
                {currentStep + 1 === totalQuestions ? 'Xem kết quả' : 'Câu tiếp theo'}
                <ArrowRight size={14} className="ml-1.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center" role="status" aria-live="polite">
            <div className="relative mx-auto grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-xl shadow-amber-500/25">
              <Award size={32} />
              <Sparkles aria-hidden="true" className="absolute -top-1 -right-1 text-amber-300" size={18} />
            </div>

            <p className="mt-3.5 text-[11px] font-extrabold uppercase tracking-wider text-indigo-700">Kết quả đánh giá nhanh</p>
            <h2 id="quiz-modal-title" className="mt-1 text-xl sm:text-2xl font-black text-[#0A192F]">
              Bạn đúng {score} / {totalQuestions} câu!
            </h2>

            <div className="mt-3.5 rounded-xl border border-indigo-100 bg-indigo-50/70 p-3.5 text-left">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-900">Khuyến nghị lộ trình</span>
              </div>
              <p className="mt-1 text-base font-extrabold text-indigo-950">{result.level}</p>
              <p className="mt-1 text-xs sm:text-[13px] leading-relaxed text-slate-700">{result.desc}</p>
            </div>

            <div className="mt-5 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  onClose()
                  onOpenLead(
                    result.course,
                    `Kết quả kiểm tra trình độ: ${score}/${totalQuestions} câu đúng (${result.level}). Cần tư vấn chi tiết.`
                  )
                }}
                className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 px-5 text-xs sm:text-sm font-bold text-slate-950 shadow-md shadow-amber-800/15 transition cursor-pointer"
              >
                Nhận lộ trình &amp; đăng ký học thử miễn phí
                <ArrowRight size={15} className="ml-1.5" />
              </button>
              <button
                type="button"
                onClick={handleRestart}
                className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                <RotateCcw size={12} className="mr-1.5" />
                Làm lại bài kiểm tra
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
