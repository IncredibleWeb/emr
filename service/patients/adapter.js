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
      name: data.name,
      telephone: data.telephone,
      email: data.email,
      comments: data.comments,
      documentNumber: data.documentNumber,
      lastVisitDate:
        data.visits.length > 0 ? data.visits.sort(n => n.date)[0].date : null,
      visits: toVisitsArray(data.visits),
      id: data.id
    };
  }
};

export const toVisitsArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toVisit(item);
    });
  }
};

export const toVisit = data => {
  if (data) {
    return {
      date: data.date,
      title: data.title,
      description: data.description,
      price: data.price,
      id: data.id
    };
  }
};
