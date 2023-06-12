import { IStudent, IProject } from "./types";
import settings from './algoSettings';
import randomSortings from './randomSortings';
import compareSorting from './compareSorting';
import parseExcelData from './parseExcelData';
import writeOutput from './writeOutput';
import getScore from './getScore';
import { Xlsx } from "exceljs";

/**
 * The main function
 * @returns the final score and the final output file
 */
async function main(): Promise<{ score: number, output: Xlsx }> {
  const parsingResult = await parseExcelData();
  let studentsData: IStudent[] = parsingResult[0];
  let projectsData: { [projectName: string]: IProject } = parsingResult[1];

  // run random sorting 10 times and compare the score of each sorting and take the best one
  let students: IStudent[] = [];
  let score = 0;
  for (let i = 0; i < settings.randomRounds; i++) {
    let tempStudents = randomSortings(studentsData, projectsData);
    let tempScore = tempStudents.map(student => getScore(student)).reduce((totalScore = 0, score) => totalScore + score);
    if (tempScore > score) {
      score = tempScore;
      students = tempStudents;
    }
    console.debug(`Random Round ${i + 1}: ${tempScore} | ${tempStudents[0].Name}`);
  }

  for (let i = 0; i < settings.everyRounds; i++) {
    students = compareSorting(students);
    console.debug(`Every Round ${i + 1}: ${students.map(student => getScore(student)).reduce((totalScore = 0, score) => totalScore + score)} | ${students[0].Name}`);
  }

  return {
    score: students.map(student => getScore(student)).reduce((totalScore = 0, score) => totalScore + score),
    output: await writeOutput(students)
  };
}

main().then(async (methodOut) => {
  console.info(`Final Score: ${methodOut.score}`);
  await methodOut.output.writeFile(settings.outputPath);
}).catch((err) => {
  console.error(err);
});
