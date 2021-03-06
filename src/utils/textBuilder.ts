import cfg from './cfg';
const toFindDuplicates = (arr: string[]): string[] => arr.filter((item: string, index: number) => arr.indexOf(item) !== index);
const clear = (el: string): string => el.replace('"', '').slice(0, el.length - 2);
const toCamelCase = (el: string): string => {
    return el
        .replace('"', "")
        .split(/[-_.]/g)
        .map((call: string | any, index: number | any) => {
            if (index > 0) {
                return (call.charAt(0).toUpperCase() + call.slice(1)).slice(0, -1);
            } else {
                return call;
            }
        })
        .join("");
};

export function getID(documentTextSelection: string): string {
    let tempData: RegExpMatchArray | null = documentTextSelection.match(cfg.id);
    if (tempData) {
        tempData = tempData
            .join('')!.match(cfg.idJunk)!.join(' ').split(' ');
        if (toFindDuplicates(tempData).length === 0) {
            return tempData
                .map(el => `const ${toCamelCase(el)
                    .replace('"', '')
                    .slice(0, el.length - 2)} = document.getElementById(${el});\n`)
                .join('');
        }
        else {
            const duplicateData: string[] = toFindDuplicates(tempData);
            tempData = [...new Set(tempData)];
            return tempData.map(el => {
                return duplicateData.includes(el) ? `const ${toCamelCase(el)
                    } = document.querySelectorAll("#${clear(el)}");\n` :
                    `const ${toCamelCase(el)} = document.getElementById(${el});\n`;
            }).join('');
        }
    }
    return '';
}

export function getClass(documentTextSelection: string): string {
    let tempData: RegExpMatchArray | null = documentTextSelection.match(cfg.class);
    if (tempData) {
        tempData = tempData.join('')!.match(cfg.idJunk)!.join(' ').split(' ');
        if (toFindDuplicates(tempData).length === 0) {
            return tempData
                .map(el => `const ${toCamelCase(el)
                    .replace('"', '')
                    .slice(0, el.length - 2)} = document.querySelector(".${clear(el)}");\n`)
                .join('');
        }
        else {
            const duplicateData: string[] = toFindDuplicates(tempData);
            tempData = [...new Set(tempData)];
            return tempData.map(el => {
                return duplicateData.includes(el) ? `const ${toCamelCase(el)
                    .replace('"', '')
                    .slice(0, el.length - 2)} = document.querySelectorAll(".${clear(el)}");\n` :
                    `const ${toCamelCase(el)
                        .replace('"', '')
                        .slice(0, el.length - 2)} = document.querySelector(".${clear(el)}");\n`;
            }).join('');
        }
    }
    return '';
}

export function getByData(documentTextSelection: string) : string {
    let tempData: RegExpMatchArray | null = documentTextSelection.match(cfg.data);
    if (tempData) {
        tempData = tempData.join('')!.match(cfg.idJunk)!.join(' ').split(' ');
        if (toFindDuplicates(tempData).length === 0) {
            return tempData
                .map(el => `const ${toCamelCase(el)
                    .replace('"', '')
                    .slice(0, el.length - 2)} = document.querySelector("[${clear(el)}"]);\n`)
                .join('');
        }
        else {
            const duplicateData: string[] = toFindDuplicates(tempData);
            tempData = [...new Set(tempData)];
            return tempData.map(el => {
                return duplicateData.includes(el) ? `const ${toCamelCase(el)
                    .replace('"', '')
                    .slice(0, el.length - 2)} = document.querySelectorAll("[${clear(el)}]");\n` :
                    `const ${toCamelCase(el)
                        .replace('"', '')
                        .slice(0, el.length - 2)} = document.querySelector("[${clear(el)}]");\n`;
            }).join('');
        }
    }
    return '';
}