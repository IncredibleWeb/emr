import AuthenticatedApiService from "../authenticatedApiService";

export default class Service extends AuthenticatedApiService {
  get(data) {
    return new Promise((resolve, reject) => {
      let offers = [
        {
          id: 1,
          date: new Date(2017, 3, 22),
          title: "Lorem ipsum dolor sit.",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste laboriosam quod fugit dignissimos, veniam cum asperiores! Fugit, nobis ullam ipsam!"
        },
        {
          id: 2,
          date: new Date(2017, 1, 27),
          title: "Lorem ipsum dolor sit amet.",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, molestiae."
        },
        {
          id: 3,
          date: new Date(2017, 0, 10),
          title: "Lorem ipsum dolor.",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores eaque, in esse. Obcaecati, asperiores ipsum. Unde facere quo cupiditate fugit. Maiores, porro nesciunt ut facere quae dolorem velit eveniet labore tempora fuga iusto maxime eos culpa repudiandae, veritatis perferendis esse."
        }
      ];
      resolve(offers);
    });
  }
}
