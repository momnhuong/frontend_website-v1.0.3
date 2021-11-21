export default function FETCH_VCLOUD(path, method, headers = {}, body) {
  return new Promise(function (resolve, reject) {
    startFetch(path, method, headers, body)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => reject(error));
  });
}

function startFetch(path, method, headers, body) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error("Request API timeout."));
    }, 30000);

    let status;
    fetch(path, {
      method,
      headers,
    })
      .then((response) => {
        clearTimeout(timeout);
        status = response.status;
        if (status === 201 || status === 204) {
          return true;
        }
        return response.json();
      })
      .then((responseJson) => {
        let data = {
          status: status,
          data: responseJson,
        };
        resolve(data);
      })
      .catch((error) => {
        clearTimeout(timeout);
        console.log(method, path, error);
        reject(error);
      });
  });
}
