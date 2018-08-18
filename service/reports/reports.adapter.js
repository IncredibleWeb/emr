import moment from "moment";

export const toReportsArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toReport(item);
    });
  }
};

export const toReport = data => {
  if (data) {
    return {
      id: data.id,
      type: data.type,
      date: moment(data.date),
      service: data.service,
      amount: data.amount
    };
  }
};
