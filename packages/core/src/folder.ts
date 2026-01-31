/**
 * Utility namespace for Drive Folders
 */
export namespace FolderUtils {
  /**
   * Create a new folder in the parent folder
   * @param parent The instance of the parent folder
   * @param name The name of the folder
   * @returns The folder instance 
   */
  export function create(parent: GoogleAppsScript.Drive.Folder, name: string) {
    const search = parent.getFoldersByName(name)

    return search.hasNext() ? search.next() : parent.createFolder(name)
  }
}