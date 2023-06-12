import { IStudent } from "./types";
import { Workbook, Xlsx } from "exceljs";

/**
 * Writes the output to an excel file
 * @returns the excel file as Xlsx object
 */
export default async (outputData: IStudent[]): Promise<Xlsx> => {
  const outputWorkbook = new Workbook();
  const outputSheet = outputWorkbook.addWorksheet("Output");
  outputSheet.columns = [
    { header: "Name", key: "Name", width: 10 },
    { header: "Erstwahl", key: "Erstwahl", width: 10 },
    { header: "Zweitwahl", key: "Zweitwahl", width: 10 },
    { header: "Drittwahl", key: "Drittwahl", width: 10 },
    { header: "Project", key: "Project", width: 20 },
  ];
  outputData.forEach((student) => {
    outputSheet.addRow({
      Name: student.Name,
      Erstwahl: student.Erstwahl,
      Zweitwahl: student.Zweitwahl,
      Drittwahl: student.Drittwahl,
      Project: student.AssignedProject
    });
  });

  return outputWorkbook.xlsx;
}
