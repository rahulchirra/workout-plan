"use client";

import { useState, useEffect, useCallback } from "react";
import {
  workoutPlan,
  type WorkoutDay,
  type Exercise,
  type VideoReference,
} from "@/lib/workout-data";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const TYPE_COLORS: Record<string, string> = {
  "Warm-up": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "Primary Compound": "bg-[#ff4d00]/20 text-[#ff4d00] border-[#ff4d00]/30",
  "Secondary Compound": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "The King": "bg-red-600/20 text-red-400 border-red-600/30",
  "Shoulder Mass": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Thickness Builder": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Traps (The Yoke)": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Isolation: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  "Bicep Builder": "bg-pink-500/20 text-pink-400 border-pink-500/30",
  "Tricep Mass": "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  "Posterior Chain": "bg-rose-500/20 text-rose-400 border-rose-500/30",
  "Unilateral (Balance)": "bg-violet-500/20 text-violet-400 border-violet-500/30",
  Calves: "bg-lime-500/20 text-lime-400 border-lime-500/30",
  "CORE FINISHER": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "GRIP FINISHER": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Superset (Arms)": "bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30",
};

function formatTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function parseRestTime(rest: string): number {
  if (rest === "0") return 0;
  const match = rest.match(/(\d+(?:\.\d+)?)/);
  if (!match) return 0;
  const num = parseFloat(match[1]);
  if (rest.includes("m")) return Math.round(num * 60);
  return num;
}

function VideoModal({
  video,
  exerciseName,
  onClose,
}: {
  video: VideoReference;
  exerciseName: string;
  onClose: () => void;
}) {
  const handleOpenExternal = () => {
    window.parent.postMessage({ type: "OPEN_EXTERNAL_URL", data: { url: video.url } }, "*");
  };

  return (
    <div
      className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#111] border border-zinc-800 max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <h3 className="text-white font-bold tracking-wide">{exerciseName}</h3>
            <span className="text-xs px-2 py-0.5 bg-blue-600/20 text-blue-400">MuscleWiki</span>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="bg-zinc-900/50 p-3 border-l-2 border-[#ff4d00]">
            <p className="text-xs text-zinc-500 mb-1">SEARCH PATH:</p>
            <p className="text-sm text-zinc-300 font-mono">{video.searchPath}</p>
          </div>

          <div className="bg-zinc-900/50 p-3 border-l-2 border-yellow-500">
            <p className="text-xs text-zinc-500 mb-1">WHY THIS SOURCE?</p>
            <p className="text-sm text-zinc-300 italic">&quot;{video.reason}&quot;</p>
          </div>

          <button
            onClick={handleOpenExternal}
            className="w-full py-4 bg-[#ff4d00] hover:bg-[#ff6a2a] text-white font-bold tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            WATCH FORM VIDEO
          </button>

          <p className="text-xs text-zinc-600 text-center">
            Opens in new tab. Study the form before lifting.
          </p>
        </div>
      </div>
    </div>
  );
}

function RestTimer({ duration, onComplete }: { duration: number; onComplete: () => void }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="text-center">
        <p className="text-[#ff4d00] text-2xl font-bold mb-4 tracking-wider">REST TIME</p>
        <p
          className="text-[120px] font-bold text-white leading-none"
          style={{ fontFamily: "Bebas Neue, sans-serif" }}
        >
          {mins}:{secs.toString().padStart(2, "0")}
        </p>
        <button
          onClick={onComplete}
          className="mt-8 px-8 py-3 bg-[#ff4d00] text-white font-bold tracking-wider hover:bg-[#ff6a2a] transition-colors"
        >
          SKIP REST
        </button>
      </div>
    </div>
  );
}

