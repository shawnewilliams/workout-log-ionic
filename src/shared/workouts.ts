import { Workout } from './workout';

export const WORKOUTS: Workout[] = [
    {
        name: 'Strong Lifts 5X5 A',
        exercise: [ 
            {
                name: 'Squat',
                sets: 5
            },
            {
                name: 'Bench Press',
                sets: 5
            },
            {
                name: 'Barbell Row',
                sets: 5
            }
        ]
    },
    {
        name: 'Strong Lifts 5X5 B',
        exercise: [ 
            {
                name: 'Squat',
                sets: 5
            },
            {
                name: 'Overhead Press',
                sets: 5
            },
            {
                name: 'Deadlift',
                sets: 5
            }
        ]
    }
    
]

export const COMPLETEDWORKOUTS: any[] = [
]