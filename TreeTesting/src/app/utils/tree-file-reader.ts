import * as XLSX from 'xlsx';

export class TreeFileReader {
    static readJSON(inputStr) {
        return JSON.parse(inputStr);
    }

    static readXLSX(binaryStr) {
        
        const wb: XLSX.WorkBook = XLSX.read(binaryStr, { type: 'binary', raw: true });

        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws, {header: 1, defval: null});
        const jsonData = {};
					
        for (let i = 0; i < data.length; i++) {
            if (data[i][0] != null) {
                jsonData[data[i][0]] = {};
                TreeFileReader.fillChildrenNodes(jsonData[data[i][0]], data, i, 0);
            }
        }
        return jsonData as any;
    }

    private static fillChildrenNodes(node, data, currentRow, currentIndex) {
        let j = currentRow + 1;
        for (j; j < data.length && data[j][currentIndex] == null; j++) {
            if (data[j][currentIndex+1] != null) {
                node[data[j][currentIndex+1]] = {};
                TreeFileReader.fillChildrenNodes(node[data[j][currentIndex+1]], data, j, currentIndex+1);
            }
        }
    }
}