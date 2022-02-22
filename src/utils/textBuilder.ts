import cfg from './cfg';

const toFindDuplicates = (arr: string[]): string[] => arr.filter((item: string, index: number) => arr.indexOf(item) !== index);
const clear = (el: string): string => el.replace('"', '').slice(0, el.length - 2);
export function getID(documentTextSelection: string): string {
    let tempData: RegExpMatchArray | null = documentTextSelection.match(cfg.id)
    if (tempData) {
        tempData = tempData
            .join('')!.match(cfg.idJunk)!.join(' ').split(' ');
        if (toFindDuplicates(tempData).length === 0) {
            return tempData
                .map(el => `const ${el
                    .replace('"', '')
                    .slice(0, el.length - 2)} = document.getElementById(${el});\n`)
                .join('');
        }
        else {
            const duplicateData: string[] = toFindDuplicates(tempData);
            tempData = [...new Set(tempData)];
            return tempData.map(el => {
                return duplicateData.includes(el) ? `const ${clear(el)} = document.querySelectorAll("#${clear(el)}");\n` :
                    `const ${clear(el)} = document.getElementById(${el});\n`;
            }).join('');
        }
    }
    return '';
}

export function getClass(documentTextSelection: string): string {
    let tempData: RegExpMatchArray | null = documentTextSelection.match(cfg.class)
    if (tempData) {
        tempData = tempData.join('')!.match(cfg.idJunk)!.join(' ').split(' ');
        if (toFindDuplicates(tempData).length === 0) {
            return tempData
                .map(el => `const ${el
                    .replace('"', '')
                    .slice(0, el.length - 2)} = document.querySelector(${el});\n`)
                .join('');
        }
        else {
            const duplicateData: string[] = toFindDuplicates(tempData);
            tempData = [...new Set(tempData)];
            return tempData.map(el => {
                return duplicateData.includes(el) ? `const ${clear(el)} = document.querySelectorAll(".${clear(el)}");\n` :
                    `const ${clear(el)} = document.querySelector(${el});\n`;
            }).join('');
        }
    }
    return '';
}