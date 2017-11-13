export interface CompletedWorkout {
    workoutName: string,
    date: Date,
    exercises: CompletedExercise[]
}

export interface CompletedExercise {
    exerciseName: string,
    date: Date,
    sets: CompletedSet[]
}

export interface CompletedSet {
    setNum: number,
    weight: number,
    reps: number
}

// This is how the data structure looks

// CompletedWorkout = {
//     workoutName: string,
//     date: Date,
//     exercises: [
//         exerciseName: string,
//         date: Date,
//         sets: [
//             setNum: number,
//             weight: number,
//             reps: number
//         ]
//     ]
// }