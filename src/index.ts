import { IStudent, IProject } from "./types";
import settings from './algoSettings';
import randomSortings from './randomSortings';
import compareSorting from './compareSorting';
import parseExcelData from './parseExcelData';
import writeOutput from './writeOutput';
import getScore from './getScore';
import { Xlsx } from "exceljs";

async function main(): Promise<{ score: number, output: Xlsx }> {
  const parsingResult = parseExcelData();
  let studentsData: IStudent[] = parsingResult[0];
  let projectsData: { [projectName: string]: IProject } = parsingResult[1];

  /*
  Algorithm
  */
  let students: IStudent[] = randomSortings(studentsData, projectsData);

  /*
  Compare all with all
  -> Swap students if score is higher
  */
  for (let i = 0; i < settings.everyRounds; i++) {
    compareSorting(students);
  }

  return {
    score: students.map(student => getScore(student)).reduce((totalScore = 0, score) => totalScore + score),
    output: await writeOutput(students)
  };
}

main().then(async (methodOut) => {
  console.info(`Score: ${methodOut.score}`);
  await methodOut.output.writeFile(settings.outputPath);
}).catch((err) => {
  console.error(err);
});
