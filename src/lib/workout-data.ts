export interface VideoReference {
  source: "musclewiki";
  url: string;
  searchPath: string;
  reason: string;
}

export interface Exercise {
  order: number;
  type: string;
  name: string;
  equipment: string;
  sets: number;
  reps: string;
  rest: string;
  logic: string;
  video?: VideoReference;
  videos?: VideoReference[]; // For supersets with multiple exercises
}

export interface WorkoutDay {
  id: string;
  name: string;
  days: string[];
  goal: string;
  visualGoal: string;
  exercises: Exercise[];
}

export const workoutPlan: WorkoutDay[] = [
  {
    id: "push",
    name: "PUSH",
    days: ["Monday", "Thursday"],
    goal: "Upper Body Armor & Width",
    visualGoal: "Elbow Angle & Range of Motion",
    exercises: [
      {
        order: 1,
        type: "Warm-up",
        name: "Rotator Cuff Rotations",
        equipment: "DB (Light)",
        sets: 2,
        reps: "15",
        rest: "0",
        logic: "Shoulders irigipokunda undalante idi chey. Don't skip.",
        video: {
          source: "musclewiki",
          url: "https://musclewiki.com/dumbbells/male/rear-shoulders/dumbbell-external-rotation",
          searchPath: "Male > Shoulders > Dumbbells > External Rotation",
          reason: "Simple movement. GIF chalu. No audio needed."
        }
      },
      {
        order: 2,
        type: "Primary Compound",
        name: "Incline Barbell/DB Press",
        equipment: "Barbell/DB",
        sets: 4,
        reps: "8-10",
        rest: "2m",
        logic: "Upper chest eh 'Aesthetic' look isthadi. Collar bone nindi povali.",
        video: {
          source: "musclewiki",
          url: "https://musclewiki.com/dumbbells/male/chest/dumbbell-incline-bench-press",
          searchPath: "Male > Chest > Dumbbells > Incline Dumbbell Press",
          reason: "Shows the 45° elbow tuck perfectly without talking."
        }
      },
      {
        order: 3,
        type: "Secondary Compound",
        name: "Flat Dumbbell Press",
        equipment: "Dumbbell",
        sets: 3,
        reps: "8-12",
        rest: "2m",
        logic: "Range of motion ekkuva. Chest ni paiki squeeze chey.",
        video: {
          source: "musclewiki",
          url: "https://musclewiki.com/dumbbells/male/chest/dumbbell-bench-press",
          searchPath: "Male > Chest > Dumbbells > Dumbbell Bench Press",
          reason: "Shows the full stretch at the bottom cleanly."
        }
      },
      {
        order: 4,
        type: "Shoulder Mass",
        name: "Standing Overhead Press",
        equipment: "Barbell",
        sets: 3,
        reps: "8-10",
        rest: "2m",
        logic: "'Military Press'. Core tight pettu. Idi chesthe shoulders 'Boulder' la avthayi.",
        video: {
          source: "musclewiki",
          url: "https://musclewiki.com/barbell/male/front-shoulders/barbell-overhead-press",
          searchPath: "Male > Shoulders > Barbell > Overhead Press",
          reason: "Idi complex. Back arch avvakunda ela cheyalo clear video kavali."
        }
      },
      {
        order: 5,
        type: "Superset (Width)",
        name: "A: Lateral Raises / B: Rear Delt Flys",
        equipment: "Dumbbell",
        sets: 4,
        reps: "12-15",
        rest: "1.5m",
        logic: "Crucial: Side delts for width, Rear delts for 3D look. Don't swing. Control it.",
        videos: [
          {
            source: "musclewiki",
            url: "https://musclewiki.com/dumbbells/male/lateral-deltoid/dumbbell-lateral-raise",
            searchPath: "Exercises > Dumbbell Lateral Raise",
            reason: "A: Lateral Raises - Side delts for shoulder width."
          },
          {
            source: "musclewiki",
            url: "https://musclewiki.com/exercise/dumbbell-rear-delt-fly",
            searchPath: "Exercises > Dumbbell Rear Delt Fly",
            reason: "B: Rear Delt Flys - 3D shoulder look."
          }
        ]
      },
      {
        order: 6,
        type: "Tricep Mass",
        name: "Skull Crushers (Overhead)",
        equipment: "EZ Bar/DB",
        sets: 3,
        reps: "10-12",
        rest: "1.5m",
        logic: "Long head target. Shirt sleeves fill avvali ante idhe main.",
        video: {
          source: "musclewiki",
          url: "https://musclewiki.com/exercise/dumbbell-skullcrusher",
          searchPath: "Male > Triceps > Dumbbells > Skull Crusher",
          reason: "Shows the 'Behind the head' motion correctly. Long head stretch kavali."
        }
      },
      {
        order: 7,
        type: "CORE FINISHER",
        name: "Hanging Leg Raises",
        equipment: "Pull-up Bar",
        sets: 3,
        reps: "Failure",
        rest: "1m",
        logic: "Floor crunches waste. Bar pattukoni kaallu paiki ethu. Lower Abs (V-Cut) vasthadi.",
        video: {
          source: "musclewiki",
          url: "https://musclewiki.com/bodyweight/male/abdominals/hanging-leg-raise",
          searchPath: "Male > Abdominals > Bodyweight > Hanging Leg Raise",
          reason: "Shows the pelvic curl (hips rolling up)."
        }
      }
    ]
  },
  {
    id: "pull",
    name: "PULL",
    days: ["Tuesday", "Friday"],
    goal: "V-Taper, Thick Yoke & Grip Strength",
    visualGoal: "Back Flatness & Elbow Drive",
    exercises: [
      {
        order: 1,
        type: "Primary Compound",
        name: "Weighted Pull-Ups",
        equipment: "Body/Belt",
        sets: 3,
        reps: "Failure",
        rest: "2m",
        logic: "Lats ki King. Bodyweight easy ayithe, kaalla madhya DB pettu. Wings guarantee.",
        video: {
          source: "musclewiki",
          url: "https://musclewiki.com/exercise/weighted-pull-ups",
          searchPath: "Exercises > Weighted Pull-Ups",
          reason: "Shows the 'Chest to Bar' movement clearly."
        }
      },
      {
        order: 2,
        type: "Thickness Builder",
        name: "Barbell Bent Over Row",
        equipment: "Barbell",
        sets: 4,
        reps: "6-10",
        rest: "2m",
        logic: "Heavy ga chey. Elbows body ki aanichi laagu. Back thickness idhe isthadi.",
        video: {
          source: "musclewiki",
          url: "https://musclewiki.com/barbell/male/lats/barbell-bent-over-row",
          searchPath: "Male > Lats > Barbell > Bent Over Row",
          reason: "CRITICAL: Shows how to keep the spine neutral. Safety First."
        }
      },
      {
        order: 3,
        type: "Traps (The Yoke)",
        name: "Barbell Shrugs",
        equipment: "Barbell",
        sets: 3,
        reps: "12-15",
        rest: "1m",
        logic: "Nuvvu miss ayyedi idhe. Neck pakkana muscle (Traps) lekapothe weak ga kanipisthav. Heavy ga shrug chey.",
        video: {
          source: "musclewiki",
          url: "https://musclewiki.com/barbell/male/traps/barbell-shrug",
          searchPath: "Male > Traps > Barbell > Barbell Shrug",
          reason: "Simple up/down motion. GIF is enough."
        }
      },
      {
        order: 4,
        type: "Isolation",
        name: "Dumbbell Pullover",
        equipment: "Dumbbell",
        sets: 3,
        reps: "10-12",
        rest: "1.5m",
        logic: "Lats & Serratus (Ribs muscle) open avthayi. Aesthetic pose ki key idi.",
        video: {
          source: "musclewiki",
          url: "https://musclewiki.com/dumbbells/male/lats/dumbbell-pullover",
          searchPath: "Male > Lats > Dumbbells > Pullover",
          reason: "Idi tricky exercise. Video lo hips ela drop chesthunnaro chudali."
        }
      },
      {
        order: 5,
        type: "Bicep Builder",
        name: "Barbell Curls (Strict)",
        equipment: "Barbell",
        sets: 3,
        reps: "8-12",
        rest: "1.5m",
        logic: "Body oopaku. Wall ki aanichi chey inka better. Only biceps work avvali.",
        video: {
          source: "musclewiki",
          url: "https://musclewiki.com/barbell/male/biceps/barbell-curl",
          searchPath: "Male > Biceps > Barbell > Barbell Curl",
          reason: "Shows strict form (no swinging)."
        }
      },
      {
        order: 6,
        type: "Superset (Arms)",
        name: "A: Hammer Curls / B: Reverse Curls",
        equipment: "Dumbbell / Bar",
        sets: 3,
        reps: "10-12",
        rest: "1m",
        logic: "Forearm Special: Hammer curls width isthayi, Reverse curls forearm top part ni target chesthayi.",
        videos: [
          {
            source: "musclewiki",
            url: "https://musclewiki.com/exercise/dumbbell-hammer-curl",
            searchPath: "Exercises > Dumbbell Hammer Curl",
            reason: "A: Hammer Curls - Brachialis & forearm width."
          },
          {
            source: "musclewiki",
            url: "https://musclewiki.com/exercise/dumbbell-reverse-curl",
            searchPath: "Exercises > Dumbbell Reverse Curl",
            reason: "B: Reverse Curls - Forearm top development."
          }
        ]
      },
      {
        order: 7,
        type: "GRIP FINISHER",
        name: "Farmers Walk / Dead Hang",
        equipment: "Heavy DB",
        sets: 3,
        reps: "45sec",
        rest: "1m",
        logic: "Heavy DBs pattukoni naduvu leda Bar pattukoni veladaadu. Forearms pagilipovali.",
        video: {
          source: "musclewiki",
          url: "https://musclewiki.com/bodyweight/male/lats/dead-hang",
          searchPath: "Male > Lats > Bodyweight > Dead Hang",
          reason: "Just hang. Don't overthink."
        }
      }
    ]
  },
  {
    id: "legs",
    name: "LEGS",
    days: ["Wednesday", "Saturday"],
    goal: "Athletic Foundation (No Chicken Legs)",
    visualGoal: "Hip Hinge & Knee Stability",
    exercises: [
      {
        order: 1,
        type: "Warm-up",
        name: "Bodyweight Squats",
        equipment: "None",
        sets: 2,
        reps: "20",
        rest: "0",
        logic: "Knees oil chey. Direct heavy weight esthe virigipothayi.",
        video: {
          source: "musclewiki",
          url: "https://musclewiki.com/bodyweight/male/glutes/bodyweight-squat",
          searchPath: "Male > Quads > Bodyweight > Squat",
          reason: "Warm-up. Basic form check."
        }
      },
      {
        order: 2,
        type: "The King",
        name: "Barbell Squats",
        equipment: "Barbell",
        sets: 4,
        reps: "5-8",
        rest: "3m",
        logic: "Testosterone factory. Deep ga vellu. Rack busy unte Heavy Goblet Squats chey.",
        video: {
          source: "musclewiki",
          url: "https://musclewiki.com/barbell/male/glutes/barbell-squat",
          searchPath: "Male > Quads > Barbell > Squat",
          reason: "CRITICAL: High production quality helps you see knee position and back angle clearly."
        }
      },
      {
        order: 3,
        type: "Posterior Chain",
        name: "Romanian Deadlift (RDL)",
        equipment: "Barbell",
        sets: 3,
        reps: "8-12",
        rest: "2m",
        logic: "Hamstrings & Glutes. Back straight pettu. Stretch feel avvu.",
        video: {
          source: "musclewiki",
          url: "https://musclewiki.com/barbell/male/hamstrings/barbell-romanian-deadlift",
          searchPath: "Male > Hamstrings > Barbell > Romanian Deadlift",
          reason: "CRITICAL: 'Hips Back' cue kavali. GIF shows the hinge properly."
        }
      },
      {
        order: 4,
        type: "Unilateral (Balance)",
        name: "Bulgarian Split Squats",
        equipment: "DB + Bench",
        sets: 3,
        reps: "8-10",
        rest: "2m",
        logic: "The Pain Maker. Okka leg tho chey. Leg Press machine kosam waiting avasaram ledu.",
        video: {
          source: "musclewiki",
          url: "https://musclewiki.com/dumbbells/male/glutes/dumbbell-bulgarian-split-squat",
          searchPath: "Male > Quads > Dumbbells > Bulgarian Split Squat",
          reason: "Shows the balance and depth perfectly."
        }
      },
      {
        order: 5,
        type: "Calves",
        name: "Single Leg Calf Raise",
        equipment: "DB + Step",
        sets: 4,
        reps: "15-20",
        rest: "1m",
        logic: "Steps meeda nilabadi chey. Calves weak unte physique motham comedy aithadi.",
        video: {
          source: "musclewiki",
          url: "https://musclewiki.com/dumbbells/male/calves/dumbbell-calf-raise",
          searchPath: "Male > Calves > Dumbbells > Calf Raise",
          reason: "Simple ankle movement."
        }
      },
      {
        order: 6,
        type: "CORE FINISHER",
        name: "Weighted Planks / Side Plank",
        equipment: "Plate",
        sets: 3,
        reps: "1 min",
        rest: "1m",
        logic: "Back meeda plate pettu. Core 'Steel' la avvadaniki. Side plank for Obliques (Love handles).",
        video: {
          source: "musclewiki",
          url: "https://musclewiki.com/exercise/weighted-plank-up-down",
          searchPath: "Exercises > Weighted Plank Up Down",
          reason: "Dynamic plank variation. Core stability + triceps work."
        }
      }
    ]
  }
];

export function getTodayWorkout(): WorkoutDay | null {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = days[new Date().getDay()];
  
  return workoutPlan.find(workout => workout.days.includes(today)) || null;
}

export function getWorkoutByDay(day: string): WorkoutDay | null {
  return workoutPlan.find(workout => workout.days.includes(day)) || null;
}
