export interface LaboratoryForm {
  name: string,
  address: string
}

export interface Laboratory{
  id : number,
  name: string,
  address: string
}

export interface filterLaboratory {
  input: string,
  search: string
}
