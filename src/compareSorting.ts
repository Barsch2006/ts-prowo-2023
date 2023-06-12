import getScore from "./getScore";
import { IStudent } from "./types";

/**
 * Compares all students with all students and swaps their AssignedProject if the score increases
 * @param students the students to sort
 * @returns the sorted students
 */
export default (students: IStudent[]): IStudent[] => {
  const sortedStudents = [...students]; // Create a copy of the students array

  for (let a = 0; a < sortedStudents.length; a++) {
    for (let b = 0; b < sortedStudents.length; b++) {
      if (a === b) continue; // Skip comparison if it's the same student

      const scoreBefore = getScore(sortedStudents[a]) + getScore(sortedStudents[b]);

      // Swap AssignedProject temporarily
      const tempAssignedProjects = sortedStudents[a].AssignedProject;
      sortedStudents[a].AssignedProject = sortedStudents[b].AssignedProject;
      sortedStudents[b].AssignedProject = tempAssignedProjects;

      const scoreAfter = getScore(sortedStudents[a]) + getScore(sortedStudents[b]);

      if (scoreAfter <= scoreBefore) {
        // Swap back AssignedProject if scoreAfter is not higher
        // ? console.log(`Swapped ${scoreAfter} and ${scoreBefore} back`);
        sortedStudents[b].AssignedProject = sortedStudents[a].AssignedProject;
        sortedStudents[a].AssignedProject = tempAssignedProjects;
      }
    }
  }

  return sortedStudents;
};