function ExerciseCard({
  exercise,
  completedSets,
  onSetComplete,
  onWatchVideo,
  onWatchVideos,
}: {
  exercise: Exercise;
  completedSets: boolean[];
  onSetComplete: (setIndex: number) => void;
  onWatchVideo: () => void;
  onWatchVideos: (index: number) => void;
}) {
  const allDone = completedSets.every(Boolean);
  const typeClass = TYPE_COLORS[exercise.type] || "bg-zinc-700/50 text-zinc-300 border-zinc-600";

  return (
    <div
      className={`relative border-l-4 ${
        allDone ? "border-l-green-500 bg-green-900/10" : "border-l-[#ff4d00] bg-[#111]"
      } p-4 mb-3 transition-all`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`inline-block px-2 py-0.5 text-xs font-medium border ${typeClass}`}>
              {exercise.type}
            </span>
            {exercise.video && (
              <button
                onClick={onWatchVideo}
                className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium border transition-colors bg-blue-600/20 text-blue-400 border-blue-500/30 hover:bg-blue-600/40"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                FORM
              </button>
            )}
            {exercise.videos?.map((_, idx) => (
              <button
                key={idx}
                onClick={() => onWatchVideos(idx)}
                className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium border transition-colors bg-fuchsia-600/20 text-fuchsia-400 border-fuchsia-500/30 hover:bg-fuchsia-600/40"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                {String.fromCharCode(65 + idx)}
              </button>
            ))}
          </div>
          <h3
            className={`text-lg font-bold tracking-wide ${
              allDone ? "text-green-400 line-through" : "text-white"
            }`}
          >
            {exercise.order}. {exercise.name}
          </h3>
          <div className="flex flex-wrap gap-3 mt-2 text-sm text-zinc-400">
            <span className="flex items-center gap-1">
              <span className="text-[#ff4d00]">⚙</span> {exercise.equipment}
            </span>
            <span className="flex items-center gap-1">
              <span className="text-[#ff4d00]">↻</span> {exercise.sets} sets × {exercise.reps}
            </span>
            {exercise.rest !== "0" && (
              <span className="flex items-center gap-1">
                <span className="text-[#ff4d00]">⏱</span> {exercise.rest} rest
              </span>
            )}
          </div>
          <p className="mt-3 text-sm text-zinc-500 italic border-l-2 border-zinc-700 pl-3">
            &quot;{exercise.logic}&quot;
          </p>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        {completedSets.map((done, i) => (
          <button
            key={i}
            onClick={() => onSetComplete(i)}
            className={`w-12 h-12 flex items-center justify-center font-bold text-lg transition-all ${
              done
                ? "bg-green-600 text-white"
                : "bg-zinc-800 text-zinc-400 hover:bg-[#ff4d00] hover:text-white"
            }`}
          >
            {done ? "✓" : i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

function WorkoutTimer({
  isRunning,
  onToggle,
  elapsedTime,
}: {
  isRunning: boolean;
  onToggle: () => void;
  elapsedTime: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onToggle}
        className={`w-10 h-10 flex items-center justify-center transition-all ${
          isRunning ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {isRunning ? (
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
      <div className="text-center">
        <p
          className="text-2xl font-bold text-white tracking-wider"
          style={{ fontFamily: "Bebas Neue, sans-serif" }}
        >
          {formatTime(elapsedTime)}
        </p>
        <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
          {isRunning ? "Workout Active" : "Paused"}
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeWorkout, setActiveWorkout] = useState<WorkoutDay | null>(null);
  const [completedSets, setCompletedSets] = useState<Record<number, boolean[]>>({});
  const [restTimer, setRestTimer] = useState<{ active: boolean; duration: number }>({
    active: false,
    duration: 0,
  });
  const [videoModal, setVideoModal] = useState<{
    exercise: Exercise;
    videoIndex?: number;
  } | null>(null);

  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [workoutTimerRunning, setWorkoutTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [completionTime, setCompletionTime] = useState<number | null>(null);

  useEffect(() => {
    setActiveWorkout(workoutPlan[0]);
  }, []);

  useEffect(() => {
    if (activeWorkout) {
      const initial: Record<number, boolean[]> = {};
      activeWorkout.exercises.forEach((ex) => {
        initial[ex.order] = Array(ex.sets).fill(false);
      });
      setCompletedSets(initial);
      setWorkoutStarted(false);
      setWorkoutTimerRunning(false);
      setElapsedTime(0);
      setCompletionTime(null);
    }
  }, [activeWorkout]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (workoutTimerRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [workoutTimerRunning]);

  const handleSetComplete = useCallback(
    (exerciseOrder: number, setIndex: number, restTime: string) => {
      if (!workoutStarted) {
        setWorkoutStarted(true);
        setWorkoutTimerRunning(true);
      }

      setCompletedSets((prev) => {
        const current = [...(prev[exerciseOrder] || [])];
        current[setIndex] = !current[setIndex];

        if (current[setIndex] && restTime !== "0") {
          const seconds = parseRestTime(restTime);
          if (seconds > 0) {
            setRestTimer({ active: true, duration: seconds });
          }
        }

        return { ...prev, [exerciseOrder]: current };
      });
    },
    [workoutStarted]
  );

  const totalSets = activeWorkout?.exercises.reduce((acc, ex) => acc + ex.sets, 0) || 0;
  const doneSets = Object.values(completedSets).flat().filter(Boolean).length;
  const progress = totalSets > 0 ? (doneSets / totalSets) * 100 : 0;

  useEffect(() => {
    if (progress === 100 && workoutStarted && completionTime === null) {
      setWorkoutTimerRunning(false);
      setCompletionTime(elapsedTime);
    }
  }, [progress, workoutStarted, completionTime, elapsedTime]);

  const estimateWorkoutTime = useCallback(() => {
    if (!activeWorkout) return 0;
    let totalSeconds = 0;
    activeWorkout.exercises.forEach((ex) => {
      const avgSetTime = 45;
      totalSeconds += ex.sets * avgSetTime;
      const restSeconds = parseRestTime(ex.rest);
      totalSeconds += (ex.sets - 1) * restSeconds;
    });
    return totalSeconds;
  }, [activeWorkout]);

  const estimatedTime = estimateWorkoutTime();

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {videoModal &&
        (videoModal.exercise.video ||
          (videoModal.exercise.videos && videoModal.videoIndex !== undefined)) && (
          <VideoModal
            video={videoModal.exercise.video || videoModal.exercise.videos![videoModal.videoIndex!]}
            exerciseName={videoModal.exercise.name}
            onClose={() => setVideoModal(null)}
          />
        )}

      {restTimer.active && (
        <RestTimer
          duration={restTimer.duration}
          onComplete={() => setRestTimer({ active: false, duration: 0 })}
        />
      )}

      <header className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur border-b border-zinc-800">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1
                className="text-4xl text-[#ff4d00] tracking-wider"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
              >
                IRON PROTOCOL
              </h1>
              <p className="text-zinc-500 text-sm mt-1">6-Day PPL Split — No Excuses.</p>
            </div>

            {workoutStarted ? (
              <WorkoutTimer
                isRunning={workoutTimerRunning}
                onToggle={() => setWorkoutTimerRunning(!workoutTimerRunning)}
                elapsedTime={elapsedTime}
              />
            ) : (
              <div className="text-right">
                <p className="text-xs text-zinc-500 uppercase tracking-wider">Est. Time</p>
                <p
                  className="text-xl font-bold text-zinc-400"
                  style={{ fontFamily: "Bebas Neue, sans-serif" }}
                >
                  ~{formatTime(estimatedTime)}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 pb-3">
          <div className="flex gap-1">
            {DAYS.map((day, i) => {
              const workout = workoutPlan.find((w) => w.days.includes(day));
              const isActive = activeWorkout?.days.includes(day);
              return (
                <button
                  key={day}
                  onClick={() => workout && setActiveWorkout(workout)}
                  className={`flex-1 py-2 text-xs font-bold tracking-wider transition-all ${
                    isActive
                      ? "bg-[#ff4d00] text-white"
                      : "bg-zinc-900 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
                  }`}
                >
                  {DAY_NAMES[i]}
                  <span className="block text-[10px] opacity-70">{workout?.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {activeWorkout && (
          <div className="max-w-2xl mx-auto px-4 pb-3">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-zinc-400">
                {doneSets}/{totalSets} sets
              </span>
              <span className="text-[#ff4d00] font-bold">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#ff4d00] to-[#ff6a2a] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {activeWorkout && (
          <>
            <div className="mb-6">
              <h2
                className="text-5xl text-white tracking-wider"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
              >
                {activeWorkout.name}
              </h2>
              <p className="text-zinc-500 mt-1">
                {activeWorkout.days.join(" & ")} —{" "}
                <span className="text-[#ff4d00]">{activeWorkout.goal}</span>
              </p>
              <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-700">
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-xs text-yellow-500 font-medium tracking-wide">
                  VISUAL GOAL: {activeWorkout.visualGoal}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              {activeWorkout.exercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.order}
                  exercise={exercise}
                  completedSets={completedSets[exercise.order] || []}
                  onSetComplete={(setIndex) =>
                    handleSetComplete(exercise.order, setIndex, exercise.rest)
                  }
                  onWatchVideo={() => setVideoModal({ exercise })}
                  onWatchVideos={(index) => setVideoModal({ exercise, videoIndex: index })}
                />
              ))}
            </div>

            {progress === 100 && (
              <div className="mt-8 p-6 bg-green-900/20 border border-green-600/30 text-center">
                <p
                  className="text-3xl text-green-400 font-bold tracking-wider"
                  style={{ fontFamily: "Bebas Neue, sans-serif" }}
                >
                  WORKOUT COMPLETE!
                </p>
                {completionTime !== null && (
                  <div className="mt-4 space-y-2">
                    <p
                      className="text-5xl font-bold text-white"
                      style={{ fontFamily: "Bebas Neue, sans-serif" }}
                    >
                      {formatTime(completionTime)}
                    </p>
                    <p className="text-sm text-zinc-500">Total Workout Time</p>
                    {completionTime < estimatedTime && (
                      <p className="text-xs text-green-400">
                        {formatTime(estimatedTime - completionTime)} faster than estimated!
                      </p>
                    )}
                  </div>
                )}
                <p className="text-zinc-400 mt-4">Time to recover. See you next session.</p>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="max-w-2xl mx-auto px-4 py-8 text-center text-zinc-600 text-sm border-t border-zinc-800 mt-8">
        <p>&quot;Consistency beats intensity. Show up.&quot;</p>
      </footer>
    </div>
  );
}
