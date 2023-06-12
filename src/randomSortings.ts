import { IProject, IStudent } from "./types";

/**
 * Sorts the students randomly and assigns them to a project depending on their choices
 * @returns the sorted students
 * @param studentsData the students to sort
 * @param projectsData the projects to assign
 * @returns the sorted students
 */
export default function (studentsData: Array<IStudent>, projectsData: { [key: string]: IProject }): IStudent[] {
  let students: Array<IStudent> = studentsData;

  // randomize the students
  students = shuffle(students);

  students.forEach((student: IStudent, index: number) => {
    let studentChoices: string[] = [
      student.Erstwahl,
      student.Zweitwahl,
      student.Drittwahl
    ]

    // check first, second and third choice
    studentChoices.forEach((choice: string) => {
      if (!students[index].AssignedProject) {
        if (projectsData[choice] && projectsData[choice].studets < projectsData[choice].Max) {
          students[index].AssignedProject = choice;
          projectsData[choice].studets++;
          return;
        }
      }
    });

    // random sorting if no place found before
    if (!students[index].AssignedProject) {
      let keys = Object.keys(projectsData);
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (projectsData[key].studets < projectsData[key].Max) {
          students[index].AssignedProject = projectsData[key].Name;
          projectsData[key].studets++;
          break;
        }
      }
    }
  });

  return students;
}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a: Array<any>) {
  var j: any, x: any, i: any;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}
