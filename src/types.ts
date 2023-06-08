interface IProject {
    Name: string;
    Max: number;
    studets: number | 0;
}

interface IStudent {
    Name: string;
    Erstwahl: string;
    Zweitwahl: string;
    Drittwahl: string;
    AssignedProject?: string;
}

export {
    IProject,
    IStudent
}
