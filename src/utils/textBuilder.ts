import cfg from './cfg';
export function getID(documentTextSelection: string): string {
    const tempData: string[] = documentTextSelection
        .match(cfg.id)
        .join('')
        .match(cfg.idJunk)
        .join(' ')
        .split(' ');
    let clearJunk: string[] = [...new Set(tempData)];
    return clearJunk
        .map(el => `let ${el
            .replace('"', '')
            .slice(0, el.length - 2)} = document.getElementById(${el});\n`)
        .join('');
}

export function getClass(documentTextSelection: string): string {
    const tempData: string[] = documentTextSelection
        .match(cfg.class)
        .join('')
        .match(cfg.idJunk)
        .join(' ')
        .split(' ');
    let clearJunk: string[] = [...new Set(tempData)];
    return clearJunk
        .map(el => `let ${el
            .replace('"', '')
            .slice(0, el.length - 2)} = document.querySelectorAll(.${el});\n`)
        .join('');
}