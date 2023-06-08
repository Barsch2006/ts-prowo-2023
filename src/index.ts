import { Workbook } from 'exceljs';
import { IStudent, IProject } from "./types";
import settings from './algoSettings';

async function main() {
  /*
  Read Data
  */
  const projectsExcel = new Workbook();
  await projectsExcel.xlsx.readFile(settings.projectsExcelPath);
  const studentsExcel = new Workbook();
  await studentsExcel.xlsx.readFile(settings.studentsExcelPath);
  const projectsSheet = projectsExcel.getWorksheet(1);
  const studentsSheet = studentsExcel.getWorksheet(1);

  let projectsData: { [key: string]: IProject } = {};
  let studentsData: IStudent[] = [];
  /*
  Excel Sheets to JSON
  */
  projectsSheet.eachRow((row, rowNumber) => {
    // Exclue the first row, which is the header
    if (rowNumber !== 1) {
      const project: IProject = {
        Name: row.getCell(1).value?.toString() ?? '',
        Max: Number(row.getCell(2).value) ?? 0,
        studets: 0
      };
      projectsData[project.Name] = project;
    }
  });
  studentsSheet.eachRow((row, rowNumber) => {
    // Exclue the first row, which is the header
    if (rowNumber !== 1) {
      const student: IStudent = {
        Name: row.getCell(1).value?.toString() ?? '',
        Erstwahl: row.getCell(2).value?.toString() ?? '',
        Zweitwahl: row.getCell(3).value?.toString() ?? '',
        Drittwahl: row.getCell(4).value?.toString() ?? ''
      };
      studentsData.push(student);
    }
  });

  /*
  Algorithm
  */
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

  /*
  Compare all with all
  -> Swap students if score is higher
  */
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

  /*
  Write Output
  */
  const output: IStudent[] = students;
  const outputWorkbook = new Workbook();
  const outputSheet = outputWorkbook.addWorksheet("Output");
  outputSheet.columns = [
    { header: "Name", key: "Name", width: 10 },
    { header: "Erstwahl", key: "Erstwahl", width: 10 },
    { header: "Zweitwahl", key: "Zweitwahl", width: 10 },
    { header: "Drittwahl", key: "Drittwahl", width: 10 },
    { header: "Project", key: "Project", width: 20 },
  ];
  output.forEach((student) => {
    outputSheet.addRow({
      Name: student.Name,
      Erstwahl: student.Erstwahl,
      Zweitwahl: student.Zweitwahl,
      Drittwahl: student.Drittwahl,
      Project: student.AssignedProject
    });
  });
  await outputWorkbook.xlsx.writeFile(settings.outputPath);
}

main();

/*
Helper functions
*/
/**
 * Returns the score of a student
 */
function getScore(student: IStudent): number {
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
