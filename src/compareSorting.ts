import getScore from "./getScore";
import { IStudent } from "./types";

/**
 * Compares all students with all students and swaps them if the score is higher
 * @param students the students to sort
 * @returns the sorted students
*/
export default (students: IStudent[]) => {
    for (let a = 0; a < students.length; a++) {
        for (let b = 0; b < students.length; b++) {
            if (students[a].Name == students[b].Name) continue;
            //get score before swap
            let score_before = getScore(students[a]) + getScore(students[b]);
            // do temporary swap
            let temp = students[a];
            students[a] = students[b];
            students[b] = temp;
            //get score after swap
            let score_after = getScore(students[a]) + getScore(students[b]);
            // swap back if score after swap is lower
            if (score_after < score_before) {
                // console.info(`Swapping Back ${score_after} | ${score_before} ${a}(${getScore(students[a])}) with ${b}(${getScore(students[b])})`);
                temp = students[a];
                students[a] = students[b];
                students[b] = temp;
            }
        }
    }

    return students;
}
