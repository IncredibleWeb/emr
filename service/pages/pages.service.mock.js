import AuthenticatedApiService from "../authenticatedApiService";
import { default as pathToRegexp } from "path-to-regexp";

let id = 10000;

export default class Service extends AuthenticatedApiService {
  get({ id, url, data }) {
    const pages = [
      {
        meta: {
          title: "Page not Found",
          description: "",
          keywords: "",
          creator: "John Doe",
          date: "01/01/2018"
        },
        html:
          "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque omnis dicta soluta cum similique modi doloribus at.</p>",
        template: "Page not Found",
        id: (id += 1),
        name: "Page not Found",
        title: "404 - Page not Found!",
        summary: "",
        url: "/page-not-found",
        isHidden: true
      },
      {
        meta: {
          title: "Settings",
          description: "",
          keywords: "",
          creator: "John Doe",
          date: "01/01/2018"
        },
        html:
          "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque omnis dicta soluta cum similique modi doloribus at.</p>",
        template: "Settings",
        id: (id += 1),
        name: "Settings",
        title: "Settings",
        summary: "",
        url: "/settings",
        isHidden: true
      },
      {
        meta: {
          title: "Home",
          description: "",
          keywords: "",
          creator: "John Doe",
          date: "01/01/2018"
        },
        html:
          "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque omnis dicta soluta cum similique modi doloribus at.</p>",
        template: "Home",
        id: (id += 1),
        name: "Home",
        title: "Home",
        summary: "",
        url: "/",
        isHidden: true
      },
      {
        meta: {
          title: "Patients",
          description: "",
          keywords: "",
          creator: "John Doe",
          date: "01/01/2018"
        },
        html:
          "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque omnis dicta soluta cum similique modi doloribus at, nisi molestiae laboriosam tempore dolorum explicabo ullam, consectetur mollitia qui reiciendis non cupiditate maiores neque ducimus? Eligendi impedit debitis hic fugit natus blanditiis at saepe praesentium in modi, provident, similique ut deserunt! Maiores dolore quia quis quo error, quisquam provident sequi accusantium, aliquam perferendis nihil quam doloremque aperiam explicabo voluptatum reprehenderit illum similique vitae temporibus in dignissimos! Amet debitis, obcaecati. Pariatur enim nisi ratione, repellendus quas ipsa! Reiciendis provident saepe in eligendi ab, error neque consequatur. Natus eum quasi eius, unde et libero.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam impedit doloribus eaque similique voluptas et veritatis molestias tempora id aut dolorum non nulla, voluptate voluptatem. Illum, in, veniam. Exercitationem facere amet, qui odio expedita, quam laborum consectetur doloribus repudiandae ipsam maxime delectus illum quasi, fugiat hic eius rem ea aspernatur laboriosam. Nesciunt obcaecati consequuntur praesentium repudiandae incidunt mollitia delectus harum ex alias eius, fugit sint quaerat dolorem aspernatur quisquam, dicta ducimus saepe laboriosam at, eum molestias unde nihil fuga vero? Voluptatum error exercitationem, quam pariatur cupiditate officiis, eligendi atque autem qui libero asperiores dolor reprehenderit laboriosam in reiciendis inventore quasi non enim unde. Corporis recusandae mollitia aspernatur ab, asperiores qui perspiciatis optio placeat vero. Culpa alias id vitae veniam autem dolore debitis, porro labore obcaecati consectetur ullam molestiae illo eaque necessitatibus, in earum commodi facere cum, atque expedita eligendi ipsam delectus vero ratione qui. Quaerat, aut officiis repellat animi doloremque praesentium magnam quidem ab consectetur reprehenderit voluptate laboriosam et numquam, dicta ad fugiat cum iusto odio eaque veritatis. Saepe necessitatibus nihil, earum hic rem maiores iusto, inventore pariatur molestias cumque explicabo, dolorem autem nesciunt! Beatae veritatis, non, architecto quam est, esse deserunt temporibus reprehenderit, ipsum ad quidem sunt corrupti magni.</p>",
        template: "Patients",
        id: (id += 1),
        name: "Patients",
        title: "Patients",
        summary:
          "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis, similique! Ipsa quis tempore consequuntur dolorum, voluptas fugiat delectus qui consequatur?</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere ullam neque harum numquam possimus, beatae sint ducimus repellat, obcaecati similique accusantium, distinctio, minus id dolore tempore. Omnis facere, maxime illum.</p>",
        url: "/patients/",
        isHidden: false
      },
      {
        meta: {
          title: "Reports",
          description: "",
          keywords: "",
          creator: "John Doe",
          date: "01/01/2018"
        },
        html:
          "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda nostrum quam labore placeat ut perspiciatis necessitatibus deserunt sed esse dolore.</p>",
        template: "Reports",
        id: (id += 1),
        name: "Reports",
        title: "Reports",
        summary:
          "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>",
        url: "/reports/",
        isHidden: false
      }
    ];

    let result;

    if (data.url) {
      result = pages.find(n => pathToRegexp(n.url).test(data.url));
    }

    if (!result) {
      result = pages.find(n => n.url === "/page-not-found/");
    }

    return Promise.resolve(result);
  }
}
