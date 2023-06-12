import { IProject, IStudent } from "./types";

export default (studentsData: IStudent[], projectsData: { [key: string]: IProject }): IStudent[] => {
  // sort students randomly
  let students: IStudent[] = studentsData.sort(() => Math.random() - 0.5);

  // assign projects randomly
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
