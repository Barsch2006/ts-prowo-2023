import { Workbook } from "exceljs";
import { IProject, IStudent } from "./types";
import settings from "./algoSettings";

/**
 * Reads the Excel files and returns the data as JSON
 * @returns [studentsData, projectsData]
 */
export default async (): Promise<[IStudent[], { [projectName: string]: IProject }]> => {
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

    return [studentsData, projectsData];
}
