export class People {
    id?: number;
    nombre?: string;
    altura?: string;
    peso?: string;
    colorCabello?: string;
    colorPiel?: string;
    colorOjos?: string;
    genero?: string;
    mundoNatal?: string;

    constructor(nombre: string, altura: string, peso: string, colorCabello: string, colorPiel: string, colorOjos: string, genero: string, mundoNatal: string, id?: number) {
        this.id = id;
        this.nombre = nombre;
        this.altura = altura;
        this.peso = peso;
        this.colorCabello = colorCabello;
        this.colorPiel = colorPiel;
        this.colorOjos = colorOjos;
        this.genero = genero;
        this.mundoNatal = mundoNatal;
    }
}