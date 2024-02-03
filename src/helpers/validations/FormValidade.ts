import { HttpError } from "../../errors/HttpError"

type UnknownObject = Record<string,any>

export class FormValidate{
  constructor(private formData:UnknownObject){}

  async execute():Promise<void>{
    this.allFieldsAreFilled(this.formData)
    
  }

  private allFieldsAreFilled(data:UnknownObject){
    const isEmpty = Object.values(data).some((field) => !field)

    if(isEmpty){
      throw new HttpError(422,'Please fill all the fields')
    }
  }
}