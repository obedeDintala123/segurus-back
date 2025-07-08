export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD") // Remove acentos
    .replace(/[\u0300-\u036f]/g, "") // Regex para caracteres acentuados
    .replace(/\s+/g, "-") // Espaços viram hifens
    .replace(/[^\w\-]+/g, "") // Remove símbolos e pontuação
    .replace(/\-\-+/g, "-") // Hifens duplos viram um só
    .replace(/^-+/, "") // Remove hifen no início
    .replace(/-+$/, ""); // Remove hifen no final
}
