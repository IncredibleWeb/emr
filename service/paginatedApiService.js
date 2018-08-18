import AuthenticatedApiService from "./authenticatedApiService";

const PAGE_COUNT_HEADER = "PageCount";
const ITEM_COUNT_HEADER = "ItemCount";

export default class PaginatedApiService extends AuthenticatedApiService {
  constructor() {
    super();

    this.instance.interceptors.response.use(response => {
      if (
        response.status === 200 &&
        response.data &&
        typeof response.data === "object"
      ) {
        response.data.pagination = {
          pageCount: response.headers[PAGE_COUNT_HEADER],
          itemCount: response.headers[ITEM_COUNT_HEADER]
        };
      }

      return response;
    });
  }
}
