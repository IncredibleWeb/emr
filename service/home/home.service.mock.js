import AuthenticatedApiService from "../authenticatedApiService";

export default class HomeMockService extends AuthenticatedApiService {
  get(data) {
    return Promise.resolve({
      meta: {
        title: "Dashboard - EMR"
      },
      html:
        "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, quis nobis molestias pariatur nihil, dolor aspernatur omnis hic iure est ex, provident obcaecati eveniet neque adipisci culpa similique distinctio iste tenetur? Cumque consectetur praesentium, atque facilis dicta voluptas veritatis dolore voluptatibus ut nisi doloribus minima optio mollitia dignissimos totam exercitationem excepturi et provident. Voluptates sapiente sed voluptate eaque est</p><p>Maiores, perferendis molestias sint reprehenderit placeat fugiat minima facere magnam error modi rerum ut architecto eligendi officia nesciunt, hic, ab nulla! Eius repudiandae magni impedit, veniam eligendi at, minima eum sequi asperiores voluptatem itaque saepe. Accusamus magnam</p><p>The Management</p><p>EMR.</p>",
      template: "Home",
      id: 10000,
      name: "Page",
      title: "Dashboard - EMR",
      url: "/"
    });
  }
}
