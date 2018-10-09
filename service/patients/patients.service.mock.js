import AuthenticatedApiService from "../authenticatedApiService";

const MAX = 500;

export default class Service extends AuthenticatedApiService {
  get(data) {
    return new Promise((resolve, reject) => {
      let patients = [
        {
          id: 1,
          name: "Jane Doe",
          telephone: "+356 9900 0001",
          email: "jane.doe@email.com",
          documentNumber: "0000001M",
          comments: "",
          visits: [
            {
              date: new Date(2017, 3, 22),
              title: "Lorem ipsum dolor sit",
              description: "",
              price: (Math.random() * Math.floor(MAX)).toFixed(2)
            }
          ]
        },
        {
          id: 2,
          name: "Bunny Bravo",
          telephone: "+356 9900 0004",
          email: "bunny.bravo@email.com",
          documentNumber: "0000002M",
          comments:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum in, necessitatibus! Pariatur fugit eligendi magni, dolores ex quaerat molestiae nisi quod in modi dolorem tempore iste natus, laudantium blanditiis. Error quia itaque, saepe atque asperiores odit quasi possimus accusantium a?",
          visits: [
            {
              date: new Date(2017, 4, 1),
              title: "Lorem ipsum dolor sit",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad consequuntur alias aliquid provident quibusdam, nisi laborum voluptatem! Incidunt, laborum placeat.",
              price: (Math.random() * Math.floor(MAX)).toFixed(2)
            },
            {
              date: new Date(2017, 7, 8),
              title: "Dolor sit",
              description: "",
              price: (Math.random() * Math.floor(MAX)).toFixed(2)
            }
          ]
        },
        {
          id: 3,
          name: "Kim Chi",
          telephone: "+356 9900 0003",
          email: "kim.chi@email.com",
          documentNumber: "0000003M",
          comments: "",
          visits: [
            {
              date: new Date(2017, 1, 21),
              title: "Dolor sit",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum totam officia at, blanditiis quo.",
              price: (Math.random() * Math.floor(MAX)).toFixed(2)
            }
          ]
        }
      ];
      resolve(patients);
    });
  }
}
