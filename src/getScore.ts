import { IStudent } from "./types";

/**
 * Returns the score of a student
 * @param student the student to get the score from
 */
export default function getScore(student: IStudent): number {
    let score = 0;
    if (student.AssignedProject == student.Erstwahl) {
        score = 7;
    } else if (student.AssignedProject == student.Zweitwahl) {
        score = 6;
    } else if (student.AssignedProject == student.Drittwahl) {
        score = 5;
    } else {
        score = 0;
    }

    return score;
}