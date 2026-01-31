
/**
 * Utility namespace for Form Responses
 */
export namespace ResponseUtils {
  /**
   * Get all the files related to this form submission
   * @param response the response object of this submissions
   * @returns an array of file objects
   */
  export function files(response: GoogleAppsScript.Forms.FormResponse) {
    const items = response.getItemResponses()

    return items.flatMap(item => {
      const type = item.getItem().getType();

      if (type === FormApp.ItemType.FILE_UPLOAD) {
        const uploads = item.getResponse()
        const ids = Array.isArray(uploads)
          ? uploads.flatMap<string>(x => x)
          : [uploads];

        return ids.map(id => {
          const file = DriveApp.getFileById(id);

          return {
            mimeType: file.getMimeType(),
            size: file.getSize(),
            name: file.getName(),
            url: file.getUrl(),
            id: id,
          }
        })
      }

      return []
    })
  }

  /**
   * Get the field reference by the title
   * @param response The form submission response
   * @param title The field title
   * @returns The field instance, if none was found return undefined.
   */
  export function field(response: GoogleAppsScript.Forms.FormResponse, title: string): GoogleAppsScript.Forms.ItemResponse | undefined {
    return response.getItemResponses().find(ir => ir.getItem().getTitle() === title);
  }
}