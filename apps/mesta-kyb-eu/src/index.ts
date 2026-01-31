import { Folder, Response } from "./utils"

const TARGET_FOLDER = "responses";

export function onSubmit({ source, response }: GoogleAppsScript.Events.FormsOnFormSubmit) {
  const title = Response.field(response, 'Title')?.getResponse().toString();

  if (title == undefined) {
    throw new Error('Title field does not exist')
  }

  const current = DriveApp.getFileById(source.getId())
  const root = current.getParents().next()

  const store = Folder.create(root, TARGET_FOLDER)
  const substore = Folder.create(store, title)

  Response.files(response).forEach(({id}) => {
    DriveApp.getFileById(id).moveTo(substore);
  })

  console.log("running form submit")
}

