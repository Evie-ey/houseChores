import { IResident } from "../screens/residents/type"

export interface IOption {
  name: string
}

export const toOptions = (data: any): IOption[] => {
  return data.map((it: any) => ({name: it}))
}
