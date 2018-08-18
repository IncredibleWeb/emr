import AuthenticatedApiService from "../authenticatedApiService";

const MAX = 400;

export default class Service extends AuthenticatedApiService {
  get(data) {
    return new Promise((resolve, reject) => {
      const transactions = [
        {
          id: 1,
          type: "Invoice",
          date: new Date(2016, 3, 1, 20, 11),
          amount: (Math.random() * Math.floor(MAX)).toFixed(2),
          service:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod, dignissimos!"
        },
        {
          id: 2,
          type: "Invoice",
          date: new Date(2016, 3, 15, 13, 4),
          amount: (Math.random() * Math.floor(MAX)).toFixed(2),
          service: "Lorem ipsum dolor."
        },
        {
          id: 3,
          type: "Payment",
          date: new Date(2016, 3, 23, 9, 5),
          amount: (Math.random() * Math.floor(MAX)).toFixed(2) * -1,
          service: "Lorem ipsum dolor sit amet."
        },
        {
          id: 4,
          type: "Invoice",
          date: new Date(2016, 3, 25, 7, 30),
          amount: (Math.random() * Math.floor(MAX)).toFixed(2),
          service: "Lorem ipsum dolor sit."
        },
        {
          id: 5,
          type: "Payment",
          date: new Date(2016, 3, 30, 11, 0),
          amount: (Math.random() * Math.floor(MAX)).toFixed(2) * -1,
          service: "Lorem ipsum dolor sit."
        },
        {
          id: 6,
          type: "Invoice",
          date: new Date(2016, 4, 2, 12, 30),
          amount: (Math.random() * Math.floor(MAX)).toFixed(2),
          service: "Lorem ipsum dolor sit amet."
        }
      ];
      resolve(transactions);
    });
  }
}
