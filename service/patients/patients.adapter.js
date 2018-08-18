import moment from "moment";

export const toPatientsArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toPatient(item);
    });
  }
};

export const toPatient = data => {
  if (data) {
    return {
      date: moment(data.date).format("MMMM Do YYYY"),
      title: data.title,
      text: data.text,
      id: data.id
    };
  }
};
