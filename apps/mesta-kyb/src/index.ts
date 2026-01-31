import { FolderUtils } from "@fastxe/gas-core";
import { ResponseUtils } from "@fastxe/gas-forms";

const TARGET_FOLDER = "responses";

export function onSubmit({ source, response }: GoogleAppsScript.Events.FormsOnFormSubmit) {
  const title = ResponseUtils.field(response, 'Title')?.getResponse().toString();

  if (title == undefined) {
    throw new Error('Title field does not exist')
  }

  const current = DriveApp.getFileById(source.getId())
  const root = current.getParents().next()

  const store = FolderUtils.create(root, TARGET_FOLDER)
  const substore = FolderUtils.create(store, title)

  ResponseUtils.files(response).forEach(({ id }) => {
    DriveApp.getFileById(id).moveTo(substore);
  })
}

