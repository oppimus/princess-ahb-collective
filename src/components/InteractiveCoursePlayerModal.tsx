import React, { useState } from 'react';
import {
  BookOpen,
  Play,
  Pause,
  CheckCircle2,
  X,
  Award,
  Download,
  Clock,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  RotateCcw,
  Volume2,
  Maximize2,
  FileText,
  HelpCircle,
  Share2,
  Printer,
  Star,
  Users,
} from 'lucide-react';
import { DigitalProduct, CourseLesson } from '../types';

interface InteractiveCoursePlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: DigitalProduct | null;
  onOpenBooking?: () => void;
}

export const InteractiveCoursePlayerModal: React.FC<InteractiveCoursePlayerModalProps> = ({
  isOpen,
  onClose,
  course,
}) => {
  if (!isOpen || !course) return null;

  // Default interactive lessons if not specified on the product
  const lessons: CourseLesson[] = course.interactiveLessons && course.interactiveLessons.length > 0
    ? course.interactiveLessons
    : [
        {
          id: 'def-1',
          title: 'Module 1: Foundations of Master Braiding & Speed Ergonomics',
          durationMinutes: 45,
          isFreePreview: true,
          summary: 'Master the hand placement, pre-parting geometry, and spine alignment that lets you braid for 8 hours without wrist fatigue.',
          keyTakeaways: [
            'Align chair height so client scalp is exactly at braider chest level.',
            'Keep wrist straight and rely on index-finger pivot loops.',
            'Pre-pull extensions using a tension rack before starting the timer.',
          ],
          actionItem: 'Practice the 3-finger pinch grip on 10 rows without stopping.',
        },
        {
          id: 'def-2',
          title: 'Module 2: Flawless Knotless Feed-in & Seamless Roots',
          durationMinutes: 52,
          isFreePreview: false,
          summary: 'Eliminate bulky bases and slippage with micro-feeding that looks natural and protects delicate hairlines.',
          keyTakeaways: [
            'Begin with client natural hair only for the first two rotations.',
            'Feed extension strands from the underside to keep top parting crisp.',
            'UseBatana oil or organic edge butter to smooth flyaways.',
          ],
          actionItem: 'Complete a 4-braid symmetry row on a mannequin head.',
        },
        {
          id: 'def-3',
          title: 'Module 3: Luxury Client Onboarding & $50 Deposit Policies',
          durationMinutes: 38,
          isFreePreview: false,
          summary: 'Build a bulletproof booking system that commands $300-$500 per head and eliminates cancellations.',
          keyTakeaways: [
            'Enforce non-refundable $50 deposits through Acuity Scheduling.',
            'Send automated 48-hour preparation SMS reminders.',
            'Provide hair-included convenience to double your hourly earnings.',
          ],
          actionItem: 'Update your client intake form with our zero-refund policy clause.',
        },
        {
          id: 'def-4',
          title: 'Module 4: Scaling Beyond the Chair with Digital Royalties',
          durationMinutes: 60,
          isFreePreview: false,
          summary: 'Monetize your expertise by selling digital guides, wholesale hair bundles, and training 1-on-1 students.',
          keyTakeaways: [
            'Sell $25 digital braid maintenance guides on days when chairs are empty.',
            'Earn 30% affiliate royalties by recommending authentic products.',
            'Package your curriculum into high-ticket student masterclasses.',
          ],
          actionItem: 'Draft your first 3-module digital guide outline using Canva.',
        },
      ];

  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(35); // 35% watched
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [completedLessons, setCompletedLessons] = useState<string[]>([lessons[0]?.id || '']);
  const [activeTab, setActiveTab] = useState<'classroom' | 'notes' | 'quiz' | 'certificate'>('classroom');
  const [studentName, setStudentName] = useState('Alexis Carter');
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isCertificatePrinted, setIsCertificatePrinted] = useState(false);

  const currentLesson = lessons[activeLessonIndex] || lessons[0];
  const isCurrentCompleted = completedLessons.includes(currentLesson.id);

  const handleToggleLessonCompletion = (id: string) => {
    if (completedLessons.includes(id)) {
      setCompletedLessons(completedLessons.filter((item) => item !== id));
    } else {
      setCompletedLessons([...completedLessons, id]);
    }
  };

  const handleNextLesson = () => {
    if (!completedLessons.includes(currentLesson.id)) {
      setCompletedLessons([...completedLessons, currentLesson.id]);
    }
    if (activeLessonIndex < lessons.length - 1) {
      setActiveLessonIndex(activeLessonIndex + 1);
      setVideoProgress(0);
      setIsPlaying(true);
    } else {
      setActiveTab('certificate');
    }
  };

  const handlePrintCertificate = () => {
    setIsCertificatePrinted(true);
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#ffffff] rounded-2xl max-w-5xl w-full max-h-[94vh] overflow-y-auto border border-[#edd8d5] shadow-2xl relative my-auto flex flex-col">
        {/* Modal Header */}
        <div className="sticky top-0 bg-[#ffffff]/98 backdrop-blur-md p-4 sm:p-5 border-b border-[#edd8d5] flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8e273e] to-[#6e1c2e] text-white flex items-center justify-center shadow-md">
              <BookOpen className="w-5 h-5 text-[#fcd34d]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded bg-[#faebea] text-[#8e273e] border border-[#f0c5cd] text-[10px] font-bold uppercase tracking-wider">
                  Interactive Academy Classroom
                </span>
                <span className="text-xs text-[#705055] hidden sm:inline">
                  {completedLessons.length} of {lessons.length} Lessons Finished
                </span>
              </div>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-[#221417] line-clamp-1">
                {course.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#faf4f2] text-[#705055] hover:text-black transition-colors cursor-pointer"
            aria-label="Close classroom"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="bg-[#faf4f2] border-b border-[#edd8d5] px-4 sm:px-6 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs font-semibold">
          <button
            onClick={() => setActiveTab('classroom')}
            className={`py-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'classroom'
                ? 'border-[#8e273e] text-[#8e273e] font-bold'
                : 'border-transparent text-[#705055] hover:text-[#221417]'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Interactive Video Player & Lesson</span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`py-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'notes'
                ? 'border-[#8e273e] text-[#8e273e] font-bold'
                : 'border-transparent text-[#705055] hover:text-[#221417]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Lesson Notes & Worksheets</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`py-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'quiz'
                ? 'border-[#8e273e] text-[#8e273e] font-bold'
                : 'border-transparent text-[#705055] hover:text-[#221417]'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Knowledge Check Quiz</span>
          </button>

          <button
            onClick={() => setActiveTab('certificate')}
            className={`py-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'certificate'
                ? 'border-[#8e273e] text-[#8e273e] font-bold'
                : 'border-transparent text-[#705055] hover:text-[#221417]'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-[#fcd34d]" />
            <span>Official Completion Certificate</span>
          </button>
        </div>

        {/* Classroom Main View */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
          {activeTab === 'classroom' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Video Player & Controls */}
              <div className="lg:col-span-8 space-y-4">
                {/* Simulated HD Video Player */}
                <div className="relative rounded-2xl overflow-hidden bg-black aspect-video shadow-xl flex flex-col justify-between group">
                  <img
                    src={course.coverImage}
                    alt={course.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60" />

                  {/* Top Bar inside Player */}
                  <div className="relative z-10 p-3 sm:p-4 flex items-center justify-between text-white text-xs">
                    <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/20 font-bold uppercase text-[10px] tracking-wider text-[#fcd34d]">
                      HD 1080p Masterclass
                    </span>
                    <span className="text-[11px] text-white/80">
                      Lesson {activeLessonIndex + 1} of {lessons.length} · {currentLesson.durationMinutes} Mins
                    </span>
                  </div>

                  {/* Center Play Button Overlay */}
                  <div className="relative z-10 flex items-center justify-center my-auto">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#8e273e] to-[#6e1c2e] text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-[#fcd34d]/60"
                      aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    >
                      {isPlaying ? (
                        <Pause className="w-8 h-8 text-white fill-white" />
                      ) : (
                        <Play className="w-8 h-8 text-white fill-white ml-1" />
                      )}
                    </button>
                  </div>

                  {/* Bottom Video Controls Bar */}
                  <div className="relative z-10 p-3 sm:p-4 bg-gradient-to-t from-black via-black/80 to-transparent space-y-2">
                    {/* Scrubber */}
                    <div
                      className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden cursor-pointer"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const clickX = e.clientX - rect.left;
                        const pct = Math.round((clickX / rect.width) * 100);
                        setVideoProgress(pct);
                      }}
                    >
                      <div
                        className="h-full bg-gradient-to-r from-[#8e273e] to-[#fcd34d] transition-all"
                        style={{ width: `${videoProgress}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-white text-xs pt-1">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="hover:text-[#fcd34d] transition-colors"
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <Volume2 className="w-4 h-4 text-white/80" />
                        <span className="text-[11px] font-mono text-white/80">
                          {Math.floor((currentLesson.durationMinutes * videoProgress) / 100)}:15 / {currentLesson.durationMinutes}:00
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Speed Toggle */}
                        <button
                          onClick={() => {
                            if (playbackSpeed === 1) setPlaybackSpeed(1.25);
                            else if (playbackSpeed === 1.25) setPlaybackSpeed(1.5);
                            else setPlaybackSpeed(1);
                          }}
                          className="px-2 py-0.5 rounded bg-white/20 hover:bg-white/30 text-[11px] font-bold transition-colors"
                        >
                          {playbackSpeed}x Speed
                        </button>
                        <Maximize2 className="w-4 h-4 text-white/80" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lesson Info Card */}
                <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#edd8d5] shadow-xs space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs font-bold text-[#8e273e] uppercase tracking-wider">
                      Module {activeLessonIndex + 1}
                    </span>
                    <button
                      onClick={() => handleToggleLessonCompletion(currentLesson.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isCurrentCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-[#faf4f2] text-[#705055] hover:bg-[#faebea] hover:text-[#8e273e]'
                      }`}
                    >
                      <CheckCircle2 className={`w-4 h-4 ${isCurrentCompleted ? 'text-emerald-600' : 'text-[#705055]'}`} />
                      <span>{isCurrentCompleted ? 'Lesson Completed' : 'Mark as Complete'}</span>
                    </button>
                  </div>

                  <h4 className="font-serif font-bold text-xl text-[#221417]">
                    {currentLesson.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#705055] leading-relaxed">
                    {currentLesson.summary}
                  </p>

                  <div className="p-4 bg-[#faf4f2] rounded-xl border border-[#edd8d5] space-y-2">
                    <strong className="text-xs font-bold text-[#221417] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#8e273e]" />
                      <span>Key Mastery Takeaways:</span>
                    </strong>
                    <ul className="list-disc list-inside space-y-1 text-xs text-[#543b3f]">
                      {currentLesson.keyTakeaways.map((takeaway, idx) => (
                        <li key={idx}>{takeaway}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs space-y-1">
                    <strong className="text-amber-950 font-bold block">
                      ✍️ Student Practice Drill / Action Item:
                    </strong>
                    <p className="text-amber-900">{currentLesson.actionItem}</p>
                  </div>

                  {/* Next Step / Navigation */}
                  <div className="pt-2 flex items-center justify-between">
                    <button
                      disabled={activeLessonIndex === 0}
                      onClick={() => setActiveLessonIndex(activeLessonIndex - 1)}
                      className="px-4 py-2 rounded-lg text-xs font-semibold border border-[#edd8d5] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#faf4f2]"
                    >
                      ← Previous Lesson
                    </button>
                    <button
                      onClick={handleNextLesson}
                      className="px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-[#8e273e] hover:bg-[#721e31] transition-all flex items-center gap-1.5 shadow-xs"
                    >
                      <span>{activeLessonIndex === lessons.length - 1 ? 'Go to Certificate' : 'Next Lesson →'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Syllabus & Course Progress */}
              <div className="lg:col-span-4 space-y-4">
                <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#edd8d5] shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="font-serif font-bold text-base text-[#221417]">
                      Course Syllabus
                    </h5>
                    <span className="text-xs font-bold text-[#8e273e]">
                      {lessons.length} Modules
                    </span>
                  </div>

                  {/* Progress tracker */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-[#705055]">
                      <span>Completion:</span>
                      <strong className="text-[#8e273e]">{Math.round((completedLessons.length / lessons.length) * 100)}%</strong>
                    </div>
                    <div className="w-full h-2 bg-[#faebea] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#8e273e] rounded-full transition-all duration-300"
                        style={{ width: `${(completedLessons.length / lessons.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Lesson List */}
                  <div className="space-y-2">
                    {lessons.map((lesson, idx) => {
                      const isActive = idx === activeLessonIndex;
                      const isDone = completedLessons.includes(lesson.id);

                      return (
                        <div
                          key={lesson.id}
                          onClick={() => {
                            setActiveLessonIndex(idx);
                            setVideoProgress(0);
                            setIsPlaying(true);
                          }}
                          className={`p-3 rounded-xl border transition-all cursor-pointer ${
                            isActive
                              ? 'bg-[#faebea]/60 border-[#8e273e] shadow-2xs'
                              : 'bg-[#faf4f2] border-[#edd8d5] hover:border-[#8e273e]/50'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleLessonCompletion(lesson.id);
                              }}
                              className="mt-0.5 text-xs"
                            >
                              {isDone ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                              ) : (
                                <div className="w-4 h-4 rounded-full border border-[#8e273e]/50" />
                              )}
                            </button>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1 text-[11px] mb-0.5">
                                <span className="font-bold text-[#8e273e]">Lesson {idx + 1}</span>
                                <span className="text-[#705055]">{lesson.durationMinutes}m</span>
                              </div>
                              <h6 className={`text-xs font-semibold truncate ${isActive ? 'text-[#8e273e]' : 'text-[#221417]'}`}>
                                {lesson.title}
                              </h6>
                              {lesson.isFreePreview && (
                                <span className="inline-block mt-1 px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 text-[9px] font-bold uppercase tracking-wider border border-emerald-200">
                                  Free Preview
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bonus Download Box */}
                  <div className="pt-2 border-t border-[#edd8d5] space-y-2">
                    <span className="text-xs font-bold text-[#221417] block">
                      Course Attachments & Downloads:
                    </span>
                    <button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(
                          `PRINCESS AHB - STUDENT WORKBOOK\nCourse: ${course.title}\n\nIncludes 32-page speed ergonomics guide, parting template matrices, and student intake contract templates.`
                        );
                        link.download = `${course.id}-student-workbook.txt`;
                        link.click();
                      }}
                      className="w-full py-2 bg-[#ffffff] border border-[#edd8d5] hover:bg-[#faf4f2] text-[#8e273e] rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Student Workbook (PDF)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Notes & Worksheets */}
          {activeTab === 'notes' && (
            <div className="space-y-5 max-w-3xl mx-auto">
              <div className="p-6 rounded-2xl bg-[#ffffff] border border-[#edd8d5] shadow-xs space-y-4">
                <h4 className="font-serif font-bold text-xl text-[#221417]">
                  Master Stylist Field Notes & Ergonomics Blueprint
                </h4>
                <p className="text-xs sm:text-sm text-[#705055] leading-relaxed">
                  These companion field notes outline the exact techniques used at Princess AHB salon in Baton Rouge to deliver 8-hour knotless braids in under 4.5 hours with zero client traction pain.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#faf4f2] border border-[#edd8d5] space-y-2">
                    <h5 className="font-bold text-sm text-[#8e273e]">
                      1. The 3-Finger Loop Technique
                    </h5>
                    <p className="text-xs text-[#543b3f] leading-relaxed">
                      Instead of alternating index-thumb continuously, anchor the base with your middle finger and rotate extensions strictly with index and thumb. This reduces wrist oscillation by 60% and guarantees identical tension across every single plait.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#faf4f2] border border-[#edd8d5] space-y-2">
                    <h5 className="font-bold text-sm text-[#8e273e]">
                      2. Clean Parting Formula
                    </h5>
                    <p className="text-xs text-[#543b3f] leading-relaxed">
                      Part the hair while lightly damp with botanical edge conditioning balm. Use the stainless steel tail of the comb rather than plastic teeth to slice the grid lines. Stagger your parts in a brick-layer formation so there are no visible scalp lines when hair is pulled up.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#faf4f2] border border-[#edd8d5] space-y-2">
                    <h5 className="font-bold text-sm text-[#8e273e]">
                      3. Client Scalp Safety & Legal Liability
                    </h5>
                    <p className="text-xs text-[#543b3f] leading-relaxed">
                      Never braid fine perimeter hairs tightly. Always leave out fragile baby hairs and inform the client during intake. Use our included Client Intake & Consent Contract to protect your salon against claims.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Knowledge Check Quiz */}
          {activeTab === 'quiz' && (
            <div className="space-y-5 max-w-2xl mx-auto">
              <div className="p-6 rounded-2xl bg-[#ffffff] border border-[#edd8d5] shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#8e273e]" />
                  <h4 className="font-serif font-bold text-xl text-[#221417]">
                    Braiding Mastery Knowledge Check
                  </h4>
                </div>
                <p className="text-xs text-[#705055]">
                  Test your understanding before generating your official certificate of completion.
                </p>

                <div className="p-4 bg-[#faf4f2] rounded-xl border border-[#edd8d5] space-y-3">
                  <span className="text-xs font-bold text-[#8e273e]">Question 1 of 1</span>
                  <p className="text-sm font-semibold text-[#221417]">
                    What is the most effective way to eliminate wrist and lower-back pain during waist-length knotless installations?
                  </p>

                  <div className="space-y-2 pt-1 text-xs">
                    {[
                      'Braid faster by pulling tightly on every rotation',
                      'Position the hydraulic styling chair at chest height and use the 3-finger index-pivot loop',
                      'Take a 30-minute break between every single braid row',
                      'Use heavier synthetic extension packs to anchor the hair',
                    ].map((opt, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setQuizAnswer(idx);
                          setQuizSubmitted(true);
                        }}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-2.5 ${
                          quizAnswer === idx
                            ? idx === 1
                              ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold'
                              : 'bg-rose-50 border-rose-300 text-rose-950 font-semibold'
                            : 'bg-white border-[#edd8d5] hover:border-[#8e273e]'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full bg-[#fdf2f4] text-[#8e273e] flex items-center justify-center font-bold text-[11px] shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    ))}
                  </div>

                  {quizSubmitted && (
                    <div className={`p-3 rounded-lg text-xs ${quizAnswer === 1 ? 'bg-emerald-100/70 text-emerald-900' : 'bg-rose-100/70 text-rose-900'}`}>
                      {quizAnswer === 1 ? (
                        <div className="flex items-center gap-2 font-bold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                          <span>Correct! Chest-height chair alignment protects your spine and eliminates fatigue.</span>
                        </div>
                      ) : (
                        <div>Option B is correct: Chest-height chair alignment and 3-finger pivot posture protect your body!</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Official Certificate Generator */}
          {activeTab === 'certificate' && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-serif font-bold text-xl text-[#221417]">
                    Official Princess AHB Certificate of Mastery
                  </h4>
                  <p className="text-xs text-[#705055]">
                    Enter your name to generate your verified certificate of completion.
                  </p>
                </div>
                <button
                  onClick={handlePrintCertificate}
                  className="px-5 py-2.5 bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] hover:from-[#a02f48] text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-95 shrink-0"
                >
                  <Printer className="w-4 h-4" />
                  <span>{isCertificatePrinted ? '✓ Printed' : 'Print / Download Certificate'}</span>
                </button>
              </div>

              {/* Name Customization Input */}
              <div className="p-4 rounded-xl bg-[#ffffff] border border-[#edd8d5] shadow-xs flex flex-col sm:flex-row items-center gap-3">
                <label className="text-xs font-semibold text-[#221417] whitespace-nowrap">
                  Student Name on Certificate:
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter full legal name..."
                  className="flex-1 px-3.5 py-2 rounded-lg border border-[#edd8d5] text-xs bg-white text-[#221417] focus:outline-none focus:ring-1 focus:ring-[#8e273e]"
                />
              </div>

              {/* Luxury Certificate Card */}
              <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#fffefc] via-[#fffbf9] to-[#fff5f2] border-4 border-[#8e273e] shadow-2xl relative text-center space-y-6 overflow-hidden">
                {/* Decorative border corners */}
                <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#fcd34d]" />
                <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#fcd34d]" />
                <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#fcd34d]" />
                <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#fcd34d]" />

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fdf2f4] border border-[#f0c5cd] text-[#8e273e] text-xs font-bold uppercase tracking-widest">
                    <Sparkles className="w-3.5 h-3.5 text-[#fcd34d]" />
                    <span>Princess AHB Academy of African Hair Braiding</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#221417] tracking-wide">
                    Certificate of Mastery
                  </h2>
                  <p className="text-xs sm:text-sm text-[#705055] uppercase tracking-wider font-semibold">
                    This certifies that
                  </p>
                </div>

                <div className="py-2">
                  <div className="font-serif italic font-bold text-3xl sm:text-5xl text-[#8e273e] border-b-2 border-[#8e273e]/30 inline-block px-8 pb-2">
                    {studentName || 'Master Braider'}
                  </div>
                </div>

                <div className="max-w-xl mx-auto space-y-2">
                  <p className="text-xs sm:text-sm text-[#543b3f] leading-relaxed">
                    has successfully completed the comprehensive training curriculum in{' '}
                    <strong className="text-[#221417]">{course.title}</strong>, demonstrating professional competency in tension-free parting, speed ergonomics, client scalp preservation, and salon business mechanics.
                  </p>
                </div>

                {/* Signatures & Seal */}
                <div className="pt-6 border-t border-[#edd8d5] grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
                  <div className="space-y-1">
                    <div className="font-serif italic text-lg text-[#221417]">Princess AHB Master Stylist</div>
                    <div className="w-32 h-0.5 bg-[#8e273e] mx-auto" />
                    <span className="text-[10px] uppercase font-bold text-[#705055] block">Director of Instruction</span>
                  </div>

                  {/* Gold Seal */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#f59e0b] via-[#fcd34d] to-[#d97706] text-white mx-auto flex flex-col items-center justify-center shadow-lg border-2 border-white/60">
                    <Award className="w-7 h-7 text-[#781e32]" />
                    <span className="text-[8px] font-bold uppercase tracking-wider text-[#781e32]">OFFICIAL SEAL</span>
                  </div>

                  <div className="space-y-1">
                    <div className="font-mono text-xs font-bold text-[#221417]">Baton Rouge, LA · 70815</div>
                    <div className="w-32 h-0.5 bg-[#8e273e] mx-auto" />
                    <span className="text-[10px] uppercase font-bold text-[#705055] block">
                      Issued: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
