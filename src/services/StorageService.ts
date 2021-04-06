enum StorageItem {
  token = 'token',
}

export class StorageService {
  private static storage = localStorage;

  /**
   * Getter for an item in storage.
   * @param item Item to return
   * @returns
   */
  private static getItem(item: StorageItem) {
    return this.storage.getItem(item);
  }

  /**
   * Setter for an item in storage.
   * @param item Item to be set
   * @param content Value of item.
   */
  private static setItem(item: StorageItem, content: string) {
    this.storage.setItem(item, content);
  }

  /**
   * Removes item from storage.
   * @param item
   */
  private static removeItem(item: StorageItem) {
    this.storage.removeItem(item);
  }

  /**
   * Getter for user jwt token
   * @returns token
   */
  public static getToken() {
    return this.getItem(StorageItem.token);
  }

  /**
   * Setter for user jwt token
   * @param token token
   */
  public static setToken(token: string) {
    return this.setItem(StorageItem.token, token);
  }

  /**
   * Remove token from storage.
   */
  public static removeToken() {
    this.removeItem(StorageItem.token);
  }
}
