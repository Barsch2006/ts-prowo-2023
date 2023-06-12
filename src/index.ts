import { IStudent, IProject } from "./types";
import settings from './algoSettings';
import randomSortings from './randomSortings';
import compareSorting from './compareSorting';
import parseExcelData from './parseExcelData';
import writeOutput from './writeOutput';
import { getTotalScore } from './getScore';
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
  let students: IStudent[] = randomSortings(studentsData, projectsData);

  // ! bug: score_before is always the same as score_after
  students = compareSorting(students);

  return {
    score: getTotalScore(students),
    output: await writeOutput(students)
  };
}

main().then(async (methodOut) => {
  console.info(`Final Score: ${methodOut.score}`);
  await methodOut.output.writeFile(settings.outputPath);
}).catch((err) => {
  console.error(err);
});
