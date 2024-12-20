import * as xlsx from 'xlsx';

export function readExcel(filePath: string): { id: string | number; name: string }[] {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 }) as string[][];
    return data.slice(1).map(([id, name]) => ({ id, name }));
}

